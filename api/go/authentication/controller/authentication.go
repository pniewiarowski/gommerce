package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/dto"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/helper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
	"github.com/pniewiarowski/gommerce/lib/go/environment"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type Authentication struct {
	UserRepository repository.User
	RoleRepository repository.Role
	UserMapper     mapper.User
}

func (a Authentication) Post(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	user := new(model.User)

	if err := ctx.BodyParser(&user); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	user.RoleID = helper.STANDARD_ROLE_ID

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	createdUser, err := a.UserRepository.Create(user)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"user": a.UserMapper.From(createdUser)})
}

func (a Authentication) Token(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	user := new(model.User)

	if err := ctx.BodyParser(&user); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	valid, err := a.UserRepository.GetByEmail(user.Email)

	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{"error": err.Error()})
	}

	if err = bcrypt.CompareHashAndPassword([]byte(valid.Password), []byte(user.Password)); err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{"error": "incorrect password"})
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims[helper.CLAIMS_ID] = valid.EntityID
	claims[helper.CLAIMS_ACCOUNT_TYPE_ID_CLAIM] = valid.RoleID
	claims[helper.CLAIMS_EXPIRE_TIME] = time.Now().Add(time.Hour * 72).Unix()

	tokenStringed, _ := token.SignedString([]byte(environment.GetByKey("API_SECRET")))

	return ctx.Status(fiber.StatusOK).JSON(dto.Token{
		User: a.UserMapper.From(valid),
		JWT:  tokenStringed,
	})
}

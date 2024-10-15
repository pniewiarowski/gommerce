package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"github.com/pniewiarowski/gommerce/api/auth/dto"
	"github.com/pniewiarowski/gommerce/api/auth/model"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/request"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/auth/validator"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type AuthController struct {
	UserRepository     repository.UserRepository
	UserRoleRepository repository.UserRoleRepository
	RegisterValidator  validator.RegisterValidator
}

func (ac *AuthController) Login(ctx *fiber.Ctx) error {
	loginRequest := request.LoginRequest{}

	if err := ctx.BodyParser(&loginRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into request definition",
		})
	}

	user, err := ac.UserRepository.ReadByEmail(loginRequest.Email)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "provided email or password are not correct",
		})
	}

	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password)); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "provided email or password are not correct",
		})
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims[definition.JwtClaimId] = user.ID
	claims[definition.JwtClaimAccountType] = user.RoleID
	claims[definition.JwtClaimExpireTime] = time.Now().Add(time.Hour * 72).Unix()

	tokenStringed, err := token.SignedString([]byte(environment.GetAPISecretSeed()))
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while logging",
		})
	}

	admin, _ := ac.UserRoleRepository.ReadByCode(definition.UserRoleAdmin)
	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.JWTDTO{
			Token:   tokenStringed,
			UserID:  user.ID,
			IsAdmin: user.RoleID == admin.ID,
		},
	})
}

func (ac *AuthController) Register(ctx *fiber.Ctx) error {
	registerRequest := request.RegisterRequest{}

	if err := ctx.BodyParser(&registerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into request definition",
		})
	}

	code, errorResponse := ac.RegisterValidator.Validate(registerRequest)
	if errorResponse != nil {
		return ctx.Status(code).JSON(errorResponse)
	}

	role, _ := ac.UserRoleRepository.ReadByCode(definition.UserRoleCustomer)
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(registerRequest.Password), bcrypt.DefaultCost)
	user, err := ac.UserRepository.Create(&model.User{
		Email:    registerRequest.Email,
		Password: string(hashedPassword),
		Enable:   true,
		RoleID:   role.ID,
	})

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserDTO{
			ID:     user.ID,
			Email:  user.Email,
			Enable: user.Enable,
			RoleID: user.RoleID,
		},
	})
}

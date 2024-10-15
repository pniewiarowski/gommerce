package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"github.com/pniewiarowski/gommerce/api/auth/dto"
	h "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/model"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/request"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/auth/validator"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	UserRepository     repository.UserRepository
	UserRoleRepository repository.UserRoleRepository
	JWTHelper          h.JWTHelper
	FiberHelper        helper.FiberContextHelper
	RegisterValidator  validator.RegisterValidator
}

func (uc *UserController) Index(ctx *fiber.Ctx) error {
	claims, _ := uc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := uc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	data, err := uc.UserRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.UserFromCollection(data),
	})
}

func (uc *UserController) Show(ctx *fiber.Ctx) error {
	claims, _ := uc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := uc.JWTHelper.IsAdmin(claims)
	id, _ := uc.FiberHelper.GetID(ctx)
	idFromToken := claims[definition.JwtClaimId]
	isResourceOwner := id == idFromToken

	if !isAdmin && !isResourceOwner {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	user, err := uc.UserRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.UserDTO{
			ID:     user.ID,
			Email:  user.Email,
			Enable: user.Enable,
			RoleID: user.RoleID,
		},
	})
}

func (uc *UserController) Store(ctx *fiber.Ctx) error {
	registerRequest := request.RegisterRequest{}

	if err := ctx.BodyParser(&registerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into request definition",
		})
	}

	code, errorResponse := uc.RegisterValidator.Validate(registerRequest)
	if errorResponse != nil {
		return ctx.Status(code).JSON(errorResponse)
	}

	role, _ := uc.UserRoleRepository.ReadByCode(definition.UserRoleCustomer)
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(registerRequest.Password), bcrypt.DefaultCost)
	user, err := uc.UserRepository.Create(&model.User{
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

func (uc *UserController) Update(ctx *fiber.Ctx) error {
	claims, _ := uc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := uc.JWTHelper.IsAdmin(claims)
	id, _ := uc.FiberHelper.GetID(ctx)
	idFromToken := claims[definition.JwtClaimId]
	isResourceOwner := id == idFromToken

	if !isAdmin && !isResourceOwner {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	user, err := uc.UserRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	userRequest := model.User{}
	if err := ctx.BodyParser(&userRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedUser, err := uc.UserRepository.Update(user, &userRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserDTO{
			ID:     updatedUser.ID,
			Email:  updatedUser.Email,
			Enable: updatedUser.Enable,
			RoleID: updatedUser.RoleID,
		},
	})
}

func (uc *UserController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := uc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := uc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	id, err := uc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	users, err := uc.UserRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserFromCollection(users),
	})
}

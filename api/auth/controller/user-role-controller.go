package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/dto"
	h "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/model"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/response"
)

type UserRoleController struct {
	UserRoleRepository repository.UserRoleRepository
	JWTHelper          h.JWTHelper
	FiberHelper        helper.FiberContextHelper
}

func (urc *UserRoleController) Index(ctx *fiber.Ctx) error {
	claims, _ := urc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := urc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	data, err := urc.UserRoleRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.UserRoleFromCollection(data),
	})
}

func (urc *UserRoleController) Show(ctx *fiber.Ctx) error {
	claims, _ := urc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := urc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	id, _ := urc.FiberHelper.GetID(ctx)
	role, err := urc.UserRoleRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.UserRoleDTO{
			ID:   role.ID,
			Code: role.Code,
		},
	})
}

func (urc *UserRoleController) Store(ctx *fiber.Ctx) error {
	claims, _ := urc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := urc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to create this resource",
		})
	}

	userRoleRequest := model.UserRole{}
	if err := ctx.BodyParser(&userRoleRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	if urc.UserRoleRepository.ExistsWithGivenCode(userRoleRequest.Code) {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "role with provided code already exists",
		})
	}

	userRole, err := urc.UserRoleRepository.Create(&userRoleRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserRoleDTO{
			ID:   userRole.ID,
			Code: userRole.Code,
		},
	})
}

func (urc *UserRoleController) Update(ctx *fiber.Ctx) error {
	claims, _ := urc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := urc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to update this resource",
		})
	}

	id, _ := urc.FiberHelper.GetID(ctx)
	userRole, err := urc.UserRoleRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	userRoleRequest := model.UserRole{}
	if err := ctx.BodyParser(&userRoleRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedUserRole, err := urc.UserRoleRepository.Update(userRole, &userRoleRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserRoleDTO{
			ID:   updatedUserRole.ID,
			Code: updatedUserRole.Code,
		},
	})
}

func (urc *UserRoleController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := urc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := urc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	id, err := urc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	usersRoles, err := urc.UserRoleRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.UserRoleFromCollection(usersRoles),
	})
}

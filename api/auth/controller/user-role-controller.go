package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/dto"
	h "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/response"
)

type UserRoleController struct {
	UserRoleRepository repository.UserRoleRepository
	JWTHelper          h.JWTHelper
	FiberHelper        helper.FiberContextHelper
}

func (urc *UserRoleController) Index(ctx *fiber.Ctx) error {
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
	id, err := urc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	role, err := urc.UserRoleRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong please try again later",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.UserRoleDTO{
			ID:   role.ID,
			Code: role.Code,
		},
	})
}

func (_ *UserRoleController) Store(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserRoleController) Update(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserRoleController) Destroy(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

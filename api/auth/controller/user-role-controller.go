package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/auth/dto"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/response"
)

type UserRoleController struct {
	UserRoleRepository repository.UserRoleRepository
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

func (_ *UserRoleController) Show(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
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

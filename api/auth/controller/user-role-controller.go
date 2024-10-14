package controller

import "github.com/gofiber/fiber/v2"

type UserRoleController struct{}

func (_ *UserRoleController) Index(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
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

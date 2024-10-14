package controller

import "github.com/gofiber/fiber/v2"

type UserController struct{}

func (_ *UserController) Index(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserController) Show(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserController) Store(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserController) Update(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

func (_ *UserController) Destroy(ctx *fiber.Ctx) error {
	return ctx.JSON(fiber.Map{})
}

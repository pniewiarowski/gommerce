package controller

import "github.com/gofiber/fiber/v2"

type CategoryController struct{}

func (cc *CategoryController) Index(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (cc *CategoryController) Show(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (cc *CategoryController) Store(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (cc *CategoryController) Update(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (cc *CategoryController) Destroy(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

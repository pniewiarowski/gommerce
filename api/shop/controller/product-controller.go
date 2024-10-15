package controller

import "github.com/gofiber/fiber/v2"

type ProductController struct{}

func (pc *ProductController) Index(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (pc *ProductController) Show(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (pc *ProductController) Store(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (pc *ProductController) Update(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

func (pc *ProductController) Destroy(ctx *fiber.Ctx) error {
	return ctx.JSON(&fiber.Map{})
}

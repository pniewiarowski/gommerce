package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type OrderController struct {
	OrderRepository repository.OrderRepository
	JWTHelper       authhelper.JWTHelper
	FiberHelper     sharedhelper.FiberContextHelper
}

func (oc *OrderController) Index(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Show(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Store(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Update(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Destroy(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

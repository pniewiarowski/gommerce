package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/{{service_name}}/dto"
	"github.com/pniewiarowski/gommerce/api/{{service_name}}/model"
	"github.com/pniewiarowski/gommerce/api/{{service_name}}/repository"
)

type {{model}}Controller struct {
	{{model}}Repository repository.{{model}}Repository
	JWTHelper           authhelper.JWTHelper
	FiberHelper         sharedhelper.FiberContextHelper
}

func ({{model_first_letter}}c *{{model}}Controller) Index(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func ({{model_first_letter}}c *{{model}}Controller) Show(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func ({{model_first_letter}}c *{{model}}Controller) Store(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func ({{model_first_letter}}c *{{model}}Controller) Update(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func ({{model_first_letter}}c *{{model}}Controller) Destroy(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/cms/dto"
	"github.com/pniewiarowski/gommerce/api/cms/repository"
)

type ThemeController struct {
	ThemeRepository repository.ThemeRepository
	JWTHelper       authhelper.JWTHelper
	FiberHelper     sharedhelper.FiberContextHelper
}

func (tc ThemeController) Index(ctx *fiber.Ctx) error {
	claims, _ := tc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := tc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	data, err := tc.ThemeRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.ThemeFromCollection(data),
	})
}

func (tc ThemeController) Show(ctx *fiber.Ctx) error {
	id, _ := tc.FiberHelper.GetID(ctx)
	theme, err := tc.ThemeRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.ThemeFromModel(*theme),
	})
}

func (tc ThemeController) Update(ctx *fiber.Ctx) error {
	claims, _ := tc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := tc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (tc ThemeController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := tc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := tc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (tc ThemeController) Store(ctx *fiber.Ctx) error {
	claims, _ := tc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := tc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

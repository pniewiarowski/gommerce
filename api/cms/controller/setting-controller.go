package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/cms/dto"
	"github.com/pniewiarowski/gommerce/api/cms/model"
	"github.com/pniewiarowski/gommerce/api/cms/repository"
)

type SettingController struct {
	SettingRepository repository.SettingRepository
	JWTHelper         authhelper.JWTHelper
	FiberHelper       sharedhelper.FiberContextHelper
}

func (sc SettingController) Index(ctx *fiber.Ctx) error {
	data, err := sc.SettingRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.SettingFromCollection(data),
	})
}

func (sc SettingController) Show(ctx *fiber.Ctx) error {
	id, _ := sc.FiberHelper.GetID(ctx)
	setting, err := sc.SettingRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.SettingFromModel(*setting),
	})
}

func (sc SettingController) Update(ctx *fiber.Ctx) error {
	claims, _ := sc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := sc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	id, _ := sc.FiberHelper.GetID(ctx)
	setting, err := sc.SettingRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	settingRequest := model.Setting{}
	if err := ctx.BodyParser(&settingRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedSetting, err := sc.SettingRepository.Update(setting, &settingRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.SettingFromModel(*updatedSetting),
	})
}

func (sc SettingController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := sc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := sc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	id, err := sc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	settings, err := sc.SettingRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.SettingFromCollection(settings),
	})

}

func (sc SettingController) Store(ctx *fiber.Ctx) error {
	claims, _ := sc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := sc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	settingRequest := model.Setting{}
	if err := ctx.BodyParser(&settingRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	setting, err := sc.SettingRepository.Create(&settingRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.SettingFromModel(*setting),
	})
}

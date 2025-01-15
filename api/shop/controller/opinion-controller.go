package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/shop/dto"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type OpinionController struct {
	OpinionRepository repository.OpinionRepository
	JWTHelper         authhelper.JWTHelper
	FiberHelper       sharedhelper.FiberContextHelper
}

func (oc OpinionController) Index(ctx *fiber.Ctx) error {
	data, err := oc.OpinionRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.OpinionFromCollection(data),
	})
}

func (oc OpinionController) Show(ctx *fiber.Ctx) error {
	id, _ := oc.FiberHelper.GetID(ctx)
	opinion, err := oc.OpinionRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.OpinionFromModel(*opinion),
	})
}

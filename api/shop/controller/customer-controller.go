package controller

import (
	"github.com/gofiber/fiber/v2"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/shop/dto"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type CustomerController struct {
	CustomerRepository repository.CustomerRepository
	JWTHelper          authhelper.JWTHelper
}

func (cc *CustomerController) Index(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	data, err := cc.CustomerRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.CustomerFromCollection(data),
	})
}

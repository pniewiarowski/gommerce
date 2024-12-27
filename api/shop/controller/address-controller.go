package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/shop/dto"
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type AddressController struct {
	AddressRepository  repository.AddressRepository
	CustomerRepository repository.CustomerRepository
	JWTHelper          authhelper.JWTHelper
	FiberHelper        sharedhelper.FiberContextHelper
}

func (ac *AddressController) isResourceOwner(address *model.Address, ctx *fiber.Ctx) bool {
	claims, _ := ac.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := ac.JWTHelper.IsAdmin(claims)
	if isAdmin {
		return true
	}

	idFromToken := claims[definition.JwtClaimId]
	userCustomer, _ := ac.CustomerRepository.ReadByUserID(idFromToken.(uint))

	return userCustomer.ID == address.CustomerID
}

func (ac AddressController) Index(ctx *fiber.Ctx) error {
	claims, _ := ac.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := ac.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	data, err := ac.AddressRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.AddressFromCollection(data),
	})
}

func (ac AddressController) Show(ctx *fiber.Ctx) error {
	id, _ := ac.FiberHelper.GetID(ctx)
	address, err := ac.AddressRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !ac.isResourceOwner(address, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.AddressFromModel(*address),
	})
}

func (ac AddressController) Store(ctx *fiber.Ctx) error {
	claims, _ := ac.JWTHelper.ExtractClaimsFromContext(ctx)
	idFromToken := claims[definition.JwtClaimId]
	addressRequest := model.Address{}
	if err := ctx.BodyParser(&addressRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	customer, _ := ac.CustomerRepository.ReadByUserID(idFromToken.(uint))
	addressRequest.CustomerID = customer.ID
	address, err := ac.AddressRepository.Create(&addressRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.AddressFromModel(*address),
	})
}

func (ac AddressController) Update(ctx *fiber.Ctx) error {
	id, _ := ac.FiberHelper.GetID(ctx)
	address, err := ac.AddressRepository.ReadByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !ac.isResourceOwner(address, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to update this resource",
		})
	}

	addressRequest := model.Address{}
	if err := ctx.BodyParser(&addressRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedAddress, err := ac.AddressRepository.Update(address, &addressRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.AddressFromModel(*updatedAddress),
	})
}

func (ac AddressController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := ac.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := ac.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to destroy this resource",
		})
	}

	id, err := ac.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	addresses, err := ac.AddressRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.AddressFromCollection(addresses),
	})
}

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

type CustomerController struct {
	CustomerRepository repository.CustomerRepository
	OrderRepository    repository.OrderRepository
	AddressRepository  repository.AddressRepository
	JWTHelper          authhelper.JWTHelper
	FiberHelper        sharedhelper.FiberContextHelper
}

func (cc *CustomerController) isResourceOwner(customer *model.Customer, ctx *fiber.Ctx) bool {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if isAdmin {
		return true
	}

	idFromToken := claims[definition.JwtClaimId]
	userCustomer, err := cc.CustomerRepository.ReadByUserID(idFromToken.(uint))
	if err != nil {
		return false
	}

	return customer.UserID == userCustomer.UserID
}

func (cc *CustomerController) Index(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
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

func (cc *CustomerController) Show(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	customer, err := cc.CustomerRepository.ReadByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !cc.isResourceOwner(customer, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.CustomerFromModel(*customer),
	})
}

func (cc *CustomerController) Store(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	idFromToken := claims[definition.JwtClaimId]
	customerRequest := model.Customer{}
	if err := ctx.BodyParser(&customerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	customerRequest.UserID = idFromToken.(uint)
	customer, err := cc.CustomerRepository.Create(&customerRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CustomerFromModel(*customer),
	})
}

func (cc *CustomerController) Update(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	customer, err := cc.CustomerRepository.ReadByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !cc.isResourceOwner(customer, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to update this resource",
		})
	}

	customerRequest := model.Customer{}
	if err := ctx.BodyParser(&customerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedCustomer, err := cc.CustomerRepository.Update(customer, &customerRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CustomerFromModel(*updatedCustomer),
	})
}

func (cc *CustomerController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to destroy this resource",
		})
	}

	id, err := cc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	customers, err := cc.CustomerRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CustomerFromCollection(customers),
	})
}

func (cc *CustomerController) User(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	customer, err := cc.CustomerRepository.ReadByUserID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !cc.isResourceOwner(customer, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.CustomerFromModel(*customer),
	})
}

func (cc *CustomerController) Address(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	customer, err := cc.CustomerRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	address, err := cc.AddressRepository.ReadByCustomerID(customer.ID)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.AddressFromModel(*address),
	})
}

func (cc *CustomerController) Orders(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	customer, err := cc.CustomerRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	orders, err := cc.OrderRepository.ReadByCustomerID(customer.ID)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while reading entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.OrderFromCollection(orders),
	})
}

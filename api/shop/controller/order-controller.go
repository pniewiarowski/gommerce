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
	"github.com/pniewiarowski/gommerce/api/shop/request"
)

type OrderController struct {
	OrderRepository    repository.OrderRepository
	CustomerRepository repository.CustomerRepository
	ProductRepository  repository.ProductRepository

	JWTHelper   authhelper.JWTHelper
	FiberHelper sharedhelper.FiberContextHelper
}

func (oc *OrderController) isResourceOwner(order *model.Order, ctx *fiber.Ctx) bool {
	claims, _ := oc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := oc.JWTHelper.IsAdmin(claims)
	if isAdmin {
		return true
	}

	idFromToken := claims[definition.JwtClaimId]
	customer, err := oc.CustomerRepository.ReadByUserID(idFromToken.(uint))

	if err != nil {
		return false
	}

	return order.CustomerID == customer.ID
}

func (oc *OrderController) Index(ctx *fiber.Ctx) error {
	claims, _ := oc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := oc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	data, err := oc.OrderRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	order := dto.OrderFromCollection(data)
	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: order,
	})
}

func (oc *OrderController) Show(ctx *fiber.Ctx) error {
	id, _ := oc.FiberHelper.GetID(ctx)
	order, err := oc.OrderRepository.ReadByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	if !oc.isResourceOwner(order, ctx) {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to read this resource",
		})
	}

	orderProducts, _ := oc.OrderRepository.ReadProducts(order.ID)
	orderDTO := dto.OrderFromModel(*order)
	orderDTO.Products = dto.ProductFromCollection(orderProducts)

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: orderDTO,
	})
}

func (oc *OrderController) Store(ctx *fiber.Ctx) error {
	orderRequest := request.OrderRequest{}
	if err := ctx.BodyParser(&orderRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	fullPrice := float32(0)
	for _, id := range orderRequest.ProductIDs {
		product, err := oc.ProductRepository.ReadByID(id)
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
				Message: "product with provided ID does not exists",
			})
		}

		fullPrice += product.Price
	}

	claims, _ := oc.JWTHelper.ExtractClaimsFromContext(ctx)
	customer, _ := oc.CustomerRepository.ReadByUserID(claims[definition.JwtClaimId].(uint))
	order := model.Order{
		CustomerID: customer.ID,
		FullPrice:  fullPrice,
	}

	createdOrder, err := oc.OrderRepository.Create(&order, orderRequest.ProductIDs)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	createdOrderDTO := dto.OrderFromModel(*createdOrder)
	orderProducts, _ := oc.OrderRepository.ReadProducts(createdOrderDTO.ID)
	createdOrderDTO.Products = dto.ProductFromCollection(orderProducts)

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: createdOrderDTO,
	})
}

func (oc *OrderController) Update(ctx *fiber.Ctx) error {
	id, _ := oc.FiberHelper.GetID(ctx)
	_, err := oc.OrderRepository.ReadByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	claims, _ := oc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := oc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to update this resource",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := oc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := oc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to destroy this resource",
		})
	}

	id, err := oc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	orders, err := oc.OrderRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.OrderFromCollection(orders),
	})
}

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
	JWTHelper          authhelper.JWTHelper
	FiberHelper        sharedhelper.FiberContextHelper
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
	_, err := oc.OrderRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
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
	order := model.Order{
		CustomerID: claims[definition.JwtClaimId].(uint),
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
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (oc *OrderController) Destroy(ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

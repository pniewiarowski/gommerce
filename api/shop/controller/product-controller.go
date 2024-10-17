package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/shop/dto"
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type ProductController struct {
	ProductRepository repository.ProductRepository
	JWTHelper         authhelper.JWTHelper
	FiberHelper       sharedhelper.FiberContextHelper
}

func (pc *ProductController) Index(ctx *fiber.Ctx) error {
	data, err := pc.ProductRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.ProductFromCollection(data),
	})
}

func (pc *ProductController) Show(ctx *fiber.Ctx) error {
	id, _ := pc.FiberHelper.GetID(ctx)
	product, err := pc.ProductRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.ProductDTO{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			Enabled:     product.Enabled,
			SortOrder:   product.SortOrder,
			ImageURL:    product.ImageURL,
			CategoryID:  product.CategoryID,
		},
	})
}

func (pc *ProductController) Store(ctx *fiber.Ctx) error {
	claims, _ := pc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := pc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	productRequest := model.Product{}
	if err := ctx.BodyParser(&productRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	file, err := ctx.FormFile("product_img")
	if err == nil {
		unique := uuid.New()
		newFileName := fmt.Sprintf("%s_%s", unique, file.Filename)
		destination := fmt.Sprintf("./images/products/%s", newFileName)
		err := ctx.SaveFile(file, destination)
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
				Message: "something went wrong while saving entity image",
			})

		}

		productRequest.ImageURL = fmt.Sprintf("%s/images/products/%s", ctx.BaseURL(), newFileName)
	}

	product, err := pc.ProductRepository.Create(&productRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.ProductDTO{
			ID:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			Enabled:     product.Enabled,
			SortOrder:   product.SortOrder,
			ImageURL:    product.ImageURL,
			CategoryID:  product.CategoryID,
		},
	})
}

func (pc *ProductController) Update(ctx *fiber.Ctx) error {
	claims, _ := pc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := pc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to update this resource",
		})
	}

	id, _ := pc.FiberHelper.GetID(ctx)
	product, err := pc.ProductRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	productRequest := model.Product{}
	if err := ctx.BodyParser(&productRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedProduct, err := pc.ProductRepository.Update(product, &productRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.ProductDTO{
			ID:          updatedProduct.ID,
			Name:        updatedProduct.Name,
			Description: updatedProduct.Description,
			Price:       updatedProduct.Price,
			Enabled:     updatedProduct.Enabled,
			SortOrder:   updatedProduct.SortOrder,
			ImageURL:    updatedProduct.ImageURL,
			CategoryID:  updatedProduct.CategoryID,
		},
	})
}

func (pc *ProductController) Destroy(ctx *fiber.Ctx) error {
	claims, _ := pc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := pc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to destroy this resource",
		})
	}

	id, err := pc.FiberHelper.GetID(ctx)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	products, err := pc.ProductRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.ProductFromCollection(products),
	})
}

package controller

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"github.com/pniewiarowski/gommerce/api/shop/dto"
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

type CategoryController struct {
	CategoryRepository repository.CategoryRepository
	JWTHelper          authhelper.JWTHelper
	FiberHelper        sharedhelper.FiberContextHelper
}

func (cc *CategoryController) Index(ctx *fiber.Ctx) error {
	data, err := cc.CategoryRepository.Read()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&response.ErrorResponse{
			Message: "something went wrong while reading data",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.CategoryFromCollection(data),
	})
}

func (cc *CategoryController) Show(ctx *fiber.Ctx) error {
	id, _ := cc.FiberHelper.GetID(ctx)
	category, err := cc.CategoryRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&response.SuccessResponse{
		Data: dto.CategoryDTO{
			ID:          category.ID,
			Name:        category.Name,
			Description: category.Description,
			Enabled:     category.Enabled,
			SortOrder:   category.SortOrder,
		},
	})
}

func (cc *CategoryController) Store(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to store this resource",
		})
	}

	categoryRequest := model.Category{}
	if err := ctx.BodyParser(&categoryRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	category, err := cc.CategoryRepository.Create(&categoryRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CategoryDTO{
			ID:          category.ID,
			Name:        category.Name,
			Description: category.Description,
			Enabled:     category.Enabled,
			SortOrder:   category.SortOrder,
		},
	})
}

func (cc *CategoryController) Update(ctx *fiber.Ctx) error {
	claims, _ := cc.JWTHelper.ExtractClaimsFromContext(ctx)
	isAdmin := cc.JWTHelper.IsAdmin(claims)
	if !isAdmin {
		return ctx.Status(fiber.StatusForbidden).JSON(&response.ErrorResponse{
			Message: "you do not have access to destroy this resource",
		})
	}

	id, _ := cc.FiberHelper.GetID(ctx)
	category, err := cc.CategoryRepository.ReadByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(&response.ErrorResponse{
			Message: "entity with provided ID does not exists",
		})
	}

	categoryRequest := model.Category{}
	if err := ctx.BodyParser(&categoryRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ErrorResponse{
			Message: "error while parsing data into model definition",
		})
	}

	updatedCategory, err := cc.CategoryRepository.Update(category, &categoryRequest)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while saving entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CategoryDTO{
			ID:          updatedCategory.ID,
			Name:        updatedCategory.Name,
			Description: updatedCategory.Description,
			Enabled:     updatedCategory.Enabled,
			SortOrder:   updatedCategory.SortOrder,
		},
	})
}

func (cc *CategoryController) Destroy(ctx *fiber.Ctx) error {
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

	categories, err := cc.CategoryRepository.DeleteByID(id)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ErrorResponse{
			Message: "something went wrong while deleting entity",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(response.SuccessResponse{
		Data: dto.CategoryFromCollection(categories),
	})
}

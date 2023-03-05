package controller

import (
	"gommerce/api/models"

	"github.com/gofiber/fiber/v2"
)

// GetConfig return JSON with all models.Config pairs.
func GetConfig(ctx *fiber.Ctx) error {
	configs, err := models.GetConfig()
	if err != nil {
		return ctx.
			Status(fiber.StatusBadRequest).
			JSON(&fiber.Map{
				"error": err,
			})
	}

	return ctx.
		Status(fiber.StatusOK).
		JSON(&fiber.Map{
			"data": configs,
		})
}

// GetConfigByKey return JSON with models.Config base on given key.
func GetConfigByKey(ctx *fiber.Ctx) error {
	key := ctx.Params("key")

	config, err := models.GetConfigByKey(key)
	if err != nil {
		return ctx.
			Status(fiber.StatusNotFound).
			JSON(&fiber.Map{
				"error": err.Error(),
			})
	}

	return ctx.
		Status(fiber.StatusOK).
		JSON(&fiber.Map{
			"data": config,
		})
}

// CreateConfig create instance of models.Config.
func CreateConfig(ctx *fiber.Ctx) error {
	config := new(models.Config)
	if err := ctx.BodyParser(config); err != nil {
		return ctx.
			Status(fiber.StatusBadRequest).
			JSON(&fiber.Map{
				"error": err,
			})
	}

	config, err := models.CreateConfig(config)
	if err != nil {
		return ctx.
			Status(fiber.StatusBadRequest).
			JSON(&fiber.Map{
				"error": err,
			})
	}

	return ctx.
		Status(fiber.StatusOK).
		JSON(&fiber.Map{
			"data": config,
		})
}

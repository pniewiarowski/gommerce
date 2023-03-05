package controller

import (
	"gommerce/api/models"

	"github.com/gofiber/fiber/v2"
)

// GetConfigByKey return JSON with config value base
// on key given as a parameter.
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

// CreateConfig create instance of models.Config and save
// it to database.
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

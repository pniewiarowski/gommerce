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
			"value": config,
		})
}

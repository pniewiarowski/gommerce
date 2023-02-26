package controller

import (
	"fmt"
	"gommerce/api/models"

	"github.com/gofiber/fiber/v2"
)

func GetConfig(ctx *fiber.Ctx) error {
	key := ctx.Params("key")
	value := models.GetConfigByKey(key)

	if value == "" {
		return ctx.
			Status(fiber.StatusNotFound).
			JSON(&fiber.Map{
				"value": value,
				"error": fmt.Sprintf("value with %s key does not exists or is not set", key),
			})
	}

	return ctx.
		Status(fiber.StatusOK).
		JSON(&fiber.Map{
			"value": value,
		})
}

package router

import (
	"gommerce/api/controller"

	"github.com/gofiber/fiber/v2"
)

// SetupConfig create routes for Config model.
func SetupConfig(router fiber.Router) {
	router.Get("/:key", controller.GetConfigByKey)
	router.Post("/", controller.CreateConfig)
}

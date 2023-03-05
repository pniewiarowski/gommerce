package router

import (
	"gommerce/api/controller"

	"github.com/gofiber/fiber/v2"
)

// SetupConfig routes for models.Config
func SetupConfig(router fiber.Router) {
	router.Get("/", controller.GetConfig)
	router.Get("/:key", controller.GetConfigByKey)
	router.Post("/", controller.CreateConfig)
}

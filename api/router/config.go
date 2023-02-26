package router

import (
	"gommerce/api/controller"

	"github.com/gofiber/fiber/v2"
)

func SetupConfig(router fiber.Router) {
	router.Get("/:key", controller.GetConfig)
}

package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/auth/controller"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
)

func SetupUser(router fiber.Router) {
	c := controller.UserController{}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Post("/", middleware.Protected(), c.Store)
	router.Patch("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
}

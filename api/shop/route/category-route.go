package route

import (
	"github.com/gofiber/fiber/v2"
	authmiddleware "github.com/pniewiarowski/gommerce/api/auth/middleware"
	"github.com/pniewiarowski/gommerce/api/shop/controller"
)

func SetupCategoryRoute(router fiber.Router) {
	c := controller.CategoryController{}

	router.Get("/", c.Index)
	router.Get("/:id", c.Show)
	router.Post("/", authmiddleware.Protected(), c.Store)
	router.Put("/:id", authmiddleware.Protected(), c.Update)
	router.Delete("/:id", authmiddleware.Protected(), c.Destroy)
}

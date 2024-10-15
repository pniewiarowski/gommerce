package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/auth/controller"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
)

func SetupUserRole(router fiber.Router) {
	urr := repository.UserRoleRepository{}
	c := controller.UserRoleController{
		UserRoleRepository: urr,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Post("/", middleware.Protected(), c.Store)
	router.Patch("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
}

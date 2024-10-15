package route

import (
	"github.com/gofiber/fiber/v2"
	helper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/controller"
	h "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
)

func SetupUserRole(router fiber.Router) {
	urr := repository.UserRoleRepository{}
	jwt := h.JWTHelper{}
	ctx := helper.FiberContextHelper{}
	c := controller.UserRoleController{
		UserRoleRepository: urr,
		JWTHelper:          jwt,
		FiberHelper:        ctx,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Post("/", middleware.Protected(), c.Store)
	router.Patch("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
}

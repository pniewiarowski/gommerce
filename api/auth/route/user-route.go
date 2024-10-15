package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/_shared/helper"
	"github.com/pniewiarowski/gommerce/api/auth/controller"
	h "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/validator"
)

func SetupUser(router fiber.Router) {
	ur := repository.UserRepository{}
	urr := repository.UserRoleRepository{}
	jwt := h.JWTHelper{UserRoleRepository: urr}
	ctx := helper.FiberContextHelper{}
	rv := validator.RegisterValidator{UserRepository: ur}

	c := controller.UserController{
		UserRepository:     ur,
		UserRoleRepository: urr,
		JWTHelper:          jwt,
		FiberHelper:        ctx,
		RegisterValidator:  rv,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Post("/", c.Store)
	router.Put("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
}

package route

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
	authrepository "github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/{{service_name}/controller"
)

func Setup{{model}}Route(router fiber.Router) {
	urr := authrepository.UserRoleRepository{}
	jwt := authhelper.JWTHelper{UserRoleRepository: urr}
	fh := sharedhelper.FiberContextHelper{}

	c := controller.{{model}Controller{
		JWTHelper:   jwt,
		FiberHelper: fh,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Put("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
	router.Post("/", middleware.Protected(), c.Store)
}

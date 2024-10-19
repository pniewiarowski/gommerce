package route

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	"github.com/pniewiarowski/gommerce/api/auth/middleware"
	authrepository "github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/shop/controller"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

func SetupCustomerRoute(router fiber.Router) {
	cr := repository.CustomerRepository{}
	urr := authrepository.UserRoleRepository{}
	jwt := authhelper.JWTHelper{UserRoleRepository: urr}
	fh := sharedhelper.FiberContextHelper{}

	c := controller.CustomerController{
		CustomerRepository: cr,
		JWTHelper:          jwt,
		FiberHelper:        fh,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Get("/user/:id", middleware.Protected(), c.User)
	router.Post("/", middleware.Protected(), c.Store)
}

package route

import (
	"github.com/gofiber/fiber/v2"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	authrepository "github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/shop/controller"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

func SetupCustomerRoute(router fiber.Router) {
	cr := repository.CustomerRepository{}
	urr := authrepository.UserRoleRepository{}
	jwt := authhelper.JWTHelper{UserRoleRepository: urr}

	c := controller.CustomerController{
		CustomerRepository: cr,
		JWTHelper:          jwt,
	}

	router.Get("/", c.Index)
}

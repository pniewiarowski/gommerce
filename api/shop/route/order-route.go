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

func SetupOrderRoute(router fiber.Router) {
	or := repository.OrderRepository{}
	urr := authrepository.UserRoleRepository{}
	cr := repository.CustomerRepository{}
	pr := repository.ProductRepository{}
	jwt := authhelper.JWTHelper{UserRoleRepository: urr}
	fh := sharedhelper.FiberContextHelper{}

	c := controller.OrderController{
		OrderRepository:    or,
		CustomerRepository: cr,
		ProductRepository:  pr,
		JWTHelper:          jwt,
		FiberHelper:        fh,
	}

	router.Get("/", middleware.Protected(), c.Index)
	router.Get("/:id", middleware.Protected(), c.Show)
	router.Put("/:id", middleware.Protected(), c.Update)
	router.Delete("/:id", middleware.Protected(), c.Destroy)
	router.Post("/", middleware.Protected(), c.Store)
}

package route

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhepler "github.com/pniewiarowski/gommerce/api/auth/helper"
	authmiddleware "github.com/pniewiarowski/gommerce/api/auth/middleware"
	authrepository "github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/shop/controller"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

func SetupProductRoute(router fiber.Router) {
	urr := authrepository.UserRoleRepository{}
	pr := repository.ProductRepository{}
	fb := sharedhelper.FiberContextHelper{}
	jwt := authhepler.JWTHelper{UserRoleRepository: urr}
	c := controller.ProductController{
		ProductRepository: pr,
		JWTHelper:         jwt,
		FiberHelper:       fb,
	}

	router.Get("/", c.Index)
	router.Get("/:id", c.Show)
	router.Post("/", authmiddleware.Protected(), c.Store)
	router.Put("/:id", authmiddleware.Protected(), c.Update)
	router.Delete("/:id", authmiddleware.Protected(), c.Destroy)
}

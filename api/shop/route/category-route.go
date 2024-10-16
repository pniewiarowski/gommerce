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

func SetupCategoryRoute(router fiber.Router) {
	urr := authrepository.UserRoleRepository{}
	cr := repository.CategoryRepository{}
	jwt := authhepler.JWTHelper{UserRoleRepository: urr}
	fb := sharedhelper.FiberContextHelper{}

	c := controller.CategoryController{
		CategoryRepository: cr,
		FiberHelper:        fb,
		JWTHelper:          jwt,
	}

	router.Get("/", c.Index)
	router.Get("/:id", c.Show)
	router.Post("/", authmiddleware.Protected(), c.Store)
	router.Put("/:id", authmiddleware.Protected(), c.Update)
	router.Delete("/:id", authmiddleware.Protected(), c.Destroy)
}

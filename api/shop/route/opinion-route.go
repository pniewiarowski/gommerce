package route

import (
	"github.com/gofiber/fiber/v2"
	sharedhelper "github.com/pniewiarowski/gommerce/api/_shared/helper"
	authhelper "github.com/pniewiarowski/gommerce/api/auth/helper"
	authrepository "github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/shop/controller"
	"github.com/pniewiarowski/gommerce/api/shop/repository"
)

func SetupOpinion(router fiber.Router) {
	or := repository.OpinionRepository{}
	urr := authrepository.UserRoleRepository{}
	jwt := authhelper.JWTHelper{UserRoleRepository: urr}
	fh := sharedhelper.FiberContextHelper{}

	c := controller.OpinionController{
		OpinionRepository: or,
		JWTHelper:         jwt,
		FiberHelper:       fh,
	}

	router.Get("/", c.Index)
	router.Get("/:id", c.Show)
}

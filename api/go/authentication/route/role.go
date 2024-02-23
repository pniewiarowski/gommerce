package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/controller"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/helper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/middleware"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
)

type Role struct{}

func (r *Role) Setup(roles fiber.Router) {
	c := controller.Role{
		RoleRepository: repository.Role{},
		RoleMapper:     mapper.Role{},
		ContextHelper:  helper.Context{},
		JWTHelper:      helper.JWT{},
	}

	roles.Get("/", middleware.Protected(), c.Get)
	roles.Get("/:id", middleware.Protected(), c.GetByID)
	roles.Post("/", middleware.Protected(), c.Post)
	roles.Put("/", middleware.Protected(), c.Put)
	roles.Delete("/:id", middleware.Protected(), c.Delete)
}

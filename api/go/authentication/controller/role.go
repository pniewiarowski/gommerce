package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/helper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
)

type Role struct {
	RoleRepository repository.Role
	RoleMapper     mapper.Role
	ContextHelper  helper.Context
	JWTHelper      helper.JWT
}

func (r Role) Get(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	roles, err := r.RoleRepository.GetAll()

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"roles": r.RoleMapper.FromArray(roles)})
}

func (r Role) GetByID(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	id, _ := r.ContextHelper.GetID(ctx)
	role, err := r.RoleRepository.GetByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"role": r.RoleMapper.From(role)})
}

func (r Role) Post(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	role := new(model.Role)

	if err := ctx.BodyParser(&role); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	createdRole, err := r.RoleRepository.Create(role)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"role": r.RoleMapper.From(createdRole)})
}

func (r Role) Put(ctx *fiber.Ctx) error {
	id, _ := r.ContextHelper.GetID(ctx)
	role := new(model.Role)
	role.EntityID = id
	_, _ = r.JWTHelper.ExtractClaimsFromContext(ctx)

	return r.GetByID(ctx)
}

func (r Role) Delete(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	id, _ := r.ContextHelper.GetID(ctx)
	_, err := r.RoleRepository.DeleteByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return r.Get(ctx)
}

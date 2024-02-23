package mapper

import (
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/dto"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
)

type Role struct{}

func (r *Role) From(item *model.Role) dto.Role {
	return dto.Role{
		EntityID: item.EntityID,
		Name:     item.Name,
	}
}

func (r *Role) FromArray(items []model.Role) []dto.Role {
	dtos := []dto.Role{}

	for _, item := range items {
		dtos = append(dtos, r.From(&item))
	}

	return dtos
}

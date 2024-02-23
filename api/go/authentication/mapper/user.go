package mapper

import (
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/dto"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
)

type User struct{}

func (u *User) From(item *model.User) dto.User {
	return dto.User{
		EntityID:  item.EntityID,
		FirstName: item.FirstName,
		LastName:  item.LastName,
		Email:     item.Email,
		RoleID:    item.RoleID,
	}
}

func (u *User) FromArray(items []model.User) []dto.User {
	dtos := []dto.User{}

	for _, item := range items {
		dtos = append(dtos, u.From(&item))
	}

	return dtos
}

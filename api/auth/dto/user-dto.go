package dto

import "github.com/pniewiarowski/gommerce/api/auth/model"

type UserDTO struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Email  string `gorm:"unique" json:"email"`
	Enable bool   `json:"enable"`
	RoleID uint   `json:"role_id"`
}

func UserFromCollection(collection []model.User) []UserDTO {
	var data []UserDTO

	for _, item := range collection {
		data = append(data, UserDTO{
			ID:     item.ID,
			Email:  item.Email,
			Enable: item.Enable,
			RoleID: item.RoleID,
		})
	}

	return data
}

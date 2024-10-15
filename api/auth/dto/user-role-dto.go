package dto

import "github.com/pniewiarowski/gommerce/api/auth/model"

type UserRoleDTO struct {
	ID   uint   `gorm:"primaryKey" json:"entity_id"`
	Code string `gorm:"unique" json:"code"`
}

func UserRoleFromCollection(collection []model.UserRole) []UserRoleDTO {
	var data []UserRoleDTO

	for _, item := range collection {
		data = append(data, UserRoleDTO{
			ID:   item.ID,
			Code: item.Code,
		})
	}

	return data
}

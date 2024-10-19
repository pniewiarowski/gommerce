package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type CustomerDTO struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	IsActive  bool   `json:"isActive"`
	UserID    uint   `json:"userID"`
}

func CustomerFromCollection(collection []model.Customer) []CustomerDTO {
	var data []CustomerDTO

	for _, item := range collection {
		data = append(data, CustomerDTO{
			ID:        item.ID,
			FirstName: item.FirstName,
			LastName:  item.LastName,
			IsActive:  item.IsActive,
			UserID:    item.UserID,
		})
	}

	return data
}

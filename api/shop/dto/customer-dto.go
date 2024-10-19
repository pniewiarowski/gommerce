package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type CustomerDTO struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	IsActive  bool   `json:"isActive"`
	UserID    uint   `json:"userID"`
}

func CustomerFromModel(customer model.Customer) CustomerDTO {
	return CustomerDTO{
		ID:        customer.ID,
		FirstName: customer.FirstName,
		LastName:  customer.LastName,
		IsActive:  customer.IsActive,
		UserID:    customer.UserID,
	}
}

func CustomerFromCollection(collection []model.Customer) []CustomerDTO {
	var data []CustomerDTO

	for _, item := range collection {
		data = append(data, CustomerFromModel(item))
	}

	return data
}

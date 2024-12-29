package dto

import (
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"time"
)

type AddressDTO struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	City            string    `json:"city"`
	Country         string    `json:"country"`
	Street          string    `json:"street"`
	StreetNumber    uint      `json:"streetNumber"`
	ApartmentNumber uint      `json:"apartmentNumber"`
	State           string    `json:"state"`
	CreatedAt       time.Time `json:"createdAt"`
	CustomerID      uint      `json:"customerID"`
}

func AddressFromModel(address model.Address) AddressDTO {
	return AddressDTO{
		ID:              address.ID,
		City:            address.City,
		Country:         address.Country,
		Street:          address.Street,
		StreetNumber:    address.StreetNumber,
		ApartmentNumber: address.ApartmentNumber,
		State:           address.State,
		CreatedAt:       address.CreatedAt,
		CustomerID:      address.CustomerID,
	}
}

func AddressFromCollection(collection []model.Address) []AddressDTO {
	var data []AddressDTO

	for _, item := range collection {
		data = append(data, AddressFromModel(item))
	}

	return data
}

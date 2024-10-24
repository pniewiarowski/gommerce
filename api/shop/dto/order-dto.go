package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type OrderDTO struct {
	ID         uint         `gorm:"primaryKey" json:"id"`
	CustomerID uint         `json:"customerID"`
	FullPrice  float32      `json:"fullPrice"`
	Products   []ProductDTO `json:"products"`
}

func OrderFromModel(order model.Order) OrderDTO {
	return OrderDTO{
		ID:         order.ID,
		CustomerID: order.CustomerID,
		FullPrice:  order.FullPrice,
		Products:   []ProductDTO{},
	}
}

func OrderFromCollection(collection []model.Order) []OrderDTO {
	var data []OrderDTO

	for _, item := range collection {
		data = append(data, OrderFromModel(item))
	}

	return data
}

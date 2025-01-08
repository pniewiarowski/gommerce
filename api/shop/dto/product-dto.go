package dto

import (
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"time"
)

type ProductDTO struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float32   `json:"price"`
	Enabled     bool      `json:"enabled"`
	Qty         uint      `json:"qty"`
	SortOrder   uint      `json:"sortOrder"`
	ImageURL    string    `json:"imageURL"`
	CreatedAt   time.Time `json:"createdAt"`
	CategoryID  uint      `json:"categoryID"`
}

func ProductFromModel(product model.Product) ProductDTO {
	return ProductDTO{
		ID:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Enabled:     *product.Enabled,
		Qty:         product.Qty,
		SortOrder:   product.SortOrder,
		ImageURL:    product.ImageURL,
		CreatedAt:   product.CreatedAt,
		CategoryID:  product.CategoryID,
	}
}

func ProductFromCollection(collection []model.Product) []ProductDTO {
	var data []ProductDTO

	for _, item := range collection {
		data = append(data, ProductFromModel(item))
	}

	return data
}

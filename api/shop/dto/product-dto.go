package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type ProductDTO struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     string `json:"enabled"`
	SortOrder   uint   `json:"sortOrder"`
	ImageURL    string `json:"imageURL"`
	CategoryID  uint   `json:"categoryID"`
}

func ProductFromCollection(collection []model.Product) []ProductDTO {
	var data []ProductDTO

	for _, item := range collection {
		data = append(data, ProductDTO{
			ID:          item.ID,
			Name:        item.Name,
			Description: item.Description,
			Enabled:     item.Enabled,
			SortOrder:   item.SortOrder,
			ImageURL:    item.ImageURL,
			CategoryID:  item.CategoryID,
		})
	}

	return data
}

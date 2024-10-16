package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type CategoryDTO struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     bool   `json:"enabled"`
	SortOrder   uint   `json:"sortOrder"`
}

func CategoryFromCollection(collection []model.Category) []CategoryDTO {
	var data []CategoryDTO

	for _, item := range collection {
		data = append(data, CategoryDTO{
			ID:          item.ID,
			Name:        item.Name,
			Description: item.Description,
			Enabled:     item.Enabled,
			SortOrder:   item.SortOrder,
		})
	}

	return data
}

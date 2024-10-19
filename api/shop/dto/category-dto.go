package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type CategoryDTO struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     bool   `json:"enabled"`
	SortOrder   uint   `json:"sortOrder"`
}

func CategoryFromModel(category model.Category) CategoryDTO {
	return CategoryDTO{
		ID:          category.ID,
		Name:        category.Name,
		Description: category.Description,
		Enabled:     category.Enabled,
		SortOrder:   category.SortOrder,
	}
}

func CategoryFromCollection(collection []model.Category) []CategoryDTO {
	var data []CategoryDTO

	for _, item := range collection {
		data = append(data, CategoryFromModel(item))
	}

	return data
}

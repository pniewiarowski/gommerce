package model

type {{model}}DTO struct {
	ID uint `gorm:"primaryKey" json:"id"`
}

func {{model}}FromModel(item model.{{model}}) {{model}}DTO {
    return {{model}}DTO{
        ID: item.ID,
    }
}

func {{model}}FromCollection(collection []model.{{model}}) []{{model}}DTO {
	var data []{{model}}DTO

	for _, item := range collection {
		data = append(data, {{model}}FromModel(item))
	}

	return data
}

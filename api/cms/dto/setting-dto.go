package dto

import "github.com/pniewiarowski/gommerce/api/cms/model"

type SettingDTO struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Value       string `json:"value"`
	Type        string `json:"type"`
	Description string `json:"description"`
}

func SettingFromModel(setting model.Setting) SettingDTO {
	return SettingDTO{
		ID:          setting.ID,
		Value:       setting.Value,
		Type:        setting.Type,
		Description: setting.Description,
	}
}

func SettingFromCollection(collection []model.Setting) []SettingDTO {
	var data []SettingDTO

	for _, item := range collection {
		data = append(data, SettingFromModel(item))
	}

	return data
}

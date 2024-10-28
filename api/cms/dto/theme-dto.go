package dto

import "github.com/pniewiarowski/gommerce/api/cms/model"

type ThemeDTO struct {
	ID                   uint   `gorm:"primaryKey" json:"id"`
	Title                string `json:"title"`
	Mode                 string `json:"mode"`
	ApplicationTitle     string `json:"applicationTitle"`
	PrimaryAccentColor   string `json:"primaryAccentColor"`
	SecondaryAccentColor string `json:"secondaryAccentColor"`
}

func ThemeFromModel(theme model.Theme) ThemeDTO {
	return ThemeDTO{
		ID:                   theme.ID,
		Title:                theme.Title,
		Mode:                 theme.Mode,
		ApplicationTitle:     theme.ApplicationTitle,
		PrimaryAccentColor:   theme.PrimaryAccentColor,
		SecondaryAccentColor: theme.SecondaryAccentColor,
	}
}

func ThemeFromCollection(collection []model.Theme) []ThemeDTO {
	var data []ThemeDTO

	for _, item := range collection {
		data = append(data, ThemeFromModel(item))
	}

	return data
}

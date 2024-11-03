package dto

import "github.com/pniewiarowski/gommerce/api/cms/model"

type ThemeDTO struct {
	ID               uint   `gorm:"primaryKey" json:"id"`
	Title            string `json:"title"`
	Mode             string `json:"mode"`
	ApplicationTitle string `json:"applicationTitle"`
	PrimaryColor     string `json:"primaryColor"`
	SecondaryColor   string `json:"secondaryColor"`
	ErrorColor       string `json:"errorColor"`
	SuccessColor     string `json:"successColor"`
	WarningColor     string `json:"warningColor"`
}

func ThemeFromModel(theme model.Theme) ThemeDTO {
	return ThemeDTO{
		ID:               theme.ID,
		Title:            theme.Title,
		Mode:             theme.Mode,
		ApplicationTitle: theme.ApplicationTitle,
		PrimaryColor:     theme.PrimaryColor,
		SecondaryColor:   theme.SecondaryColor,
		ErrorColor:       theme.ErrorColor,
		SuccessColor:     theme.SuccessColor,
		WarningColor:     theme.WarningColor,
	}
}

func ThemeFromCollection(collection []model.Theme) []ThemeDTO {
	var data []ThemeDTO

	for _, item := range collection {
		data = append(data, ThemeFromModel(item))
	}

	return data
}

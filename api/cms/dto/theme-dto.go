package dto

import "github.com/pniewiarowski/gommerce/api/cms/model"

type ThemeDTO struct {
	ID                     uint    `gorm:"primaryKey" json:"id"`
	Title                  string  `json:"title"`
	Mode                   string  `json:"mode"`
	UserSpaceWidth         float32 `json:"userSpaceWidth"`
	ApplicationTitle       string  `json:"applicationTitle"`
	PrimaryColor           string  `json:"primaryColor"`
	SecondaryColor         string  `json:"secondaryColor"`
	ErrorColor             string  `json:"errorColor"`
	SuccessColor           string  `json:"successColor"`
	WarningColor           string  `json:"warningColor"`
	InterfaceUIVariant     string  `json:"interfaceUIVariant"`
	InterfaceButtonVariant string  `json:"interfaceButtonVariant"`
	InterfaceInputVariant  string  `json:"interfaceInputVariant"`
}

func ThemeFromModel(theme model.Theme) ThemeDTO {
	return ThemeDTO{
		ID:                     theme.ID,
		Title:                  theme.Title,
		Mode:                   theme.Mode,
		UserSpaceWidth:         theme.UserSpaceWidth,
		ApplicationTitle:       theme.ApplicationTitle,
		PrimaryColor:           theme.PrimaryColor,
		SecondaryColor:         theme.SecondaryColor,
		ErrorColor:             theme.ErrorColor,
		SuccessColor:           theme.SuccessColor,
		WarningColor:           theme.WarningColor,
		InterfaceUIVariant:     theme.InterfaceUIVariant,
		InterfaceButtonVariant: theme.InterfaceButtonVariant,
		InterfaceInputVariant:  theme.InterfaceInputVariant,
	}
}

func ThemeFromCollection(collection []model.Theme) []ThemeDTO {
	var data []ThemeDTO

	for _, item := range collection {
		data = append(data, ThemeFromModel(item))
	}

	return data
}

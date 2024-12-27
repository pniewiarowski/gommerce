package model

type Theme struct {
	ID                     uint   `gorm:"primaryKey" json:"id"`
	Title                  string `json:"title"`
	ApplicationTitle       string `json:"applicationTitle"`
	Mode                   string `json:"mode"`
	PrimaryColor           string `json:"primaryColor"`
	SecondaryColor         string `json:"secondaryColor"`
	ErrorColor             string `json:"errorColor"`
	SuccessColor           string `json:"successColor"`
	WarningColor           string `json:"warningColor"`
	InterfaceButtonVariant string `json:"buttonVariant"`
	InterfaceInputVariant  string `json:"interfaceInputVariant"`
}

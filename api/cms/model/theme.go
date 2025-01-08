package model

type Theme struct {
	ID                     uint    `gorm:"primaryKey" json:"id"`
	Title                  string  `json:"title"`
	ApplicationTitle       string  `json:"applicationTitle"`
	Mode                   string  `json:"mode"`
	UserSpaceWidth         float32 `json:"userSpaceWidth"`
	PrimaryColor           string  `json:"primaryColor"`
	SecondaryColor         string  `json:"secondaryColor"`
	ErrorColor             string  `json:"errorColor"`
	SuccessColor           string  `json:"successColor"`
	WarningColor           string  `json:"warningColor"`
	InterfaceUIVariant     string  `json:"interfaceUIVariant"`
	InterfaceButtonVariant string  `json:"interfaceButtonVariant"`
	InterfaceInputVariant  string  `json:"interfaceInputVariant"`
}

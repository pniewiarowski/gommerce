package model

type Theme struct {
	ID                   uint   `gorm:"primaryKey" json:"id"`
	Title                string `json:"title"`
	ApplicationTitle     string `json:"applicationTitle"`
	Mode                 string `json:"mode"`
	PrimaryAccentColor   string `json:"primaryAccentColor"`
	SecondaryAccentColor string `json:"secondaryAccentColor"`
}

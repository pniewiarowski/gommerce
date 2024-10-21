package model

type Setting struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Value       string `json:"value"`
	Type        string `json:"type"`
	Description string `json:"description"`
}

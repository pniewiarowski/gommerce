package model

type Setting struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Value       string `json:"value"`
	Type        string `json:"type"`
	Scope       string `json:"scope"`
	Description string `json:"description"`
}

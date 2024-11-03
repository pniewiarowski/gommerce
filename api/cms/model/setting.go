package model

type Setting struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Value       string `json:"value"`
	Key         string `json:"key"`
	Type        string `json:"type"`
	Scope       string `json:"scope"`
	Description string `json:"description"`
}

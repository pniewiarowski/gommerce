package model

type Category struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     string `json:"enabled"`
	SortOrder   uint   `json:"sortOrder"`
}

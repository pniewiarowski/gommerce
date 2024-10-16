package model

type Product struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     string `json:"enabled"`
	SortOrder   uint   `json:"sortOrder"`
	ImageURL    string `json:"imageURL"`
	CategoryID  uint   `json:"categoryID"`
}

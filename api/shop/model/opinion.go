package model

type Opinion struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	Score      uint   `json:"score"`
	Comment    string `json:"comment"`
	CustomerID uint   `json:"customerID"`
}

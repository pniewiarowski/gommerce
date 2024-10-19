package relation

type OrderProductRelation struct {
	ID        uint `gorm:"primaryKey" json:"id"`
	OrderID   uint `json:"orderID"`
	ProductID uint `json:"productID"`
}

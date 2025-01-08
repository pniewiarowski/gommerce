package relation

type CustomerFollowingProductRelation struct {
	ID         uint `gorm:"primaryKey" json:"id"`
	CustomerID uint `json:"customerID"`
	ProductID  uint `json:"productID"`
}

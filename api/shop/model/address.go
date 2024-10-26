package model

type Address struct {
	ID              uint   `gorm:"primaryKey" json:"id"`
	City            string `json:"city"`
	Country         string `json:"country"`
	Street          string `json:"street"`
	StreetNumber    uint   `json:"streetNumber"`
	ApartmentNumber uint   `json:"apartmentNumber"`
	State           string `json:"state"`
	CustomerID      uint   `json:"customerID"`
}

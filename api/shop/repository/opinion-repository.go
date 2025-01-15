package repository

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type OpinionRepository struct{}

func (_ *OpinionRepository) Read() ([]model.Opinion, error) {
	var opinions []model.Opinion

	err := database.DataBase.Find(&opinions).Error

	return opinions, err
}

func (_ *OpinionRepository) ReadByID(entityID uint) (*model.Opinion, error) {
	var opinion model.Opinion

	err := database.DataBase.First(&opinion, "id = ?", entityID).Error

	return &opinion, err
}

func (_ *OpinionRepository) ReadByProductID(productID uint) ([]model.Opinion, error) {
	var opinions []model.Opinion

	err := database.DataBase.Where("product_id = ?", productID).Find(&opinions).Error

	return opinions, err
}

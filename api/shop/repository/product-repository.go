package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type ProductRepository struct{}

func (_ *ProductRepository) Create(product *model.Product) (*model.Product, error) {
	err := database.DataBase.Create(product).Error

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (_ *ProductRepository) Read() ([]model.Product, error) {
	var products []model.Product

	err := database.DataBase.Find(&products).Error

	return products, err
}

func (_ *ProductRepository) ReadByID(entityID uint) (*model.Product, error) {
	var product model.Product

	err := database.DataBase.First(&product, "id = ?", entityID).Error

	return &product, err
}

func (pr *ProductRepository) Update(product, updatedProduct *model.Product) (*model.Product, error) {
	if product.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(product).Updates(&updatedProduct)

	if db.RowsAffected == 0 {
		return nil, errors.New("product not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return pr.ReadByID(product.ID)
}

func (pr *ProductRepository) Delete(product *model.Product) ([]model.Product, error) {
	return pr.DeleteByID(product.ID)
}

func (pr *ProductRepository) DeleteByID(entityID uint) ([]model.Product, error) {
	var product model.Product

	db := database.DataBase.Delete(&product, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("product not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return pr.Read()
}

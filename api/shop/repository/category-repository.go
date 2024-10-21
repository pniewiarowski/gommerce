package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type CategoryRepository struct{}

func (_ *CategoryRepository) Create(category *model.Category) (*model.Category, error) {
	err := database.DataBase.Create(category).Error

	if err != nil {
		return nil, err
	}

	return category, nil
}

func (_ *CategoryRepository) Read() ([]model.Category, error) {
	var categories []model.Category

	err := database.DataBase.Order("sort_order").Find(&categories).Error

	return categories, err
}

func (_ *CategoryRepository) ReadByID(entityID uint) (*model.Category, error) {
	var category model.Category

	err := database.DataBase.First(&category, "id = ?", entityID).Error

	return &category, err
}

func (cr *CategoryRepository) Update(category, updatedCategory *model.Category) (*model.Category, error) {
	if category.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(category).Updates(updatedCategory)

	if db.RowsAffected == 0 {
		return nil, errors.New("category not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return cr.ReadByID(category.ID)
}

func (cr *CategoryRepository) Delete(category *model.Category) ([]model.Category, error) {
	return cr.DeleteByID(category.ID)
}

func (cr *CategoryRepository) DeleteByID(entityID uint) ([]model.Category, error) {
	var category model.Category

	db := database.DataBase.Delete(&category, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("category not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return cr.Read()
}

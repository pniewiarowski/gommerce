package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type OrderRepository struct{}

func (_ *OrderRepository) Create(order *model.Order) (*model.Order, error) {
	err := database.DataBase.Create(order).Error

	if err != nil {
		return nil, err
	}

	return order, nil
}

func (_ *OrderRepository) Read() ([]model.Order, error) {
	var orders []model.Order

	err := database.DataBase.Find(&orders).Error

	return orders, err
}

func (_ *OrderRepository) ReadByID(entityID uint) (*model.Order, error) {
	var order model.Order

	err := database.DataBase.First(&order, "id = ?", entityID).Error

	return &order, err
}

func (or *OrderRepository) Update(order, updatedOrder *model.Order) (*model.Order, error) {
	if order.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(order).Updates(&updatedOrder)

	if db.RowsAffected == 0 {
		return nil, errors.New("order not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return or.ReadByID(order.ID)
}

func (or *OrderRepository) Delete(order *model.Order) ([]model.Order, error) {
	return or.DeleteByID(order.ID)
}

func (or *OrderRepository) DeleteByID(entityID uint) ([]model.Order, error) {
	var order model.Order

	db := database.DataBase.Delete(&order, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("order not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return or.Read()
}

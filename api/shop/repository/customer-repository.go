package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type CustomerRepository struct{}

func (_ *CustomerRepository) Create(customer *model.Customer) (*model.Customer, error) {
	err := database.DataBase.Create(customer).Error

	if err != nil {
		return nil, err
	}

	return customer, nil
}

func (_ *CustomerRepository) Read() ([]model.Customer, error) {
	var customers []model.Customer

	err := database.DataBase.Find(&customers).Error

	return customers, err
}

func (_ *CustomerRepository) ReadByID(entityID uint) (*model.Customer, error) {
	var customer model.Customer

	err := database.DataBase.Where("id = ?", entityID).Error

	return &customer, err
}

func (cr *CustomerRepository) Update(customer, updatedCustomer *model.Customer) (*model.Customer, error) {
	if customer.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(customer).Updates(&updatedCustomer)

	if db.RowsAffected == 0 {
		return nil, errors.New("customer not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return cr.ReadByID(customer.ID)
}

func (cr *CustomerRepository) Delete(customer *model.Customer) ([]model.Customer, error) {
	return cr.DeleteByID(customer.ID)
}

func (cr *CustomerRepository) DeleteByID(entityID uint) ([]model.Customer, error) {
	var customer model.Customer

	db := database.DataBase.Delete(&customer, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("customer not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return cr.Read()
}

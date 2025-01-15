package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/shop/model"
)

type AddressRepository struct{}

func (_ *AddressRepository) Create(address *model.Address) (*model.Address, error) {
	err := database.DataBase.Create(address).Error

	if err != nil {
		return nil, err
	}

	return address, nil
}

func (_ *AddressRepository) Read() ([]model.Address, error) {
	var addresses []model.Address

	err := database.DataBase.Find(&addresses).Error

	return addresses, err
}

func (_ *AddressRepository) ReadByID(entityID uint) (*model.Address, error) {
	var address model.Address

	err := database.DataBase.First(&address, "id = ?", entityID).Error

	return &address, err
}

func (_ *AddressRepository) ReadByCustomerID(id uint) (*model.Address, error) {
	var address model.Address

	err := database.DataBase.First(&address, "customer_id = ?", id).Error

	return &address, err
}

func (ar *AddressRepository) Update(address, updatedAddress *model.Address) (*model.Address, error) {
	if address.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(address).Updates(updatedAddress)

	if db.RowsAffected == 0 {
		return nil, errors.New("address not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return ar.ReadByID(address.ID)
}

func (ar *AddressRepository) Delete(address *model.Address) ([]model.Address, error) {
	return ar.DeleteByID(address.ID)
}

func (ar *AddressRepository) DeleteByID(entityID uint) ([]model.Address, error) {
	var address model.Address

	db := database.DataBase.Delete(&address, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("address not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return ar.Read()
}

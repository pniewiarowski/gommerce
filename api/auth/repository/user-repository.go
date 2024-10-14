package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/auth/model"
)

type UserRepository struct{}

func (_ *UserRepository) Create(user *model.User) (*model.User, error) {
	err := database.DataBase.Create(user).Error

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (_ *UserRepository) Read() ([]model.User, error) {
	var users []model.User

	err := database.DataBase.Find(&users).Error

	return users, err
}

func (_ *UserRepository) ReadByID(entityID uint) (*model.User, error) {
	var user model.User

	err := database.DataBase.First(&user, "id = ?", entityID).Error

	return &user, err
}

func (ur *UserRepository) Update(user, updatedUser *model.User) (*model.User, error) {
	if user.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(user).Updates(&updatedUser)

	if db.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return ur.ReadByID(user.ID)
}

func (ur *UserRepository) Delete(user *model.User) ([]model.User, error) {
	return ur.DeleteByID(user.ID)
}

func (ur *UserRepository) DeleteByID(entityID uint) ([]model.User, error) {
	var user model.User

	db := database.DataBase.Delete(&user, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return ur.Read()
}

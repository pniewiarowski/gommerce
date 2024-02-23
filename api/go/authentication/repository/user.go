package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/lib/go/database"
)

type User struct{}

func (_ *User) Create(user *model.User) (*model.User, error) {
	err := database.DataBase.Create(user).Error

	if err != nil {
		return nil, err
	}

	err = database.DataBase.First(&user).Error

	return user, err
}

func (_ *User) GetAll() ([]model.User, error) {
	var users []model.User

	err := database.DataBase.Find(&users).Error

	return users, err
}

func (_ *User) GetByID(entityID uint) (*model.User, error) {
	var user model.User

	err := database.DataBase.First(&user, "entity_id = ?", entityID).Error

	return &user, err
}

func (_ *User) GetByEmail(email string) (*model.User, error) {
	var user model.User

	err := database.DataBase.First(&user, "email = ?", email).Error

	return &user, err
}

func (u *User) Update(user, updatedUser *model.User) (*model.User, error) {
	if user.EntityID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(user).Updates(&updatedUser)

	if db.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return u.GetByID(user.EntityID)
}

func (u *User) Delete(user *model.User) ([]model.User, error) {
	return u.DeleteByID(user.EntityID)
}

func (u *User) DeleteByID(entityID uint) ([]model.User, error) {
	var user model.User

	db := database.DataBase.Delete(&user, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return u.GetAll()
}

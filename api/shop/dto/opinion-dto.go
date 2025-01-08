package dto

import "github.com/pniewiarowski/gommerce/api/shop/model"

type OpinionDTO struct {
	ID         uint   `json:"id"`
	Score      uint   `json:"score"`
	Comment    string `json:"comment"`
	CustomerID uint   `json:"customerID"`
}

func OpinionFromModel(opinion model.Opinion) OpinionDTO {
	return OpinionDTO{
		ID:         opinion.ID,
		Score:      opinion.Score,
		Comment:    opinion.Comment,
		CustomerID: opinion.CustomerID,
	}
}

func OpinionFromCollection(collection []model.Opinion) []OpinionDTO {
	var data []OpinionDTO

	for _, item := range collection {
		data = append(data, OpinionFromModel(item))
	}

	return data
}

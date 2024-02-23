package dto

type Token struct {
	User User   `json:"user"`
	JWT  string `json:"jwt"`
}

package main

import (
	"gommerce/api/env"
)

func main() {
	env.Load(".env")
}

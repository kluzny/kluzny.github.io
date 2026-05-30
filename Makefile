.PHONY: all help lint format

all: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  help     Show this help message"
	@echo "  lint     Run ESLint"
	@echo "  format   Run ESLint with --fix"

lint:
	npm run lint

format:
	npm run format

.PHONY: all help lint lint-eslint lint-prettier format format-prettier format-eslint

all: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  help              Show this help message"
	@echo ""
	@echo "  lint              Run Prettier check + ESLint"
	@echo "  lint-prettier     Run Prettier check only"
	@echo "  lint-eslint       Run ESLint only"
	@echo ""
	@echo "  format            Auto-fix Prettier + ESLint"
	@echo "  format-prettier   Auto-fix Prettier only"
	@echo "  format-eslint     Auto-fix ESLint only"

lint:
	npm run lint

lint-prettier:
	npm run lint:prettier

lint-eslint:
	npm run lint:eslint

format:
	npm run format

format-prettier:
	npm run format:prettier

format-eslint:
	npm run format:eslint

### Utilities
.PHONY: all help clean

all: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Utilities:"
	@echo "  help              Show this help message"
	@echo "  clean             Cleanup nuxt caches"
	@echo ""
	@echo "Quality:"
	@echo "  lint              Run Prettier check + ESLint"
	@echo "  lint-prettier     Run Prettier check only"
	@echo "  lint-eslint       Run ESLint only"
	@echo ""
	@echo "  format            Auto-fix Prettier + ESLint"
	@echo "  format-prettier   Auto-fix Prettier only"
	@echo "  format-eslint     Auto-fix ESLint only"

clean:
	npx nuxi cleanup

### Quality
.PHONY: lint lint-eslint lint-prettier format format-prettier format-eslint

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

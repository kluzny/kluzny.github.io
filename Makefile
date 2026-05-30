### Utilities
.PHONY: all help clean ready

all: help

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Utilities:"
	@echo "  help              Show this help message"
	@echo "  clean             Cleanup nuxt caches"
	@echo "  ready             Deployment pre-checks"
	@echo ""
	@echo "Quality:"
	@echo "  lint              Run Prettier check + ESLint"
	@echo "  lint-prettier     Run Prettier check only"
	@echo "  lint-eslint       Run ESLint only"
	@echo ""
	@echo "  format            Auto-fix Prettier + ESLint"
	@echo "  format-prettier   Auto-fix Prettier only"
	@echo "  format-eslint     Auto-fix ESLint only"
	@echo ""
	@echo "Testing:"
	@echo "  test              Run all tests (unit + E2E)"
	@echo "  test-unit         Run unit and component tests (Vitest)"
	@echo "  test-e2e          Run system tests (Playwright)"

clean:
	npx nuxi cleanup

ready: format lint test
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Error: working tree is dirty"; \
		git status --short; \
		exit 1; \
	fi

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

### Testing
.PHONY: test test-unit test-e2e

test:
	npm run test

test-unit:
	npm run test:unit

test-e2e:
	npm run test:e2e

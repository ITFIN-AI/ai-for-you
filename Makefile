.PHONY: dev prod build-dev build-prod logs logs-prod clean help

# Default target
help:
	@echo "Available commands:"
	@echo "  make dev         - Start development environment"
	@echo "  make prod        - Start production environment"
	@echo "  make build-dev   - Build development Docker image"
	@echo "  make build-prod  - Build production Docker image"
	@echo "  make logs        - View development logs"
	@echo "  make logs-prod   - View production logs"
	@echo "  make clean       - Remove Docker containers and volumes"
	@echo "  make help        - Show this help message"

# Development environment
dev: build-dev
	docker-compose up app-dev

# Production environment
prod: build-prod
	docker-compose up -d app-prod

# Build development image
build-dev:
	docker-compose build app-dev

# Build production image
build-prod:
	docker-compose build app-prod

# View development logs
logs:
	docker-compose logs -f app-dev

# View production logs
logs-prod:
	docker-compose logs -f app-prod

# Clean up Docker resources
clean:
	docker-compose down -v
	docker system prune -f

# Create .env.local if it doesn't exist
.env.local:
	@if [ ! -f .env.local ]; then \
		echo "Creating .env.local file..."; \
		cp .env.local.example .env.local; \
		echo "Please update .env.local with your SMTP settings"; \
	fi 
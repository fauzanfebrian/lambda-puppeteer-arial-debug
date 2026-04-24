IMAGE ?= puppeteer-arial:local
PWD_DIR := $(shell pwd)

# Mount the project dir so `out.pdf` lands on the host. node_modules is a
# named volume so the host (macOS/ARM) never sees the Linux/x64 install.
RUN_FLAGS := --rm \
	--platform linux/amd64 \
	-v $(PWD_DIR):/var/task \
	-v puppeteer-arial-node-modules:/var/task/node_modules \
	-w /var/task \
	--entrypoint "" \
	$(IMAGE)

.PHONY: build test shell install clean open

build: ## Build the Lambda-parity image
	docker build --platform linux/amd64 -t $(IMAGE) .

install: build ## Install node_modules inside the container volume
	docker run $(RUN_FLAGS) sh -c "npm install -g yarn && yarn install"

test: build ## Run local-test.js and write out.pdf to project root
	docker run $(RUN_FLAGS) node local-test.js

shell: build ## Drop into a shell inside the Lambda-parity container
	docker run -it $(RUN_FLAGS) bash

open: ## Open the generated PDF (macOS)
	open out.pdf

clean: ## Remove generated PDF and the node_modules volume
	rm -f out.pdf
	docker volume rm puppeteer-arial-node-modules 2>/dev/null || true

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-10s %s\n", $$1, $$2}'

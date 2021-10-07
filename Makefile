.DELETE_ON_ERROR:
.SILENT:

TARGET = licenses.tsv
SOURCE = licenses.json

.PHONY: all clean

all: $(TARGET) ## Scan npm packages licenses and create files `licenses.json` and `licenses.tsv`

$(TARGET): $(SOURCE)
	node src/index.js $(SOURCE)

$(SOURCE):
	npx --yes yarn licenses list --json --no-progress !> $(SOURCE)

clean: ## Remove the output files
	rm -f $(TARGET) $(SOURCE)
	
.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'	

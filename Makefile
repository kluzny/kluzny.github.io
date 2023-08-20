DIST_DIR = /docs # still feels dirty to use docs

clean:
	npx nuxi cleanup
	rm -rf $(DIST_DIR)

build: clean
	npx nuxi generate

favicon:
	convert public/favicon.png -define icon:auto-resize=256,128,48,32,16 public/favicon.ico

diff:
	git diff HEAD -- . ':!docs'
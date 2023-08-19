build:
	npx nuxi generate

favicon:
	convert public/favicon.png -define icon:auto-resize=256,128,48,32,16 public/favicon.ico
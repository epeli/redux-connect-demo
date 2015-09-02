export PATH := node_modules/.bin:$(PATH)

server:
	webpack-dev-server

export PATH := node_modules/.bin:$(PATH)

npm:
	npm install

server:
	webpack-dev-server

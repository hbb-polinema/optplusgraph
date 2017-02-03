all:
	jshint server.js && node server.js

# start both http and https servers
prod:
	jshint server.js && forever -l server.log start server.js &
	jshint server.js && forever -l server-https.log start server.js https &

deps:
	npm install express
	#npm install express jshint serve-static sqlite3

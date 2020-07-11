all: correct incorrect

correct:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump"}' http://localhost:4000/html/

count:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump", "scrollCount": 1}' http://localhost:4000/html/

delay:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump", "scrollDelay": 500}' http://localhost:4000/html/

incorrect:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"not_url":"https://example.com/"}' http://localhost:4000/html/


all: correct incorrect

load:
	cat vegeta/targets.txt | \
		vegeta attack -rate 1 -duration 4s -format http -output=vegeta/out.bin

plot:
	vegeta plot -output vegeta/plot.html < vegeta/out.bin

report:
	vegeta report < vegeta/out.bin


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


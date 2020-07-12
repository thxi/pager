all: correct incorrect

load:
	cat vegeta/targets.txt | \
		vegeta attack -rate 100 -duration 20s -format http -output=vegeta/out.bin

plot:
	vegeta plot -output vegeta/plot.html < vegeta/out.bin

report:
	vegeta report < vegeta/out.bin

docker:
	docker run -p4000:4000 --network="host" pager 

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


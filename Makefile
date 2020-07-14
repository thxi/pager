all: correct incorrect

docker:
	docker run -p4000:4000 --network="host" pager 

docker-build:
	docker build -t pager .

correct:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump"}' http://localhost:4000/html/

scroll:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump", "scrollCount": 1}' http://localhost:4000/html/

delay:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"url":"https://twitter.com/realdonaldtrump", "scrollDelay": 500}' http://localhost:4000/html/

incorrect:
	curl -vvv -X POST -H 'Content-Type: application/json' \
	-d'{"not_url":"https://example.com/"}' http://localhost:4000/html/

load:
	cat vegeta/targets.txt | \
		vegeta attack -rate 90 -duration 1m -format http -output=vegeta/out.bin

plot:
	vegeta plot -output vegeta/plot.html < vegeta/out.bin

report:
	vegeta report < vegeta/out.bin

run-prometheus:
	docker run \
		-p 9090:9090 \
		-v `pwd`/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
		--network="host" \
		-d \
		prom/prometheus

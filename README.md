# pager

Simple nodejs app to get a webpage's HTML.
Supports **SPA**s and pages with dynamic content

# Run

## Locally:

```bash
npm install
npm start
```

## Docker

```bash
make docker-build
make docker-run
```

Note that this runs container on the host network so that the API is exposed to the host system.

## Example usage

```bash
curl -vvv -X POST -H 'Content-Type: application/json' \
  -d'{"url":"https://twitter.com/realdonaldtrump", "scrollCount": 1}' \
  http://localhost:4000/html/
```

See [Makefile](https://github.com/thxi/pager/blob/master/Makefile) for more examples.

To get a page's html, you need to send a POST request to the `/html/` endpoint. The body should be in the form:

```json
{ "url": "the url you want to crawl" }
```

The server responds with a json object:

```json
{ "url": "the url you provided", "html": "<html>...</html>" }
```

You can specify additional parameters for the request:

- **scrollCount**: the number of times the browser should scroll the page, 2 is the default value
- **scrollDelay**: the delay in ms between each scroll

Example:

```json
{
  "url": "the url you want to crawl",
  "scrollCount": 1,
  "scrollDelay": 1
}
```

# Configuration

To configure the app, pass flags to the program:

```
Options:
  -p, --pages <number>     maximum number of open pages (default: "100")
  -l, --log-level <level>  log level;
                           Available values are:
                           ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF  (default: "ALL")
  -h, --help               display help for command
```

For example,

```bash
npm start -- -p 228 --log-level ALL
```

or with docker:

```bash
# do not forget the seccomp profile
docker run -p4000:4000 \
  --security-opt seccomp=`pwd`/chrome.json \
  pager -- -p 228 --log-level ALL
```

# Potential problems

## Memory leak

Memory leaks might be caused by chromium.
See [this issue](https://github.com/puppeteer/puppeteer/issues/5893) for more information

## Security

For now I'm using a custom [seccomp profile](https://github.com/Zenika/alpine-chrome#-the-best-with-seccomp).
See [this SO answer](https://security.stackexchange.com/a/227147).

# TODO

- [ ] expose interface as a library
- [ ] add web API documentation
- [ ] better logging
- [ ] better error handling with browser restarts
- [ ] set up github ci (see gitlab-ci)

# Testing

For now i just use curl to test the functionality.
Comprehensive unit tests will be added later

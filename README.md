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

# TODO

- [ ] steal ideas from [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)
- [x] do a proper setup of the docker container (dumb-init, user permissions, node ver, envs (NODE_ENV))
- [ ] better logging
- [ ] better error handling with browser restarts
- [ ] use something like [snyk.io](https://snyk.io/)
- [ ] profile application, check for memory leaks in chrome
- [ ] expose interface as a library
- [ ] set up github ci (see gitlab-ci)
- [ ] clean code

# Test

For now i just use curl to test the functionality.
Comprehensive unit tests will be added later

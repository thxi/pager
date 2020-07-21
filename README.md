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

# Potential problems

## Memory leak

Memory leaks might be caused by chromium.
See [this issue](https://github.com/puppeteer/puppeteer/issues/5893) for more information

## Security

For now I'm using a custom [seccomp profile](https://github.com/Zenika/alpine-chrome#-the-best-with-seccomp).
See [this SO answer](https://security.stackexchange.com/a/227147).

# TODO

- [ ] steal ideas from [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)
- [x] do a proper setup of the docker container (dumb-init, user permissions, node ver, envs (NODE_ENV))
- [ ] expose interface as a library
- [x] incognito
- [ ] better logging
- [ ] better error handling with browser restarts
- [x] profile application, check for memory leaks in chrome
- [ ] set up github ci (see gitlab-ci)

# Testing

For now i just use curl to test the functionality.
Comprehensive unit tests will be added later

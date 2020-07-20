# pager

Simple nodejs app to get a webpage's HTML.
Supports **SPA**s and pages with dynamic content

# Run

```bash
npm install
npm start
```

# TODO

- [x] do a proper setup of the docker container (dumb-init, user permissions, node ver, envs (NODE_ENV))
- [ ] better logging
- [ ] use something like [snyk.io](https://snyk.io/)
- [ ] profile application, check for memory leaks in chrome
- [ ] steal ideas from [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)
- [ ] expose interface as a library
- [ ] set up github ci (see gitlab-ci)
- [ ] clean code

# Test

For now i just use curl to test the functionality.
Comprehensive unit tests will be added later

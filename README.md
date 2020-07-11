# pager

Simple nodejs app to get a webpage's HTML.
Supports **SPA**s and pages with dynamic content

# Run

```bash
npm install
npm start
```

# TODO

- [ ] set up github ci (see gitlab-ci)
- [ ] do a proper setup of the docker container (dumb-init, user permissions, alpine, envs (NODE_ENV))
- [ ] use something like [snyk.io](https://snyk.io/)
- [ ] steal ideas from [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)
- [ ] expose interface as a library
- [ ] move
- [ ] clean code

# Test

For now i just use curl to test the functionality.
Comprehensive unit tests will be added later

import puppeteer from 'puppeteer';
import log4js from 'log4js';
import express from 'express';
import client from 'prom-client';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Semaphore } from 'async-mutex';

import { getPage } from './browser.js';
import flag from './flags.js';

// todo use flags to change log level
const log = log4js.getLogger();
log.level = flag.logLevel;

const numPages = Number.parseInt(flag.pages, 10);
if (Number.isNaN(numPages)) {
  log.error('could not parse the --pages argument');
  process.exit(1);
}

// todo set up an env paremeter
// and better, use a page pool
const semaphore = new Semaphore(numPages);

// prometheus
const { collectDefaultMetrics } = client;
const { register } = client;
collectDefaultMetrics();
const gauge = new client.Gauge({
  name: 'pages',
  help: 'the number of open pages',
});
gauge.set(0);

const app = express();
const port = process.env.PORT || 4000;
// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));
// adding morgan to log HTTP requests
app.use(
  morgan(
    ':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent" ":body"'
  )
);

const browser = puppeteer.launch({ args: ['--incognito'] }).catch((err) => {
  log.error(`error starting browser: ${err}`);
  process.exit(1);
});

// I think using POST request is semantically incorrect, but who cares...
app.post('/html/', async (req, res) => {
  // todo error on wrong url

  const { url, scrollCount, scrollDelay } = req.body;

  if (!url) {
    res.statusCode = 400;
    res.json({ error: 'url should be specified' });
    return;
  }

  const release = (await semaphore.acquire())[1];
  gauge.inc(1);
  try {
    // log.info(`processing url: ${url}`);
    // todo probably handle request cancel
    const html = await getPage(browser, url, scrollCount, scrollDelay);
    res.json({ url, html });
  } catch (error) {
    log.error(`error processing url: ${error}`);
    // express does not have predefined constants for status codes...
    res.status(500).send('something went wrong');
  } finally {
    release();
    gauge.dec(1);
  }
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.listen(port, () => log.info(`Example app listening at :${port}`));

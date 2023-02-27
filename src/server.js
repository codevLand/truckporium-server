const express = require('express');
const cors = require('cors');
const http = require('http');
const _ = './_middlewares/'

const clientLogs = require(_+'morgan');
const { errorHandler } = require(_+'errHandler');
const { server } = require('./../settings');
const router = require('./routes');

require('dotenv').config()

const app = express();

app.use(clientLogs);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(cors());

app.use('/', router);
app.use(errorHandler);

http.createServer(app)
  .listen(server.port, server.host, () => { console.log(
    `Server started: http://${server.host}:${server.port}`
  )})
  // .error( (err) => console.error(err) )
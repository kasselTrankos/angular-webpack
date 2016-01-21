import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './config';
import * as post from './actions/post';
import * as get from './actions/get';
import {mapUrl, middleware} from './utils/url.js';
import redisStore from 'connect-redis';

import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import {Streaming} from './socket/account';
const pretty = new PrettyError();
const app = express();
const RedisStore = redisStore(session);
const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379
  }),
  secret: 'twitter rules',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000, expires: new Date(Date.now() + 3600000) }
}));
app.use(bodyParser.json());

app.get('/account', (req, res)=>{
  middleware(req, res, get);
});
app.post('/account', (req, res)=>{
  middleware(req, res, post);
});
app.get('/tweet/*', (req, res)=>{
  middleware(req, res, get);
});
///aki una esencia de Streaming

var serverSocket = require('http').createServer(app);
Streaming(serverSocket);
serverSocket.listen(5000, ()=>{
  console.info('----\n==> 🌎  SOCKET TWITTER is running on port %s', 5000);
  console.info('==> 💻  Send requests to http://%s:%s','localhost', 5000);
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.twitterPort) {
  const runnable = app.listen(config.twitterPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  TWITTER is running on port %s', config.twitterPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.twitterPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

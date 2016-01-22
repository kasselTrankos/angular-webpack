import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './config';
import * as post from './actions/post';
import * as get from './actions/get';

import {mapUrl, middleware} from './utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
const pretty = new PrettyError();
import {Tweet} from './socket/tweet';

///////////////////////////////////////////////////

const app = express();
const server = new http.Server(app);

const io = new SocketIo(server);
const stream = Tweet(io);

io.path('/twitter');

app.use(bodyParser.json());

app.get('/account', (req, res)=>{
  console.log(' dame un acuenta y que no sea de twitter');
  middleware(req, res, get);
});
app.post('/account', (req, res)=>{

  middleware(req, res, post);
});
app.get('/tweet/*', (req, res)=>{
  stream(req.url.match(/^\/tweet\/(\w+)$/)[1]);
  middleware(req, res, get);
});
const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.twitterPort)
{
  const runnable = app.listen(config.twitterPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==>::::TWITTER is running on port %s', config.twitterPort);
    console.info('==>:::Send requests to http://%s:%s', config.apiHost, config.twitterPort);
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

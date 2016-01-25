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
import {StoreSocket} from './socket/store';

///////////////////////////////////////////////////

const app = express();
const server = new http.Server(app);

const io = SocketIo(server);
const store = StoreSocket(io);
const stream = Tweet(io, store);
console.log('INDEX::::::::::::::::::::::::::::::::::::::::::::::::::::::');
io.path('/twitter');

app.use(bodyParser.json());

app.get('/account', (req, res)=>{
  middleware(req, res, get);
});
app.post('/account', (req, res)=>{
  middleware(req, res, post);
});
app.get('/tweet/*', (req, res)=>{
  console.log('pero que pasa??===!');
  //const [nameAccount] = req.params;
  stream(req.params[0]);
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

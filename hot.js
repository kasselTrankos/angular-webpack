var fs = require('fs');
var http = require('http');
var config = require('./twitter/config');
var webpackConfig = require('./webpack.hot');
var express = require('express');
var app  = express();
app.use(express.static('public'));
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';
var processPath = process.env.PROCESS_PATH || '/public';

(function() {

  var webpack = require('webpack');
  var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: "/", stats: { colors: true }
}));
app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', noInfo: true, heartbeat: 10 * 1000
}));
})();// Proxy to TWITTER server
app.use('/' + config.services.twitter.path, (req, res) => {
  proxyTwitter.web(req, res);
});

// Proxy to TWITTER server
app.use('/' + config.services.twitter.path, (req, res) => {
  proxyTwitter.web(req, res);
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + processPath+ '/index.html');
});

var server = http.createServer(app);
  server.listen(port || 1616, function() {
    console.log("Listening on %j", server.address());
  });

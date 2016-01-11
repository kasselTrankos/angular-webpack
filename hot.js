var fs = require('fs');
var http = require('http');
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
    noInfo: false, publicPath: "/", stats: { colors: true }
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();


app.get('/', function (req, res) {
  res.sendFile(__dirname + processPath+ '/index.html');
});

var server = http.createServer(app);
  server.listen(port || 1616, function() {
    console.log("Listening on %j", server.address());
  });

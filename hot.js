var fs = require('fs');
var http = require('http');
var webpackConfig = require('./webpack.hot');

var express = require('express');

var app  = express();
app.use(express.static('public'));
console.log(webpackConfig);
// ************************************
// This is the real meat of the example
// ************************************
(function() {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  //var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, publicPath: "/", stats: { colors: true }
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

/*app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));*/
app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/index.html');
});
var server = http.createServer(app);
  server.listen(3000 || 1616, function() {
    console.log("Listening on %j", server.address());
  });

"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

//## --------your proxy----------------------
var app = express();
//## proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:3000/assets')));
app.use('/apitwitter', proxy(url.parse('http://localhost:3040')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



//# -----your-webpack-dev-server------------------
var server = new WebpackDevServer(webpack(config), {
  contentBase: "./public",
  hot:true,
  quiet: false,
  filename: "assets/main.js",
  inline: true,
  noInfo:true,
  ///lazy:true,
  quiet: false,
  publicPath:  config.output.publicPath,
  stats: { colors: true },
  devServer: {
    proxy: {
      '/apitwitter/*': {
        target: 'https://localhost:3040',
        secure: false,
      }
    }
  },
  headers: { 'Access-Control-Allow-Origin': '*' }
});

//## run the two servers
server.listen(3000, "localhost", function() {});
app.listen(3001);

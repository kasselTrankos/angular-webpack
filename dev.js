"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var httpProxy = require('http-proxy');

//## --------your proxy----------------------
var app = express();
var ws = httpProxy.createProxyServer({
  target: 'http://localhost:3040',
  ws:true
});
ws.on('error', function(err, req, res){
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.', err);
});
//## proxy the request for static assets
app.use('/assets', proxy(url.parse('http://localhost:3000/assets')));
app.use('/apitwitter', proxy(url.parse('http://localhost:3040')));
app.use('/ws', function(req, res){
  ////console.log(' y debe functionar, que pasa!');
  ws.web(req, res);
});



/*app.use('/apitwitter/ws', function(req, res){
  apitwitter.ws(req, res);
});*/
///app.use('/socket', proxy(url.parse('http://localhost:5000')));
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



//# -----your-webpack-dev-server------------------
var server = new WebpackDevServer(webpack(config), {
  contentBase: "./public",
  // hot:true,// with angular 1.x doesn't works fine, :(
  quiet: false,
  filename: "assets/main.js",
  // inline: true, //  with angular 1.x doesn't works fine, :(
  noInfo:true,
  ///lazy:true,
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

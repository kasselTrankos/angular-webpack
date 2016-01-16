var webpack = require('webpack');
var path  =require('path');
var host = 'localhost';
var port = '3000';
var baseConfiguration = require('./webpack.dev');
module.exports = {
  context: __dirname,
  devtool: '#source-map',
  entry:[
    'webpack-dev-server/client?http://' + host + ':' + port,
    './src/app/app'
  ],
  output: {
    path: path.resolve(__dirname,'public', 'assets'),
    publicPath: '/',
    filename: 'main.js'
  },
  resolve: baseConfiguration.resolve,
  module: baseConfiguration.module,
  plugins: baseConfiguration.plugins
}

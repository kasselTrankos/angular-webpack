var path = require('path'),
webpack = require("webpack");
var baseConfiguration = require('./webpack.dev');
module.exports = {
    entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    'webpack/hot/only-dev-server',
    './src/app/app'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    publicPath:'/',
    filename: 'main.js'
    },
  resolve: baseConfiguration.resolve,
  module: baseConfiguration.module,
  plugins: baseConfiguration.plugins
};

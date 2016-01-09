var path = require('path');
module.exports = {
  entry:   ["./src/app/app"],
  output: {
    path: path.resolve(__dirname, "../public"),
    publicPath:"assets",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=es2015'}
    ]
  }
};

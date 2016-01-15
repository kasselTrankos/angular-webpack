var path = require('path'),
webpack = require("webpack");

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
    module: {
      loaders: [{
        test: /\.html$/,
        loader: 'ngtemplate?name=templates/[name]-[hash:6].html'
        // loader: 'file?name=templates/[name]-[hash:6].html'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.scss$/,
        loader: "style!css!autoprefixer!sass"
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "ng-annotate!babel"
      }, {
        test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
        loader: 'file?name=fonts/[name].[ext]'
      }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

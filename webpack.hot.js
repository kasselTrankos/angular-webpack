var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'src/app'),
    wwwPath = path.join(__dirname, 'public', 'assets'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


var config = {
    entry: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'webpack/hot/only-dev-server',
      path.join(libPath, 'app.js')
    ],
    output: {
        path: path.join(wwwPath),
        filename: 'main.js'
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'file?name=templates/[name]-[hash:6].html'
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
            loader: "babel?presets[]=es2015"
        }, {
            test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
            loader: 'file?name=fonts/[name].[ext]'
        }]
    },
    plugins: [
        // HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(libPath, 'index.html')
        }),*/

        // OccurenceOrderPlugin: Assign the module and chunk ids by occurrence count. : https://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
        new webpack.optimize.OccurenceOrderPlugin(),

        // Deduplication: find duplicate dependencies & prevents duplicate inclusion : https://github.com/webpack/docs/wiki/optimization#deduplication
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = config;

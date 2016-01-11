var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var config =  require('./webpack.client.basic');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || '8080';
config.cache = true;
config.debug = true;
config.watch = true;
config.devtool = "source-map";
config.entry.unshift(
	"webpack-dev-server/client?http://" + host + ":" + port,
	"webpack/hot/dev-server"
);
/*config.output.publicPath = "http://" + host + ":"+ port +"/public/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";
config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin()
];
*/
var compiler = webpack(config);

var configDevServer = {
  contentBase: "./public",
  hot:true,
	quiet: false,
	filename: "assets/main.js",
  inline: true,
  noInfo:true,
	quiet: false,
  publicPath:  "http://" + host + ":" + port + "/public/",
  stats: { colors: true }
};
var server = new WebpackDevServer(compiler, configDevServer);
server.listen(port, host, function() {
  console.log('is running in ',host,':',port);
});

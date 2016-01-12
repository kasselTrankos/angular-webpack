var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

config.entry.unshift(
	"webpack-dev-server/client?http://" + host + ":" + port,
	"webpack/hot/dev-server"
);
var compiler = webpack(config);

new WebpackDevServer(compiler,  {
	contentBase: "./public",
  hot:true,
	quiet: false,
	filename: "assets/main.js",
  inline: true,
  noInfo:true,
	quiet: false,
  publicPath:  config.output.publicPath,
  stats: { colors: true },
	headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(port, host, function (err) {
  if(err)
    return console.log(err);

  console.log('Listening at ' + host + ':' + port);
});


var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}
require("babel-polyfill");
require("babel-core/register")(config);

if (process.env.NODE_ENV !== "production") {
	if (!require("piping")({hook: true, includeModules: false})) {
		return;
	}
}

try {
	require("./twitter");
}
catch (error) {
	console.error('ERROR: ',error.stack);
}

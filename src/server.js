var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/../public'));
app.use('*', function (req, res) {
  fs.readFile(__dirname + '/../public/index.html', 'utf8', function(err, text){
    if(!err) res.send(text);
  });
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port',process.env.PORT,' !');
})

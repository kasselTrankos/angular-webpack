import {InsertTweet} from './../../db';
var Twit = require('twit');
var portfinder = require('portfinder');
var T = new Twit({
  consumer_key: 'YcsBUJYAH5LYXUkFFHJWQxqIk',
  consumer_secret: 'PCArQ1hqitctQOG1JY2OHiOvBLbuuYRaFRWsp0aBeedZkDx0zn',
  access_token: '188811579-r04M27PtgCoeLBqNIXxjMgJ5a6KlkJC6kik9oEfH',
  access_token_secret: 'cc2vaceKJAAOiAhKjc90VWqoMpi4Dmx27DIUtyUCEfx8r'
})

const Streaming = (account, id, port)=>{
  //portfinder.getPort(function (err, port) {
    console.log('¡ CONNECTED', port, ' Account is: ', account);
    var io = require('socket.io')(port);
    var stream = T.stream('user', { track: 'kasselTrankos' })
    stream.on('tweet', function(tweet){
      console.log(InsertTweet)
      InsertTweet(tweet, account, id)
      .then((doc)=>{
        console.log('TWEET nuevo ', tweet.text, ' ACCOUNT', account, 'port', port);
        io.emit('tweet', doc);
      }).cacth((err)=>{
        console.log('necesito trabajar los errores', err);
      });

    });
//  });
}
export {Streaming}
//ademas guardar el puerto en session
//exports.Stream = function(account){

//}
/**/

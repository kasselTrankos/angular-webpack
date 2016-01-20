import {InsertTweet,GetIdFromAccount, connect, close} from './../../db';
import {isPortOpen} from './../../utils/port';
import Twit from 'twit';
import portfinder from 'portfinder';
var T = new Twit({
  consumer_key: 'YcsBUJYAH5LYXUkFFHJWQxqIk',
  consumer_secret: 'PCArQ1hqitctQOG1JY2OHiOvBLbuuYRaFRWsp0aBeedZkDx0zn',
  access_token: '188811579-r04M27PtgCoeLBqNIXxjMgJ5a6KlkJC6kik9oEfH',
  access_token_secret: 'cc2vaceKJAAOiAhKjc90VWqoMpi4Dmx27DIUtyUCEfx8r'
});

const Streaming = (serverSocket, _account)=>{
  let account = _account || 'kasselTrankos';
    var stream = T.stream('user', { track: account });
    console.log(' CAMBIA LA CUENTA', account);
    if(serverSocket!==null){
      var io = require('socket.io')();
      stream.on('tweet', function(tweet){
        connect();//kjoder etalles molones q trane de cabeza
        GetIdFromAccount(account)
        .then((doc)=>InsertTweet(tweet, account, doc._id))
        .then((doc)=>{
          close();
          console.log(' joder tengo un tweet', doc.text);
          io.emit('tweet', doc);
        })
        .catch((err)=>{close();
          console.log('necesito trabajar los errores', err);
        });
      });
    }

}
export {Streaming}

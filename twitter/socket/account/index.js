import {InsertTweet,GetIdFromAccount, connect, close} from './../../db';
import {isPortOpen} from './../../utils/port';
var Twit = require('twit');
var portfinder = require('portfinder');
var T = new Twit({
  consumer_key: 'YcsBUJYAH5LYXUkFFHJWQxqIk',
  consumer_secret: 'PCArQ1hqitctQOG1JY2OHiOvBLbuuYRaFRWsp0aBeedZkDx0zn',
  access_token: '188811579-r04M27PtgCoeLBqNIXxjMgJ5a6KlkJC6kik9oEfH',
  access_token_secret: 'cc2vaceKJAAOiAhKjc90VWqoMpi4Dmx27DIUtyUCEfx8r'
})

const Streaming = (account, id, port)=>{

  //console.log('¡ CONNECTED', port, ' Account is: ', account);
    var io = require('socket.io')();
    var stream = T.stream('user', { track: 'kasselTrankos' })
    stream.on('tweet', function(tweet){
      connect();//kjoder etalles molones q trane de cabeza
      GetIdFromAccount(account)
      .then((doc)=>{console.log(doc._id);return InsertTweet(tweet, account, doc._id)})
      .then((doc)=>{
        close();
        io.emit('tweet', doc);
      })
      .catch((err)=>{close();
        console.log('necesito trabajar los errores', err);
      });


    });
    console.log(isPortOpen(port), ' y el puerto es :',port);
    //if(!isPortOpen(port))
    io.listen(port, {log:true});
//  });
}
export {Streaming}
//ademas guardar el puerto en session
//exports.Stream = function(account){

//}
/**/

import SocketIo from 'socket.io';
import {InsertTweet,GetIdFromAccount,
  connect, close} from './../db';
import Twit from 'twit';
var T = new Twit({
  consumer_key: 'YcsBUJYAH5LYXUkFFHJWQxqIk',
  consumer_secret: 'PCArQ1hqitctQOG1JY2OHiOvBLbuuYRaFRWsp0aBeedZkDx0zn',
  access_token: '188811579-r04M27PtgCoeLBqNIXxjMgJ5a6KlkJC6kik9oEfH',
  access_token_secret: 'cc2vaceKJAAOiAhKjc90VWqoMpi4Dmx27DIUtyUCEfx8r'
});

export const Tweet = (_io)=>{
  const io = _io;
  return (account='kasselTrankos')=>{
    const room = io.of('/ws/' + account);
    room.on('connection', (socket) => {
      console.log(' hay algun error aqui?');
    });
      console.log(' ACCOUNT IS ', account, ' trye');
      T.stream('user', { track: account }).on('tweet', function(tweet){
        connect();
        GetIdFromAccount(account)
        .then((doc)=>InsertTweet(tweet, account, doc._id))
        .then((doc)=>{
          close();
          console.log(' joder tengo un tweet', doc.text);
          room.emit('tweet', doc);
        })
        .catch((err)=>{close();
          ///hay un bug con el nodo "geo"
          console.log('necesito trabajar los errores', err);
        });
      });
  }
};

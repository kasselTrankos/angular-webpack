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

export const Tweet = (io, store)=>{
  // const io = _io;
  ///console.log(store, 'dime si es o no una function');
  return (account='kasselTrankos')=>{
    //store(account);
    store(account).on('connection', (socket)=>{
      // console.log(' estoy conectado, ',socket, ' SOY EL SOCKET AL FIN!!!');
      T.stream('user', { track: account }).on('tweet', function(tweet){
        connect();
        GetIdFromAccount(account)
        .then((doc)=>InsertTweet(tweet, account, doc._id))
        .then((doc)=>{
          close();
          // console.log(' joder tengo un tweet', doc.text);
          socket.emit('tweet', doc);
        })
        .catch((err)=>{close();
          ///hay un bug con el nodo "geo"
          console.log('necesito trabajar los errores', err);
        });
      });
    });
    /*io.setupNamespace(`/.*${account}/`, function(nsp) {
      console.log('im connection to namespace', nsp);

      nsp.on('connect', function(socket) {
        console.log('i am conoected to socket', socket);
        console.log(' ACCOUNT IS ', account, ' trye');
        T.stream('user', { track: account }).on('tweet', function(tweet){
          connect();
          GetIdFromAccount(account)
          .then((doc)=>InsertTweet(tweet, account, doc._id))
          .then((doc)=>{
            close();
            console.log(' joder tengo un tweet', doc.text);
            socket.emit('tweet', doc);
          })
          .catch((err)=>{close();
            ///hay un bug con el nodo "geo"
            console.log('necesito trabajar los errores', err);
          });
        });
      });
    });*/
  }
};

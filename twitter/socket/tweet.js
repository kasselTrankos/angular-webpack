import SocketIo from 'socket.io';
import {InsertTweet, ExistsTweet,
  GetIdFromAccount,
  connect, close} from './../db';
import Twit from 'twit';
var T = new Twit({
  consumer_key: 'YcsBUJYAH5LYXUkFFHJWQxqIk',
  consumer_secret: 'PCArQ1hqitctQOG1JY2OHiOvBLbuuYRaFRWsp0aBeedZkDx0zn',
  access_token: '188811579-r04M27PtgCoeLBqNIXxjMgJ5a6KlkJC6kik9oEfH',
  access_token_secret: 'cc2vaceKJAAOiAhKjc90VWqoMpi4Dmx27DIUtyUCEfx8r'
});

export const Tweet = (io, store)=>{
  return (accountName='kasselTrankos')=>{
    ///console.log(store);
    if(store.exists(accountName)) {
      console.log(' RECALL IT', accountName);
      return false;
    }else{
      console.log('=====================================', accountName)
      store.create(accountName).on('connection', (socket)=>{
        console.log(' estoy conectado, ',accountName, ' SOY EL SOCKET AL FIN!!!');
        let account=null;
        T.stream('user', { track: accountName }).on('tweet', function(tweet){
          connect();
          GetIdFromAccount(accountName)
          .then((Account)=>{
            account = Account;
            return ExistsTweet(tweet);
          })
          .then((doc)=>InsertTweet(doc, account.name, account._id))
          .then((doc)=>{
            close();
            console.log('emit', doc.text);
            socket.emit('tweet', doc);
          })
          .catch((err)=>{
            close();
            ///hay un bug con el nodo "geo"
            console.log('necesito trabajar los errores', err);
          });
        });
      });
    }

  }
};

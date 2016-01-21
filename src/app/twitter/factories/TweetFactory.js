import {Bootstrap} from 'utils/Decorators';
//import SocketJs from 'sockjs-client';
import io from 'socket.io-client';
@Bootstrap()
export default class TweetFactory {
  constructor($http, $q, server){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.url = `http://${server.host}:${server.port}/${server.service}`;
    this.socketUri = `/ws/twitter`;
  }
  socket(){
  //  const socket = io('', {path: '/api/ws', transports: ['polling']});
  console.log(this.socketUri);
    const socketConnect = io('', {path: this.socketUri, transports: ['polling']});
    socketConnect.on('tweet', (data) => {
      console.log(data);
    //  socketConnect.emit('my other event', { my: 'data from client' });
    });
    /*socketConnect.on('msg', (data) => {
      console.log(data);
    });*/
  }
  loadAllTweetsFromAccount(account) {
    var def = this.$q.defer();
    this.$http.get(`${this.url}/tweet/${account}`)
    .success(function(data) {
      def.resolve(data);
    })
    .error(function() {
      def.reject("Failed to get accounts");
    });
    return def.promise;
  }
}

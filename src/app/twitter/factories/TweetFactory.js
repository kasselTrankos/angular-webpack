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
  socket(account) {
    this.socketUri = `${this.socketUri}/${account}`;
    const socketConnect = io(`http://localhost:3001/${account}`, { path: '/ws/twitter', transports: ['polling']});
    //io('', {path: this.socketUri, transports: ['polling']});
    socketConnect.on('connect', function () {
      // socket connected (never gets fired)
      console.log('connected', arguments);
    });
    socketConnect.on('tweet', (data) => {
      console.log(data);
    });
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

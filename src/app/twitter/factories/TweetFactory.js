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
    this.socketConf = {
      path: '/ws/twitter',
      uri: `http://${server.host}:${server.port}`
    }
  }
  socket(account) {
    const socketConnect = io(`${this.socketConf.uri}/${account}`,
      { path: this.socketConf.path, transports: ['polling']});

    socketConnect.on('connect', function () {
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

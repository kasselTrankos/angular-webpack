import {Bootstrap} from 'utils/Decorators';

import io from 'socket.io-client';
@Bootstrap()
export default class TweetFactory {
  constructor($http, $q, server){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.url = `http://${server.host}:${server.port}/${server.service}`;
    this.socketConf = {
      path: `${server.socket.path}`,
      uri: `http://${server.host}:${server.port}`
    }
    this.connections = server.socket.connections;
  }
  ///working, now need a store handler for tweets( esto lo primero)
  // second need to disconect when goes home
  socket(account, callback) {
    console.log(this.connections, ' CLOLLOL');
    if(this.connections.indexOf(account)>=0) return false;
    console.log(' JODER Y QUE PASA=', this.connections.indexOf(account));
    this.connections.push(account);
    const socketConnect = io(`${this.socketConf.uri}/${account}`,
      { path: this.socketConf.path, transports: ['polling']});

    socketConnect.on('connect', function () {
      console.log('connected');
    });
    //////aqui un poco
    socketConnect.on('tweet', (data, callback) => {
      console.log('tweet', data);
      if(callback) callback.call(null, data);

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

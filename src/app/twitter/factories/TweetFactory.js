import {Bootstrap} from 'utils/Decorators';
import SocketJs from 'sockjs-client';

@Bootstrap()
export default class TweetFactory {
  constructor($http, $q, server){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.url = `http://${server.host}:${server.port}/${server.service}`;
    this.socketUri = `http://${server.host}:${server.socket}`;
  }
  socket(){
    const sock = new SocketJs(this.socketUri);
    sock.onopen = function() {
      console.log('open in Account Factory do the work please');
    };
    sock.onmessage = function(e) {
      console.log('message en account Factory', e.data);
    };
    sock.onclose = function() {
      console.log('close en account Factory');
    };

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

import {Bootstrap} from 'utils/Decorators';

@Bootstrap()
export default class TweetFactory {
  constructor($http, $q, server){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.url = `http://${server.host}:${server.port}/${server.service}`;
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

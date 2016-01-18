import {Bootstrap} from 'utils/Decorators';



@Bootstrap()
export default class AccountFactory{
  constructor($http, $q, server){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.url = `http://${server.host}:${server.port}/${server.service}`;
  }
  loadAllAccounts(){
    var def = this.$q.defer();
    this.$http.get(`${this.url}/account`)
    .success(function(data) {
      def.resolve(data);
    })
    .error(function() {
      def.reject("Failed to get accounts");
    });
    return def.promise;
  }
  saveNewAccount(account){
    var def = this.$q.defer();
    this.$http.post(`${this.url}/account`, {account: account})
    .success(function(data) {
      def.resolve(data);
    })
    .error(function() {
      def.reject("Failed to get accounts");
    });
    return def.promise;
  }

}

import {Bootstrap} from 'utils/Decorators';



@Bootstrap()
export default class AccountFactory{
  constructor($http, $q){
    'ngInject';
    this.$http = $http;
    this.$q = $q;
  }
  loadAllAccounts(){

    var def = this.$q.defer();
    this.$http.get("http://localhost:3001/apitwitter/account")
    .success(function(data) {
      def.resolve(data);
    })
    .error(function() {
      def.reject("Failed to get accounts");
    });
    return def.promise;

  }

}

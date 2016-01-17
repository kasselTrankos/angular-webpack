export default class TwitterRestProvider {

  constructor(){
  }
  $get($http, $q) {
    'ngInject';
    return{
      loadAccounts: ()=>{
        var def = this.$q.defer();
        this.$http.get("//apitwiter/account")
        .success(function(data) {
          service.albums = data;
          def.resolve(data);
        })
        .error(function() {
          def.reject("Failed to get accounts");
        });
        return def.promise;
      }
    };
  }

}

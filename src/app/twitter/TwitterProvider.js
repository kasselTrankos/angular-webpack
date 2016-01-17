import {Bootstrap} from 'utils/Decorators';

@Bootstrap('ats.main')
export default class TwitterProvider {

  constructor() {

  }
  $get($http, $q) {
    'ngInject';
    return{
      loadAccounts: ()=>{
        console.log('call fro', $http);
        var def = $q.defer();
        $http.get("http://localhost:3001/apitwitter/account")
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

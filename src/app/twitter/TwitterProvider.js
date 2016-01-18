import {Bootstrap} from 'utils/Decorators';
import AccountStore from './store/AccountStore';
import AccountFactory from './factories/AccountFactory';

@Bootstrap()
export default class TwitterProvider {

  constructor() {
    this.accounts= {
      loading: false,
      error: false,
      data: null
    }
  }

  $get(account) {
    'ngInject';
    return {
      connect: (store)=>{
        this.store = store;
      },
      loadAccounts: ()=>{
        console.log(this.store);
        this.store.loading = true;
        account.loadAllAccounts()
        .then((data)=>{
          this.store.coco= 'anda por aqui'
          this.store.accounts = data;
          this.store.loading = false;
          console.log(data, 'loaderd',this.store.data);
        }).catch((e)=>{
          this.store.error = e;
          this.store.loading = false;
        });

      }
    }
  }
  /*
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
  }*/
}

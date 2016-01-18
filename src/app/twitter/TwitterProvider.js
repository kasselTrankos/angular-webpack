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
          this.store.accounts = data;
          this.store.loading = false;
        }).catch((e)=>{
          this.store.error = e;
          this.store.loading = false;
        });

      }
    }
  }
}

import TwitterProvider from 'twitter/TwitterProvider';

export default class HomeCtrl {
  /**
  * Constructor class AppCtrl
  *
  * @param {object} TwitterRest
  */
  constructor(twitter) {
    'ngInject';
    let vm = this;
    twitter.connect(vm);
    twitter.loadAccounts();
    vm.addAccount = this.addAccount;
  }
  addAccount(e){
    console.log('works fine, but es is like not for angular 1.x',e);
    e.preventDefault();
    return false;
  }
}

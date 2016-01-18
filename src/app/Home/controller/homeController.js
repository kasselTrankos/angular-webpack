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
    vm.little = 'reload';
    vm.name = '12';
    console.log('automatic inject');
    twitter.connect(vm);
    /*vm.accounts = twitter.Accounts.data;
    vm.loading = twitter.Accounts.loading
    vm.error = twitter.Accounts.error*/
    twitter.loadAccounts();
    console.log(' will work', vm, twitter.Accounts);

  }
  loadAccounts(){

  }
}

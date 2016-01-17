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
    //vm.accounts = TwitterRest.loadAccounts();
  }
  loadAccounts(){

  }
}

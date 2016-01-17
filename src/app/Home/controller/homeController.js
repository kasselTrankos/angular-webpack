export default class HomeCtrl {
  /**
  * Constructor class AppCtrl
  *
  * @param {object} TwitterRest
  */
  constructor(TwitterRest) {
    'ngInject';
    let vm = this;
    vm.little = 'reload';
    vm.name = '12';
    vm.accounts = TwitterRest.loadAccounts();
  }
  loadAccounts(){

  }
}

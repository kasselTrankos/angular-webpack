export default class AccountCtrl {

  constructor($stateParams) {
    'ngInject';
    let vm  = this;
    vm.nameAccount = $stateParams.account;
  }

}

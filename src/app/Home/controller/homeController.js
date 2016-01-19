import {Twitter} from 'twitter';
import {connect} from 'utils/Decorators';
import AccountFactory from 'twitter/factories/AccountFactory';

@connect((accounts)=>({
  loading: false,
  error: false,
  data:{}
}), Twitter)
export default class HomeCtrl {
  /**
  * Constructor class AppCtrl
  *
  * @param {object} TwitterRest
  */
  constructor(account) {
    'ngInject';
    let vm = this;
    vm.accounts.factory = account;
    vm.accounts.load();

  }
  addAccount(e, _that){
    _that.vm.accounts.save(_that.vm.account);
    e.preventDefault();
    return false;
  }
}

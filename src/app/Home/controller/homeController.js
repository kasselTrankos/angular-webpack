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
    vm.accounts.load(account);

  }
  addAccount(e){
    console.log('works fine, but es is like not for angular 1.x',e);
    e.preventDefault();
    return false;
  }
}

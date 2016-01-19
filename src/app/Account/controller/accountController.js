import {connect} from 'utils/Decorators';
import {Tweet} from 'twitter';

@connect((tweets)=>({
  loading: false,
  error: false,
  data:{}
}), Tweet)
export default class AccountCtrl {

  constructor($stateParams) {
    'ngInject';
    let vm  = this;
    vm.nameAccount = $stateParams.account;
  }

}

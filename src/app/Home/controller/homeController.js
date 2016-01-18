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
  }
}

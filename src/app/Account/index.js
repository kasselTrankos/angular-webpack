import {Router} from 'utils/Decorators';
import AccountCtrl from './controller/accountController';
import template from './templates/account.content.html';
@Router({
  url: "/:account",
  template: template,
  controller: AccountCtrl,
  controllerAs:'vm'
})
export default class Account {
  constructor() {
  }
}

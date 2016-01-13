import template from './MainMenu.html';

export default class MainMenu {

  constructor($interval) {
    this.test =1;
    this.templateUrl = template; //require('./MainMenu.html');
    this.restrict='EA';
  }
  link() {

  }
}
// MainMenu.directiveFactory.$inject = [];
// MainMenu

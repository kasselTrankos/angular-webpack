import template from './MainMenu.html';
export default class MainMenu {
  constructor($interval) {

    this.templateUrl = template; //require('./MainMenu.html');
    this.restrict='EA';
  }
  link() {

  }
}

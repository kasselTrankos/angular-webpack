import {Router} from './../utils/Decorators';
import HomeController from './controller/homeController';
import template from './templates/home.content.html';

@Router({
  url: "/",
  template: template,
  controller: HomeController,
  controllerAs:'vm'
})
export default class Home {
  constructor() {
  }
}

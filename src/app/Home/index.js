import {Router} from './../utils/Decorators';
import HomeController from './controller/homeController';

@Router({
  url: "/",
  template: '<p>{{vm.title}}, alvaro',
  controller: HomeController,
  controllerAs:'vm'
})
export default class Home {
  constructor() {
  }
}

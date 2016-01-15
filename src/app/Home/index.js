import {Router} from './../utils/Decorators';

@Router('/', '<h1>{{title}}</h1>')
export default class Home {
  constructor() {
  }
}

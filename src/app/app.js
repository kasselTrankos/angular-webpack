import 'angular/angular.js';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';
import AppCtrl from './controller/AppCtrl';
import MainMenu from './directives/MainMenu';
import Router from './state/Router';

const mainModule = angular.module('ats.main', [
    angularMaterial,
    angularUIRouter
]);
mainModule.config(($stateProvider, $urlRouterProvider)=>new Router($stateProvider, $urlRouterProvider));
mainModule.controller('AppCtrl', AppCtrl);
mainModule.directive('mainMenu', ($interval)=>new MainMenu($interval));
export default mainModule;
/////////////removes at the en of application
if (module.hot) {
  module.hot.accept();
}

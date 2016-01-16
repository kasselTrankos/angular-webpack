import 'angular/angular.js';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularTranslate from 'angular-translate';
import angularStaticFilesloader from 'angular-translate-loader-static-files/angular-translate-loader-static-files';
import angularSanitize from 'angular-sanitize';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';
import AppCtrl from './controllers/AppCtrl';
import MainMenu from './directives/MainMenu';
import RouterHelper from './helpers/RouterHelper';
import TwitterRest from './factories/TwitterRest';
import TranslationHelper from './helpers/TranslationHelper';

/*
*/
console.log(angularTranslate, angularStaticFilesloader);
const mainModule = angular.module('ats.main', [
    angularMaterial,
    angularUIRouter,
    angularTranslate,
    angularSanitize,
    angularStaticFilesloader
]);
console.log(mainModule, ' module og');
mainModule
  .config(($stateProvider, $urlRouterProvider)=>new RouterHelper($stateProvider, $urlRouterProvider))
  .config(($translateProvider)=>new TranslationHelper($translateProvider))
  .controller('AppCtrl', AppCtrl)
  .factory('twitterRest', TwitterRest)
  .directive('mainMenu', ($interval)=>new MainMenu($interval));

export default mainModule;
/////////////removes at the en of application
if (module.hot) {
  module.hot.accept();
}

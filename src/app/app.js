import 'angular/angular.js';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularTranslate from 'angular-translate/angular-translate';
import angularStaticFilesloader from 'angular-translate-loader-static-files';
import angularSanitize from 'angular-sanitize/index.js';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';
import AppCtrl from 'controllers/AppCtrl';
import MainMenu from 'directives/MainMenu';
import {ThemeColorsHelper, RouterHelper, TranslationHelper} from 'helpers';
import TwitterTextFilter from 'filters/TwitterTextFilter';

const mainModule = angular.module('ats.main', [
    angularMaterial,
    angularUIRouter,
    angularTranslate,
    angularSanitize,
    angularStaticFilesloader
]);
mainModule
  .constant('server', {host: 'localhost', port: '3001', service: 'apitwitter', socket: '5000'})
  .config(($mdThemingProvider)=> new ThemeColorsHelper($mdThemingProvider))
  .config(($stateProvider, $urlRouterProvider, $locationProvider)=>new RouterHelper($stateProvider, $urlRouterProvider, $locationProvider))
  .config(($translateProvider)=>new TranslationHelper($translateProvider))
  .directive('mainMenu', ($interval)=>new MainMenu($interval))
  .filter('twitterText', ()=>new TwitterTextFilter())
  .controller('AppCtrl', AppCtrl);

export default mainModule;
if(module.hot){
  module.hot.accept();
}

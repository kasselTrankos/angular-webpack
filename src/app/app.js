import 'angular/angular.js';
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularMaterial from 'angular-material';
import angularUIRouter from 'angular-ui-router';

// Create our demo module
let mainModule = angular.module('atsmain', [
    angularMaterial,
    angularUIRouter
])

export default mainModule;
/////////////removes at the en of application
if (module.hot) {
  module.hot.accept();
}

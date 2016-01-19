import Home from 'Home';
import Account from 'Account';

export default class RouterHelper {

  constructor($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state("home", new Home().routeParams)
    .state("account", new Account().routeParams);
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

  }
}

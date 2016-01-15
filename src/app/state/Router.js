import Home from './../Home';

export default class Router {

  constructor($stateProvider, $urlRouterProvider) {
    $stateProvider.state('accounts', new Home().routeParams);
  }
}

import Home from './../Home';

export default class RouterHelper {

  constructor($stateProvider, $urlRouterProvider) {

    $stateProvider.state("home", new Home().routeParams);
    $urlRouterProvider
      .when('/c?id', '/contacts/:id')
      .when('/user/:id', '/contacts/:id')
      .otherwise('/');
  }
}

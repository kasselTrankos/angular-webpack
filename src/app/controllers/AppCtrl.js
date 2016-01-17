export default class AppCtrl {
  /**
  * Constructor class AppCtrl
  *
  * @param {object} $scope
  * @param {object} $state
  */
  constructor($scope, $state) {
    'ngInject';
    let vm = this;
    //$scope.magia =14;
    console.log($state, $scope, ' in AppCytl')
  }
  static $inject = [];
}

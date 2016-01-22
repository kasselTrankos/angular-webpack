import {Pagination} from './Pagination';
export default class Tweets {
  constructor() {
    this.template = require('./Tweets.html');
    this.restrict='EA';
    this.scope = {
      tweets:'=data',
      itemsPerPage:'='
    }
  }
  link($scope, $element, $attrs) {
    const pagination = Pagination($element);
    $attrs.$observe('tweets', function() {
         // body
    });
    // const total = $scope.tweets.length;
    //const pages = getPages($scope.tweets, $scope.itemsPerPage);
    //console.log(pages, total, $scope.tweets);
  }
}

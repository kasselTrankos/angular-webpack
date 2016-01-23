import {Pagination, htmlPagination, htmlTweets} from './Pagination';
import 'angular/angular.js';
export default class ListTweets {

  constructor($filter) {
    'ngInject';

    this.$filter = $filter;
    this.template = require('./Tweets.html');
    this.restrict='E';
    this.scope = {
      items:'@data',
      tweets:'=',
      itemsPerPage:'=',
      showOnly:'='
    }
    this.link = ($scope, $element, $attrs)=>{

      const pagination = Pagination(
        angular.element($element),
        $scope.itemsPerPage,
        $scope.showOnly,
        this.$filter);
      $attrs.$observe('data', function() {
        pagination(htmlPagination, htmlTweets,  $scope.tweets);;
      });
    }
  }
}

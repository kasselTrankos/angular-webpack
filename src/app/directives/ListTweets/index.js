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
      itemsPerPage:'='
    }
    this.link = ($scope, $element, $attrs)=>{

      const pagination = Pagination(angular.element($element),$scope.itemsPerPage, this.$filter);
      $attrs.$observe('data', function() {
        pagination(htmlPagination, htmlTweets,  $scope.tweets);
        //$compile($element.contents())($scope);
      });
    }
  }
  /*link($scope, $element, $attrs, $filter) {
    console.log(this, ' esta aqui tambien seguiro', $filter,'????');
    const pagination = Pagination(angular.element($element),$scope.itemsPerPage);
    $attrs.$observe('data', function() {
      pagination(htmlPagination, htmlTweets,  $scope.tweets);
      //$compile($element.contents())($scope);
    });
    //<p ng-bind-html="tweet.text | twitterText" />
    // const total = $scope.tweets.length;
    //const pages = getPages($scope.tweets, $scope.itemsPerPage);
    //console.log(pages, total, $scope.tweets);
  }*/
}

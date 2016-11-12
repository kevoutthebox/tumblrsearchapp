require('angular');

var MainController = require('./controllers/maincontroller');

angular.module('tumblrapp', [

  ])
  .controller('MainController', ['$scope', '$http', MainController])
  .filter('removeHTMLTags', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });

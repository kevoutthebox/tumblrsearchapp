module.exports = function($scope, $http) {
  //variables to store result from input field
  $scope.hostName = '';
  $scope.tag = '';

  //variables to store fetched data
  $scope.posts = [];
  $scope.favorites = [];

  //function that makes the api call and pushes to the variables posts
  $scope.searchTumblr = function() {
    var apiKey = 'yBdjHApJac6UnDT5jWrdSgGtaSModR8clY23MfzoEXLlCfX0bL';
    var rootUrl ='http://api.tumblr.com/v2/'
    var hostName = $scope.hostName;
    var tag = $scope.tag;
    $scope.posts = [];

    //different api endpoints hit depending on whether hostname was inputted
    if (hostName) {
      var url = rootUrl + 'blog/' + hostName +'.tumblr.com/posts?api_key=' + apiKey + '&tag='+tag ;
      $http.get(url).then(function (res) {
        res.data.response.posts.forEach(function(post) {
          $scope.posts.push(post);
        });
      });
    } else if (tag) {
      var url = rootUrl + 'tagged?api_key=' + apiKey + '&tag='+tag ;
      $http.get(url).then(function (res) {
        res.data.response.forEach(function(post) {
          $scope.posts.push(post);
        });
      })
    }
  }

  //click handler on the add button
  $scope.addToFavorites = function($event, post) {
    var foundInFavorites = $scope.favorites.filter(function(favorite) {
      return favorite.id === post.id;
    });

    //checking if the post is already in favorites list, and if it isn't add it.
    if (foundInFavorites.length) {
      alert('already added to favorites');
    } else {
      $scope.favorites.push(post);
    }

  }

  //click handler for the remove button, it removes the favorite post
  $scope.removeFromFavorites = function($event, favorite) {
    $scope.favorites.splice($scope.favorites.indexOf(favorite), 1);
  }
};

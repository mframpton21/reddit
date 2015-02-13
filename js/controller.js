var app = angular.module('reddit');

app.controller('PostsController', function($scope, FirebaseService) {

	$scope.getPosts = function() {
    	FirebaseService.getPosts()
    		.then(function(data) {
      			console.log(data);
      			$scope.posts = data;
    		});
  	};

	$scope.addPost = function() {
    	FirebaseService.addPost($scope.newPost)
    		.then(function(response) {
      			console.log(response);
      			$scope.getPosts();
      			$scope.newPost.title = '';
      			$scope.newPost.body = '';
      			$scope.newPost.author = '';
    		});
  	}; 

  	$scope.vote = function(post, direction) {
  		FirebaseService.vote(post, direction)
    		.then(function(response) {
      			console.log(response);

      			$scope.getPosts();
    		});
  	}; 	

  	$scope.submitComment = function(id, comment) {
		FirebaseService.submitComment(id, comment)
			.then(function(response) {
				console.log(response);

				$scope.getPosts();
		});
	};

  	$scope.getPosts();
});

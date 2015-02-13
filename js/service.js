var app = angular.module('reddit');

app.service('FirebaseService', function($http, $q) {


	var guid = function() {
    	var s4 = function() {
      		return Math.floor((1 + Math.random()) * 0x10000)
        	.toString(16)
        	.substring(1);
    	}
    	return 	s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      			s4() + '-' + s4() + s4() + s4();
  	}

	this.getPosts = function() {

		var deferred = $q.defer();

		$http({
       		method: 'GET',
       		url: 'https://devmtn.firebaseio.com/posts.json'})
    	.then(function(response) {
           	//console.log(response);
    		response = response.data;

    		deferred.resolve(response);
    	})

    	return deferred.promise;
	}

	this.addPost = function(post) {

		var deferred = $q.defer();

		post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();

    	$http({
       		method: 'PUT',
       		url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
    		data: post})
    	.then(function(response) {
           	//onsole.log(response);

    		deferred.resolve(response);
    	})

    	return deferred.promise;
	}	

	this.vote = function(post, direction) {

		var deferred = $q.defer();

		if (direction === 'up') {
      		post.karma++;
    	} else if (direction === 'down'){
      		post.karma--;
    	}
		
    	$http({
       		method: 'PATCH',
       		url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
    		data: post})

    	.then(function(response) {
           	//onsole.log(response);

    		deferred.resolve(response);
    	})

    	return deferred.promise;
	}

	this.submitComment = function(id, comment) {

		var deferred = $q.defer();
		
    	$http({
       		method: 'POST',
       		url: 'https://devmtn.firebaseio.com/posts/' + id + '/comments.json',
    		data: {comments: comment}})

    	.then(function(response) {
           	//onsole.log(response);

    		deferred.resolve(response);
    	})

    	return deferred.promise;
	}

});
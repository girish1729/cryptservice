'use strict';

angular.module('Cipher', []) 
.controller('Cryptctrl', function($scope, $http){  

	$scope.Decrypt = function(txt) {
		$http.post('/api/decrypt', { ciphertxt : txt})
			.then(function(resp) {
				alert(resp.data.output);
			}, function(e) {
				alert(e);
			});
			
	};

	$scope.Encrypt = function(txt) {
			$http.post('/api/encrypt', { plaintxt : txt})
			.then(function(resp) {
				alert(resp.data.output);
			}, function(e) {
				alert(e);
			});
		
	};

});



var app = angular.module('Cryptservice', ['ngResource', 'ngMaterial', 'ngAnimate', 
	'ngAria', 'ngMessages', 'ui.router']);

app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('brown');
});
     
app.config(function($stateProvider, $urlRouterProvider){  
	$urlRouterProvider.otherwise("/");
    $stateProvider
        .state('default', 
	{ url: "/",
	templateUrl: '/public/partials/cryptform.html', 
	controller: 'Cryptctrl'}
	);
}).controller('Cryptctrl', function($scope, $http){  

	$scope.encryptapi = function() {
		$http.post('/api/decryptverify/', { name : "Girish"})
			.then(function(resp) {
				alert(resp.data.status);
			}, function(e) {
				alert("Create failed");
			});
			
	};

	$scope.decryptapi = function() {
			$http.post('/api/create', { name : "Girish"})
			.then(function(resp) {
				alert(resp.data.status);
			}, function(e) {
				alert("Create failed");
			});
		
	};

});



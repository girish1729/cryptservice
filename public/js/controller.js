var app = angular.module('Cryptservice', ['ngResource', 'ngMaterial', 'ngAnimate', 
	'ngAria', 'ngMessages', 'ui.router', 'Cipher']);

app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-orange')
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
})

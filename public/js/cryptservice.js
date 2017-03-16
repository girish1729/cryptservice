var app = angular.module('Cryptservice', 
	['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages',
	 'ngSanitize', 'hljs'
])

.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('brown');
        $mdThemingProvider.theme('brown')
            .backgroundPalette('brown');
        $mdThemingProvider.theme('dark-blue')
            .backgroundPalette('blue')
            .dark();
    })
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/activateuser/1/2');
            $stateProvider
                .state('activateuser', {
                    url: "/activateuser/:secret/:codedid",
                    templateUrl: "/public/partials/passwordreset.html",
                    controller: function ($scope, $http, $state, $stateParams, $mdToast) {
                        var secret = $stateParams.secret;
                        var codedid = $stateParams.codedid;

                        $scope.showSimpleToast = function (msg) {

                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(msg)
                                .position('bottom left')
                                .hideDelay(3000)
                            );
                        };

                        
                        $http.get('http://localhost:5000/decryptverify/' + secret + "/" + codedid)
                            .then(function (data) {
				u = data.data;
		    		var user_id = u.user_id;
                                getallusers(function (users) {
                                    users.forEach(function (val) {
                                        arr = val.split(',');
                                        id = arr[0];
                                        name = arr[1];
                                        getoneuser(id, function (id, user) {
                                            if (user.user_id == user_id) {
                                                $scope.activateuser = user;
                                            }
                                        });
                                    });
                                });
                            }, function (e) {
                                showSimpleToast(e.response);
                            });

                    }
                });
        }
    ]);

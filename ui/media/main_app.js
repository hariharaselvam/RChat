window.appName = 'RealChat';

window.logout = "/auth/logout/";

window[appName] = angular.module(appName, ['ui.router', 'ngValidator', 'ngSanitize', 'angularUtils.directives.dirPagination']);

window[appName].config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('dashboard', {
            url: '/home',
            templateUrl: 'ui/media/modules/dashboard/dashboard.html',
            controller: 'dashboard_controller'
        });

    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: 'ui/media/modules/profile/profile.html',
            controller: 'profile_controller'
        });

        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'ui/media/modules/login/login.html',
            controller: 'login_controller'
        });


        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';


});

window[appName].controller('app_controller', function ($rootScope, $scope, $state, $http, $window, $location, $q, $filter, $stateParams, $interval) {

    $scope.logout = function () {


        window.location = window.logout;


    };

    $rootScope.title = "Welcome to RealChat";
    $rootScope.showLoader = false;


    function processTheData(action, response) {
        log_plt(action, response);
        switch (action) {
            case 'session':

                $rootScope.user=response;
                if ($rootScope.user.first_name != "") {
                    $rootScope.user.loginname = $rootScope.user.first_name + ' ' + $rootScope.user.last_name + ' (' + $rootScope.user.username + ')';
                }
                else {
                    $rootScope.user.loginname = $rootScope.user.username;
                }


                break;

        }
    }


    $rootScope.name = "hariharaselvam";
    $rootScope.alert_message = "";
    $rootScope.alert_icon = "";

    $rootScope.alert="";
    $rootScope.alert_message="";
    $rootScope.alert_icon="";
     // HttpRequest("get", "session", "/user/view/", {});
    // http.Requests('get',"/user/view/", {})

  $http({
  method: 'GET',
  url: 'api/user/view/'
}).then(function successCallback(response) {
  console.log(response.data)
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});

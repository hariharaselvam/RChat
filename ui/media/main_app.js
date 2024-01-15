window.appName = 'RealChat'

window.logout = '/auth/logout/'

window[appName] = angular.module(appName, ['ui.router', 'ngValidator', 'ngSanitize', 'angularUtils.directives.dirPagination'])

window[appName].config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


  $urlRouterProvider.otherwise('/home')

  $stateProvider
    .state('dashboard', {
      url: '/home',
      templateUrl: 'ui/media/modules/dashboard/dashboard.html',
      controller: 'dashboard_controller'
    })

  $stateProvider
    .state('profile', {
      url: '/profile',
      templateUrl: 'ui/media/modules/profile/profile.html',
      controller: 'profile_controller'
    })

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'ui/media/modules/login/login.html',
      controller: 'login_controller'
    })


  $httpProvider.defaults.xsrfCookieName = 'csrftoken'
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'


})

window[appName].controller('app_controller', function ($rootScope) {


  $rootScope.title = 'Welcome to RealChat'


})

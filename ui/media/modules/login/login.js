window[appName].controller('login_controller', function ($rootScope, $scope, $state, $http) {




  $rootScope.title = 'Hari Chat | Login'
  $rootScope.token = ''
  $scope.username = ''
  $scope.password = ''
  $scope.error = ''
  $scope.login = function () {
    $scope.error = ''
    $http({
      method: 'POST', url: 'token?username=' + $scope.username + '&password=' + $scope.password
    }).then(function successCallback (response) {
      localStorage.setItem('token', response.data.access_token)
      if (response.data.access_token) {
        $state.go('dashboard');
      } else {
        $scope.error = response.data.detail
      }
      console.log(response.data)
    }, function errorCallback (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    })
  }




});

window[appName].controller('dashboard_controller', function ($rootScope, $scope, $state, $http, $window, $location, $q, $filter, $interval) {


  $rootScope.title = 'R Chat | Home'

  $scope.users = []
  $scope.groups = []
  $scope.text_message = 'Hello'
  $scope.messages = []
  $scope.user_id = ''
  $scope.user_name = ''
  $scope.admin = false
  $scope.chat = ''
  $scope.chat_name = ''
  $scope.chat_type = false
  $scope.members = []

  $scope.group_id = ''
  $scope.group_name = ''
  $scope.group_members = []
  $scope.group_owner = ''
  $scope.group_error = ''
  $scope.add_user = ''
  $scope.group_action = {status: true, message: ''}
  $scope.public_groups = []
  $scope.private_chats = []

  $scope.selected_user_name = ''
  $scope.selected_user_pass = ''
  $scope.selected_user_id = ''

  if (localStorage.getItem('token')) {
    $scope.token = localStorage.getItem('token')
  } else {
    $state.go('login')
  }

  $scope.select_chat = function (id, name, group) {
    $scope.chat = id
    $scope.chat_name = group ? name : $scope.get_name(name)
    $scope.chat_type = group
    $scope.get_message()
    if (!group) {
      $scope.select_user($scope.get_name(name), $scope.get_chat_member(name))
    }
  }
  $scope.send_message = function () {
    $http({
      method: 'POST',
      url: 'api/message/send/?content=' + text_message + '&chat=' + $scope.chat + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      $state.go('login')
    })
    $scope.content_text = ''
  }

  $scope.get_user = function () {

    $http({
      method: 'GET',
      url: 'api/user/me/?token=' + $scope.token
    }).then(function successCallback (response) {
      $scope.user_id = response.data.id
      $scope.user_name = response.data.username
      $scope.admin = response.data.admin
      $scope.get_groups()
      $scope.get_users()
    }, function errorCallback (response) {
      $state.go('login')
    })

  }

  $scope.close_chat = function () {
    $scope.chat = ''
    $scope.clear_group()
  }
  $scope.get_name = function (id) {
    if (id === $scope.user_id) {
      return $scope.user_name
    }
    filter_query = id.replace($scope.user_id, '').trim()
    console.log(filter_query)
    user = $scope.users.find(item => item.id === filter_query)
    return user ? user.username : 'Unknown'
  }

  $scope.get_chat_member = function (id) {
    return id.replace($scope.user_id, '').trim()
  }

  $scope.add_user_to_group = function (user_id) {
    if (!$scope.group_members.includes(user_id)) {
      $scope.group_members.push(user_id)
    }
  }
  $scope.remove_user_from_group = function (user_id) {
    member_name = $scope.get_name(user_id)
    if (confirm('Are you sure? You want to remove "' + member_name + '" from "' + $scope.group_name + '" Group ?')) {
      var index = $scope.group_members.indexOf(user_id)
      if (index !== -1) {
        $scope.group_members.splice(index, 1)
      }
    }
  }
  $scope.get_message = function () {

    if ($scope.chat === '') {
      return null
    }

    $http({
      method: 'GET',
      url: 'api/message/receive/?chat=' + $scope.chat
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.messages = response.data
    }, function errorCallback (response) {
      $state.go('login')
    })

  }
  $scope.get_users = function () {

    $http({
      method: 'GET',
      url: 'api/user/view/'
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.users = response.data
    }, function errorCallback (response) {
      $state.go('login')
    })
  }

  /* User management */


  $scope.clear_user = function () {
    $scope.selected_user_name = ''
    $scope.selected_user_pass = ''
    $scope.selected_user_id = ''
  }
  $scope.user_calls = function (method, url) {
    $http({
      method: method,
      url: 'api/user/' + url + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.clear_user()
      $scope.get_users()
    }, function errorCallback (response) {
      $state.go('login')
    })
  }
  $scope.select_user = function (user_name, id) {
    console.log(user_name, id)
    if ($scope.admin) {
      $scope.selected_user_name = user_name
      $scope.selected_user_pass = ''
      $scope.selected_user_id = id
    }
  }
  $scope.create_user = function () {
    let url = 'create/?username=' + $scope.selected_user_name + '&password=' + $scope.selected_user_pass
    $scope.user_calls('POST', url)
  }
  $scope.update_user = function () {
    let url = $scope.selected_user_id + '/update/?username=' + $scope.selected_user_name + '&password=' + $scope.selected_user_pass
    $scope.user_calls('PATCH', url)
  }
  $scope.delete_user = function () {
    if (confirm('Are you sure you want to delete the user ' + $scope.selected_user_name)) {
      let url = $scope.selected_user_id + '/delete/?name=yes'
      $scope.user_calls('DELETE', url)
    }
  }

  /* User management */

  /*  Group management */

  $scope.select_group = function (id, name, members, owner) {
    $scope.group_id = id
    $scope.group_name = name
    $scope.group_members = members.split(' ')
    $scope.group_owner = owner
    $scope.select_chat(id, name, true)
  }

  $scope.clear_group = function () {
    $scope.group_id = ''
    $scope.group_name = ''
    $scope.group_owner = ''
    $scope.group_members = []
  }

  $scope.save_group = function () {
    if ($scope.group_id === '') {
      $scope.create_group()
    } else {
      $scope.update_group()
    }
  }

  $scope.group_calls = function (method, url) {
    $http({
      method: method,
      url: 'api/chat/' + url + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.group_action = response.data
      $scope.clear_user()
      $scope.get_groups()
    }, function errorCallback (response) {
      $state.go('login')
    })
  }

  $scope.get_groups = function () {

    $http({
      method: 'GET',
      url: 'api/chat/view/?token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
      chats = response.data
      $scope.groups = response.data
      $scope.private_chats = chats.filter(item => item.is_group === false)
      $scope.public_groups = chats.filter(item => item.is_group === true)
      console.log($scope.private_chats)
    }, function errorCallback (response) {
      $state.go('login')
    })
  }
  $scope.create_group = function () {
    let url = 'create/?name=' + $scope.group_name + '&members=' + $scope.group_members.join(' ')
    $scope.group_calls('POST', url)
  }

  $scope.update_group = function () {
    let url = $scope.group_id + '/update/?name=' + $scope.group_name + '&members=' + $scope.group_members.join(' ')
    $scope.group_calls('PATCH', url)
  }

  $scope.leave_group = function () {
    if (confirm(' Are you sure, you want to leave from "' + $scope.group_name + '" group?')) {
      $scope.remove_user_from_group($scope.user_id)
      $scope.update_group()
    }
  }

  $scope.delete_group = function () {
    if (confirm(' Are you sure, you want to delete "' + $scope.group_name + '" group?')) {
      let url = $scope.group_id + '/delete/?name=yes'
      $scope.group_calls('DELETE', url)
    } else {
      console.log($scope.group_name + ' Group delete action cancelled!')
    }
  }
  /*  Group management */
  $interval($scope.get_message, 10000)
  $scope.get_user()

})

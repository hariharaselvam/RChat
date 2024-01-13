window[appName].controller('dashboard_controller', function ($rootScope, $scope, $state, $http, http, pin, graph, $window, $location, $q, $filter, $interval) {


  $rootScope.title = 'R Chat | Home'

  $scope.users = []
  $scope.groups = []
  $scope.content_text = ''
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
  $scope.add_user = ''
  $scope.public_groups = []
  $scope.private_chats = []

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
  }
  $scope.send_message = function (content_text) {
    if (content_text === '') {
      return null
    }
    $http({
      method: 'POST',
      url: 'api/message/send/?content=' + content_text + '&chat=' + $scope.chat + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
    }, function errorCallback (response) {
      $state.go('login')
    })
    $scope.content = ''
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

    $http({
      method: 'POST',
      url: 'api/chat/create/?name=' + $scope.group_name + '&members=' + $scope.group_members.join(' ') + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.clear_group()
      $scope.get_groups()
    }, function errorCallback (response) {
      $state.go('login')
    })

  }

  $scope.update_group = function () {

    $http({
      method: 'PATCH',
      url: 'api/chat/' + $scope.group_id + '/update/?name=' + $scope.group_name + '&members=' + $scope.group_members.join(' ') + '&token=' + $scope.token
    }).then(function successCallback (response) {
      console.log(response.data)
      $scope.clear_group()
      $scope.get_groups()
    }, function errorCallback (response) {
      $state.go('login')
    })
  }

  $scope.delete_group = function (group_id, group_name) {
    if (confirm(' Are you sure, you want to delete "' + group_name + '" group?')) {
      $http({
        method: 'DELETE', url: 'api/chat/' + group_id + '/delete/?token=' + $scope.token
      }).then(function successCallback (response) {
        console.log(response.data)
        $scope.get_groups()
      }, function errorCallback (response) {
        $state.go('login')
      })
    } else {
      console.log(group_name + ' Group delete action cancelled!')
    }


  }
  /*  Group management */
  $interval($scope.get_message, 10000)
  $scope.get_user()

})

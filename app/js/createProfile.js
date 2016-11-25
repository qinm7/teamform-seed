angular.module('teamformApp')
  //everything that changes view is in controller
  //everything that's an object is in the factory
  .factory('myProfileService', function () {
    var queryData = function () {
      //what did we need this for agan?
      if (userExists()) {
        database.ref('TeamForm/users/' + user.uid).once('value', function (info) {
          userInfo = info.val();
        });
        return userInfo;
      }
    };
    return {
      queryData
    }
  })

  .controller("myProfileCtrl", ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseObject',
    function ($scope, $state, $stateParams, $firebaseArray, $firebaseObject) {
      $scope.currentUser = firebase.auth().currentUser;
      var database = firebase.database();
      $scope.user = {};
      $scope.isAdmin = false;
      database.ref('TeamForm/users/' + $stateParams.id).once('value', function (info) {
        $scope.user = info.val();
        $scope.tags = info.val().tags.join(", ");
        $scope.isAdmin = $scope.currentUser.uid == $stateParams.id;
        $scope.$digest();
      });

      var teams = [];
      var teamsRef = database.ref('TeamForm/RelationUT/').orderByChild("user").equalTo($stateParams.id);
      $firebaseArray(teamsRef).$loaded().then(function (data) {
        data.forEach(function (value) {
          $firebaseObject(firebase.database().ref("TeamForm/teams/" + value.team)).$loaded().then(function (data) {
            teams.push(data.name);
            $scope.teams = teams.join(", ");
          });
        });
        

      });

      $scope.submit = function () {
        var re = new RegExp(", |,");
        var tags = $scope.tags.split(re);
        var teams = $scope.teams.split(re);
        if (tags[tags.length - 1] == "") {
          tags.splice(tags.length - 1, 1);
        }

        $scope.user.tags = tags;
        database.ref('TeamForm/users/' + $stateParams.id).update({
          name: $scope.user.name,
          description: $scope.user.description,
          tags: $scope.user.tags
        });

      };

    }
  ]);
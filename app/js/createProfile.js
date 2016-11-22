angular.module('teamformApp')
  //everything that changes view is in controller
  //everything that's an object is in the factory

  .controller("myProfileCtrl", ['$scope', '$state',
    function ($scope, $state) {

      var userInfo = {};
      var user;
      var tagString;
      var teamString;
      var database = firebase.database();
      var isAdmin;

      var queryData = function () {
        if (userExists()) {
          database.ref('TeamForm/users/' + user.uid).once('value', function (info) {
            userInfo = info.val();
          });
          return userInfo;
        }
      };

      var submit = function () {
        var re = new RegExp(", |,");
        var tags = tagString.split(re);
        var teams = teamString.split(re);
        if (tags[tags.length - 1] == "") {
          tags.splice(tags.length - 1, 1);
        }
        if (teams[teams.length - 1] == "") {
          teams.splice(teams.length - 1, 1);
        }

        userInfo.tags = tags;
        userInfo.teams = teams;
        database.ref('TeamForm/users/' + user.uid).update({ name: userInfo.name, description: userInfo.description, tags: userInfo.tags });

      };

      $scope.queryData = function () {
        myProfileService.queryData();
      };
      $scope.submit = function () {
        myProfileService.submit();
      }
      $scope.getName = myProfileService.getName();
      $scope.getDesc = myProfileService.getDesc();
      $scope.getTags = myProfileService.getTags();
      $scope.getTeams = myProfileService.getTeams();
    }
  ]);
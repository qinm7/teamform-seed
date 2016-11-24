var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray',
  function ($scope, $firebaseArray) {
    $scope.searchText = "";
    // $scope.startSearch = function(){
    //   $scope.events = searchService.startSearchEvent($scope.searchText)
    // };
    var ref = firebase.database().ref('TeamForm/events');
    $scope.events = $firebaseArray(ref);
  }])
  .controller('eventCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
    function ($scope, $firebaseObject, $stateParams, $firebaseArray) {
      var ref = firebase.database().ref('TeamForm/events/' + $stateParams.id);
      var admin = firebase.auth().currentUser;
      var refTeams = firebase.database().ref('TeamForm/teams/').orderByChild("event").equalTo($stateParams.id);
      $firebaseObject(ref).$loaded().then(function (data) {
        $scope.isAdmin = data.admin == admin.uid;
        $scope.event = data;
      });

      //$scope.teams = $firebaseArray(refTeams);
      $scope.teams = $firebaseArray(refTeams);
      //console.log($scope.teams);
      //console.log($scope.teams);


    }])

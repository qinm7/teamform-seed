var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray',
  function($scope, $firebaseArray){
      var ref= firebase.database().ref('TeamForm/events');
      $scope.events = $firebaseArray(ref);
}]);
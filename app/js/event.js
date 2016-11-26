var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray', 'searchService',
  function ($scope, $firebaseArray, searchService) {
    $scope.searchText = "";
    // $scope.startSearch = function(){
    //   $scope.events = searchService.startSearchEvent($scope.searchText)
    // };
    var ref = firebase.database().ref('TeamForm/events');
    $scope.events = $firebaseArray(ref);
    $scope.searchText;

    $scope.startSearch = function(){
        searchService.startSearch($scope.searchText, $scope.events);
        //if($scope.events.length == 0) alert("your search had no matches");
      }
      

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

      ///////////
				
	 var eventInfo;
     database.ref("TeamForm/events/" + $stateParams.id).once("value").then(function(snapshot){
			eventInfo = snapshot.val();
	 });
	if(eventInfo == null )
		alert("No event is found, try again");
    document.getElementById("eventName").innerHTML = eventInfo.name;
    document.getElementById("eventDescription").innerHTML  = eventInfo.description;
		


    }])

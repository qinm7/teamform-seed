var app = angular.module("teamformApp"); 

app.controller("searchCtrl", ['$scope',
	function($scope) {
	
		var eventInfo = {};
		var event = "test1";
		var eventID = null;
		var teams = {};
		var name = "default";
		$scope.searchText = "";
		$scope.startSearch = function() {
			var flag = false;
			var text = $scope.searchText;
			var database = firebase.database();
			var query = database.ref("TeamForm/events/");
			query.once("value").then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
				
					var name = childSnapshot.child("name").val();
					if(name == text){
						event = name;
						eventID = childSnapshot.key;
						flag = true;
					}
					var tags = childSnapshot.child("tags");
					tags.forEach(function(tagSnapshot){
						if(tagSnapshot.val() == text) {
							event = name;
							eventID = childSnapshot.key;
							flag = true;
						}
					});
				});
			if(event == null) {
				$scope.searchText = "Event doesn't exist, search another one!";
			}
			else{
				
				$scope.searchText = event;
				window.location= "#eventPage/"+ eventID;
				/*
				database.ref("TeamForm/teams/"+team).once("value").then(function(snapshot){
					teamInfo = snapshot.val();
				});
      			$scope.teamName = teamInfo.name;
				$scope.teamDescription = teamInfo.description;
				$scope.teamTags = teamInfo.tags;//return an array of tags
			
				*/
				
				
			}
			
		}); 
	}
}])


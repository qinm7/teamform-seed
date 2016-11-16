var app = angular.module("teamformApp"); 

app.controller("searchCtrl", ['$scope',
	function($scope) {

		$scope.name = "BestTeamEver";
		$scope.description="default description of the team";
		$scope.tag1 = "tag1";
		$scope.tag2 = "tag2";
		$scope.tag3 = "tag3";
		$scope.tag4 = "tag4";

		$scope.searchText = "";
		$scope.startSearch = function() {
			var text = $scope.searchText;
			var team = null;
			var database = firebase.database();
			var query = database.ref("TeamForm/teams/");
			query.once("value").then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var key = childSnapshot.key;
					if(key == text || childSnapshot.child("tags/Art/" + text).exists() ||  childSnapshot.child("tags/Technology").exists()){
						team = key;
						return true;
					}
				});
			if(team == null) {
				$scope.searchText = "Team doesn't exist, search another one!";
			}
			else{

				$scope.searchText = team;

				var query
				$scope.searchText = team;
				$scope.name = team;
				
				

			}
			
		}); 
	}
}])
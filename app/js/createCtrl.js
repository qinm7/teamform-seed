// inject firebase service
var app = angular.module("teamform-46380", ["firebase"]); 

app.controller("createCtrl", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			admin:"",
			created: "",
			description: "",
			icon: "",
			id: "",
			members: [],
			name: "",
			public: true,
			tags: []
		}
		// sync with firebaseArray
		var ref = firebase.database().ref("teamform-46380");
		$scope.TeamForm.events = $firebaseArray(ref);

		$scope.addEvent = function() {
			
			// update the date
			if ( $scope.input.name != "" && $scope.input.description != "" ) {
				$scope.input.created = new Date().toString();
				// add an input event
				$scope.TeamForm.events.$add($scope.input);
			}
		}

	}
);
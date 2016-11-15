'use strict';
// inject firebase service
var app = angular.module('teamformApp');
app.controller('createCtrl',

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			admin:"",
			created: "",
			description: "",
			icon: "",
			teams: [],
			name: "",
			public: true,
			tags: []
		}

		$scope.addImage = function(){
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}

		// sync with firebaseArray
		var ref = firebase.database().ref("TeamForm/events/");
		$scope.events = $firebaseArray(ref);

		$scope.addEvent = function() {
			
			// update the date
			if ( $scope.input.name != "" && $scope.input.description != "" && $scope.tags != "") {
				$scope.input.admin = firebase.auth().currentUser.uid;
				$scope.input.created = new Date().toString();
				var re = new RegExp(", |,");
				var tags = $scope.tags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1,1);
				$scope.input.tags = tags;
				// add an input event
				$scope.events.$add($scope.input);
			}
		}

	}
);
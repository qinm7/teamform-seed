'use strict';
// inject firebase service
var app = angular.module('teamformApp');
app.controller('createTeamCtrl', 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray, $state, $stateParams) {

		$scope.input = {
			event: $stateParams.id, 
			admin:"",
			description: "",
			icon: "",
			members: [],
			prospects: [],
			name: "",
			public: true,
			tags: [],
            min: 0,
            max: 10
		}

		$scope.addImage = function(){
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}
        $scope.increaseMin = function(){
            if($scope.input.min<=$scope.input.max) $scope.input.min++;
        }
        $scope.decreaseMin = function(){
            if($scope.input.min>0) $scope.input.min--;
        }
        $scope.increaseMax = function(){
            if($scope.input.max<=25) $scope.input.max++;
        }
        $scope.decreaseMax = function(){
            if($scope.input.max>$scope.input.min) $scope.input.max--;
        }

		// sync with firebaseArray
		var ref = firebase.database().ref("TeamForm/teams/");
		$scope.teams = $firebaseArray(ref);

		$scope.addTeam = function() {
			
			// update the date
			if ( $scope.input.name != "" && $scope.input.description != "" && $scope.input.tags != "") {
				$scope.input.admin = firebase.auth().currentUser.uid;
				$scope.input.created = new Date().toString();
				var re = new RegExp(", |,");
				var tags = $scope.input.tags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1,1);
				$scope.input.tags = tags;
				// add an input event
				$scope.teams.$add($scope.input);
			}
		}

	}
);
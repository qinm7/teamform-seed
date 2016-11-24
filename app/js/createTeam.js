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

app.controller('editTeamCtrl', 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray, $state, $stateParams, $firebaseObject) {

		var database = firebase.database();
		var ref = database.ref("TeamForm/teams/" + $stateParams.id);
		$firebaseObject(ref).$loaded().then(function (info) {
			$scope.team = info;
			console.log($scope.team);
			$scope.tags = info.tags.join(", ");
			console.log($scope.tags);
			//$scope.$digest();
		});

		$scope.addImage = function(){
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}
        $scope.increaseMin = function(){
            if($scope.team.min<=$scope.team.max) $scope.team.min++;
        }
        $scope.decreaseMin = function(){
            if($scope.team.min>0) $scope.team.min--;
        }
        $scope.increaseMax = function(){
            if($scope.team.max<=25) $scope.team.max++;
        }
        $scope.decreaseMax = function(){
            if($scope.team.max>$scope.team.min) $scope.team.max--;
        }

		// sync with firebaseArray

		$scope.submit = function() {
			
			// update the date
			if ( $scope.team.name != "" && $scope.team.description != "" && $scope.team.tags != "") {
				//$scope.team.admin = firebase.auth().currentUser.uid;
				//$scope.t.created = new Date().toString();
				var re = new RegExp(", |,");
				var tags = $scope.tags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1,1);
				$scope.team.tags = tags;
				// add an input event
				database.ref('TeamForm/teams/' + $stateParams.id).update({
				name: $scope.team.name,
				description: $scope.team.description,
				tags: $scope.team.tags,
				min: $scope.team.min,
				max: $scope.team.max
			});
			}
		}




	})
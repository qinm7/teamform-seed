'use strict';
// inject firebase service
var app = angular.module('teamformApp');
app.controller('createEventCtrl',

	// Implementation the todoCtrl 
	function ($scope, $firebaseArray) {

		$scope.input = {
			admin: "",
			created: "",
			description: "",
			icon: "",
			name: "",
			tags: [""]
		}

		$scope.addImage = function () {
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}

		// sync with firebaseArray
		var ref = firebase.database().ref("TeamForm/events/");
		$scope.events = $firebaseArray(ref);

		$scope.addEvent = function () {

			// update the date
			if ($scope.input.name != "" && $scope.input.description != "" && $scope.tags != "") {
				$scope.input.admin = firebase.auth().currentUser.uid;
				$scope.input.created = new Date().toString();
				var re = new RegExp(", |,");
				var tags = $scope.tags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1, 1);
				$scope.input.tags = tags;
				// add an input event
				$scope.events.$add($scope.input);
			}
		}

	}
)
	.controller('editEventCtrl',
	// Implementation the todoCtrl 
	function ($scope, $firebaseArray, $stateParams) {
		var ref = firebase.database().ref("TeamForm/events/" + $stateParams.id);
		ref.once('value', function (info) {
			$scope.event = info.val();
			console.log(info.val().$id);
			$scope.tags = info.val().tags.join(", ");
			$scope.$digest();
		});

		$scope.submit = function () {
			var re = new RegExp(", |,");
			var tags = $scope.tags.split(re);
			if (tags[tags.length - 1] == "") {
				tags.splice(tags.length - 1, 1);
			}

			$scope.event.tags = tags;
			database.ref('TeamForm/events/' + $stateParams.id).update({
				name: $scope.event.name,
				description: $scope.event.description,
				tags: $scope.event.tags
			});

		};

	});
// $(document).ready(function(){

// 	$('#team_page_controller').hide();
// 	$('#text_event_name').text("Error: Invalid event name ");
// 	var eventName = getURLParameter("q");
// 	if (eventName != null && eventName !== '' ) {
// 		$('#text_event_name').text("Event name: " + eventName);

// 	}

// });

angular.module('teamformApp')
	.controller('teamCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
		function ($scope, $firebaseObject, $stateParams, $firebaseArray) {
			//internal variables

			var ref = firebase.database().ref('TeamForm/teams/' + $stateParams.id);
			$scope.users = [];
			$scope.prospectUsers = [];
			var user = firebase.auth().currentUser;
			var relid;
			var storage = firebase.storage();

			$firebaseObject(ref).$loaded().then(function (data) {
				$scope.team = data;
				$scope.isAdmin = user ? (user.uid == data.admin): false;
			});




			var refRelations = firebase.database().ref("TeamForm/RelationUT/");
			$scope.relations = $firebaseArray(refRelations);
			var calculate = function () {
				$scope.users = [];
				$scope.prospectUsers = [];
				$scope.joined = false;
				var refUsers = firebase.database().ref('TeamForm/RelationUT/').orderByChild("team").equalTo($stateParams.id);
				$firebaseArray(refUsers).$loaded().then(function (data) {
					data.forEach(function (value, index) {
						if (user && user.uid == value.user) {
							$scope.joined = true;
							relid = index;
						}
						if (value.accepted) {
							$firebaseObject(firebase.database().ref("TeamForm/users/" + value.user)).$loaded().then(function (data) {
								data.ref = value.$id;
								$scope.users.push(data);
							})
						} else {
							$firebaseObject(firebase.database().ref("TeamForm/users/" + value.user)).$loaded().then(function (data) {
								data.ref = value.$id;
								$scope.prospectUsers.push(data);
							})

						}
					})
				});
			}
			calculate();

			$scope.join = function () {
				$scope.relations.$add({ user: user.uid, team: $scope.team.$id, accepted: false });
				calculate();
			}

			$scope.accept = function (relID) {
				$scope.relations.$getRecord(relID).accepted = true;
				$scope.relations.$save($scope.relations.$getRecord(relID)).then(calculate);

			}


			//can also be used to reject user.
			$scope.leave = function () {
				$scope.relations.$remove(relid).then(calculate);
				//calculate();
			}

		}]);


'use strict';
// inject firebase service
var app = angular.module('teamformApp');
app.controller('createEventCtrl',

	// Implementation the todoCtrl 
	function ($scope, $firebaseArray, $state) {

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
				var currentUser = firebase.auth().currentUser;
				$scope.input.admin = currentUser.uid;
				$scope.input.created = new Date().toString();
				var inputtags = $('#event_tags').tokenfield('getTokensList');
				var re = new RegExp(", |,");
				var tags = inputtags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1, 1);
				$scope.input.tags = tags;
				$scope.input.icon = 'https://firebasestorage.googleapis.com/v0/b/teamform-46380.appspot.com/o/users%2Fprofile.png?alt=media&token=e9fc1bb3-adb0-4f4e-b490-057e738f68f0';
				// add an input event
				$scope.events.$add($scope.input).then(function(ref) {
					$state.go("eventPage", {id: ref.key});
				});
			}
		}

	}
)
	.controller('editEventCtrl',
	// Implementation the todoCtrl 
	function ($scope, $firebaseObject, $stateParams) {
		var database = firebase.database();
		var ref = database.ref("TeamForm/events/" + $stateParams.id);
		var storage = firebase.storage();
		$firebaseObject(ref).$loaded().then(function (info) {
			$scope.event = info;
			$scope.tags = info.tags;
			for(var i = 0; i < info.tags.length ; i++ ) {
				$('#event_tags').tokenfield('createToken', info.tags[i]);
			}
			
		});

		$scope.submit = function () {
			
			var inputtags = $('#event_tags').tokenfield('getTokensList');
			var re = new RegExp(", |,");
			var tags = inputtags.split(re);
			if (tags[tags.length - 1] == "")
				tags.splice(tags.length - 1, 1);

			$scope.event.tags = tags;
			database.ref('TeamForm/events/' + $stateParams.id).update({
				name: $scope.event.name,
				description: $scope.event.description,
				tags: $scope.event.tags
			});
		};

		// Image file upload
		$scope.upload = function() {
	        var fileUpload = document.getElementById('fileUpload');
	        fileUpload.addEventListener('change', function(e){
	          //get file
	          var file = e.target.files[0];
	          // create storage ref
	          var profileRef = storage.ref('events/'+ $stateParams.id+".png");
	          
	          // upload
	          var task = profileRef.put(file);
	          
	          // handle progress bar
	          task.on('state_changed', 
	            function progress(snapshot) {
	      
	            },
	            function error(err){
	            
	            },
	            function complete(){
	            storage.ref().child('events/'+ $stateParams.id+'.png').getDownloadURL().then(function(url){
			    	database.ref('TeamForm/events/' + $stateParams.id).update({icon: url});
			    }).catch(function(error){
			      alert('error');
			    });
	            alert('Upload Complete!');
	            });
	        });
	     }

	});
	


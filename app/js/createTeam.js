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
		var storage = firebase.storage();

		$scope.addImage = function(){
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}
        $scope.increaseMin = function(){
            if($scope.input.min< $scope.input.max) $scope.input.min++;
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
			if ( $scope.input.name != "" && $scope.input.description != "" && $scope.tags != "") {
				$scope.input.admin = firebase.auth().currentUser.uid;
				$scope.input.created = new Date().toString();
				var inputtags = $('#team_tags').tokenfield('getTokensList');
				var re = new RegExp(", |,");
				var tags = inputtags.split(re);
				if (tags[tags.length - 1] == "")
					tags.splice(tags.length - 1, 1);
				$scope.input.tags = tags;
				$scope.input.icon = 'https://firebasestorage.googleapis.com/v0/b/teamform-46380.appspot.com/o/users%2Fprofile.png?alt=media&token=e9fc1bb3-adb0-4f4e-b490-057e738f68f0';
				// add an input event
				$scope.teams.$add($scope.input).then(function(ref) {
					console.log(ref.key);
					$state.go("teamPage", {id: ref.key});
				});
			}
		}
	}
);

app.controller('editTeamCtrl', 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray, $state, $stateParams, $firebaseObject) {

		var database = firebase.database();
		var storage = firebase.storage();
		var ref = database.ref("TeamForm/teams/" + $stateParams.id);
		$firebaseObject(ref).$loaded().then(function (info) {
			$scope.team = info;
			$scope.tags = info.tags;
			for(var i = 0; i < info.tags.length ; i++ ) {
				$('#team_tags').tokenfield('createToken', info.tags[i]);
			}
		});


		$scope.addImage = function(){
			$scope.input.icon = prompt("Add your Image URL", "default.jpg");
		}
        $scope.increaseMin = function(){
            if($scope.team.min < $scope.team.max) $scope.team.min++;
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

				var inputtags = $('#team_tags').tokenfield('getTokensList');
				var re = new RegExp(", |,");
				var tags = inputtags.split(re);
				if (tags[tags.length - 1] == "")
				tags.splice(tags.length - 1, 1);
				$scope.team.tags = tags;
				// add an input event
				database.ref('TeamForm/teams/' + $stateParams.id).update({
				name: $scope.team.name,
				description: $scope.team.description,
				tags: $scope.team.tags,
				min: $scope.team.min,
				max: $scope.team.max,
			});
			}
		}

		// Image file upload
		$scope.upload = function() {
	        var fileUpload = document.getElementById('fileUpload');
	        fileUpload.addEventListener('change', function(e){
	          //get file
	          var file = e.target.files[0];
	          // create storage ref
	          var profileRef = storage.ref('teams/'+ $stateParams.id+".png");
	          
	          // upload
	          var task = profileRef.put(file);
	          
	          // handle progress bar
	          task.on('state_changed', 
	            function progress(snapshot) {
	      
	            },
	            function error(err){
	            
	            },
	            function complete(){
	            storage.ref().child('teams/'+ $stateParams.id+'.png').getDownloadURL().then(function(url){
			    	database.ref('TeamForm/teams/' + $stateParams.id).update({icon: url});
			    }).catch(function(error){
			      alert('error');
			    });
	            alert('Upload Complete!');
	            });
	        });
	      }
	})
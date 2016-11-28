angular.module('teamformApp')
  //everything that changes view is in controller
  //everything that's an object is in the factory

  .controller("myProfileCtrl", ['$scope', '$state', '$stateParams', '$firebaseArray', '$firebaseObject',
    function ($scope, $state, $stateParams, $firebaseArray, $firebaseObject) {
      $scope.currentUser = firebase.auth().currentUser;
      var database = firebase.database();
      var storage = firebase.storage();
      $scope.user = {};
      $scope.isAdmin = false;
      database.ref('TeamForm/users/' + $stateParams.id).once('value', function (info) {
        $scope.user = info.val();
        $scope.tags = info.val().tags;
			for(var i = 0; i < info.val().tags.length ; i++ ) {
				$('#profile_tags').tokenfield('createToken', info.val().tags[i]);
			}
        // $scope.tags = info.val().tags;
//         console.log($scope.tags);
        $scope.isAdmin = $scope.currentUser ? $scope.currentUser.uid == $stateParams.id : false;
        $scope.$digest();
      });

      var teams = [];
      var teamsRef = database.ref('TeamForm/RelationUT/').orderByChild("user").equalTo($stateParams.id);
      $firebaseArray(teamsRef).$loaded().then(function (data) {
        data.forEach(function (value) {
          $firebaseObject(firebase.database().ref("TeamForm/teams/" + value.team)).$loaded().then(function (data) {
            teams.push({name: data.name, ref: data.$id});
          });
        });
        $scope.teams = teams;
      });


      $scope.submit = function () {
      var inputtags = $('#profile_tags').tokenfield('getTokensList');
       var re = new RegExp(", |,");
		var tags = inputtags.split(re);
		if (tags[tags.length - 1] == "")
			tags.splice(tags.length - 1, 1);

        $scope.user.tags = tags;
        database.ref('TeamForm/users/' + $stateParams.id).update({
          name: $scope.user.name,
          description: $scope.user.description,
          tags: $scope.user.tags
        });

      };

      $scope.upload = function () {
        var fileUpload = document.getElementById('fileUpload');
        fileUpload.addEventListener('change', function (e) {
          //get file
          var file = e.target.files[0];
          // create storage ref
          var profileRef = storage.ref('users/' + $scope.currentUser.uid + ".png");

          // upload
          var task = profileRef.put(file);

          // handle progress bar
          task.on('state_changed',
            function progress(snapshot) {

            },
            function error(err) {

            },
            function complete() {
              var imgSrc;
              storage.ref().child('users/' + $scope.currentUser.uid + '.png').getDownloadURL().then(function (url) {
                imgSrc = url;
                database.ref('TeamForm/users/' + $stateParams.id).update({
                  profile_picture: imgSrc
                });
              }).catch(function (error) {

              });
              alert('upload complete!');
            });
        });
      };


    }
  ]);
angular.module('teamformApp')
  //everything that changes view is in controller
  //everything that's an object is in the factory
  .factory('myProfileService', function () {
    var queryData = function () {
      //what did we need this for agan?
      if (userExists()) {
        database.ref('TeamForm/users/' + user.uid).once('value', function (info) {
          userInfo = info.val();
        });
        return userInfo;
      }
    };
    return {
      queryData
    }
  })

  .controller("myProfileCtrl", ['$scope', '$state', '$stateParams',
    function ($scope, $state, $stateParams) {
      $scope.currentUser = firebase.auth().currentUser;
      var database = firebase.database();
      var storage = firebase.storage();
      $scope.user = {};
      $scope.isAdmin = false;
      database.ref('TeamForm/users/' + $stateParams.id).once('value', function (info) {
        $scope.user = info.val();
        $scope.tags = info.val().tags.join(", ");
        $scope.isAdmin = $scope.currentUser ? $scope.currentUser.uid == $stateParams.id : false;
        $scope.$digest();
      });

      $scope.teams = " ";
      storage.ref().child('users/'+ firebase.auth().currentUser.uid+'.png').getDownloadURL().then(function(url){
        $scope.imgSrc = url;
      }).catch(function(error){
        // if there is no profile image get a default image.
        $scope.imgSrc = 'https://firebasestorage.googleapis.com/v0/b/teamform-46380.appspot.com/o/users%2Fprofile.png?alt=media&token=e9fc1bb3-adb0-4f4e-b490-057e738f68f0';
      });
      
      $scope.submit = function () {
        var re = new RegExp(", |,");
        var tags = $scope.tags.split(re);
        var teams = $scope.teams.split(re);
        if (tags[tags.length - 1] == "") {
          tags.splice(tags.length - 1, 1);
        }

        $scope.user.tags = tags;
        database.ref('TeamForm/users/' + $stateParams.id).update({
          name: $scope.user.name,
          description: $scope.user.description,
          tags: $scope.user.tags
        });

      };

      $scope.upload = function() {
        var fileUpload = document.getElementById('fileUpload');
        fileUpload.addEventListener('change', function(e){
          //get file
          var file = e.target.files[0];
          // create storage ref
          var profileRef = storage.ref('users/'+ firebase.auth().currentUser.uid+".png");
          
          // upload
          var task = profileRef.put(file);
          
          // handle progress bar
          task.on('state_changed', 
            function progress(snapshot) {
      
            },
            function error(err){
            
            },
            function complete(){
            alert('upload complete!');
            });
        });
      };


    }
  ]);
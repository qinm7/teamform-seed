//create new module
var app = angular.module("teamformApp");
app.factory('loginService', function ($location) {

});


//handels ng-hide and click events to show or hide login button
app.controller("AuthCtrl", ['$scope', '$state', '$firebaseArray',
  function ($scope, $state, $firebaseArray) {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    var database = firebase.database();
    var storage = firebase.storage();
    //define show or hide login resp logout button

    //call login function on click
    $scope.login = function ($scope, $state) {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        //$scope.$digest();
        var user = result.user;
        var ref = database.ref('TeamForm/users');
        ref.once('value', function (snapshot) {
          if (!snapshot.hasChild(user.uid)) {
            console.log("wtf is going on");
            database.ref('TeamForm/users/' + user.uid).set({
              name: user.displayName,
              email: (user.email ? (user.email) : null),
              profile_picture: user.photoURL,
              description: "Hi there! My name is " + user.displayName,
              tags: [""]
            });
          }
          
        });
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

    };

    //change value of isLogged in if user logs in or out
    firebase.auth().onAuthStateChanged(function (user) {
      $scope.isLoggedIn = user;
      $scope.$digest();

    });
    //call logout function on click
    $scope.logout = function () {
      alert("Goodbye!");
      firebase.auth().signOut();
    };

  }]);

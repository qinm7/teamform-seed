'use strict';
//create new module
var app = angular.module('teamformApp');
app.factory('loginService', function () {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  var database = firebase.database();
  var storage = firebase.storage();
  var user;
  return {
    login: function ($scope) {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // ...some useful variables
        var displayName = $scope.user.displayName;
        var email = $scope.user.email;
        var emailVerified = $scope.user.emailVerified;
        var photoURL = $scope.user.photoURL;
        var isAnonymous = $scope.user.isAnonymous;
        var uid = $scope.user.uid;
        var providerData = $scope.user.providerData;


      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });


    },
    updateUser: function ($scope) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          database.ref('TeamForm/users/' + user.uid).set({
            name: user.displayName,
            email: (user.email ? (user.email) : null),
            profile_picture: user.photoURL,
            description: "Hi there! My name is " + user.displayName
          });
        }
      });
    },

    logout: function () {
      firebase.auth().signOut();
    }
  }
});

app.controller("AuthCtrl", ['$scope',
  function ($scope, loginService) {
    $scope.isLoggedIn;

    $scope.login = function () {
      $scope.isLoggedIn=true;
    };

    $scope.logout = function () {
      $scope.isLoggedIn=false;
    };

  }]);

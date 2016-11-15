var app = angular.module('teamformApp');


app.factory('myProfileService', function () {
  var database = firebase.database();
  var userInfo={};
  var user;
  var tagString;
  var teamString;
  //function to retrive all data and display text
  //edit button when triggered changes text to textboxes (done in the controller)
  //^^ also saves changes made in textbox to database
  var userExists = function () {
      user = firebase.auth().currentUser;
      return user;
    }
      var queryData = function(){
      if(userExists()){
        database.ref('TeamForm/users/' + user.uid).once('value', function(info){
          userInfo = info.val();
      });
      return userInfo;
      }
    }  
  return {
    
    userExists,
    queryData,

    getName: function(){
      return userInfo.name;
    },
    getDesc: function(){
      return userInfo.description;
    },
    getTags: function(){
      tagString = userInfo.tags.join(',');
      return tagString;
    },
    getTeams: function(){
      teamString = userInfo.teams.join(',');
      return teamString;
    },
    setName: function(value){
      userInfo.name = value;
    },
    setDesc: function(value){
      userInfo.description = value;
    },
    setTags: function(value){
      tagString = value;
    },

    submit: function(){
				var re = new RegExp(", |,");
				var tags = tagString.split(re);
        var teams = teamString.split(re);
				if (tags[tags.length - 1] == ""){
          tags.splice(tags.length - 1, 1);
        }
        if (teams[teams.length - 1] == ""){
          teams.splice(teams.length - 1, 1);
        }
					
				userInfo.tags = tags;
        userInfo.teams = teams;
				database.ref('TeamForm/users/' + user.uid).update({name: userInfo.name, description: userInfo.description, tags: userInfo.tags});
			
    }           

  }
});

//everything that changes view is in controller
//everything that's an object is in the factory

app.controller("myProfileCtrl", ['$scope', 'myProfileService', '$state',
  function ($scope, myProfileService, $state) {
    $scope.userExists = function () {
      myProfileService.userExists();
    };
       $scope.queryData = function () {
      myProfileService.queryData();
    };
    $scope.submit = function(){
      myProfileService.setName($scope.getName);
      myProfileService.setDesc($scope.getDesc);
      myProfileService.setTags($scope.getTags);
      myProfileService.submit();
    }
     $scope.getName = myProfileService.getName();
     $scope.getDesc = myProfileService.getDesc();
     $scope.getTags = myProfileService.getTags();
     $scope.getTeams = myProfileService.getTeams();
  }
]);
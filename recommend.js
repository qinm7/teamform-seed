var app = angular.module("teamformApp");

app.controller('RecommendCtrl', ['$scope', function($scope) {
  var database = firebase.database();
  var events = {};
  var teams = {};
  var tagArray = JSON.parse(tags);

  var getAllEvents = database.ref('TeamForm/events').once('value').then(function(snapshot) {
    events = snapshot.val();
    });

  var getAllTeams = function(eventID){
    val 
    database.ref('TeamForm/event/'+eventID+'/team').once('value').then(function(snapshot) {
       teamId = snapshot.val();
       ///TODO
    });
  };

  var comparetTagArrays = function(eventArray, userArray){
    var sum = 0;
    for(var i; i < eventArray.length; ++i){
        for(var j; j < userArray.length; ++j){
            if(eventArray[i] == userArray[j]) sum += 10;
            else if (eventArray[i] == userArray[j]);
        }
    }
  }
  this.recommendedEvents = function(){

  }

}]);
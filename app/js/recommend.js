var app = angular.module("teamformApp");

app.controller('RecommendCtrl', ['$scope', function($scope) {
  var database = firebase.database();
  var events = {};
  var teams = {};
  var tagArray = JSON.parse(tags);

  //finds subcategory associated to tag
  function getSub (tag){
    var sub = "";
    for(var i = 0; i < tags.length; ++i){
      if(tags[i].name == tag) sub = tags[i].Sub;
    }
    return sub;
  }

  //finds category associated to tag
  function getCat (tag){
    var cat = "";
    for(var i = 0; i < tags.length; ++i){
      if(tags[i].name == tag) cat = tags[i].Cat;
    }
    return cat;
  }

  var getAllEvents = database.ref('TeamForm/events').once('value').then(function(snapshot) {
    events = snapshot.val();
    });

  var getAllTeams = function(eventID){
    val 
    database.ref('TeamForm/event/' + eventID + '/team').once('value').then(function(snapshot) {
       teamId = snapshot.val();
       ///TODO
    });
  };

  function comparetTagArrays(eventArray, userArray){
    var sum = 0;
    for(var i; i < eventArray.length; ++i){
        for(var j; j < userArray.length; ++j){
            if(eventArray[i] == userArray[j]) sum += 4;
            else if (eventArray[i] == getSub(userArray[j])) sum += 2;
                  else if (eventArray[i] == getCat(userArray[j])) sum += 1;
        }
    }
    return sum;
  }

  this.recommendedEvents = function(){
    getAllEvents();
     for(var i; i < eventArray.length; ++i){

     }


  }

}]);
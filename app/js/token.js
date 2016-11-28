var app = angular.module('teamformApp');
app.controller('tokenCtrl', function($scope) {

	$scope.tags = $('#tags').tokenfield({
     autocomplete: {
    source: ["Computer Science","Java","C++","Python","JavaScript","C","Assembly","Swift","AngularJS","Django",
	"Ruby-on-Rails","Node.js","asp.net","Math","Physics","Chemistry","Biology","Science","Art","Film","Photography","Photoshop",
	"Graphic Design","Painting","Drawing","Sculpting","Dance","Music","Acting","Singing","Food","Cooking","Baking",
	"Cake Decorating","Sports","Basketball","Baseball","Football","Tennis","Badminton","Squash","Swimming","Jogging","Hiking"],
    delay: 100
  },
  limit:10,
  createTokensOnBlur:true,
  showAutocompleteOnFocus: true
}).on('tokenfield:createtoken', function (event) {
	
  var exists = true;
  $.each(["Computer Science","Java","C++","Python","JavaScript","C","Assembly","Swift","AngularJS","Django",
	"Ruby-on-Rails","Node.js","asp.net","Math","Physics","Chemistry","Biology","Science","Art","Film","Photography","Photoshop",
	"Graphic Design","Painting","Drawing","Sculpting","Dance","Music","Acting","Singing","Food","Cooking","Baking",
	"Cake Decorating","Sports","Basketball","Baseball","Football","Tennis","Badminton","Squash","Swimming","Jogging","Hiking"], function(index, token) {
    if (token === event.attrs.value)
      exists = false;
  })
  var existingtokens = $(this).tokenfield('getTokens');
  $.each(existingtokens,function(index,token){
  	if(token.value === event.attrs.value)
  		exists = true;
  })
  if(exists === true)
    event.preventDefault();
});

	
})
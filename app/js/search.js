var app = angular.module("teamformApp");

app.factory("searchService",
	function () {

		var eventInfo = {};
		var event = "test1";
		var eventID = null;
		var teams = {};
		var name = "default";


		var startSearch = function (text, toReturn) {
			var events = [];
			var flag = false;
			var database = firebase.database();
			var query = database.ref("TeamForm/events/");
			query.once("value").then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					var name = childSnapshot.child("name").val();
					if (name == text) {
						var event = childSnapshot.val();
						event.$id = childSnapshot.key;
						events.push(event);
						console.log(event);
					} else {
						var tags = childSnapshot.child("tags");
						tags.forEach(function (tagSnapshot) {
							if (tagSnapshot.val() == text) {
								var event = childSnapshot.val();
								event.$id = childSnapshot.key;
								events.push(event);
								console.log(event);
							}
						});
					}
				});
				if (events.length == 0) alert("your search had no matches");
				console.log(events);
				toReturn =  events;

			});
			return;

		}

		return {
			startSearch,
		}
	})


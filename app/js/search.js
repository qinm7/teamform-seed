var app = angular.module("teamformApp");

app.factory("searchService",
	function () {

		var eventInfo = {};
		var event = "test1";
		var eventID = null;
		var teams = {};
		var name = "default";
		var events = [];
		//var searchText = "";
		var startSearch = function (text) {
			var flag = false;
			var database = firebase.database();
			var query = database.ref("TeamForm/events/");
			query.once("value").then(function (snapshot) {
				snapshot.forEach(function (childSnapshot) {

					var name = childSnapshot.child("name").val();
					if (name == text) {
						events.push(childSnapshot);
					} else {
						var tags = childSnapshot.child("tags");
						tags.forEach(function (tagSnapshot) {
							if (tagSnapshot.val() == text) {
								events.push(childSnapshot);
							}
						});
					}
				});

			});
			return events;
		}

		return {
			startSearch,
		}
	})


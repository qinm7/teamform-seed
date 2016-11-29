var app = angular.module('teamformApp');
app.controller('displayEventCtrl', ['$scope', '$firebaseArray',
    function ($scope, $firebaseArray) {
        $scope.searchText = "";
        var ref = firebase.database().ref('TeamForm/events');
        var backupEvents = $firebaseArray(ref);
        $scope.events = backupEvents;
        $scope.searchText;

        var startSearch = function (text) {
            var events = [];
            var flag = false;
            var database = firebase.database();
            var query = database.ref("TeamForm/events/");
            query.once("value").then(function (snapshot) {
                text = text.toLowerCase();
                snapshot.forEach(function (childSnapshot) {
                    var name = childSnapshot.child("name").val().toLowerCase();;
                    var desc = childSnapshot.child("description").val().toLowerCase();
                    var tests = name.search(text);
                    var descTest = desc.search(text);
                    if (tests >= 0) {
                        var event = childSnapshot.val();
                        event.$id = childSnapshot.key;
                        events.push(event);
                    } else if (descTest >= 0) {
                        var event = childSnapshot.val();
                        event.$id = childSnapshot.key;
                        events.push(event);
                    } else {
                        var tags = childSnapshot.child("tags");
                        tags.forEach(function (tagSnapshot) {
                            if (tagSnapshot.val() == text) {
                                var event = childSnapshot.val();
                                event.$id = childSnapshot.key;
                                events.push(event);
                            }
                        });
                    }
                });
                if (events.length == 0) alert("your search had no matches");
                $scope.events = events;
                $scope.$digest();

            });
            return;
        }

        $scope.startSearch = function () {
            startSearch($scope.searchText);
        }

    }])
    .controller('eventCtrl', ['$scope', '$firebaseObject', '$stateParams', '$firebaseArray',
        function ($scope, $firebaseObject, $stateParams, $firebaseArray) {
            var ref = firebase.database().ref('TeamForm/events/' + $stateParams.id);
            var admin = firebase.auth().currentUser;
            var refTeams = firebase.database().ref('TeamForm/teams/').orderByChild("event").equalTo($stateParams.id);
            var storage = firebase.storage();
            $firebaseObject(ref).$loaded().then(function (data) {
                $scope.isAdmin = admin ? data.admin == admin.uid : false;
                $scope.event = data;
            });

            $firebaseArray(refTeams).$loaded().then(function (teams) {
                $scope.teams = [];
                teams.forEach(function (team) {
                    
                    var teamsRef = firebase.database().ref('TeamForm/RelationUT/').orderByChild("team").equalTo(team.$id);
                    $firebaseArray(teamsRef).$loaded().then(function (teams) {
                        var toadTeam = team;
                        toadTeam.memberNbr = teams.length;
                        $scope.teams.push(toadTeam);
                    });
                });
                
            });
            $scope.searchText;

            var startSearch = function (text) {
                var teams = [];
                var flag = false;
                var database = firebase.database();
                text = text.toLowerCase();
                $firebaseArray(refTeams).$loaded().then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var name = childSnapshot.name.toLowerCase();;
                        var desc = childSnapshot.description.toLowerCase();
                        var tests = name.search(text);
                        var descTest = desc.search(text);
                        if (tests >= 0) {
                            var event = childSnapshot;
                            teams.push(event);
                        } else if (descTest >= 0) {
                            var event = childSnapshot;
                            teams.push(event);
                        } else {
                            var tags = childSnapshot.tags;
                            tags.forEach(function (tagSnapshot) {
                                if (tagSnapshot == text) {
                                    var event = childSnapshot;
                                    teams.push(event);
                                }
                            });
                        }
                    });
                    if (teams.length == 0) alert("your search had no match");
                    $scope.teams = teams;
                });
                return;
            }
            $scope.startSearch = function () {
                startSearch($scope.searchText);
            }
        }])

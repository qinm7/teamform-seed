var fileUpload = document.getElementById('fileUpload');
var progressbar = document.getElementById('progressbar');


fileUpload.addEventListener('change', function(e){
    alert('pp');
    //get file
    var file = e.target.files[0];
    // create storage ref
    var profileRef = firebase.storage().ref('users/'+ user.name);
    
    // upload
    var task = profileRef.put(file);
    
    // handle progress bar
    task.on('state_changed', 
        function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressbar.value = percentage;
        },
        function error(err){
        
        },
        function complete(){
        alert('upload complete!');
    }
    );
});

//// get ref to the firebase storage service.
//var storage = firebase.storage();
//// create a storage ref from our storage service. Root Reference
//var storageRef = storage.ref();
//
//// create a child ref
//var eventsRef = storageRef.child('events');
//var teamsRef = storageRef.child('teams');
//var usersRef = storageRef.child('users'); // usersRef points 'users'
//
//var profileRef = storageRef.child('users/profile.png');
//
//
//// Upload task
//var file = ;// using Blob API, calling put() method
//
//// Upload file to the path 'users/filename.png'
//// use property on Blob API to get our file name
//var uploadTask = storageRef.child('users/' + file.name).put(file);

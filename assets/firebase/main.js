
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUDQmozQtXbeeiA4EUp43q0ijm9neDLzk",
  authDomain: "tatooine-admin.firebaseapp.com",
  projectId: "tatooine-admin",
  storageBucket: "tatooine-admin.appspot.com",
  messagingSenderId: "376993696096",
  appId: "1:376993696096:web:2722bfd44e27f60f09b605",
  measurementId: "G-6Y1TQMS93L",
  databaseURL: "https://tatooine-admin-default-rtdb.asia-southeast1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);

var logoutRecorded = false;
firebase.auth();

function signOut() {

  var loggedUser = firebase.auth().currentUser;
  console.log(loggedUser.uid);
  firebase.auth().signOut().then(() => {

    markLogout(loggedUser.uid);
    console.log(loggedUser.uid);
    setInterval(function() {

      console.log("Running");
      if (logoutRecorded) {

        window.location.href = "/sign-in.html"
      }
    }, 100);

  }).catch((error) => {

    console.log('Signing Out Failed')
  });
}

function markLogout(uniqueID) {

  let logoutRef = firebase.database().ref('logout-record');

  var logoutData = logoutRef.push();
  logoutData.set({

      timestamp: moment().format('DD/MM/YYYY h:mm:ss a'),
      userID: uniqueID
    })
    .then(function() {

      console.log('Logout Recorded');
      logoutRecorded = true;
    })
    .catch(function(error) {

      console.log('Logout Not Recorded');
    });
}

var profileLoad = setInterval(profileDisplay, 100);

function profileDisplay() {

  if (firebase.auth().currentUser != null) {

    var userID = firebase.auth().currentUser;
    var userProfile = firebase.database().ref('user-database/' + userID.uid);
    userProfile.once("value", (snapshot) => {

      $(".profile-pic").attr("src", snapshot.val().profile.toString());
      for (var i = 0; i < document.getElementsByClassName("user-profile-name").length; i++) {
        
        document.getElementsByClassName("user-profile-name")[i].innerHTML = snapshot.val().user.toString();
      }
    });
    clearInterval(profileLoad);
  }
}

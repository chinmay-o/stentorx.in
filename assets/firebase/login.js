
document.getElementById('signin_form').addEventListener('submit', submitForm);

function submitForm(e) {

  e.preventDefault();

  var username = getInput('username');
  var credential = getInput('password');

  firebase.auth().signInWithEmailAndPassword(username, credential)
    .then((userCredential) => {

      // Signed in
      var user = userCredential.user;
      markLogin(user.uid);
      console.log('Signed In');
    })
    .catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function markLogin(uniqueID) {

  let loginRef = firebase.database().ref('login-record');

  var loginData = loginRef.push();
  loginData.set({

      timestamp: moment().format('DD/MM/YYYY h:mm:ss a'),
      userID: uniqueID
    })
    .then(function() {

      console.log('Login Recorded');
      window.location.href = window.location.pathname.split("/")[1] + "/admin"
    })
    .catch(function(error) {

      console.log('Login Not Recorded');
    });
}

function getInput(id) {

  return document.getElementById(id).value;
}

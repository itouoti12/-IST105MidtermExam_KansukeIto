
function authStateListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
    } else {
      signOut();
      location.href = 'index.html';
    }
  });
}

window.addEventListener('load', function () {

  authStateListener();

  document.getElementById('sign-out').addEventListener('click', function () {
    signOut();
  });


});

function signOut() {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
  });
}
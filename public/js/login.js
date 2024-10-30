function authStateListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log("user login successed", uid);
      location.href = "culturalconnections.html";
    } else {
      console.log("User is signed out");
    }
  });
}

window.addEventListener("load", function () {
  authStateListener();

  document
    .getElementById("sign-in-button")
    .addEventListener("click", function () {
      let provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log("Logging sucessfully", result.user);
          location.href = "culturalconnections.html";
        })
        .catch(function (error) {
          console.log("Logging fail", error);
        });
    });

  document.getElementById("sign-in-2").addEventListener("click", function () {
    let emailTxt = document.getElementById("email").value;
    let passtxt = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(emailTxt, passtxt)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        // ...
        console.log("Logging sucessfully");
        alert("Logging sucessfully");
        location.href = "listprojects.html";
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert("Logging fail");
        console.log("Logging fail", errorMessage);
      });
  });

  document
    .getElementById("sign-in-button-with-phone")
    .addEventListener("click", function () {
      // [START auth_phone_signin]
      const phoneNumber = getPhoneNumberFromUserInput();
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
        });
      // [END auth_phone_signin]
    });
});

function recaptchaRender() {
  /** @type {firebase.auth.RecaptchaVerifier} */
  const recaptchaVerifier = window.recaptchaVerifier;

  // [START auth_phone_recaptcha_render]
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
  // [END auth_phone_recaptcha_render]
}

function phoneSignIn() {
  // [START auth_phone_signin]
  const phoneNumber = getPhoneNumberFromUserInput();
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
    });
  // [END auth_phone_signin]
}
function getPhoneNumberFromUserInput() {
  let phone = document.getElementById("tel").value;
  return phone;
}

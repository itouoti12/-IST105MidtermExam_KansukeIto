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
      let phone = document.getElementById("tel").value;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );

      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;

          const code = getCodeFromUserInput();
          confirmationResult
            .confirm(code)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              var credential = firebase.auth.PhoneAuthProvider.credential(
                confirmationResult.verificationId,
                code
              );
              firebase.auth().signInWithCredential(credential);
              // ...
            })
            .catch((error) => {
              // User couldn't sign in (bad verification code?)
              // ...
            });
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          grecaptcha.reset(window.recaptchaWidgetId);

          // Or, if you haven't stored the widget ID:
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
        });
    });
});

$(document).ready(() => {
  // Getting references to our form and inputs
  let loginForm = $("#login-form");
  let emailInput = $("#inputEmail");
  let passwordInput = $("#inputPassword");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();

    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/user/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        if (res.admin) {
          window.location.replace("/admin");
        } else {
          window.location.replace("/fooditem");
        }
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

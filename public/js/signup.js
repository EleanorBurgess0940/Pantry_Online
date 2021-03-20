$(document).ready(() => {
  // Getting references to our form and input
  // console.log('something')
  let createForm = $(".createbtn");
  let signUpForm = $(".signupbtn");
  let emailInput = $("#email-input");
  let passwordInput = $("#password-input");
  let phoneInput = $("#phoneNumber-input");
  let addressInput = $("#address-input");
  let nameInput = $("#name-input");

  // close the modal by just clicking outside of the modal
  var modal = document.getElementById("id01");

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  var radioValue = "customer";
  // Role selection
  signUpForm.on("click", (event) => {
    console.log(radioValue);
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      phoneNumber: phoneInput.val().trim(),
      address: addressInput.val().trim(),
      name: nameInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.address,
      userData.phoneNumber,
      userData.name
    );
    emailInput.val("");
    passwordInput.val("");
  });

  createForm.on("click", (event) => {
    console.log(radioValue);
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      phoneNumber: phoneInput.val().trim(),
      address: addressInput.val().trim(),
      name: nameInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.address,
      userData.phoneNumber,
      userData.name
    );
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, address, phoneNumber, name) {
    // If role is customer create customer role
    $.post("/api/user", {
      email: email,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      name: name,
      permissionlevel: "0",
    })
      .then((data) => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    return;
    // Else if role is admin create a admin role
  }

  function createUser(
    email,
    password,
    address,
    phoneNumber,
    name,
    permissionlevel
  ) {
    // If role is customer create customer role
    $.post("/api/user", {
      email: email,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      name: name,
      permissionlevel: permissionlevel,
    })
      .then((data) => {
        window.location.replace("/userManagement");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    return;
    // Else if role is admin create a admin role
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

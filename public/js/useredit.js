$(document).ready(() => {
  //The reference to the form below and input
  let nameInput = $("#name-input");
  let emailInput = $("#email-input");
  let editId = $("#edit-id");
  let phoneInput = $("#phoneNumber-input");
  let addressInput = $("#address-input");
  let permissionInput = $("#permission-input");
  let editnameform = $(".editUsernamebtn");
  let editemailform = $(".editUseremailbtn");
  let editphoneform = $(".editUserphonebtn");
  let editaddressform = $(".editUseraddressbtn");
  let editpermissionform = $(".editUserpermissionbtn");

  const permissionform = document.forms.permedit;

  editnameform.on("click", (event) => {
    event.preventDefault();
    let editData = {
      name: nameInput.val().trim(),
      editId: editId.val(),
    };

    console.log(editData);
    editUserName(editData);
    // If we have an email and password, run the signUpUser function
    //editUser(editData.editFeild, editData.newValue, editData.editId);
  });

  editemailform.on("click", (event) => {
    event.preventDefault();
    let editData = {
      email: emailInput.val().trim(),
      editId: editId.val(),
    };

    console.log(editData);
    editUserEmail(editData);
    // If we have an email and password, run the signUpUser function
    //editUser(editData.editFeild, editData.newValue, editData.editId);
  });

  editphoneform.on("click", (event) => {
    event.preventDefault();
    let editData = {
      phoneNumber: phoneInput.val().trim(),
      editId: editId.val(),
    };

    console.log(editData);
    editUserPhone(editData);
  });

  editaddressform.on("click", (event) => {
    event.preventDefault();
    let editData = {
      address: addressInput.val().trim(),
      editId: editId.val(),
    };

    console.log(editData);
    editUserAddress(editData);
  });

  editpermissionform.on("click", (event) => {
    const checked = permissionform.querySelector(
      "input[name=permissionlevel]:checked"
    );
    event.preventDefault();
    let editData = {
      permissionlevel: checked.value,
      editId: editId.val(),
    };

    console.log(editData);
    editUserPermission(editData);
  });

  function editUserName(editId, editValue) {
    $.post("/api/editusername/" + editId, {
      editId: editId,
      name: editValue,
    })
      .then(() => {
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch();
    return;
  }

  function editUserEmail(editId, editValue) {
    console.log(editId);
    console.log(editValue);
    $.post("/api/edituseremail/" + editId, {
      editId: editId,
      email: editValue,
    })
      .then(() => {
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch();
    return;
  }

  function editUserPhone(editId, editValue) {
    console.log(editId);
    console.log(editValue);
    $.post("/api/edituserphone/" + editId, {
      editId: editId,
      phoneNumber: editValue,
    })
      .then(() => {
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch();
    return;
  }

  function editUserAddress(editId, editValue) {
    console.log(editId);
    console.log(editValue);
    $.post("/api/edituseraddress/" + editId, {
      editId: editId,
      address: editValue,
    })
      .then(() => {
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch();
    return;
  }

  function editUserPermission(editId, editValue) {
    console.log(editId.permissionlevel);
    console.log(editValue);
    $.post("/api/edituserpermission/" + editId, {
      editId: editId,
      permissionlevel: editId.permissionlevel,
    })
      .then(() => {
        window.location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch();
    return;
  }
});

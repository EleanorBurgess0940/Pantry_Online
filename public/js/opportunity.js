$(document).ready(() => {
  //The reference to the form below and input
  let addfoodItemForm = $(".addfoodItembtn");
  let nameInput = $("#name-input");
  let categoryInput = $("#category-input");
  let editInput = $("#edit-input");
  let valueInput = $("#value-input");
  let editId = $("#edit-id");
  let passwordInput = $("#password-input");
  let phoneInput = $("#phoneNumber-input");
  let addressInput = $("#address-input");
  let editname = $(".editUsernamebtn");

  $(document).on("click", ".deleteUserbtn", deleteUser);
  $(document).on("click", ".deleteFoodbtn", deleteFoodItem);
  $(document).on("click", ".shoppingCartAdd", shoppingCartAdd);

  function shoppingCartAdd() {
    var listItemData = $(this);
    var id = listItemData[0].value;
    console.log("hello");
    console.log(id);
    $.post("/api/shoppingCartadd/" + id, {
      id: id,
    });
  }

  claimfoodItem = (id) => {
    console.log(id);
    //make a request to the server to assign the foodItem with the id that you passing to this user
    $.ajax({
      url: "/api/user/claimfoodItem",
      type: "PUT",
      data: {
        id: id,
      },
    }).then(function (data) {
      console.log(data);
    });
    window.location.reload();
  };

  addfoodItemForm.on("click", (event) => {
    event.preventDefault();
    let foodItemData = {
      name: nameInput.val().trim(),
      category: categoryInput.val().trim(),
    };
    if (!foodItemData.name) {
      return;
    }
    if (!foodItemData.category) {
      return;
    }
    addfoodItem(foodItemData.name, foodItemData.category);
  });

  function addfoodItem(name, category) {
    $.post("/foodItem/api", {
      name: name,
      category: category,
    });
    location.reload();
  }

  function deleteFoodItem() {
    var listItemData = $(this);
    var id = listItemData[0].value;
    console.log(id);
    $.post("/api/deletefood/" + id, {
      id: id,
    });
    location.reload();
  }

  function deleteUser() {
    var listItemData = $(this);
    var id = listItemData[0].value;
    console.log(id);
    $.post("/api/deleteuser/" + id, {
      id: id,
    });
    location.reload();
  }

  function editUser() {
    console.log("here");
    console.log(nameInput.val);
  }

  function signUpUser(email, password, address, phoneNumber, name) {
    // If role is customer create customer role
    $.post("/api/user", {
      email: email,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      name: name,
      permissionlevel: "1",
    })
      .then((data) => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    return;
    // Else if role is admin create a admin role
  }
});

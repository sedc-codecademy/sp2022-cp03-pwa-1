

let resetPasswordInput = document.querySelector("#reset-password");
let confirmResetPasswordInput = document.querySelector("#confirm-reset-password");
let resetPasswordButton = document.querySelector("#reset-password-button");

resetPasswordButton.addEventListener("click", function () {
  comparePasswords();
})

function comparePasswords() {
  if (confirmResetPasswordInput.value != resetPasswordInput.value) return;
  else {
    resetPassword();
  }
}


// POST TO DB 

async function resetPassword() {

  try {
    let port = 5019;
    let url = "http://localhost:" + port + "/api/Users/reset-password";
    var response = await fetch(url, {
      method: "POST",
      headers: {
        //Authentication: localStorage.getItem("PasswordResetToken"),
        // Authorization:
        //   "Bearer" + localStorage.getItem("PasswordResetToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NewPassword: resetPasswordInput.value,
        ConfirmNewPassword: confirmResetPasswordInput.value,
        Token: localStorage.getItem("PasswordResetToken")
      }),
    });
    console.log(response);
    const res = await response.text();

    console.log(res);

    if (response.status == 200) {
      resetPasswordInput.value = "";
      confirmResetPasswordInput.value = "";
      localStorage.removeItem("PasswordResetToken");
    }
    else {
      setErrorMessage(res.error);
    }
  } catch (er) {
    console.log(er);
  }
}






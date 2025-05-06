document.addEventListener("DOMContentLoaded", (event) => {
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  let loginBtn = document.getElementById("login-btn");

  loginBtn.addEventListener("click", async (e) => {
    event.preventDefault(); // Prevent the default form submission

    var uname = document.getElementById("uname").value.trim();
    var password = document.getElementById("psw").value;

    if (!uname || !password ) {
        alert("All fields are required!");
        return;
      }

    // alert(`${uname} - ${password}`);
    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("psw", password);
    formData.append("csrfmiddlewaretoken", csrftoken);


    try {
      const response = await fetch("/account/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
    } else {
        const data = await response.json();
        if (data.success) {
            // alert(`Success: ${data.message}`);
            // alert(data.userdata)
            object = data.userdata;
            localStorage.setItem("username", JSON.stringify(object))

            window.location.replace("/user/dashboard");
            // Handle valid user case
        } else {
            alert(`Error: ${data.message}`);
            // Handle invalid user case
        }
    }
    } catch (error) {
      alert(`"AJAX request failed:", ${error}`);
      // Handle network errors or other unexpected issues
    }
  });

  document
  .getElementById("togglePassword")
  .addEventListener("change", function () {
    const password = document.getElementById("psw");
    // const confirmPassword = document.getElementById("confirmPass");

    if (this.checked) {
      password.type = "text";
      confirmPassword.type = "text";
    } else {
      password.type = "password";
      confirmPassword.type = "password";
    }
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const signupForm = document.getElementById("signupForm");
  let signUpBtn = document.getElementById("sign-up-btn");
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent form from submitting traditionally

    // Validation checks
    var fname = document.getElementById("fname").value.trim();
    var email = document.getElementById("email").value.trim();
    var uname = document.getElementById("uname").value.trim();
    var pass = document.getElementById("pass").value;
    var confirmPass = document.getElementById("confirmPass").value;

   
    if (!fname || !uname || !email || !pass || !confirmPass) {
      alert("All fields are required!");
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorBorder(
        document.getElementById("email"),
        "Please enter a valid email address."
      );
      return;
    } else {
      clearErrorBorder(document.getElementById("email"));
    }

    if (pass !== confirmPass) {
      setErrorBorder(
        document.getElementById("pass"),
        "Passwords do not match."
      );
      setErrorBorder(
        document.getElementById("confirmPass"),
        "Passwords do not match."
      );
      return;
    } else {
      clearErrorBorder(document.getElementById("pass"));
      clearErrorBorder(document.getElementById("confirmPass"));
    }

    let password = document.getElementById("pass");
    if (password.value.length < 8) {
      setErrorBorder(password, "Password must be 8 or more characters.");
      return;
    } else if (!/\d/.test(password.value)) {
      setErrorBorder(password, "Password must include at least one number.");
      return;
    } else if (!/[a-zA-Z]/.test(password.value)) {
      setErrorBorder(password, "Password must include at least one letter.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
      setErrorBorder(
        password,
        "Password must include at least one symbol (e.g., !, @, #)."
      );
      return;
    } else {
      clearErrorBorder(password);

      clearErrorBorder(document.getElementById("confirmPass"));

      // Proceed with form submission or further processing
      console.log("Password validation passed.");
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("uname", uname);
    formData.append("email", email);
    formData.append("pass", pass);

    // Send the AJAX request to the Django view
    try {
      const response = await fetch("/account/sign-up", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Await the parsing of JSON response
        if (data.success) {
          // alert('Form submitted successfully!');
          document.getElementById("userModal").style.display = "block";
          // Optionally, handle success response (e.g., clear form, redirect)
          document.getElementById("continue").addEventListener("click", (e) => {
            window.location.href = "/account/login";
          });
        } else {
          // If the server responds with success: false in the JSON payload
          alert(
            "Submission was not successful. Please check the data you have entered."
          );
        }
      } else {
        // If the response status code is not in the 200-299 range
        alert(
          `Error submitting form. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }

    // // If validation passes, store data in an object
    // var userData = {
    //     firstName: fname,
    //     userName: uname,
    //     email: email,
    //     password: pass // Note: Storing passwords like this in practice is insecure
    // };

    // // Display the modal and show the user data (implement displayModal and showModalData functions based on your modal's structure)
    // submitFormAjax();
    // displayModal(userData);
  });

  function submitFormAjax() {
    const formData = new FormData(signupForm);
    const csrfToken = formData.get("csrfmiddlewaretoken"); // Get CSRF token from form

    fetch("/account/sign-up", {
      // Replace with your Django view URL
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Handle success, e.g., redirect or show a success message
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle failure, e.g., show an error message
      });
  }

  document.querySelector(".cancelbtn").addEventListener("click", function () {
    // Option 1: If all input fields are within a specific form, replace 'formId' with your form's ID

    var form = document.getElementById("formId");
    form.reset();

    // Option 2: If input fields are not within a form or you want to specify a container, replace 'containerId' with your container's ID
    // var inputs = document.querySelectorAll('#containerId input');
    // inputs.forEach(function(input) {
    //     input.value = '';
    // });

    // Optionally, clear custom error messages or styles
    clearAllErrorMessages();
    clearAllErrorStyles();
  });

  function clearAllErrorMessages() {
    // Assuming error messages are in <div> elements with class 'error'
    var errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach(function (message) {
      message.textContent = ""; // Clears the text
      message.style.display = "none"; // Hides the error message element
    });
  }

  function clearAllErrorStyles() {
    // Assuming input fields with errors have class 'inputError'
    var errorInputs = document.querySelectorAll(".inputError");
    errorInputs.forEach(function (input) {
      input.classList.remove("inputError"); // Remove the error class
      input.style.border = ""; // Reset custom border styles
    });

    clearErrorBorder(document.getElementById("email"));
    clearErrorBorder(document.getElementById("pass"));
    clearErrorBorder(document.getElementById("confirmPass"));
  }

  function setErrorBorder(element, errorMessage) {
    element.style.border = "2px solid red";
    const errorElementId = element.id + "Error"; // Assuming an error element's ID is the input's ID + 'Error'
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      errorElement.style.fontSize = "0.5rem";
      errorElement.style.color = "red";
    }
  }

  function clearErrorBorder(element) {
    element.style.border = ""; // Remove the border style
    const errorElementId = element.id + "Error";
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  function displayModal(userData) {
    // Assuming you have a modal with an ID 'userModal' and a paragraph with ID 'userDataDisplay' to display user data
    var userDataDisplay = document.getElementById("userDataDisplay");
    var displayText = `First Name: ${userData.firstName}\nUsername: ${userData.userName}\nEmail: ${userData.email}`;
    userDataDisplay.textContent = displayText;

    // Show the modal
    document.getElementById("userModal").style.display = "block";

    // Listen for the cancel button click to clear data
    document.getElementById("cancelBtn").addEventListener("click", function () {
      // Clear input fields
      document.getElementById("fname").value = "";
      document.getElementById("uname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      document.getElementById("confirmPass").value = "";

      // Hide the modal
      document.getElementById("userModal").style.display = "none";
    });
  }

  document
    .getElementById("togglePassword")
    .addEventListener("change", function () {
      const password = document.getElementById("pass");
      const confirmPassword = document.getElementById("confirmPass");

      if (this.checked) {
        password.type = "text";
        confirmPassword.type = "text";
      } else {
        password.type = "password";
        confirmPassword.type = "password";
      }
    });
});

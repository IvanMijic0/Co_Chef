// Get the submit buttons
const loginButton = document.getElementById("loginButton");
const signUpButton0 = document.getElementById("signUpButton0");

loginButton.disabled = true;
signUpButton0.disabled =  true;

// Com


// Login form validation
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("input", function (event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;

    if (inputElement.id === "username") {
        if (!isValidEmail(inputValue)) {
            inputElement.style.color = "red";
            showError(inputElement, "Invalid email. Please enter a valid email address.");
        } else {
            inputElement.style.color = "#95CD41";
            clearError(inputElement);
        }
    }

    if (inputElement.id === "password") {
        if (!isValidPassword(inputValue)) {
            inputElement.style.color = "red";
            showError(inputElement, "Invalid password. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.");
        } else {
            inputElement.style.color = "#95CD41";
            clearError(inputElement);
        }
    }

    // Enable/disable the submit button based on input validity
    loginButton.disabled = !isLoginFormValid();
});

// Signup form validation
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("input", function (event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;

    if (inputElement.id === "name") {
        if (!isValidUsername(inputValue)) {
            inputElement.style.color = "red";
            showError(inputElement, "Invalid username. Username must be between 3 and 16 characters long.");
        } else {
            inputElement.style.color = "#95CD41";
            clearError(inputElement);
        }
    }

    if (inputElement.id === "username0") {
        if (!isValidEmail(inputValue)) {
            inputElement.style.color = "red";
            showError(inputElement, "Invalid email. Please enter a valid email address.");
        } else {
            inputElement.style.color = "#95CD41";
            clearError(inputElement);
        }
    }

    if (inputElement.id === "password0") {
        if (!isValidPassword(inputValue)) {
            inputElement.style.color = "red";
            showError(inputElement, "Password must contain at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one digit.");
        } else {
            inputElement.style.color = "#95CD41";
            clearError(inputElement);
        }
    }

    // Enable/disable the submit button based on input validity
    signUpButton0.disabled = !isSignUpFormValid();
});


// Function to check if the login form is valid
function isLoginFormValid() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    return isValidEmail(usernameInput.value) && isValidPassword(passwordInput.value);
}

// Function to check if the signup form is valid
function isSignUpFormValid() {
    const nameInput = document.getElementById("name");
    const usernameInput = document.getElementById("username0");
    const passwordInput = document.getElementById("password0");

    return isValidUsername(nameInput.value) && isValidEmail(usernameInput.value) && isValidPassword(passwordInput.value);
}

// Function to show an error message and apply red border
function showError(inputElement, errorMessage) {
    // Check if the error message is already displayed
    let errorContainer = inputElement.parentNode.querySelector(".error-container");
    if (errorContainer) {
        const errorElement = errorContainer.querySelector(".error-message");
        errorElement.innerText = errorMessage;
        return;
    }

    // Create error message container
    errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");

    // Create error message element
    const errorElement = document.createElement("small");
    errorElement.innerText = errorMessage;
    errorElement.classList.add("error-message");

    // Set font color of error message
    errorElement.style.color = "red";

    // Append error message to the container
    errorContainer.appendChild(errorElement);

    // Position the error container relatively
    inputElement.parentNode.style.position = "relative";

    // Add error container after the input field
    inputElement.parentNode.insertBefore(errorContainer, inputElement.nextSibling);


    // Adjust the position of the error container
    const inputHeight = inputElement.offsetHeight;
    errorContainer.style.top = `calc(${inputHeight}px + 1.3vw)`; // Adjust the value as needed

    // Set the width of the error container to match the input field
    const inputWidth = inputElement.offsetWidth;
    errorContainer.style.width = `${inputWidth}px - .1vw`;

    // Enable/disable the submit button based on input validity
    signUpButton0.disabled = !isSignUpFormValid();
    loginButton.disabled = !isLoginFormValid();
}

// Function to clear error message and remove red border
function clearError(inputElement) {
    // Remove error class from input field
    inputElement.classList.remove("error");

    // Check if there is an error container
    const errorContainer = inputElement.parentNode.querySelector(".error-container");
    if (errorContainer) {
        // Remove error container
        errorContainer.remove();
    }
    // Enable/disable the submit button based on input validity
    signUpButton0.disabled = !isSignUpFormValid();
    loginButton.disabled = !isLoginFormValid();
}

// Email validation function
function isValidEmail(email) {
    // Use a regular expression to validate the email format
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

// Password validation function
function isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

function isValidUsername(username) {
    return username.length >= 3 && username.length <= 16;
}

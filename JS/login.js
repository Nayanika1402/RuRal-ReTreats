const container = document.querySelector('.container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

// Toggle between Login/Register UI

registerbtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginbtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Register Form Handling

const registerForm = document.getElementById('register-form');
const regUsername = document.getElementById('register-username');
const regEmail = document.getElementById('register-email');
const regPassword = document.getElementById('register-password');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    validateRegisterInputs();

    const allValid = [...registerForm.querySelectorAll('.input-box')]
        .every(box => box.classList.contains('success'));

    if (!allValid) return;

    const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: regUsername.value,
            email: regEmail.value,
            password: regPassword.value
        })
    });

    const data = await res.json();
    alert(data.message);
});


// Login Form Handling

const loginForm = document.querySelector('.login form');
const loginUsername = document.getElementById('login-username');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginConfirmPassword = document.getElementById('login-confirm-password');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    validateLoginInputs();

    const allValid = [...loginForm.querySelectorAll('.input-box')]
        .every(box => box.classList.contains('success'));

    if (!allValid) return;

    const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: loginUsername.value,
            email: loginEmail.value,
            password: loginPassword.value
        })
    });

    const data = await res.json();
     if (res.ok) {
        alert(data.message);
        window.location.href = "index.html"; 
    } else {
        alert(data.message || "Login failed!");
    }
    alert(data.message);
});

// Validation Helpers

const setError = (element, message) => {
    const inputBox = element.parentElement;
    const errorDisplay = inputBox.querySelector('.error-message span');

    if (errorDisplay) errorDisplay.innerText = message;
    inputBox.classList.add('error');
    inputBox.classList.remove('success');
};

const setSuccess = element => {
    const inputBox = element.parentElement;
    const errorDisplay = inputBox.querySelector('.error-message span');

    if (errorDisplay) errorDisplay.innerText = '';
    inputBox.classList.add('success');
    inputBox.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Registration Validation

const validateRegisterInputs = () => {
    const usernameValue = regUsername.value.trim();
    const emailValue = regEmail.value.trim();
    const passwordValue = regPassword.value.trim();

    if (usernameValue === '') {
        setError(regUsername, 'Username is required');
    } else {
        setSuccess(regUsername);
    }

    if (emailValue === '') {
        setError(regEmail, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(regEmail, 'Provide a valid email address');
    } else {
        setSuccess(regEmail);
    }

    if (passwordValue === '') {
        setError(regPassword, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(regPassword, 'Password must be at least 8 characters.');
    } else {
        setSuccess(regPassword);
    }
};

// Login Validation

const validateLoginInputs = () => {
    const usernameValue = loginUsername.value.trim();
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();
    const confirmPasswordValue = loginConfirmPassword.value.trim();

    if (usernameValue === '') {
        setError(loginUsername, 'Username is required');
    } else {
        setSuccess(loginUsername);
    }

    if (emailValue === '') {
        setError(loginEmail, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(loginEmail, 'Provide a valid email address');
    } else {
        setSuccess(loginEmail);
    }

    if (passwordValue === '') {
        setError(loginPassword, 'Password is required');
    } else {
        setSuccess(loginPassword);
    }

    if (confirmPasswordValue !== passwordValue) {
        setError(loginConfirmPassword, 'Passwords do not match');
    } else {
        setSuccess(loginConfirmPassword);
    }
};

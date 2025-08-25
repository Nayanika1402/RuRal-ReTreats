document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerbtn = document.querySelector('.register-btn');
    const loginbtn = document.querySelector('.login-btn');

    if (registerbtn && container) {
        registerbtn.addEventListener('click', () => {
            container.classList.add('active');
        });
    }

    if (loginbtn && container) {
        loginbtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }

    const form = document.getElementById('register-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!form || !username || !email || !password) {
        return;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    const setError = (element, message) => {
        const inputBox = element.parentElement;
        const errorDisplay = inputBox.querySelector('.error-message');
        const errorText = errorDisplay ? errorDisplay.querySelector('span') : null;

        if (errorText) {
            errorText.innerText = message;
        }
        inputBox.classList.add('error');
        inputBox.classList.remove('success');
        element.setAttribute('aria-invalid', 'true');
        element.setAttribute('aria-describedby', `${element.id}-error`);
    };

    const setSuccess = element => {
        const inputBox = element.parentElement;
        const errorDisplay = inputBox.querySelector('.error-message');
        const errorText = errorDisplay ? errorDisplay.querySelector('span') : null;

        if (errorText) {
            errorText.innerText = '';
        }
        inputBox.classList.add('success');
        inputBox.classList.remove('error');
        element.setAttribute('aria-invalid', 'false');
        element.removeAttribute('aria-describedby');
    };

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (usernameValue === '') {
            setError(username, 'Username is required');
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
        } else {
            setSuccess(email);
        }

        if (passwordValue === '') {
            setError(password, 'Password is required');
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 character.')
        } else if (!/(?=.*[a-z])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one lowercase letter.');
        } else if (!/(?=.*[A-Z])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one uppercase letter.');
        } else if (!/(?=.*[0-9])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one number.');
        } else if (!/(?=.*[!@#$%^&*])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one special character.');
        } else {
            setSuccess(password);
        }
    };

    [username, email, password].forEach(input => {
        input.addEventListener('input', () => {
            validateInputs();
        });
    });
});

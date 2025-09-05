document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerbtn = document.querySelector('.register-btn');
    const loginbtn = document.querySelector('.login-btn');

    // Toggle between login and register forms
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

    // Login form handling
    const loginForm = document.getElementById('login-form');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');

    if (loginForm && loginUsername && loginPassword) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleLogin();
        });
    }

    // Register form handling
    const registerForm = document.getElementById('register-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (registerForm && username && email && password) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (validateInputs()) {
                await handleRegister();
            }
        });

        // Real-time validation
        [username, email, password].forEach(input => {
            input.addEventListener('input', () => {
                validateInputs();
            });
        });
    }

    // Login function
    async function handleLogin() {
        const usernameValue = loginUsername.value.trim();
        const passwordValue = loginPassword.value.trim();

        if (!usernameValue || !passwordValue) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            showMessage('Logging in...', 'info');
            
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue
                })
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to homepage after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'http://localhost:3001/index.html';
                }, 1500);
            } else {
                showMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Network error. Please check if the server is running.', 'error');
        }
    }

    // Register function
    async function handleRegister() {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        try {
            showMessage('Creating account...', 'info');
            
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameValue,
                    email: emailValue,
                    password: passwordValue
                })
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                showMessage('Registration successful! Redirecting...', 'success');
                
                // Redirect to homepage after 1.5 seconds
                setTimeout(() => {
                    window.location.href = 'http://localhost:3001/index.html';
                }, 1500);
            } else {
                showMessage(data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('Network error. Please check if the server is running.', 'error');
        }
    }

    // Validation functions
    const setError = (element, message) => {
        const inputBox = element.parentElement;
        inputBox.classList.add('error');
        inputBox.classList.remove('success');
        
        // Create or update error message
        let errorDiv = inputBox.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            inputBox.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    };

    const setSuccess = element => {
        const inputBox = element.parentElement;
        inputBox.classList.add('success');
        inputBox.classList.remove('error');
        
        // Remove error message
        const errorDiv = inputBox.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    };

    const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInputs = () => {
        if (!username || !email || !password) return false;
        
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        let isValid = true;

        // Username validation
        if (usernameValue === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else if (usernameValue.length < 3) {
            setError(username, 'Username must be at least 3 characters');
            isValid = false;
        } else {
            setSuccess(username);
        }

        // Email validation
        if (emailValue === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Password validation
        if (passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else if (!/(?=.*[a-z])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one lowercase letter');
            isValid = false;
        } else if (!/(?=.*[A-Z])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one uppercase letter');
            isValid = false;
        } else if (!/(?=.*[0-9])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one number');
            isValid = false;
        } else if (!/(?=.*[!@#$%^&*])/.test(passwordValue)) {
            setError(password, 'Password must contain at least one special character (!@#$%^&*)');
            isValid = false;
        } else {
            setSuccess(password);
        }

        return isValid;
    };

    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        // Set background color based on type
        switch(type) {
            case 'success':
                messageDiv.style.backgroundColor = '#4CAF50';
                break;
            case 'error':
                messageDiv.style.backgroundColor = '#f44336';
                break;
            case 'info':
                messageDiv.style.backgroundColor = '#2196F3';
                break;
        }

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .input-box.error input {
            border-color: #f44336 !important;
        }
        .input-box.success input {
            border-color: #4CAF50 !important;
        }
        .error-message {
            color: #f44336;
            font-size: 12px;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});

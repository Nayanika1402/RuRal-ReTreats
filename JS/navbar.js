document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");

    // Check login status and update UI
    checkLoginStatus();

    // Initialize ARIA attributes for accessibility
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    if (mobileMenu) mobileMenu.setAttribute("aria-hidden", "true");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
    });

    menuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
        });
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
        const isMenuOpen = mobileMenu.classList.contains("active");
        if (!isMenuOpen) return;
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedToggle = menuToggle === event.target || menuToggle.contains(event.target);
        if (!clickedInsideMenu && !clickedToggle) {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
        }
    });

    // Close the menu on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
            menuToggle.focus();
        }
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("sticky");
            navbar.classList.remove("scrolled");
        }
    });

    // Function to check login status and update navbar
    function checkLoginStatus() {
        const authToken = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (authToken && user) {
            // User is logged in
            const userData = JSON.parse(user);
            updateNavbarForLoggedInUser(userData);
        } else {
            // User is not logged in
            updateNavbarForLoggedOutUser();
        }
    }

    function updateNavbarForLoggedInUser(userData) {
        // Update desktop login button
        const desktopAuthButtons = document.querySelector('.auth-buttons.desktop-only');
        if (desktopAuthButtons) {
            desktopAuthButtons.innerHTML = `
                <div class="user-menu">
                    <span class="user-name">Welcome, ${userData.username || userData.name || 'User'}</span>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            `;
        }

        // Update mobile login button
        const mobileLoginBtn = document.querySelector('.login-btn.mobile-only');
        if (mobileLoginBtn) {
            mobileLoginBtn.outerHTML = `
                <div class="mobile-user-menu">
                    <span class="mobile-user-name">Welcome, ${userData.username || userData.name || 'User'}</span>
                    <button class="logout-btn mobile-only" onclick="logout()">Logout</button>
                </div>
            `;
        }
    }

    function updateNavbarForLoggedOutUser() {
        // Update desktop auth buttons
        const desktopAuthButtons = document.querySelector('.auth-buttons.desktop-only');
        if (desktopAuthButtons) {
            desktopAuthButtons.innerHTML = `
                <button class="login-btn" onclick="window.location.href='login.html'">
                    Log In
                </button>
            `;
        }

        // Update mobile login button
        const mobileUserMenu = document.querySelector('.mobile-user-menu');
        if (mobileUserMenu) {
            mobileUserMenu.outerHTML = `
                <button class="login-btn mobile-only" onclick="window.location.href='login.html'">
                    Log In
                </button>
            `;
        }
    }

    // Make logout function globally available
    window.logout = function() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        showLogoutMessage();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    };

    function showLogoutMessage() {
        // Create and show logout message
        const message = document.createElement('div');
        message.className = 'logout-message';
        message.innerHTML = 'Logged out successfully! Redirecting...';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 1500);
    }
});

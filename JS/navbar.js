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

    // Open menu function with smooth animation
    function openMenu() {
        mobileMenu.classList.remove("closing");
        mobileMenu.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    // Close menu function with smooth animation
    function closeMenu() {
        mobileMenu.classList.add("closing");
        
        // Wait for closing animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.remove("active");
            mobileMenu.classList.remove("closing");
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
            document.body.style.overflow = ""; // Restore scrolling
        }, 400);
    }

    // Event listeners
    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);

    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
        const isMenuOpen = mobileMenu.classList.contains("active");
        if (!isMenuOpen) return;
        
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedToggle = menuToggle === event.target || menuToggle.contains(event.target);
        
        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // Close the menu on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // Navbar scroll effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("sticky");
            navbar.classList.remove("scrolled");
        }
    });

    // Enhanced search functionality
    const searchInputs = document.querySelectorAll('#search-input, #mobile-search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Add your search functionality here
                    console.log('Searching for:', searchTerm);
                    // Example: window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    });

    // Search button click handlers
    const searchButtons = document.querySelectorAll('.search-bar button, .mobile-search-bar button');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const searchInput = this.parentElement.querySelector('input');
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Add your search functionality here
            }
        });
    });
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

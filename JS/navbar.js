document.addEventListener("DOMContentLoaded", function () {
    // --- Configuration ---
    const SELECTORS = {
        menuToggle: "#menu-toggle",
        menuClose: "#menu-close",
        mobileMenu: "#mobile-menu",
        navLinks: ".mobile-menu ul li a",
        navbar: ".navbar",
    };
    const STICKY_SCROLL_THRESHOLD = 50;

 main
    // --- Element Selection ---
    const menuToggle = document.querySelector(SELECTORS.menuToggle);
    const menuClose = document.querySelector(SELECTORS.menuClose);
    const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
    const navLinks = document.querySelectorAll(SELECTORS.navLinks);
    const navbar = document.querySelector(SELECTORS.navbar);

    // Check login status and update UI
    checkLoginStatus();

    // Initialize ARIA attributes for accessibility
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    if (mobileMenu) mobileMenu.setAttribute("aria-hidden", "true");
dev

    // --- Guard Clause ---
    // Exit if essential navigation elements are not found to prevent errors.
    if (!menuToggle || !mobileMenu || !navbar) {
        console.warn("Essential navigation elements not found. Menu script will not run.");
        return;
    }

    // --- Reusable Functions for Menu State ---
    const openMenu = () => {
        mobileMenu.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
    };

    const closeMenu = (options = { focusToggle: false }) => {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
        // For accessibility, return focus to the toggle button after closing with Esc key.
        if (options.focusToggle) {
            menuToggle.focus();
        }
    };

    // --- Event Handler Functions ---
    const handleScroll = () => {
        // Use a single class for styling the sticky state for simplicity.
        if (window.scrollY > STICKY_SCROLL_THRESHOLD) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    const handleEscapeKey = (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
            closeMenu({ focusToggle: true });
        }
    };

    const handleClickOutside = (event) => {
        const isMenuOpen = mobileMenu.classList.contains("active");
        // Ensure menu is open before proceeding
        if (!isMenuOpen) return;

        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedOnToggle = menuToggle.contains(event.target);
        
        if (!clickedInsideMenu && !clickedOnToggle) {
            closeMenu();
        }
    };

    // --- Initial Setup ---
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    // --- Event Listener Attachments ---
    menuToggle.addEventListener("click", openMenu);
    
    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

 main
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    // Initial check in case the page is loaded with a scroll position beyond the threshold
    handleScroll(); 
    

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
 dev
});

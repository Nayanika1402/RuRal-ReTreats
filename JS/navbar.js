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

    // --- Element Selection ---
    const menuToggle = document.querySelector(SELECTORS.menuToggle);
    const menuClose = document.querySelector(SELECTORS.menuClose);
    const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
    const navLinks = document.querySelectorAll(SELECTORS.navLinks);
    const navbar = document.querySelector(SELECTORS.navbar);

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

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    // Initial check in case the page is loaded with a scroll position beyond the threshold
    handleScroll(); 
    
});

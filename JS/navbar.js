// Updated navigation script with dark/light theme toggle
// This file augments the existing responsive navigation menu by adding a
// user‑friendly theme switcher. When the page loads, a small button
// (moon/sun icon) is injected into the right side of the nav bar. Clicking
// the button toggles a `dark-mode` class on the body element, which applies
// a global colour inversion via CSS. The current preference is saved in
// localStorage so it persists across reloads.

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");

    // ---------------------------------------------------------------------
    // Theme toggle setup
    // Find the right section of the navigation bar. This typically holds
    // search and authentication buttons. We append our theme toggle here.
    const rightSection = document.querySelector(".right-section");
    if (rightSection) {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-toggle-btn';
        themeBtn.setAttribute('aria-label', 'Toggle dark mode');
        // Use FontAwesome icons to represent the current theme.
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-moon');
        themeBtn.appendChild(icon);
        rightSection.appendChild(themeBtn);

        // Function to update all toggle icons based on the current theme.
        function updateThemeIcon() {
            document.querySelectorAll('.theme-toggle-btn i').forEach((iconEl) => {
                if (document.body.classList.contains('dark-mode')) {
                    iconEl.classList.remove('fa-moon');
                    iconEl.classList.add('fa-sun');
                } else {
                    iconEl.classList.remove('fa-sun');
                    iconEl.classList.add('fa-moon');
                }
            });
        }

        // Create and inject styles for the toggle button and dark mode.
        const style = document.createElement('style');
        style.innerHTML = `
            /* Theme toggle button appearance */
            .theme-toggle-btn {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.3rem;
                margin-left: 10px;
                color: inherit;
            }
            /* Apply an inverted colour scheme when dark mode is active */
            body.dark-mode {
                filter: invert(1) hue-rotate(180deg);
            }
            /* Cancel the inversion on images and videos so they retain their natural colours */
            body.dark-mode img,
            body.dark-mode video {
                filter: invert(1) hue-rotate(180deg);
            }
        `;
        document.head.appendChild(style);

        // Read the stored theme preference from localStorage. If the user
        // previously selected dark mode we reapply it on page load.
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        // Sync the initial icon with the theme state.
        updateThemeIcon();

        // Toggle the theme when the button is clicked and persist the choice.
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon();
        });
    }
    // ---------------------------------------------------------------------

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
        const clickedToggle = menuToggle === event.target || 
                              menuToggle.contains(event.target);
        if (!clickedInsideMenu && !clickedToggle) {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
        }
    });

    // Close the menu on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && 
            mobileMenu.classList.contains("active")) {
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
});

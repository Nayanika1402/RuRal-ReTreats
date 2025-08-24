document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");

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
});

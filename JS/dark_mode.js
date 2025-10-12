// JS/dark-mode.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dark mode script loaded');
    
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        console.log('Enabling dark mode');
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', 'dark');
    }
    
    function disableDarkMode() {
        console.log('Disabling dark mode');
        document.body.classList.remove('dark-mode');
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', 'light');
    }
});
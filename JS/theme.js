// Theme toggle functionality
function initTheme() {
    const toggleButton = document.getElementById('theme-toggle');
    
    if (!toggleButton) {
        console.error("Theme toggle button not found!");
        return;
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    applyTheme(savedTheme);
    
    // Add event listener to toggle button
    toggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

function applyTheme(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggleButton) {
            toggleButton.innerHTML = '<span class="theme-icon">☀️</span>';
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleButton) {
            toggleButton.innerHTML = '<span class="theme-icon">🌙</span>';
            toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    // Force redraw for elements that might not be using CSS variables
    forceRedraw();
}

function forceRedraw() {
    // This forces browsers to repaint elements that might not be updating
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}
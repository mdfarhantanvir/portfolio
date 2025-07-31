function updateTheme() {
    const hour = new Date().getHours();
    const isDarkMode = hour < 6 || hour >= 18; // Dark mode between 6 PM and 6 AM
    const scheme = isDarkMode ? 'slate' : 'default';
    
    // Wait for the Material theme to initialize
    const observer = new MutationObserver((mutations, obs) => {
        const body = document.querySelector('body');
        if (body) {
            body.setAttribute('data-md-color-scheme', scheme);
            obs.disconnect();
            
            // Store the auto-switch setting
            localStorage.setItem('theme-auto-switch', 'enabled');
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

// Check if auto-switch is enabled
if (localStorage.getItem('theme-auto-switch') !== 'disabled') {
    // Initial update
    updateTheme();
    
    // Update every minute
    setInterval(updateTheme, 60000);
}

// Listen for theme toggle button clicks to disable auto-switch
document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('button[data-md-color-scheme]');
    if (toggleBtn) {
        // Disable auto-switch when manually toggled
        localStorage.setItem('theme-auto-switch', 'disabled');
    }
});

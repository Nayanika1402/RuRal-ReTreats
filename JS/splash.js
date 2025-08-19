window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const mainContent = document.getElementById('mainContent');
  
    // Play intro sound
    const sound = document.getElementById('introSound');
    if (sound) sound.play();
  
    // Hide splash and show main content
    setTimeout(() => {
      splash.style.display = 'none';
      if (mainContent) {
        mainContent.style.display = 'block';
      }
  
      // Restore scroll if disabled during splash
      document.body.style.overflow = 'auto';
  
    }, 3650);
  });
  
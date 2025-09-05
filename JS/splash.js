window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const mainContent = document.getElementById('mainContent');

  const sound = document.getElementById('introSound');
  if (sound) {
    try { sound.play(); } catch (_) {}
  }

  // Hide splash quickly after load and re-enable scroll
  setTimeout(() => {
    if (splash) splash.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    document.body.classList.remove('no-scroll');
  }, 300);
});

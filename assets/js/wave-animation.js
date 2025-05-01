document.addEventListener('DOMContentLoaded', function() {
  // Create wave bands dynamically
  const waveContainer = document.querySelector('.wave-container');
  if (!waveContainer) return;
  
  // Create 8 wave bands
  for (let i = 0; i < 8; i++) {
    const waveBand = document.createElement('div');
    waveBand.className = 'wave-band';
    waveContainer.appendChild(waveBand);
  }
  
  // Scroll-based animation effect
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateWaves() {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 1 : -1;
    const scrollSpeed = Math.min(Math.abs(scrollY - lastScrollY) / 10, 5);
    
    // Apply different transformations to each wave band based on scroll
    document.querySelectorAll('.wave-band').forEach((band, index) => {
      // Skip first and last (black) bands
      if (index === 0 || index === 7) return;
      
      // Calculate a unique scale factor for each band
      const scaleFactorX = 1 + ((index % 3) * 0.02 * scrollDirection * scrollSpeed);
      const scaleFactorY = 1 - ((index % 2) * 0.03 * scrollDirection * scrollSpeed);
      
      // Add slight rotation for more organic movement
      const rotation = (index % 2 === 0 ? 0.1 : -0.1) * scrollDirection * scrollSpeed;
      
      // Apply the transformation with different timing for each band
      setTimeout(() => {
        band.style.transform = `scaleX(${scaleFactorX}) scaleY(${scaleFactorY}) rotate(${rotation}deg)`;
      }, index * 50);
    });
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  // Handle scroll events
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateWaves);
      ticking = true;
    }
  });
  
  // Apply glass effect to content cards
  function applyGlassEffect() {
    const contentCards = document.querySelectorAll('.main-content > section, .main-content > div, .main-content > article');
    
    contentCards.forEach(card => {
      if (!card.classList.contains('glass-card') && !card.closest('.glass-card')) {
        card.classList.add('glass-card');
      }
    });
  }
  
  // Apply initial glass effect and setup a mutation observer to catch dynamically added content
  applyGlassEffect();
  
  // Create an observer instance
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        applyGlassEffect();
      }
    });
  });
  
  // Start observing the main content area
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    observer.observe(mainContent, { childList: true, subtree: true });
  }
}); 
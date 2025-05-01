document.addEventListener("DOMContentLoaded", () => {
  // Configuration
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "pink",
    "white",
  ];
  const container = document.getElementById("pixel-animation");

  if (!container) {
    console.error("Pixel animation container not found!");
    return;
  }

  // Set container class for grid layout
  container.classList.add("pixel-container");

  // Generate initial grid
  for (let i = 0; i < 5000; i++) {
    // 100x50 grid
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");

    // Random initial color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    pixel.classList.add(randomColor);

    container.appendChild(pixel);
  }

  // Animation function - changes random pixels to random colors
  function animatePixels() {
    // Get all pixels
    const pixels = container.querySelectorAll(".pixel");

    // Determine how many pixels to change (2-4% of total)
    const pixelsToChange = Math.floor(
      Math.random() * (pixels.length * 0.04 - pixels.length * 0.02) +
        pixels.length * 0.02
    );

    for (let i = 0; i < pixelsToChange; i++) {
      // Select random pixel
      const randomIndex = Math.floor(Math.random() * pixels.length);
      const pixel = pixels[randomIndex];

      // Remove current color class
      for (const color of colors) {
        pixel.classList.remove(color);
      }

      // Add new random color class
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      pixel.classList.add(newColor);
    }

    // Schedule next animation frame
    requestAnimationFrame(() => {
      setTimeout(animatePixels, 100); // Animation speed - adjust as needed
    });
  }

  // Start animation
  animatePixels();
});

/**
 * Slide Show Navigation System
 * Simplified for maximum reliability
 */

document.addEventListener("DOMContentLoaded", () => {
  // Core elements
  const scrollableContainer = document.getElementById("slides");
  const navArrows = document.getElementById("navArrows");
  const prevSlide = document.getElementById("prevSlide");
  const nextSlide = document.getElementById("nextSlide");
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const mobileNav = document.getElementById("mobileNav");

  // Audio reaction handler
  const trustAudio = document.getElementById("trustAudio");
  const audioReaction = document.querySelector(".audio-reaction");
  
  if (trustAudio && audioReaction) {
    let reactionTimeout;
    
    trustAudio.addEventListener("play", () => {
      // Clear any existing timeout
      if (reactionTimeout) clearTimeout(reactionTimeout);
      
      // Set new timeout to show reaction after 2 seconds
      reactionTimeout = setTimeout(() => {
        audioReaction.classList.add("visible");
        audioReaction.classList.remove("hidden");
      }, 2000);
    });
    
    trustAudio.addEventListener("pause", () => {
      // Clear timeout if audio is paused before reaction shows
      if (reactionTimeout) clearTimeout(reactionTimeout);
    });
  }

  // Only proceed if we found the slides container
  if (!scrollableContainer) return;

  // Keep arrows visible permanently
  if (navArrows) {
    navArrows.classList.remove("hidden");
  }

  // Get all slides and calculate dimensions
  const slides = document.querySelectorAll(".slide");
  const getSlideWidth = () => slides[0]?.offsetWidth || window.innerWidth;
  const totalSlides = slides.length;

  // Track current slide
  let currentSlide = 0;

  // Basic navigation functions with error handling
  const goToSlide = (index) => {
    // Ensure index is within bounds
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;

    currentSlide = index;
    const targetPosition = index * getSlideWidth();

    try {
      scrollableContainer.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      });
    } catch (e) {
      // Fallback for browsers that don't support smooth scrolling
      scrollableContainer.scrollLeft = targetPosition;
      console.error("Smooth scrolling failed:", e);
    }

    // Update active classes on navigation items
    updateActiveNavigation();
  };

  const goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  // Update navigation active states
  const updateActiveNavigation = () => {
    // Update desktop sidebar navigation
    const allSidebarLinks = document.querySelectorAll(".nav-sidebar .nav-link");
    allSidebarLinks.forEach((link) => link.classList.remove("active"));

    // For each slide, find and activate corresponding nav items
    const currentSlideElement = slides[currentSlide];
    if (currentSlideElement) {
      const slideId = currentSlideElement.id;
      const matchingNavLinks = document.querySelectorAll(
        `.nav-link[href="#${slideId}"]`
      );
      matchingNavLinks.forEach((link) => link.classList.add("active"));
    }
  };

  // Set up all navigation links with correct event handlers
  const setupNavLinks = () => {
    // Handle all slide navigation links throughout the document
    const allNavLinks = document.querySelectorAll('.nav-link[href^="#slide"]');

    allNavLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        // Extract slide ID and find its index
        const targetId = link.getAttribute("href").substring(1);
        const targetSlide = document.getElementById(targetId);

        if (targetSlide) {
          const slideIndex = Array.from(slides).indexOf(targetSlide);
          if (slideIndex !== -1) {
            // Close mobile nav if it's open
            if (mobileNav && mobileNav.classList.contains("active")) {
              mobileNav.classList.remove("active");
              mobileNavToggle.classList.remove("active");
            }

            goToSlide(slideIndex);
          }
        }
      });
    });
  };

  // Enhanced trackpad/mouse wheel handling
  const handleWheelEvent = (event) => {
    // Prevent page scrolling
    event.preventDefault();

    // Determine scroll direction and amount
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    // Threshold for slide change (adjust as needed)
    const scrollThreshold = 50;

    if (delta > scrollThreshold) {
      goToNextSlide();
    } else if (delta < -scrollThreshold) {
      goToPrevSlide();
    }
  };

  // Add wheel event with proper passive setting
  scrollableContainer.addEventListener("wheel", handleWheelEvent, {
    passive: false,
  });

  // Simple touch handling for swipe
  let touchStartX = 0;
  let touchEndX = 0;

  scrollableContainer.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    {passive: true}
  );

  scrollableContainer.addEventListener(
    "touchmove",
    (event) => {
      // Track position but let native scrolling happen
      touchEndX = event.touches[0].clientX;
    },
    {passive: true}
  );

  scrollableContainer.addEventListener("touchend", () => {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
      // Swiped right
      goToPrevSlide();
    } else if (swipeDistance < -swipeThreshold) {
      // Swiped left
      goToNextSlide();
    } else {
      // Handle snap back to current slide if small movement
      goToSlide(currentSlide);
    }
  });

  // Manual snap function for scroll ends
  const handleScrollEnd = () => {
    // Ensure we snap to the right slide after any scroll
    const currentScrollPosition = scrollableContainer.scrollLeft;
    const slideWidth = getSlideWidth();
    const nearestSlideIndex = Math.round(currentScrollPosition / slideWidth);

    // Only update if actually needed
    if (nearestSlideIndex !== currentSlide) {
      currentSlide = nearestSlideIndex;
      goToSlide(currentSlide);
    }
  };

  // Detect when scrolling stops
  let scrollTimeout;
  scrollableContainer.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScrollEnd, 150);

    // Update current slide tracking during scrolling
    const slideWidth = getSlideWidth();
    currentSlide = Math.round(scrollableContainer.scrollLeft / slideWidth);

    // Also update the active states while scrolling
    updateActiveNavigation();
  });

  // Arrow navigation
  if (prevSlide) {
    prevSlide.addEventListener("click", (e) => {
      e.preventDefault();
      goToPrevSlide();
    });
  }

  if (nextSlide) {
    nextSlide.addEventListener("click", (e) => {
      e.preventDefault();
      goToNextSlide();
    });
  }

  // Simple and reliable keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goToPrevSlide();
    } else if (event.key === "ArrowRight") {
      goToNextSlide();
    }
  });

  // Mobile navigation toggle
  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      mobileNavToggle.classList.toggle("active");
    });
  }

  // Fix sidebar nav link issues by making them work everywhere
  const fixSidebarNavLinks = () => {
    const allSidebarLinks = document.querySelectorAll(".nav-sidebar .nav-link");

    allSidebarLinks.forEach((link) => {
      // Clone the node to remove all event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      // Add proper click handler that works across all slides
      newLink.addEventListener("click", (event) => {
        event.preventDefault();

        // Get target ID or assign one if it doesn't exist
        let targetId = newLink.getAttribute("href");
        if (!targetId || targetId === "#") {
          // Just go to the slide this sidebar belongs to
          const parentSlide = newLink.closest(".slide");
          if (parentSlide) {
            const slideIndex = Array.from(slides).indexOf(parentSlide);
            goToSlide(slideIndex);
          }
        } else {
          // Try to navigate to the specified slide
          if (targetId.startsWith("#slide")) {
            const targetSlide = document.getElementById(targetId.substring(1));
            if (targetSlide) {
              const slideIndex = Array.from(slides).indexOf(targetSlide);
              if (slideIndex !== -1) {
                goToSlide(slideIndex);
              }
            }
          }
        }
      });
    });
  };

  // Initialize everything
  setupNavLinks();
  fixSidebarNavLinks();

  // Set initial slide state
  goToSlide(0);

  // Force a layout recalculation to ensure slide widths are correct
  window.addEventListener("resize", () => {
    setTimeout(() => {
      goToSlide(currentSlide);
    }, 100);
  });
});

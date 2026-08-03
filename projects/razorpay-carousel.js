(function () {
  const carousels = Array.from(document.querySelectorAll("[data-project-carousel]"));

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll(".story-frame"));
    const previousButton = carousel.querySelector(".carousel-arrow--previous");
    const nextButton = carousel.querySelector(".carousel-arrow--next");
    const count = carousel.querySelector("[data-carousel-count]");
    const meterFill = carousel.querySelector("[data-carousel-meter]");

    if (!track || !slides.length || !previousButton || !nextButton || !count || !meterFill) {
      return;
    }

    let currentIndex = 0;
    let accentTimer;
    const lastIndex = slides.length - 1;

    function updateCarousel() {
      const current = currentIndex + 1;
      const progress = (current / slides.length) * 100;

      track.style.setProperty("--slide-offset", `${currentIndex * -100}%`);
      meterFill.style.setProperty("--progress", `${progress}%`);
      count.textContent = `${current}/${slides.length}`;

      slides.forEach((slide, index) => {
        slide.toggleAttribute("aria-hidden", index !== currentIndex);
      });
    }

    function pulseAccent(direction, button) {
      window.clearTimeout(accentTimer);
      carousel.classList.remove("is-accent-left", "is-accent-right");
      previousButton.classList.remove("is-pulsing");
      nextButton.classList.remove("is-pulsing");

      carousel.classList.add(direction === "previous" ? "is-accent-left" : "is-accent-right");
      button.classList.add("is-pulsing");

      accentTimer = window.setTimeout(() => {
        carousel.classList.remove("is-accent-left", "is-accent-right");
        button.classList.remove("is-pulsing");
      }, 280);
    }

    function goToSlide(direction) {
      const isPrevious = direction === "previous";
      currentIndex = isPrevious
        ? currentIndex === 0 ? lastIndex : currentIndex - 1
        : currentIndex === lastIndex ? 0 : currentIndex + 1;

      updateCarousel();
      pulseAccent(direction, isPrevious ? previousButton : nextButton);
    }

    previousButton.addEventListener("click", () => goToSlide("previous"));
    nextButton.addEventListener("click", () => goToSlide("next"));

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        goToSlide("previous");
      }

      if (event.key === "ArrowRight") {
        goToSlide("next");
      }
    });

    updateCarousel();
  });
})();

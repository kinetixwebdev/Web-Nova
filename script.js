(function () {
  const track = document.getElementById("galleryTrack");
  const viewport = track.parentElement;
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");
  const dotsWrap = document.getElementById("galleryDots");

  function perView() {
    return window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  }

  let index = 0;
  let visible = perView();
  let maxIndex = Math.max(0, slides.length - visible);

  // build dots (one per possible position)
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === index) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 18;
    const offset = index * (slideWidth + gap);
    track.style.transform = "translateX(-" + offset + "px)";
    Array.from(dotsWrap.children).forEach((d, i) =>
      d.classList.toggle("active", i === index),
    );
  }

  function goNext() {
    index = index >= maxIndex ? 0 : index + 1;
    update();
  }
  function goPrev() {
    index = index <= 0 ? maxIndex : index - 1;
    update();
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  window.addEventListener("resize", () => {
    visible = perView();
    maxIndex = Math.max(0, slides.length - visible);
    if (index > maxIndex) index = maxIndex;
    buildDots();
    update();
  });

  buildDots();
  update();
})();

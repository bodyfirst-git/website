document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Preloader
   */

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    document.addEventListener("scroll", () => {
      window.scrollY > 100
        ? selectHeader.classList.add("sticked")
        : selectHeader.classList.remove("sticked");
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper(".slides-3", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  var whyChooseGallery = new Swiper(".why-choose-gallery", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "2",

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 50,
      modifier: 6,
      slideShadows: false,
    },
  });

  var whyChooseGalleryTop = new Swiper(".swiper-container.why-choose", {
    speed: 400,
    spaceBetween: 50,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    direction: "vertical",
    pagination: {
      clickable: true,
      el: ".swiper-pagination",
      type: "bullets",
    },
    thumbs: {
      swiper: whyChooseGallery,
    },
  });

  new Swiper(".rank-text", {
    direction: "vertical",
    speed: 100,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: "auto",
  });

  new Swiper(".rank-scroller", {
    direction: "vertical",
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    autoplayDisableOnInteraction: false,
    slidesPerView: "auto",
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector(".portfolio-isotope");

  if (portfolionIsotope) {
    let portfolioFilter = portfolionIsotope.getAttribute(
      "data-portfolio-filter"
    )
      ? portfolionIsotope.getAttribute("data-portfolio-filter")
      : "*";
    let portfolioLayout = portfolionIsotope.getAttribute(
      "data-portfolio-layout"
    )
      ? portfolionIsotope.getAttribute("data-portfolio-layout")
      : "masonry";
    let portfolioSort = portfolionIsotope.getAttribute("data-portfolio-sort")
      ? portfolionIsotope.getAttribute("data-portfolio-sort")
      : "original-order";

    window.addEventListener("load", () => {
      let portfolioIsotope = new Isotope(
        document.querySelector(".portfolio-container"),
        {
          itemSelector: ".portfolio-item",
          layoutMode: portfolioLayout,
          filter: portfolioFilter,
          sortBy: portfolioSort,
        }
      );

      let menuFilters = document.querySelectorAll(
        ".portfolio-isotope .portfolio-flters li"
      );
      menuFilters.forEach(function (el) {
        el.addEventListener(
          "click",
          function () {
            document
              .querySelector(
                ".portfolio-isotope .portfolio-flters .filter-active"
              )
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            portfolioIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aos_init === "function") {
              aos_init();
            }
          },
          false
        );
      });
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "slide",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });

  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
  };

  const texts = [
    "Game changer & Enabler",
    "Strategist and Pacemaker",
    "Nutraceutical evangelist",
    "Market Intelligence",
    "Mentor",
    "Regulatory Expert",
  ];

  const morphTime = 1;
  const cooldownTime = 1;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  animate();
});

const slides = Object.values(document.getElementsByClassName("why-us-item"));
console.log(slides);
function selectedSlide(e) {
  slides.forEach(function (slide) {
    if (slide === e.target) {
      if (!slide.classList.contains("active")) {
        slide.classList.add("active");
      }
    } else {
      slide.classList.remove("active");
    }
    console.log(slides);
  });
}

slides.forEach(function (slide) {
  slide.addEventListener("click", selectedSlide);
});

const healthLevers = [
  {
    "Age Group": "Children 5-12 Years",
    "Health Category": "Immune Health",
    "Disease Condition": "Auto Immune Disease",
    Markers: "Inflammatory Markers  like CRP",
    "Nutraceutical Ingredients": "Probiotics , Vitamin D3, MVM",
  },
  {
    "Disease Condition": "Cold/Cough",
  },
  {
    "Age Group": "Teenage 13-19 years",
    "Health Category": "Immune Health",
    "Disease Condition": "Auto Immune Disease",
    Markers: "Inflammatory Markers  like CRP",
    "Nutraceutical Ingredients":
      "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin",
  },
  {
    "Disease Condition": "Cold/Cough",
  },
  {
    "Age Group": "Adults 20-60 years",
    "Health Category": "Immune Health",
    "Disease Condition": "Auto Immune Disease",
    Markers: "Inflammatory Markers  like CRP",
    "Nutraceutical Ingredients":
      "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin, Omega 3 Fatty Acids, Astaxanthin, Vitamin C, Ashwagandha, Elderberry, Ginger, Garlic, Black Seed Oil, Curcumin",
  },
  {
    "Disease Condition": "Cold/Cough",
  },
  {
    "Age Group": "Senior Citizens - Above 60 Years",
    "Health Category": "Immune Health",
    "Disease Condition": "Auto Immune Disease",
    Markers: "Inflammatory Markers  like CRP",
    "Nutraceutical Ingredients":
      "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin, Omega 3 Fatty Acids, Astaxanthin, Vitamin C, Ashwagandha, Elderberry, Ginger, Garlic, Black Seed Oil, Magnesium, Curcumin",
  },
  {
    "Disease Condition": "Cold/Cough",
  },
  null,
  {
    "Age Group": "Children 5-12 Years",
    "Health Category": "Gut Health",
    "Disease Condition": "Irritable Bowel Syndrome",
    Markers: "Bowel Movement Patterns",
    "Nutraceutical Ingredients": "Probiotics",
  },
  {
    "Disease Condition": "Diarrhoea",
    Markers: "Fecal leukocytes/calprotectin/lactoferrin",
  },
  {
    "Age Group": "Teenage 13-19 years",
    "Health Category": "Gut Health",
    "Disease Condition": "Irritable Bowel Syndrome",
    Markers: "Bowel Movement Patterns",
    "Nutraceutical Ingredients":
      "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
  },
  {
    "Disease Condition": "Diarrhoea",
    Markers: "Fecal leukocytes/calprotectin/lactoferrin",
  },
  {
    "Disease Condition": "Ulcerative Colitis",
    Markers: "CRP",
  },
  {
    "Age Group": "Adults 20-60 years",
    "Health Category": "Gut Health",
    "Disease Condition": "Irritable Bowel Syndrome",
    Markers: "Bowel Movement Patterns",
    "Nutraceutical Ingredients":
      "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
  },
  {
    "Disease Condition": "Diarrhoea",
    Markers: "Fecal leukocytes/calprotectin/lactoferrin",
  },
  {
    "Disease Condition": "Ulcerative Colitis",
    Markers: "CRP",
  },
  {
    "Age Group": "Senior Citizens - Above 60 Years",
    "Health Category": "Gut Health",
    "Disease Condition": "Irritable Bowel Syndrome",
    Markers: "Bowel Movement Patterns",
    "Nutraceutical Ingredients":
      "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
  },
  {
    "Disease Condition": "Diarrhoea",
    Markers: "Fecal leukocytes/calprotectin/lactoferrin",
  },
  {
    "Disease Condition": "Ulcerative Colitis",
    Markers: "CRP",
  },
  null,
  {
    "Age Group": "Adults 20-60 years",
    "Health Category": "Eye Health",
    "Disease Condition": "Diabetic Retinopathy",
    "Nutraceutical Ingredients":
      "Astaxanthin, Mixed Carotenoids, Fish Oils, Copper, Bilbery Exitract, Tocotrienols, Vitamin E, Lutein, Zeaxanthin",
  },
  null,
  null,
  {
    "Age Group": "Senior Citizens - Above 60 Years",
    "Health Category": "Eye Health",
    "Disease Condition": "Diabetic Retinopathy",
    Markers: "Inflammation",
    "Nutraceutical Ingredients":
      "Astaxanthin, Mixed Carotenoids, Fish Oils, Copper, Bilbery Exitract, Tocotrienols, Vitamin E, Lutein, Zeaxanthin",
  },
  {
    "Disease Condition": "Cataract",
    Markers: "Visual Acuity, Macular Pigment Density",
  },
  null,
  {
    "Age Group": "Adults 20-60 years",
    "Health Category": "Blood Sugar Management",
    "Disease Condition": "Metabolic Diseases",
    Markers: "Blood Glucose Levels",
    "Nutraceutical Ingredients":
      "Fenugreek Seed Extract, Cinnamon, Alpha Lipoic Acid, Chromium, Bitter Guard, Pectin, AloeVera Extract, Quercetin, Zinc",
  },
  null,
  null,
  {
    "Age Group": "Senior Citizens - Above 60 Years",
    "Health Category": "Blood Sugar Management",
    "Disease Condition": "Metabolic Diseases",
    Markers: "Blood Glucose Levels",
    "Nutraceutical Ingredients":
      "Fenugreek Seed Extract, Cinnamon, Alpha Lipoic Acid, Chromium, Bitter Guard, Pectin, AloeVera Extract, Quercetin, Zinc",
  },
  null,
  {
    "Age Group": "Adults 20-60 years",
    "Health Category": "Stress Management",
    "Disease Condition": "General Stress, Migraine",
    Markers: "Cortisol Levels",
    "Nutraceutical Ingredients":
      "Magnesium, Ashwagandha, L Tryptophan, Rhodiola Rosea , Melatonin, Curcmin, Nutmeg, Cinnamon",
  },
  null,
  {
    "Age Group": "Senior Citizens - Above 60 Years",
    "Health Category": "Stress Management",
    "Disease Condition": "General Stress",
    Markers: "Cortisol Levels",
    "Nutraceutical Ingredients":
      "Magnesium, Ashwagandha, L Tryptophan, Rhodiola Rosea , Melatonin, Curcmin, Nutmeg, Cinnamon",
  },
];

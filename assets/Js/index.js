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

  var swiper = new Swiper(".heroCarousal", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });

  var swiper = new Swiper(".how-we-stand-out-inner", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".why-us-info", {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper = new Swiper(".testimonials-main", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper = new Swiper(".companies", {
    slidesPerView: 5,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".market-analytics", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

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

const treeObject = {
  "Child 5-12 years": {
    title: "",
    children: [
      {
        "Health Category": {
          title: "Immune Health",
          children: [
            {
              "Disease Condition": {
                title: "Auto immune disease , Cold / Cough",
                children: [
                  {
                    Markers: {
                      title: "Inflamatory markers like CRP",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title: "Probiotics, Vitamin D3, MVM",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Gut Health",
          children: [
            {
              "Disease Condition": {
                title: "Irritable Bowel Syndrome",
                children: [
                  {
                    Markers: {
                      title: "Bowel Movement Patterns",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title: "Probiotics",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Diarrhoea",
                children: [
                  {
                    Markers: {
                      title: "Fecal leukocytes/calprotectin/lactoferrin",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Bone Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Rickets, Calcium Abnormalities, Vitamin D Deficiency, Juvenile Osteoporosis",
                children: [
                  {
                    Markers: {
                      title:
                        "BMD (Bone Mineral Density), Vitamin D levels, Osteocalcin",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title: "Vitamin D, Calcium ,Cod Liver Oil",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Brain Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "ADHD (Attention Deficit Hyperactivity Disorder), Anxiety, CD (Conduct Disorder),Memory Development",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormal Movements, Difficult with Language Development, Abnormalities in GABA neurotransmitter, Visual Impairement, Low Grasping",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi, Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const teenTreeObject = {
  "Teenage 13 - 19 Years": {
    title: "",
    children: [
      {
        "Health Category": {
          title: "Immune Health",
          children: [
            {
              "Disease Condition": {
                title: "Auto immune disease , Cold / Cough",
                children: [
                  {
                    Markers: {
                      title: "Inflamatory markers like CRP",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Gut Health",
          children: [
            {
              "Disease Condition": {
                title: "Irritable Bowel Syndrome",
                children: [
                  {
                    Markers: {
                      title: "Bowel Movement Patterns",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Diarrhoea",
                children: [
                  {
                    Markers: {
                      title: "Fecal leukocytes/calprotectin/lactoferrin",
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Ulcerative Colitis",
                children: [
                  {
                    Markers: {
                      title: "CRP",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Bone Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Rickets, Calcium Abnormalities, Vitamin D Deficiency, Juvenile Osteoporosis",
                children: [
                  {
                    Markers: {
                      title:
                        "BMD (Bone Mineral Density), Vitamin D levels, Osteocalcin",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Vitamin D, Calcium , Fish Oil, Mushroom, Cod Liver Oil",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Brain Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "ADHD (Attention Deficit Hyperactivity Disorder), Anxiety, CD (Conduct Disorder),Memory Development",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormal Movements, Difficult with Language Development, Abnormalities in GABA neurotransmitter, Visual Impairement, Low Grasping",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi, Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Joint Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Joint Pain, Osteoartthritis, Rheumatoid arthritis, Muscle Loss, Sarcopenia, Neuropathic Pain, Spondylitis, Knee Injuries,",
                children: [
                  {
                    Markers: {
                      title:
                        "Joint Mobility, Infammation, Ligament, Tendons, Rheumatoid Factor, ESR, CRP levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Collagen Type I , UC II, Rose Hip Extract, Devils Claw, Boswellia, Mucopolysaccharide, MSM, Methycobalamin, Vitamin C, Sodium Hyaluronate, Curcumin, Fish Oil providing EPA & DHA,Zinc, Chromium, Boron, Andrographis Paniculata Extract,Vitamin K27",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Skin Health",
          children: [
            {
              "Disease Condition": {
                title: "Acne, Sunburns, Eczema, Warts",
                children: [
                  {
                    Markers: {
                      title: "Skin Inflammation, Oily Skin",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cod Liver Oil, Fish Oil, Collagen, Olive Fruit Extract, Rosemary Extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Hair Health",
          children: [
            {
              "Disease Condition": {
                title: "Hair Loss, Thinning of hair, Dandruff",
                children: [
                  {
                    Markers: {
                      title: "Hair Fall, Brittleness",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Biotin, Cod Liver Oil, Amla, Zinc, Inositol, Iron, Vitamin A, Vitamin E, Vitamin B6",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const oldTreeObject = {
  "Senior Citizen - Above 60 years": {
    title: "",
    children: [
      {
        "Health Category": {
          title: "Immune Health",
          children: [
            {
              "Disease Condition": {
                title: "Auto immune disease , Cold / Cough",
                children: [
                  {
                    Markers: {
                      title: "Inflamatory markers like CRP",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin, Omega 3 Fatty Acids, Astaxanthin, Vitamin C, Ashwagandha, Elderberry, Ginger, Garlic, Black Seed Oil, Magnesium, Curcumin, Tulsi, Moringa",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Gut Health",
          children: [
            {
              "Disease Condition": {
                title: "Irritable Bowel Syndrome",
                children: [
                  {
                    Markers: {
                      title: "Bowel Movement Patterns",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Diarrhoea",
                children: [
                  {
                    Markers: {
                      title: "Fecal leukocytes/calprotectin/lactoferrin",
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Ulcerative Colitis",
                children: [
                  {
                    Markers: {
                      title: "CRP",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Eye Health",
          children: [
            {
              "Disease Condition": {
                title: "Diabetic Retinopathy",
                children: [
                  {
                    Makers: {
                      title: "Inflammation",
                    },
                  },
                ],
                children: [
                  {
                    "Nutraceutical Ingredients": {
                      title:
                        "Astaxanthin, Mixed Carotenoids, Fish Oils, Copper, Bilbery Exitract, Tocotrienols, Vitamin E, Lutein, Zeaxanthin",
                    },
                  },
                ],
              },
            },

            {
              "Disease Condition": {
                title: "Cataract",
                children: [
                  {
                    Makers: {
                      title: "Visual Acuity, Macular Pigment Density",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Blood Sugar Management",
          children: [
            {
              "Disease Condition": {
                title: "Metabolic Diseases",
                children: [
                  {
                    Markers: {
                      title: "Blood Glucose Levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Fenugreek Seed Extract, Cinnamon, Alpha Lipoic Acid, Chromium, Bitter Guard, Pectin, AloeVera Extract, Quercetin, Zinc",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Heart Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "CAD (Coronary Artery Diseased), Higher Cholesterol, Rheumatic Heart Disease, Arrhythmia, Hypertensive disease, Atherosclerosis",
                children: [
                  {
                    Markers: {
                      title: "Blood Glucose Levels",
                      children: [
                        {
                          "Blood Pressure Levels, Triglycerides level, Cholesterol levels,Lipoproteins, Fibrinogen, Enzymes - Creatinine Kinase, Myoglobin ":
                            {
                              title:
                                "Fenugreek fibre, Berberine, Karela Extract, N Aceyl Cysteine,Grape Seed Extract, Flaxseed Oil, Nattokinase, LOLA, Selenium, Vitamin D3, Vitamin K27, Astaxanthin, Glutathione,Wheat  Germ Oil, Alpha Lipoic Acid, Mixed Careotenoids, Krill Oil, Quercetin",
                            },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Stress Management",
          children: [
            {
              "Disease Condition": {
                title: "General Stress",
                children: [
                  {
                    Markers: {
                      title: "Cortisol Levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Magnesium, Ashwagandha, L Tryptophan, Rhodiola Rosea , Melatonin, Curcmin, Nutmeg, Cinnamon",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Bone Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Osteoporosis, Vitamin D Deficiency, Fracture Healing, Osteomalacia, Bone Cancer",
                children: [
                  {
                    Markers: {
                      title:
                        "BMD, Calcium Levels, Vitamin D leves, Frequent Fractures",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cissus Quadrangularis Extract, Dalbergia Sisso, Fortibone Collagen, Bamboo Shoot Extract,Magmesium, Vitamin K27, Caclium, Vitamin D3, Vitashine, Magnesium, Fish Oil, Krill Oil, Coral Calcium, CCM, Aquamin Calcium, Algaecal, Zinc Sulfate",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Brain Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Anxiety, Autism, Epilepsy, Dementia, Degenerative Nerve Disease,Encephalitis, Traumatic Brain Injuries, Alzheimer's , Parkinson's",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormalities in GABA neurotransmitter, Creatine Kinase levels, Lower IQ, Brain Protein Level S100, Memory Loss, Cognitive Decline",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi (Bacopa Monnieri), Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol, Ginseng, Ashwagandha, Omega 3 Fatty Acids, Vitamin D, Vitamin K, Vitamin B12, Folate, L Carnosine, Amino Acids, Vitamin B5, Ginseng, Ginkgo Biloba, Jatamansi, MUshroom extracts,Gotu Kola, Magnesium L Threonate, L Theanine , Extract of Alpinia galanga",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Joint Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Joint Pain, Osteoartthritis, Rheumatoid arthritis, Muscle Loss, Sarcopenia, Neuropathic Pain, Spondylitis, Knee Injuries,",
                children: [
                  {
                    Markers: {
                      title:
                        "Joint Mobility, Infammation, Ligament, Tendons, Rheumatoid Factor, ESR, CRP levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Collagen Type I , UC II, Rose Hip Extract, Devils Claw, Boswellia, Mucopolysaccharide, MSM, Methycobalamin, Vitamin C, Sodium Hyaluronate, Curcumin, Fish Oil providing EPA & DHA,Zinc, Chromium, Boron, Andrographis Paniculata Extract,Vitamin K27, HMB",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Skin Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Acne, Psoriasis, Melanoma, Dermatitis, Eczema, Sunburns",
                children: [
                  {
                    Markers: {
                      title: "Skin Inflammation, Oily Skin",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cod Liver Oil, Fish Oil,Collagen, Olive Fruit Extract, Rosemary Extract, Polyphenols, L Glutathione , Astaxanthin, Careotenoids, AloeVera, Pomegranate Powder, Tocotrienols, Vitamin E, Sea Buckthorn,Amla Extract, Evening Primrose Oil, Nicotinamide, Ceramosides",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Hair Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Anxiety, Autism, Epilepsy, Dementia, Degenerative Nerve Disease,Encephalitis, Traumatic Brain Injuries, Alzheimer's , Parkinson's",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormalities in GABA neurotransmitter, Creatine Kinase levels, Lower IQ, Brain Protein Level S100, Memory Loss, Cognitive Decline",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi (Bacopa Monnieri), Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol, Ginseng, Ashwagandha, Omega 3 Fatty Acids, Vitamin D, Vitamin K, Vitamin B12, Folate, L Carnosine, Amino Acids, Vitamin B5, Ginseng, Ginkgo Biloba, Jatamansi, MUshroom extracts,Gotu Kola, Magnesium L Threonate, L Theanine , Extract of Alpinia galanga",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Sleep Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Insomnia, Sleep Apnea, Circadian Arrhythm, Jet Lag, Migraine Attack",
                children: [
                  {
                    Markers: {
                      title:
                        "Lack of Sleep, high CRP Levels, Frequent Headaches, High HbA1C levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics like L paracasei, L Theanine, Melatonin, L Tryptophan,Valerian Root Extract, Chamomile Extract, Ashwagandha, L Threonine, Nutmeg, Cinnamon, Curumin, Magnesium, Lemon Balm,Passion Flower",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Urinary Tract Health ( Female above 20 )",
          children: [
            {
              "Disease Condition": {
                title: "Infection of the Bladder, Urethra Infection",
                children: [
                  {
                    Markers: {
                      title: "Pain during Urination, Urinary Albumin level",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cranberry, D mannose, Green Tea, Magensium, Potassium Citrate, Hibiscus Extract, Dandelion Extract, Salvia officinalis leaf extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const adultObject = {
  "Adults 20 - 60 years": {
    title: "",
    children: [
      {
        "Health Category": {
          title: "Immune Health",
          children: [
            {
              "Disease Condition": {
                title: "Auto immune disease , Cold / Cough",
                children: [
                  {
                    Markers: {
                      title: "Inflamatory markers like CRP",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Cod Liver Oil, Zinc, Vitamin D3, Multivitamin, Omega 3 Fatty Acids, Astaxanthin, Vitamin C, Ashwagandha, Elderberry, Ginger, Garlic, Black Seed Oil, Curcumin, Tulsi, Moringa",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Gut Health",
          children: [
            {
              "Disease Condition": {
                title: "Irritable Bowel Syndrome",
                children: [
                  {
                    Markers: {
                      title: "Bowel Movement Patterns",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics, Fibre, Omega 3 Fatty Acids, Vitamin E, Glutamine, Ginger, Fenugreek Seed Extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Diarrhoea",
                children: [
                  {
                    Markers: {
                      title: "Fecal leukocytes/calprotectin/lactoferrin",
                    },
                  },
                ],
              },
            },
            {
              "Disease Condition": {
                title: "Ulcerative Colitis",
                children: [
                  {
                    Markers: {
                      title: "CRP",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Eye Health",
          children: [
            {
              "Disease Condition": {
                title: "Diabetic Retinopathy",
                children: [
                  {
                    "Nutraceutical Ingredients": {
                      title:
                        "Astaxanthin, Mixed Carotenoids, Fish Oils, Copper, Bilbery Exitract, Tocotrienols, Vitamin E, Lutein, Zeaxanthin",
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Blood Sugar Management",
          children: [
            {
              "Disease Condition": {
                title: "Metabolic Diseases",
                children: [
                  {
                    Markers: {
                      title: "Blood Glucose Levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Fenugreek Seed Extract, Cinnamon, Alpha Lipoic Acid, Chromium, Bitter Guard, Pectin, AloeVera Extract, Quercetin, Zinc",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Heart Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "CAD (Coronary Artery Diseased), Higher Cholesterol, Rheumatic Heart Disease, Arrhythmia, Hypertensive disease, Atherosclerosis",
                children: [
                  {
                    Markers: {
                      title: "Blood Glucose Levels",
                      children: [
                        {
                          "Blood Pressure Levels, Triglycerides level, Cholesterol levels,Lipoproteins, Fibrinogen, Enzymes - Creatinine Kinase, Myoglobin ":
                            {
                              title:
                                "Fenugreek fibre, Berberine, Karela Extract, N Aceyl Cysteine,Grape Seed Extract, Flaxseed Oil, Nattokinase, LOLA, Selenium, Vitamin D3, Vitamin K27, Astaxanthin, Glutathione,Wheat  Germ Oil, Alpha Lipoic Acid, Mixed Careotenoids, Krill Oil, Quercetin",
                            },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Stress Management",
          children: [
            {
              "Disease Condition": {
                title: "General Stress, Migraine",
                children: [
                  {
                    Markers: {
                      title: "Cortisol Levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Magnesium, Ashwagandha, L Tryptophan, Rhodiola Rosea , Melatonin, Curcmin, Nutmeg, Cinnamon",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Bone Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Osteoporosis, Vitamin D Deficiency, Fracture Healing, Osteomalacia, Bone Cancer",
                children: [
                  {
                    Markers: {
                      title:
                        "BMD, Calcium Levels, Vitamin D leves, Frequent Fractures",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cissus Quadrangularis Extract, Dalbergia Sisso, Fortibone Collagen, Bamboo Shoot Extract,Magmesium, Vitamin K27, Caclium, Vitamin D3, Vitashine, Magnesium, Fish Oil, Krill Oil, Coral Calcium, CCM, Aquamin Calcium, Algaecal, Zinc Sulfate",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Brain Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "ADHD (Attention Deficit Hyperactivity Disorder), Anxiety, CD (Conduct Disorder),Memory Development",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormal Movements, Difficult with Language Development, Abnormalities in GABA neurotransmitter, Visual Impairement, Low Grasping",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi, Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Joint Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Joint Pain, Osteoartthritis, Rheumatoid arthritis, Muscle Loss, Sarcopenia, Neuropathic Pain, Spondylitis, Knee Injuries,",
                children: [
                  {
                    Markers: {
                      title:
                        "Joint Mobility, Infammation, Ligament, Tendons, Rheumatoid Factor, ESR, CRP levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Collagen Type I , UC II, Rose Hip Extract, Devils Claw, Boswellia, Mucopolysaccharide, MSM, Methycobalamin, Vitamin C, Sodium Hyaluronate, Curcumin, Fish Oil providing EPA & DHA,Zinc, Chromium, Boron, Andrographis Paniculata Extract,Vitamin K27",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Skin Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Acne, Psoriasis, Melanoma, Dermatitis, Eczema, Sunburns",
                children: [
                  {
                    Markers: {
                      title: "Skin Inflammation, Oily Skin",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cod Liver Oil, Fish Oil,Collagen, Olive Fruit Extract, Rosemary Extract, Polyphenols, L Glutathione , Astaxanthin, Careotenoids, AloeVera, Pomegranate Powder, Tocotrienols, Vitamin E, Sea Buckthorn,Amla Extract, Evening Primrose Oil, Nicotinamide, Ceramosides",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Hair Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Anxiety, Autism, Epilepsy, Dementia, Degenerative Nerve Disease,Encephalitis, Traumatic Brain Injuries, Alzheimer's , Parkinson's",
                children: [
                  {
                    Markers: {
                      title:
                        "Abnormalities in GABA neurotransmitter, Creatine Kinase levels, Lower IQ, Brain Protein Level S100, Memory Loss, Cognitive Decline",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Multivitamin, DHA, Brahmi (Bacopa Monnieri), Shankapushpi, Almonds, Walnuts,Vacha, Swarna Bhasma, Zinc, Vitamin D, Iron, Inositol, Ginseng, Ashwagandha, Omega 3 Fatty Acids, Vitamin D, Vitamin K, Vitamin B12, Folate, L Carnosine, Amino Acids, Vitamin B5, Ginseng, Ginkgo Biloba, Jatamansi, MUshroom extracts,Gotu Kola, Magnesium L Threonate, L Theanine , Extract of Alpinia galanga",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Sleep Health",
          children: [
            {
              "Disease Condition": {
                title:
                  "Insomnia, Sleep Apnea, Circadian Arrhythm, Jet Lag, Migraine Attack",
                children: [
                  {
                    Markers: {
                      title:
                        "Lack of Sleep, high CRP Levels, Frequent Headaches, High HbA1C levels",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Probiotics like L paracasei, L Theanine, Melatonin, L Tryptophan,Valerian Root Extract, Chamomile Extract, Ashwagandha, L Threonine, Nutmeg, Cinnamon, Curumin, Magnesium, Lemon Balm,Passion Flower",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Urinary Tract Health ( Female above 20 )",
          children: [
            {
              "Disease Condition": {
                title: "Infection of the Bladder, Urethra Infection",
                children: [
                  {
                    Markers: {
                      title: "Pain during Urination, Urinary Albumin level",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cranberry, D mannose, Green Tea, Magensium, Potassium Citrate, Hibiscus Extract, Dandelion Extract, Salvia officinalis leaf extract",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Sexual Wellness - Female",
          children: [
            {
              "Disease Condition": {
                title: "PCOS, Endometriosis, Decreased Libido",
                children: [
                  {
                    Markers: {
                      title: "Infertility, Pain during menses",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Celery, Ashwagandha, Tribulus Terrstris, Co enzyme Q10, Shatavari, Chromim, Selenium, Maca root,Saffron, Fenugreek",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        "Health Category": {
          title: "Sexual Wellness - Male",
          children: [
            {
              "Disease Condition": {
                title:
                  "Erectile Dysfunction, Premature Ejaculation, Decreased Libido",
                children: [
                  {
                    Markers: {
                      title: "Low Sperm Count, Less Motility",
                      children: [
                        {
                          "Nutraceutical Ingredients": {
                            title:
                              "Cholorophytum borivillianum extract, Fenugreek Extract, Ashwagandha, Moringa Olifera, Mucuna Pruriens, Coenzyme Q10, Zinc, Selenium, Maca root Extract, Saffron, Shilajit",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

let markupArray = ["<ul>"];

const createList = (items) => {
  console.log(items);
  switch (typeof items) {
    case "object":
      getItems(items);
      break;
  }
};

const getItems = (items) => {
  for (const item in items) {
    markupArray.push(
      `<li> <a href="/contact.html"><div class="test"><span>${item}</span>`
    );

    let details = items[item];
    getDetails(details);

    markupArray.push("</a></li>");
  }
};

const getDetails = (details) => {
  for (const detail in details) {
    if (detail == "img") {
      markupArray.push(
        `<img src="${details[detail]}" alt="${details[detail]}">`
      );
    } else if (detail == "children") {
      markupArray.push("</div><ul>");
      details[detail].forEach((element) => {
        getItems(element);
      });

      markupArray.push("</ul>");
    } else {
      markupArray.push(`<span> ${details[detail]} </span>`);
    }
  }
};

const healthTab = document.getElementsByClassName("health-leveler-list");

for (item of healthTab) {
  item.addEventListener("click", getTree);
  console.log(item);
}
function getTree(e) {
  console.log(e.target.alt);
  const data = e.target.alt;
  console.log(data);

  switch (data) {
    case "kid":
      markupArray = [];
      createList(treeObject);
      markupArray.push("</ul>");
      document.getElementById("kids-list").innerHTML = markupArray.join("");
      break;
    case "teen":
      markupArray = [];
      createList(teenTreeObject);
      markupArray.push("</ul>");
      document.getElementById("teen-list").innerHTML = markupArray.join("");
      break;
    case "adult":
      markupArray = [];
      createList(adultObject);
      markupArray.push("</ul>");

      document.getElementById("adult-list").innerHTML = markupArray.join("");
      break;
    case "old":
      markupArray = [];
      createList(oldTreeObject);
      markupArray.push("</ul>");

      document.getElementById("old-list").innerHTML = markupArray.join("");
      break;
  }

  console.log(markupArray);
}

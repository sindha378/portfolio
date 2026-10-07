/* =========================================================
   SINDHAMANI V - PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const navbar =
    document.getElementById("navbar");

  const menuToggle =
    document.getElementById("menuToggle");

  const navMenu =
    document.getElementById("navMenu");

  const navLinks =
    document.querySelectorAll(".nav-link");

  const typingText =
    document.getElementById("typingText");

  const cursorGlow =
    document.querySelector(".cursor-glow");


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  function closeMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("show");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    const icon =
      menuToggle.querySelector("i");

    if (icon) {

      icon.classList.remove(
        "fa-xmark"
      );

      icon.classList.add(
        "fa-bars"
      );

    }

  }


  if (menuToggle && navMenu) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navMenu.classList.toggle("show");

        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        const icon =
          menuToggle.querySelector("i");

        if (icon) {

          icon.classList.toggle(
            "fa-bars",
            !isOpen
          );

          icon.classList.toggle(
            "fa-xmark",
            isOpen
          );

        }

      }
    );

  }


  /* =======================================================
     CLOSE MENU ON LINK CLICK
  ======================================================= */

  navLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );


  /* =======================================================
     NAVBAR SCROLL EFFECT
  ======================================================= */

  function handleNavbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 40) {

      navbar.classList.add(
        "scrolled"
      );

    } else {

      navbar.classList.remove(
        "scrolled"
      );

    }

  }

  window.addEventListener(
    "scroll",
    handleNavbarScroll,
    { passive: true }
  );

  handleNavbarScroll();


  /* =======================================================
     TYPING EFFECT
  ======================================================= */

  if (typingText) {

    const words = [

      "Smart IoT Systems",

      "Data Analytics Dashboards",

      "Cybersecurity Solutions",

      "Python Applications",

      "Intelligent Technologies"

    ];

    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeEffect() {

      const currentWord =
        words[wordIndex];


      if (!deleting) {

        characterIndex++;

        typingText.textContent =
          currentWord.substring(
            0,
            characterIndex
          );


        if (
          characterIndex ===
          currentWord.length
        ) {

          deleting = true;

          setTimeout(
            typeEffect,
            1600
          );

          return;

        }

      } else {

        characterIndex--;

        typingText.textContent =
          currentWord.substring(
            0,
            characterIndex
          );


        if (characterIndex === 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) %
            words.length;

        }

      }


      const speed =
        deleting
          ? 45
          : 80;


      setTimeout(
        typeEffect,
        speed
      );

    }


    typeEffect();

  }


  /* =======================================================
     CURSOR GLOW
  ======================================================= */

  if (
    cursorGlow &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      }
    );


    function animateGlow() {

      glowX +=
        (mouseX - glowX) * 0.08;

      glowY +=
        (mouseY - glowY) * 0.08;


      cursorGlow.style.left =
        `${glowX}px`;

      cursorGlow.style.top =
        `${glowY}px`;


      requestAnimationFrame(
        animateGlow
      );

    }


    animateGlow();

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "active"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "active"
        );

      }
    );

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "header[id], section[id]"
    );


  function updateActiveNav() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection =
      "home";


    sections.forEach(
      (section) => {

        const sectionTop =
          section.offsetTop;

        const sectionBottom =
          sectionTop +
          section.offsetHeight;


        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionBottom
        ) {

          currentSection =
            section.id;

        }

      }
    );


    navLinks.forEach(
      (link) => {

        link.classList.remove(
          "active"
        );


        const href =
          link.getAttribute(
            "href"
          );


        if (
          href ===
          `#${currentSection}`
        ) {

          link.classList.add(
            "active"
          );

        }

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveNav
  );

  updateActiveNav();


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {

            return;

          }


          event.preventDefault();


          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            navbarHeight;


          window.scrollTo({

            top:
              targetPosition,

            behavior:
              "smooth"

          });

        }
      );

    }
  );


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const backTop =
    document.querySelector(
      ".back-top"
    );


  if (backTop) {

    backTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }


  /* =======================================================
     ANIMATED COUNTERS
  ======================================================= */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );


  let countersStarted = false;


  function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(
      (counter) => {

        const target =
          Number(
            counter.dataset.count
          );

        let current = 0;

        const duration = 1000;

        const startTime =
          performance.now();


        function updateCounter(
          currentTime
        ) {

          const progress =
            Math.min(
              (
                currentTime -
                startTime
              ) / duration,
              1
            );


          const easedProgress =
            1 -
            Math.pow(
              1 - progress,
              3
            );


          current =
            Math.floor(
              easedProgress *
              target
            );


          counter.textContent =
            `${current}+`;


          if (progress < 1) {

            requestAnimationFrame(
              updateCounter
            );

          } else {

            counter.textContent =
              `${target}+`;

          }

        }


        requestAnimationFrame(
          updateCounter
        );

      }
    );

  }


  const statsSection =
    document.querySelector(
      ".hero-stats"
    );


  if (
    statsSection &&
    "IntersectionObserver" in window
  ) {

    const statsObserver =
      new IntersectionObserver(
        (entries, observer) => {

          if (
            entries[0].isIntersecting
          ) {

            animateCounters();

            observer.disconnect();

          }

        },
        {
          threshold: 0.5
        }
      );


    statsObserver.observe(
      statsSection
    );

  } else {

    animateCounters();

  }


  /* =======================================================
     PROJECT CARD TILT EFFECT
  ======================================================= */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );


  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    projectCards.forEach(
      (card) => {

        card.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              card.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            const centerX =
              rect.width / 2;


            const centerY =
              rect.height / 2;


            const rotateX =
              (
                (y - centerY) /
                centerY
              ) * -2;


            const rotateY =
              (
                (x - centerX) /
                centerX
              ) * 2;


            card.style.transform =
              `
                translateY(-9px)
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
              `;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     SKILL CARD MOUSE GLOW
  ======================================================= */

  const skillCards =
    document.querySelectorAll(
      ".skill-card"
    );


  if (
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    skillCards.forEach(
      (card) => {

        card.addEventListener(
          "mousemove",
          (event) => {

            const rect =
              card.getBoundingClientRect();


            const x =
              event.clientX -
              rect.left;


            const y =
              event.clientY -
              rect.top;


            card.style.background =
              `
                radial-gradient(
                  180px circle at
                  ${x}px ${y}px,
                  rgba(37,99,235,0.05),
                  white 70%
                )
              `;

          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.style.background =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !navMenu ||
        !menuToggle
      ) {

        return;

      }


      const clickedInsideMenu =
        navMenu.contains(
          event.target
        );


      const clickedToggle =
        menuToggle.contains(
          event.target
        );


      if (
        navMenu.classList.contains(
          "show"
        ) &&
        !clickedInsideMenu &&
        !clickedToggle
      ) {

        closeMenu();

      }

    }
  );


  /* =======================================================
     CONSOLE MESSAGE
  ======================================================= */

  console.log(
    "%c✨ Welcome to Sindhamani V's Portfolio!",
    "color:#2563eb;font-size:16px;font-weight:bold;"
  );

  console.log(
    "%cIoT • Data Analytics • Cybersecurity • Python",
    "color:#06b6d4;font-size:13px;"
  );

});
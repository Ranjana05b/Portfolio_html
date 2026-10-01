/**
 * MyCloudPulse On-Demand Solutions — Master Landing Template
 * Interactions: sticky header, AOS, Swiper, GLightbox, gallery filter, form
 */

(() => {
  "use strict";

  const header = document.getElementById("mcpHeader");
  const backToTop = document.getElementById("backToTop");
  const yearEl = document.getElementById("currentYear");

  /* Sticky header + back-to-top */
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Active nav link on scroll */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".mcp-header .nav-link[href^='#']");

  const setActiveNav = () => {
    const offset = 120;
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - offset) {
        current = section.getAttribute("id") || "";
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });

  /* Close mobile nav after click */
  const navCollapse = document.getElementById("navbarNav");
  if (navCollapse && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const instance = bootstrap.Collapse.getInstance(navCollapse);
        if (instance && navCollapse.classList.contains("show")) instance.hide();
      });
    });
  }

  /* AOS */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  /* Swiper — testimonials */
  if (typeof Swiper !== "undefined" && document.querySelector(".testimonials-swiper")) {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".testimonials-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      },
    });
  }

  /* GLightbox — gallery + videos */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      openEffect: "zoom",
      closeEffect: "fade",
    });

    GLightbox({
      selector: ".glightbox-video",
      touchNavigation: true,
      autoplayVideos: true,
    });
  }

  /* Gallery filter */
  const filterBtns = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll("[data-gallery-item]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-gallery-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      galleryItems.forEach((item) => {
        const cat = item.getAttribute("data-gallery-item");
        const show = filter === "all" || cat === filter;
        item.classList.toggle("hidden", !show);
      });
    });
  });

  /* Lead form (front-end demo handler) */
  const leadForm = document.getElementById("leadForm");
  const formSuccess = document.getElementById("formSuccess");

  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!leadForm.checkValidity()) {
        leadForm.classList.add("was-validated");
        return;
      }

      const submitBtn = leadForm.querySelector('[type="submit"]');
      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      }

      // Demo-only: simulate API success. Replace with real endpoint.
      setTimeout(() => {
        if (formSuccess) formSuccess.classList.add("show");
        leadForm.reset();
        leadForm.classList.remove("was-validated");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }
        formSuccess?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 900);
    });
  }

  /* Prefill solution name from page config */
  const solutionField = document.getElementById("solutionName");
  const solutionMeta = document.querySelector('meta[name="solution-name"]');
  if (solutionField && solutionMeta && !solutionField.value) {
    solutionField.value = solutionMeta.getAttribute("content") || "";
  }
})();

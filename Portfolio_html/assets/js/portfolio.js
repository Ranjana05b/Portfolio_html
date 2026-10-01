/**
 * Portfolio page — filter & search solution cards
 */
(() => {
  "use strict";

  const header = document.getElementById("mcpHeader");
  const backToTop = document.getElementById("backToTop");
  const yearEl = document.getElementById("currentYear");
  const searchInput = document.getElementById("portfolioSearch");
  const filterBtns = document.querySelectorAll("[data-portfolio-filter]");
  const cards = document.querySelectorAll("[data-portfolio-card]");
  const emptyState = document.getElementById("portfolioEmpty");
  const navLinks = document.querySelectorAll(".mcp-header .nav-link[href^='#']");

  /* Sticky header */
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("show", y > 500);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Active nav */
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const offset = 120;
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - offset) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });

  /* Mobile nav close */
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

  /* Filter + search */
  let activeFilter = "all";

  const applyFilters = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const category = card.getAttribute("data-category") || "";
      const title = (card.getAttribute("data-title") || "").toLowerCase();
      const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
      const matchFilter = activeFilter === "all" || category === activeFilter;
      const matchSearch = !query || title.includes(query) || keywords.includes(query);
      const show = matchFilter && matchSearch;

      card.classList.toggle("hidden", !show);
      if (show) visible += 1;
    });

    if (emptyState) emptyState.classList.toggle("show", visible === 0);
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-portfolio-filter") || "all";
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
})();

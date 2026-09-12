/*
 * Legacy Land Developers — Front-end behavior
 * -------------------------------------------------
 * - Header scroll state
 * - Mobile nav toggle
 * - IntersectionObserver reveal animations
 * - Property list rendering + search on Properties page
 * - Contact form → WhatsApp handoff
 */
(function () {
  "use strict";

  var LLD = window.LLD || {};

  /* ---------- Header ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    primaryNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Property card renderer ---------- */
  function propertyCardHTML(p, opts) {
    opts = opts || {};
    var waHref = LLD.waLink(LLD.waPropertyMessage(p.name));
    var tagClass = p.accent === "accent" ? "property-card__tag--accent" : "";
    var tagsHTML = (p.tags || []).slice(0, 3).map(function (t, i) {
      var cls = i === 0 ? "property-card__pill" : "property-card__pill property-card__pill--accent";
      return '<span class="' + cls + '">' + t + "</span>";
    }).join("");
    var imgAlt = p.name + " — " + p.location;
    var imgSrc = p.image || ("assets/images/" + p.imageSlug + ".svg");
    var imgFallback = "assets/images/" + p.imageSlug + ".svg";
    var imgW = p.imageWidth || 800;
    var imgH = p.imageHeight || 600;
    return (
      '<article class="property-card reveal" data-name="' + p.name.toLowerCase() +
      '" data-location="' + p.location.toLowerCase() +
      '" data-tags="' + (p.tags || []).join(" ").toLowerCase() + '">' +
        '<div class="property-card__media">' +
          '<img loading="lazy" decoding="async" src="' + imgSrc + '" onerror="this.onerror=null;this.src=\'' + imgFallback + '\';" alt="' + imgAlt + '" width="' + imgW + '" height="' + imgH + '" />' +
          '<span class="property-card__tag ' + tagClass + '">' + (p.tag || "Available") + '</span>' +
        '</div>' +
        '<div class="property-card__body">' +
          '<h3 class="property-card__title"><a href="properties/' + p.slug + '.html">' + p.name + '</a></h3>' +
          '<span class="property-card__location">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s-7-7.58-7-13a7 7 0 1 1 14 0c0 5.42-7 13-7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>' +
            p.locationShort +
          '</span>' +
          '<div class="property-card__meta">' + tagsHTML + '</div>' +
          '<div class="property-card__meta" style="margin-top:auto"><span class="property-card__pill">📐 ' + p.plotSizeShort + '</span></div>' +
        '</div>' +
        '<div class="property-card__footer">' +
          '<a class="btn btn-outline btn-sm" href="properties/' + p.slug + '.html">View Details</a>' +
          '<a class="btn btn-whatsapp btn-sm" href="' + waHref + '" target="_blank" rel="noopener" aria-label="WhatsApp enquiry about ' + p.name + '">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.66a11.83 11.83 0 0 0 5.7 1.45h.01c6.56 0 11.86-5.3 11.86-11.86 0-3.17-1.23-6.15-3.41-8.45Zm-8.46 18.24h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.87 9.87 0 0 1-1.51-5.2c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.86-9.89 9.86Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35Z"/></svg>' +
            'WhatsApp' +
          '</a>' +
        '</div>' +
      '</article>'
    );
  }

  /* ---------- Home page: render 4 property cards ---------- */
  var homeGrid = document.getElementById("home-property-grid");
  if (homeGrid && LLD.properties) {
    homeGrid.innerHTML = LLD.properties.map(function (p) { return propertyCardHTML(p); }).join("");
    reobserveReveals();
  }

  /* ---------- Properties page: search + filter ---------- */
  var listGrid = document.getElementById("properties-grid");
  var searchInput = document.getElementById("property-search");
  var filterChips = document.querySelectorAll(".filter-chip");
  var emptyState = document.getElementById("search-empty");
  var currentTag = "all";

  if (listGrid && LLD.properties) {
    listGrid.innerHTML = LLD.properties.map(function (p) { return propertyCardHTML(p); }).join("");
    reobserveReveals();
  }

  function applyFilter() {
    if (!listGrid) return;
    var q = (searchInput && searchInput.value || "").trim().toLowerCase();
    var cards = listGrid.querySelectorAll(".property-card");
    var visible = 0;
    cards.forEach(function (card) {
      var name = card.getAttribute("data-name") || "";
      var loc = card.getAttribute("data-location") || "";
      var tags = card.getAttribute("data-tags") || "";
      var matchesText = !q || name.indexOf(q) > -1 || loc.indexOf(q) > -1 || tags.indexOf(q) > -1;
      var matchesTag = currentTag === "all" || tags.indexOf(currentTag) > -1;
      var show = matchesText && matchesTag;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  }
  if (searchInput) searchInput.addEventListener("input", applyFilter);
  filterChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      filterChips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      currentTag = (chip.getAttribute("data-tag") || "all").toLowerCase();
      applyFilter();
    });
  });

  /* ---------- Contact form → WhatsApp ---------- */
  var enquiryForm = document.getElementById("enquiry-form");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = enquiryForm.elements["name"].value.trim();
      var phone = enquiryForm.elements["phone"].value.trim();
      var property = enquiryForm.elements["property"].value;
      var message = enquiryForm.elements["message"].value.trim();
      var body =
        "Hello Legacy Land Developers, my name is " + (name || "[Name]") + "." +
        "\nPhone: " + (phone || "[Phone]") +
        "\nInterested in: " + (property || "General enquiry") +
        (message ? "\n\n" + message : "");
      var url = LLD.waLink(body);
      window.open(url, "_blank", "noopener");
    });
  }

  /* Re-run IntersectionObserver on newly injected elements */
  function reobserveReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var newReveals = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!newReveals.length) return;
    var io2 = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    newReveals.forEach(function (el) { io2.observe(el); });
  }

  /* ---------- Set current year in footer ---------- */
  var year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
})();

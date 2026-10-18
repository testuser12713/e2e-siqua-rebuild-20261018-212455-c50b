(function () {
  "use strict";

  document.documentElement.classList.add("js");

  function initNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-navigation");
    var header = document.querySelector(".site-header");
    if (!toggle || !nav || !header) return;

    var label = toggle.querySelector(".nav-toggle__label");
    var mobileQuery = window.matchMedia("(max-width: 899px)");

    function setOpen(open, returnFocus) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "Schließen" : "Menü";
      if (!open && returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (link && mobileQuery.matches) setOpen(false, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false, true);
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (!header.contains(event.target)) setOpen(false, false);
    });

    function closeOnDesktop(event) {
      if (!event.matches) setOpen(false, false);
    }

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", closeOnDesktop);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(closeOnDesktop);
    }
  }

  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initMap() {
    var frame = document.getElementById("map-frame");
    var placeholder = document.getElementById("map-placeholder");
    var consentButton = document.getElementById("map-consent");
    var revokeButton = document.getElementById("map-revoke");
    var status = document.getElementById("map-status");
    if (!frame || !placeholder || !consentButton || !revokeButton || !status) return;

    var storageKey = "siqua.maps-consent";
    var mapSource = "https://www.google.com/maps?q=Langenharter%20Stra%C3%9Fe%208%2C%204300%20St.%20Valentin&output=embed";
    var mapTitle = "Google Maps: SIQUA GmbH, Langenharter Straße 8, 4300 St. Valentin";
    var supportsObserver = "IntersectionObserver" in window;
    var mapInView = !supportsObserver;

    function readConsent() {
      try {
        return window.localStorage.getItem(storageKey) === "granted";
      } catch (error) {
        return false;
      }
    }

    function writeConsent(granted) {
      try {
        if (granted) {
          window.localStorage.setItem(storageKey, "granted");
        } else {
          window.localStorage.removeItem(storageKey);
        }
      } catch (error) {
        return;
      }
    }

    var consentGranted = readConsent();

    function setStatus(message) {
      status.textContent = message;
    }

    function loadMap() {
      if (!consentGranted || frame.querySelector("iframe")) return;
      var iframe = document.createElement("iframe");
      iframe.className = "map-iframe";
      iframe.src = mapSource;
      iframe.title = mapTitle;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      frame.appendChild(iframe);
      placeholder.hidden = true;
      revokeButton.hidden = false;
      setStatus("Karte geladen. Die Einwilligung kann jederzeit widerrufen werden.");
    }

    function removeMap() {
      var iframe = frame.querySelector("iframe");
      if (iframe) iframe.remove();
      placeholder.hidden = false;
      revokeButton.hidden = true;
      setStatus("Einwilligung widerrufen. Die Karte wurde entfernt.");
    }

    consentButton.addEventListener("click", function () {
      consentGranted = true;
      writeConsent(true);
      if (mapInView) loadMap();
      else setStatus("Einwilligung gespeichert. Die Karte wird beim Sichtbarwerden geladen.");
    });

    revokeButton.addEventListener("click", function () {
      consentGranted = false;
      writeConsent(false);
      removeMap();
      consentButton.focus();
    });

    if (supportsObserver) {
      var mapObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            mapInView = true;
            if (consentGranted) loadMap();
            mapObserver.disconnect();
          });
        },
        { threshold: 0.12 }
      );
      mapObserver.observe(frame);
    }

    if (consentGranted) {
      setStatus("Einwilligung gespeichert. Die Karte wird geladen, sobald der Bereich sichtbar ist.");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initReveal();
    initMap();
  });
})();

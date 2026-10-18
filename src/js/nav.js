export function initMobileNav() {
  const root = document.querySelector("#site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-navigation");
  const header = document.querySelector(".site-header");

  if (!root || !toggle || !nav || !header) return;
  if (root.dataset.navReady === "true") return;

  root.dataset.navReady = "true";

  const label = toggle.querySelector(".nav-toggle__label");
  const mobile = window.matchMedia("(max-width: 899px)");
  let open = nav.classList.contains("is-open");

  function setOpen(next, returnFocus = false) {
    open = next;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");

    if (label) {
      label.textContent = open ? "Schließen" : "Menü";
    }

    if (!open && returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(!open);
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && mobile.matches && open) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!open) return;
    if (!header.contains(event.target)) {
      setOpen(false);
    }
  });

  function closeOnDesktop(event) {
    if (!event.matches && open) {
      setOpen(false);
    }
  }

  if (typeof mobile.addEventListener === "function") {
    mobile.addEventListener("change", closeOnDesktop);
  } else if (typeof mobile.addListener === "function") {
    mobile.addListener(closeOnDesktop);
  }
}

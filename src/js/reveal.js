const REVEAL_SELECTOR = "[data-reveal]";
const HIDDEN_CLASS = "is-hidden";
const VISIBLE_CLASS = "is-visible";

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.12
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function show(target) {
  target.classList.remove(HIDDEN_CLASS);
  target.classList.add(VISIBLE_CLASS);
}

function isInViewport(target) {
  if (typeof target.getBoundingClientRect !== "function") return false;

  const rect = target.getBoundingClientRect();
  const viewportHeight =
    (typeof window !== "undefined" && window.innerHeight) ||
    document.documentElement.clientHeight ||
    0;

  return rect.top < viewportHeight && rect.bottom > 0;
}

function startReveal() {
  const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));

  if (targets.length === 0) return;

  if (prefersReducedMotion() || typeof IntersectionObserver !== "function") {
    targets.forEach(show);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      show(entry.target);
      observer.unobserve(entry.target);
    }
  }, OBSERVER_OPTIONS);

  for (const target of targets) {
    if (isInViewport(target)) {
      show(target);
      continue;
    }

    target.classList.add(HIDDEN_CLASS);
    observer.observe(target);
  }
}

export function initReveal() {
  if (typeof document === "undefined") return;

  const run = () => startReveal();

  if (typeof queueMicrotask === "function") {
    queueMicrotask(run);
  } else {
    Promise.resolve().then(run);
  }
}

import assert from "node:assert/strict";
import test from "node:test";

import { initReveal } from "../src/js/reveal.js";

function makeTarget({ top = 0, bottom = 100 } = {}) {
  const classes = new Set();

  return {
    classes,
    classList: {
      add(name) {
        classes.add(name);
      },
      remove(name) {
        classes.delete(name);
      },
      contains(name) {
        return classes.has(name);
      }
    },
    getBoundingClientRect() {
      return { top, bottom };
    }
  };
}

class FakeIntersectionObserver {
  static instances = [];

  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observed = [];
    this.unobserved = [];
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target) {
    this.observed.push(target);
  }

  unobserve(target) {
    this.unobserved.push(target);
  }

  trigger(entries) {
    this.callback(entries);
  }
}

function installEnvironment(targets, { reduced = false, innerHeight = 800 } = {}) {
  FakeIntersectionObserver.instances = [];

  const previous = {
    document: globalThis.document,
    window: globalThis.window,
    IntersectionObserver: globalThis.IntersectionObserver
  };

  globalThis.document = {
    documentElement: { clientHeight: innerHeight },
    querySelectorAll(selector) {
      assert.equal(selector, "[data-reveal]");
      return targets;
    }
  };

  globalThis.window = {
    innerHeight,
    matchMedia(query) {
      assert.equal(query, "(prefers-reduced-motion: reduce)");
      return { matches: reduced };
    }
  };

  globalThis.IntersectionObserver = FakeIntersectionObserver;

  return () => {
    if (previous.document === undefined) {
      delete globalThis.document;
    } else {
      globalThis.document = previous.document;
    }

    if (previous.window === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = previous.window;
    }

    if (previous.IntersectionObserver === undefined) {
      delete globalThis.IntersectionObserver;
    } else {
      globalThis.IntersectionObserver = previous.IntersectionObserver;
    }
  };
}

async function nextMicrotask() {
  await Promise.resolve();
}

test("reduced motion reveals everything immediately without an observer", async () => {
  const targets = [
    makeTarget({ top: 100, bottom: 300 }),
    makeTarget({ top: 3000, bottom: 3400 })
  ];
  const restore = installEnvironment(targets, { reduced: true });

  try {
    initReveal();
    await nextMicrotask();

    assert.equal(FakeIntersectionObserver.instances.length, 0);

    for (const target of targets) {
      assert.equal(target.classList.contains("is-visible"), true);
      assert.equal(target.classList.contains("is-hidden"), false);
    }
  } finally {
    restore();
  }
});

test("observer reveals off-screen elements once and unobserves them", async () => {
  const inView = makeTarget({ top: 40, bottom: 240 });
  const belowFold = makeTarget({ top: 2000, bottom: 2400 });
  const restore = installEnvironment([inView, belowFold]);

  try {
    initReveal();
    await nextMicrotask();

    assert.equal(FakeIntersectionObserver.instances.length, 1);

    const observer = FakeIntersectionObserver.instances[0];

    assert.equal(inView.classList.contains("is-visible"), true);
    assert.equal(inView.classList.contains("is-hidden"), false);

    assert.equal(belowFold.classList.contains("is-hidden"), true);
    assert.equal(belowFold.classList.contains("is-visible"), false);
    assert.deepEqual(observer.observed, [belowFold]);

    observer.trigger([
      { isIntersecting: false, target: belowFold },
      { isIntersecting: true, target: belowFold }
    ]);

    assert.equal(belowFold.classList.contains("is-visible"), true);
    assert.equal(belowFold.classList.contains("is-hidden"), false);
    assert.deepEqual(observer.unobserved, [belowFold]);
  } finally {
    restore();
  }
});

test("an empty page needs no observer", async () => {
  const restore = installEnvironment([]);

  try {
    initReveal();
    await nextMicrotask();

    assert.equal(FakeIntersectionObserver.instances.length, 0);
  } finally {
    restore();
  }
});

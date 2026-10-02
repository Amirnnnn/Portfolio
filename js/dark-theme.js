/* ************************   dark-theme.js  ************************
   Theme toggle for dark-theme.css. Vanilla JS, no dependencies.
   - Applies data-theme="dark" | "light" on <html>.
   - Default = the visitor's system preference (prefers-color-scheme).
   - A manual choice is saved in localStorage ("theme") and overrides the
     system preference. All storage access is wrapped in try/catch.
   - Injects one fixed-position, keyboard-accessible button, so no HTML
     file needs to change. The label follows the site's EN/FA language.
   - Updates <meta name="theme-color"> in dark mode and restores the
     original value in light mode.
   The tiny inline script in <head> (see integration steps) sets the
   attribute before first paint; this file keeps it in sync afterwards.
   ************************************************************ */
(function () {
  "use strict";

  var KEY = "theme";
  var DARK_META = "#0b1f2e"; /* matches --color-bg-1 in dark-theme.css */
  var LABELS = { en: "Dark mode", fa: "حالت تاریک" };

  var root = document.documentElement;
  var mq = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
  var meta = document.querySelector('meta[name="theme-color"]');
  var metaOriginal = meta ? meta.getAttribute("content") : null;
  var button = null;

  /* ---------- storage helpers (localStorage can be unavailable) ---------- */
  function readSaved() {
    try {
      var value = window.localStorage.getItem(KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function save(value) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch (e) {
      /* ignore: the toggle still works for this visit */
    }
  }

  function systemTheme() {
    return mq && mq.matches ? "dark" : "light";
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  /* ---------- apply a theme ---------- */
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      updateIcon(theme);
    }
    if (meta && metaOriginal !== null) {
      meta.setAttribute("content", theme === "dark" ? DARK_META : metaOriginal);
    }
  }

  function updateIcon(theme) {
    if (!button) return;
    var svgOpen =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false"';
    button.innerHTML =
      svgOpen +
      (theme === "dark"
        ? ' class="theme-toggle__sun"><circle cx="12" cy="12" r="4"/>' +
          '<path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : ' class="theme-toggle__moon"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>');
  }

  /* ---------- button ---------- */
  function updateLabel() {
    if (!button) return;
    var lang = (root.lang || "en").slice(0, 2).toLowerCase();
    var text = LABELS[lang] || LABELS.en;
    button.setAttribute("aria-label", text);
    button.setAttribute("title", text);
  }

  function createButton() {
    button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("aria-pressed", String(currentTheme() === "dark"));
    updateIcon(currentTheme());
    updateLabel();

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      apply(next);
      save(next);
    });

    document.body.appendChild(button);
  }

  /* ---------- init ---------- */
  function init() {
    apply(readSaved() || systemTheme());
    createButton();

    /* follow the site's EN/FA switch (script.js changes <html lang>) */
    if (window.MutationObserver) {
      new MutationObserver(updateLabel).observe(root, {
        attributes: true,
        attributeFilter: ["lang"],
      });
    }

    /* follow system changes, but only while the visitor has no saved choice */
    if (mq) {
      var onSystemChange = function () {
        if (!readSaved()) apply(systemTheme());
      };
      if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
      else if (mq.addListener) mq.addListener(onSystemChange);
    }

    /* keep several open tabs in sync */
    window.addEventListener("storage", function (event) {
      if (event.key === KEY) apply(readSaved() || systemTheme());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* ************************   script.js  ************************
   Vanilla JS, no dependencies. Sections:
   1. storage helpers   2. translations   3. language switch (EN / FA, LTR / RTL)
   4. scroll reveal     5. nav scroll-spy  6. counters
   7. project filter    8. contact form (mailto)
   ************************************************************ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------- 1. storage helpers (localStorage can be unavailable) ---------- */
  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* ignore: the site works without persistence */
    }
  }

  /* ---------- 2. translations ---------- */
  var translations = {
    en: {
      "meta.title":
        "Amir Hossein Heidary | Biomedical Engineer & Front-End Developer",
      skip: "Skip to content",
      "nav.aria": "Main navigation",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "lang.button": "فا",
      "lang.aria": "Switch language to Persian",
      "hero.title": "Hi, I'm Amir Hossein",
      "hero.role": "Biomedical Engineer & Front-End Developer",
      "hero.subtitle":
        "I build interfaces that make complex health data simple to understand.",
      "hero.work": "View My Work",
      "hero.contact": "Contact Me",
      "about.title": "About Me",
      "about.hi": "Hi, I'm Amir Hossein.",
      "about.l1": "Biomedical Engineer & Front-End Developer",
      "about.l2":
        "I build interfaces that make complex health data simple to understand.",
      "stat.tools": "Tools & languages",
      "stat.projects": "Live project",
      "stat.fields": "Fields: biomedical and web",
      "skills.title": "Skills",
      "skills.web": "Web",
      "skills.programming": "Programming",
      "skills.tools": "Tools & Hardware",
      "projects.title": "Projects",
      "filter.aria": "Filter projects",
      "filter.all": "All",
      "filter.web": "Web",
      "filter.biomedical": "Biomedical",
      "filter.status": "Showing {n} of {total} projects",
      "project.featured": "Featured",
      "cardioa.desc":
        "A Web Bluetooth app for single-channel ECG, built as an installable PWA.",
      "project.live": "Live demo",
      "project.source": "Source code",
      "ph.title": "Your next project",
      "ph.desc": "Add a short description, technologies and links here.",
      "exp.title": "Experience & Education",
      "exp.badge.edu": "Education",
      "exp.badge.work": "Experience",
      "edu.title": "Biomedical Engineering",
      "edu.meta": "University of Isfahan , 1401 - 1405",
      "edu.desc": "",
      "exp1.title": "Front-End Developer",
      "exp1.desc":
        "Designing and building Cardioa, a Web Bluetooth ECG web app.",
      "exp1.meta": "",
      "contact.title": "Contact",
      "contact.lead": "Have a project or an idea? Send me a message.",
      "form.name": "Name",
      "form.email": "Email",
      "form.message": "Message",
      "form.send": "Send message",
      "form.opening": "Opening your email app. Press send there to finish.",
      "form.invalid": "Please fill in your name, a valid email and a message.",
      "form.subject": "Portfolio message from {name}",
      "footer.copy": "© {year} Amir Hossein Heidary",
    },
    fa: {
      "meta.title": "امیرحسین حیدری | مهندس پزشکی و توسعه‌دهنده فرانت‌اند",
      skip: "پرش به محتوا",
      "nav.aria": "ناوبری اصلی",
      "nav.home": "خانه",
      "nav.about": "درباره من",
      "nav.skills": "مهارت‌ها",
      "nav.projects": "پروژه‌ها",
      "nav.experience": "سوابق",
      "nav.contact": "تماس",
      "lang.button": "EN",
      "lang.aria": "تغییر زبان به انگلیسی",
      "hero.title": "سلام، من امیرحسین هستم",
      "hero.role": "مهندس پزشکی و توسعه‌دهنده فرانت‌اند",
      "hero.subtitle":
        "من رابط‌هایی می‌سازم که داده‌های پیچیده سلامت را ساده و قابل‌فهم می‌کنند.",
      "hero.work": "مشاهده نمونه‌کارها",
      "hero.contact": "تماس با من",
      "about.title": "درباره من",
      "about.hi": "سلام، من امیرحسین هستم.",
      "about.l1": "مهندس پزشکی و توسعه‌دهنده فرانت‌اند",
      "about.l2":
        "من رابط‌هایی می‌سازم که داده‌های پیچیده سلامت را ساده و قابل‌فهم می‌کنند.",
      "stat.tools": "ابزار و زبان",
      "stat.projects": "پروژه آنلاین",
      "stat.fields": "حوزه: پزشکی و وب",
      "skills.title": "مهارت‌ها",
      "skills.web": "وب",
      "skills.programming": "برنامه‌نویسی",
      "skills.tools": "ابزارها و سخت‌افزار",
      "projects.title": "پروژه‌ها",
      "filter.aria": "فیلتر پروژه‌ها",
      "filter.all": "همه",
      "filter.web": "وب",
      "filter.biomedical": "زیست‌پزشکی",
      "filter.status": "نمایش {n} از {total} پروژه",
      "project.featured": "ویژه",
      "cardioa.desc":
        "یک برنامه وب برای ECG تک‌کاناله با Web Bluetooth که به‌صورت PWA قابل نصب است.",
      "project.live": "نسخه زنده",
      "project.source": "کد منبع",
      "ph.title": "پروژه بعدی شما",
      "ph.desc": "اینجا توضیح کوتاه، فناوری‌ها و پیوندها را اضافه کنید.",
      "exp.title": "سوابق و تحصیلات",
      "exp.badge.edu": "تحصیلات",
      "exp.badge.work": "سابقه کار",
      "edu.title": "مهندسی پزشکی",
      "edu.meta": "دانشگاه اصفهان ، 1401 - 1405",
      "edu.desc": "",
      "exp1.title": "توسعه‌دهنده فرانت‌اند",
      "exp1.meta": "",
      "exp1.desc": "طراحی و ساخت Cardioa، یک وب‌اپ ECG مبتنی بر Web Bluetooth.",
      "contact.title": "تماس با من",
      "contact.lead": "پروژه یا ایده‌ای دارید؟ برایم پیام بفرستید.",
      "form.name": "نام",
      "form.email": "ایمیل",
      "form.message": "پیام",
      "form.send": "ارسال پیام",
      "form.opening":
        "برنامه ایمیل شما در حال باز شدن است. برای پایان کار، آنجا ارسال را بزنید.",
      "form.invalid": "لطفاً نام، یک ایمیل معتبر و پیام خود را وارد کنید.",
      "form.subject": "پیام از پورتفولیو، از طرف {name}",
      "footer.copy": "© {year} امیرحسین حیدری",
    },
  };

  var currentLang = "en";

  function t(key, vars) {
    var dict = translations[currentLang] || translations.en;
    var text =
      dict[key] !== undefined ? dict[key] : translations.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.replace("{" + name + "}", vars[name]);
      });
    }
    return text;
  }

  /* ---------- 3. language switch ---------- */
  var langToggle = document.getElementById("lang-toggle");

  function applyLanguage(lang) {
    currentLang = translations[lang] ? lang : "en";
    var root = document.documentElement;
    root.lang = currentLang;
    root.dir = currentLang === "fa" ? "rtl" : "ltr";
    document.title = t("meta.title");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), {
        year: new Date().getFullYear(),
      });
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    if (langToggle) {
      langToggle.textContent = t("lang.button");
      langToggle.setAttribute("aria-label", t("lang.aria"));
      /* the button label is in the language we switch TO */
      langToggle.lang = currentLang === "fa" ? "en" : "fa";
    }

    refreshCounters();
    updateFilterStatus();
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = currentLang === "fa" ? "en" : "fa";
      applyLanguage(next);
      storageSet("lang", next);
    });
  }

  /* ---------- 4. scroll reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- 5. nav scroll-spy ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav-item[href^="#"]'),
  );
  var spySections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && spySections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    spySections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- 6. counters ---------- */
  var counterEls = document.querySelectorAll("[data-count]");

  function formatNumber(n) {
    try {
      return new Intl.NumberFormat(
        currentLang === "fa" ? "fa-IR" : "en-US",
      ).format(n);
    } catch (e) {
      return String(n);
    }
  }

  var canAnimateCounters = "IntersectionObserver" in window && !reduceMotion;
  counterEls.forEach(function (el) {
    /* pending = waiting to scroll into view, animating = running, done = final value shown */
    el.dataset.state = canAnimateCounters ? "pending" : "done";
  });

  function refreshCounters() {
    counterEls.forEach(function (el) {
      if (el.dataset.state === "animating") return;
      var value = el.dataset.state === "pending" ? 0 : Number(el.dataset.count);
      el.textContent = formatNumber(value);
    });
  }

  function animateCounter(el) {
    var target = Number(el.dataset.count);
    var duration = 900;
    var start = null;
    el.dataset.state = "animating";
    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = formatNumber(Math.round(target * progress));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.dataset.state = "done";
      }
    }
    window.requestAnimationFrame(step);
  }

  if (canAnimateCounters) {
    var counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    counterEls.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ---------- 7. project filter ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");
  var filterStatus = document.getElementById("filter-status");
  var activeFilter = "all";

  function updateFilterStatus() {
    if (!filterStatus) return;
    var visible = 0;
    projectCards.forEach(function (card) {
      if (!card.hidden) visible += 1;
    });
    /* only announce after the visitor actually used a filter */
    filterStatus.textContent =
      activeFilter === "all" && !filterStatus.dataset.used
        ? ""
        : t("filter.status", {
            n: formatNumber(visible),
            total: formatNumber(projectCards.length),
          });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.getAttribute("data-filter");
      if (filterStatus) filterStatus.dataset.used = "true";
      filterButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === button));
      });
      projectCards.forEach(function (card) {
        var categories = (card.getAttribute("data-category") || "").split(" ");
        card.hidden = !(
          activeFilter === "all" || categories.indexOf(activeFilter) !== -1
        );
      });
      updateFilterStatus();
    });
  });

  /* ---------- 8. contact form (mailto) ---------- */
  var CONTACT_EMAIL = "amirnnnn1383@gmail.com";
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        formStatus.textContent = t("form.invalid");
        formStatus.className = "form-status is-error";
        form.reportValidity();
        return;
      }
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      var subject = t("form.subject", { name: name });
      var body = message + "\n\n" + name + "\n" + email;
      window.location.href =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      formStatus.textContent = t("form.opening");
      formStatus.className = "form-status is-success";
    });
  }

  /* ---------- init ---------- */
  var saved = storageGet("lang");
  var browserIsPersian =
    (navigator.language || "").toLowerCase().indexOf("fa") === 0;
  var initial =
    saved === "fa" || saved === "en" ? saved : browserIsPersian ? "fa" : "en";
  if (initial !== "en") {
    applyLanguage(initial);
  } else {
    /* keep the static English markup, but make sure year and numbers are current */
    applyLanguage("en");
  }
})();

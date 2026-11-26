/* =========================================================
   CONFIGURATION — modifiez ces valeurs
   ========================================================= */
const CONFIG = {
  githubUser: "issaahmatissa",
  email: "issaahmatissa0@gmail.com",
  // Service qui transmet les messages du formulaire vers votre boîte email (gratuit, sans serveur).
  formEndpoint: "https://formsubmit.co/ajax/issaahmatissa0@gmail.com",
};

// Ajoutez vos projets ici, avec le texte dans les 3 langues.
// Ils s'affichent automatiquement dans la section "Projets".
const PROJECTS = [
  {
    title: { fr: "Portfolio personnel", en: "Personal portfolio", ar: "الموقع الشخصي (Portfolio)" },
    description: {
      fr: "Ce site : portfolio responsive et trilingue (français, arabe, anglais), avec thème clair/sombre et formulaire de contact, développé sans framework.",
      en: "This website: a responsive, trilingual portfolio (French, Arabic, English) with light/dark theme and a contact form, built without a framework.",
      ar: "هذا الموقع: معرض أعمال متجاوب بثلاث لغات (الفرنسية والعربية والإنجليزية)، مع وضع فاتح وداكن ونموذج تواصل، مطوَّر دون أي إطار عمل.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    github: `https://github.com/${CONFIG.githubUser}/${CONFIG.githubUser}.github.io`,
    demo: "",
  },
  {
    title: { fr: "Université Django", en: "University app (Django)", ar: "تطبيق الجامعة (Django)" },
    description: {
      fr: "Application web de gestion universitaire développée avec le framework Django (Python).",
      en: "University management web application built with the Django framework (Python).",
      ar: "تطبيق ويب لإدارة الجامعة مطوَّر بإطار العمل Django (Python).",
    },
    tags: ["Python", "Django", "HTML", "CSS"],
    github: `https://github.com/${CONFIG.githubUser}/universite-django`,
    demo: "",
  },
  {
    title: { fr: "TP Génie Logiciel", en: "Software Engineering lab work", ar: "أعمال تطبيقية في هندسة البرمجيات" },
    description: {
      fr: "Travaux pratiques du cours de Génie Logiciel réalisés à l'INST d'Abéché.",
      en: "Lab assignments from the Software Engineering course at INST Abéché.",
      ar: "أعمال تطبيقية لمقرر هندسة البرمجيات في المعهد الوطني للعلوم والتقنيات بأبشة.",
    },
    tags: [
      { fr: "Génie logiciel", en: "Software engineering", ar: "هندسة البرمجيات" },
      { fr: "Conception", en: "Design", ar: "التصميم" },
    ],
    github: `https://github.com/${CONFIG.githubUser}/TP_GL`,
    demo: "",
  },
];

/* =========================================================
   Utilitaires
   ========================================================= */
const root = document.documentElement;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const pick = (v) => (v && typeof v === "object" ? v[lang] || v.fr : v);

/* =========================================================
   Langue : français / arabe / anglais
   ========================================================= */
const LANGS = ["fr", "ar", "en"];
let lang = (() => {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  const saved = store.get("lang");
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "fr").slice(0, 2);
  return LANGS.includes(nav) ? nav : "fr";
})();
const t = (key) => (I18N[lang] && I18N[lang][key]) ?? I18N.fr[key] ?? key;

function applyLang(next) {
  lang = next;
  store.set("lang", lang);
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });
  document.querySelectorAll("[data-i18n-content]").forEach((el) => { el.content = t(el.dataset.i18nContent); });
  document.title = t("meta.title");

  document.querySelectorAll(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

  renderProjects();
  restartTyping();
}

document.querySelectorAll(".lang-switch button").forEach((b) =>
  b.addEventListener("click", () => { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); })
);

/* =========================================================
   Thème clair / sombre
   ========================================================= */
const savedTheme = store.get("theme");
if (savedTheme) root.dataset.theme = savedTheme;
else if (window.matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  store.set("theme", root.dataset.theme);
});

/* =========================================================
   Navigation : menu mobile, ombre au scroll, lien actif
   ========================================================= */
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const menu = document.getElementById("navMenu");
const toTop = document.getElementById("toTop");

burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

/* =========================================================
   Effet machine à écrire
   ========================================================= */
const typed = document.getElementById("typed");
let typingTimer = null;
function restartTyping() {
  clearTimeout(typingTimer);
  const words = t("hero.typed");
  let w = 0, c = 0, deleting = false;
  (function type() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (!deleting && c < word.length) c++;
    else if (deleting && c > 0) c--;
    else if (!deleting) { deleting = true; typingTimer = setTimeout(type, 1600); return; }
    else { deleting = false; w = (w + 1) % words.length; }
    typingTimer = setTimeout(type, deleting ? 45 : 85);
  })();
}

/* =========================================================
   Projets
   ========================================================= */
const ICON_GH = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>';
const ICON_EXT = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>';
const ICON_FOLDER = '<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';

const githubUrl = `https://github.com/${CONFIG.githubUser}`;
document.querySelectorAll(".js-github").forEach((a) => (a.href = githubUrl));

const grid = document.getElementById("projectsGrid");
function renderProjects() {
  grid.innerHTML =
    PROJECTS.map(
      (p) => `
    <article class="project reveal visible">
      <div class="project__top">${ICON_FOLDER}
        <div class="project__links">
          ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="${esc(t("projects.code"))}">${ICON_GH}</a>` : ""}
          ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" aria-label="${esc(t("projects.demo"))}">${ICON_EXT}</a>` : ""}
        </div>
      </div>
      <h3>${esc(pick(p.title))}</h3>
      <p>${esc(pick(p.description))}</p>
      <ul class="tags">${p.tags.map((tag) => `<li>${esc(pick(tag))}</li>`).join("")}</ul>
    </article>`
    ).join("") +
    `<article class="project project--cta reveal visible">
      <div class="project__top" style="justify-content:center">${ICON_GH}</div>
      <h3>${esc(t("projects.more"))}</h3>
      <p>${esc(t("projects.moreDesc"))}</p>
      <a class="btn btn--ghost" href="${githubUrl}" target="_blank" rel="noopener">${esc(t("projects.moreBtn"))}</a>
    </article>`;
}

/* =========================================================
   Formulaire de contact : envoi réel par email (FormSubmit)
   ========================================================= */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

function showStatus(type, text) {
  statusEl.hidden = false;
  statusEl.className = `form__status form__status--${type}`;
  statusEl.textContent = text;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form._honey.value) return; // anti-spam
  sendBtn.disabled = true;
  sendBtn.textContent = t("form.sending");
  statusEl.hidden = true;

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    _replyto: form.email.value.trim(),
    _subject: form.subject.value.trim() || `${t("form.defaultSubject")} (${form.name.value.trim()})`,
    message: form.message.value.trim(),
    _template: "table",
    _captcha: "false",
  };

  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && String(data.success) === "true") {
      showStatus("ok", t("form.success"));
      form.reset();
    } else {
      throw new Error(data.message || `HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn("Envoi du formulaire :", err);
    showStatus("error", t("form.error"));
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = t("form.send");
  }
});

/* Copier l'adresse email */
const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.email);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("emailText"));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  copyBtn.textContent = t("contact.copied");
  setTimeout(() => (copyBtn.textContent = t("contact.copy")), 2000);
});

/* =========================================================
   Démarrage
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
applyLang(lang);

/* Animations d'apparition au défilement */
const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealer.observe(el));

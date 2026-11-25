/* =========================================================
   CONFIGURATION — modifiez ces valeurs
   ========================================================= */
const CONFIG = {
  // Remplacez par votre nom d'utilisateur GitHub (ex : "issaahmat")
  githubUser: "issaahmatissa",
  email: "issaahmatissa0@gmail.com",
};

// Ajoutez vos projets ici : ils s'affichent automatiquement dans la section "Projets".
// Exemple :
// {
//   title: "Gestion de bibliothèque",
//   description: "Application de gestion des emprunts avec Python et MySQL.",
//   tags: ["Python", "MySQL"],
//   github: "https://github.com/VOTRE-NOM-GITHUB/bibliotheque",
//   demo: ""   // lien de démo (optionnel)
// },
const PROJECTS = [
  {
    title: "Portfolio personnel",
    description:
      "Ce site : portfolio responsive avec thème clair/sombre, animations au défilement et formulaire de contact, développé sans framework.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: `https://github.com/${CONFIG.githubUser}/${CONFIG.githubUser}.github.io`,
    demo: "",
  },
  {
    title: "Université Django",
    description:
      "Application web de gestion universitaire développée avec le framework Django (Python).",
    tags: ["Python", "Django", "HTML", "CSS"],
    github: `https://github.com/${CONFIG.githubUser}/universite-django`,
    demo: "",
  },
  {
    title: "TP Génie Logiciel",
    description:
      "Travaux pratiques du cours de Génie Logiciel réalisés à l'INST d'Abéché.",
    tags: ["Génie logiciel", "Conception"],
    github: `https://github.com/${CONFIG.githubUser}/TP_GL`,
    demo: "",
  },
];

/* =========================================================
   Thème clair / sombre
   ========================================================= */
const root = document.documentElement;
const savedTheme = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
if (savedTheme) root.dataset.theme = savedTheme;
else if (window.matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
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
const words = ["Développeur Web", "Programmeur C / Python", "Passionné de Linux", "Futur ingénieur logiciel"];
const typed = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1600); }
  else { deleting = false; w = (w + 1) % words.length; }
  setTimeout(type, deleting ? 45 : 85);
})();

/* =========================================================
   Projets
   ========================================================= */
const ICON_GH = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>';
const ICON_EXT = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>';
const ICON_FOLDER = '<svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const githubUrl = `https://github.com/${CONFIG.githubUser}`;
document.querySelectorAll(".js-github").forEach((a) => (a.href = githubUrl));

const grid = document.getElementById("projectsGrid");
grid.innerHTML =
  PROJECTS.map(
    (p) => `
  <article class="project reveal">
    <div class="project__top">${ICON_FOLDER}
      <div class="project__links">
        ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="Code source">${ICON_GH}</a>` : ""}
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" aria-label="Démo">${ICON_EXT}</a>` : ""}
      </div>
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  </article>`
  ).join("") +
  `<article class="project project--cta reveal">
    <div class="project__top" style="justify-content:center">${ICON_GH}</div>
    <h3>Plus de projets</h3>
    <p>Découvrez tous mes dépôts, exercices et travaux pratiques sur GitHub.</p>
    <a class="btn btn--ghost" href="${githubUrl}" target="_blank" rel="noopener">Voir mon GitHub</a>
  </article>`;

/* =========================================================
   Animations d'apparition au défilement
   ========================================================= */
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
document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

/* =========================================================
   Formulaire de contact (ouvre le client mail)
   ========================================================= */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = f.subject.value || `Message de ${f.name.value}`;
  const body = `${f.message.value}\n\n— ${f.name.value} (${f.email.value})`;
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("year").textContent = new Date().getFullYear();

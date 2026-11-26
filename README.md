# Portfolio — ISSA AHMAT ISSA

Portfolio personnel de **ISSA AHMAT ISSA**, étudiant en 3ᵉ année de licence en Génie Informatique à l'Institut National des Sciences et Techniques d'Abéché (Tchad).

Site statique (HTML, CSS, JavaScript) : responsive, thème clair/sombre, animations au défilement, sans dépendance à installer.

## Structure

```
portfolio/
├── index.html              # Contenu du site
├── style.css               # Design
├── i18n.js                 # Traductions FR / AR / EN
├── script.js               # Interactions, formulaire, liste des projets (CONFIG / PROJECTS)
└── assets/
    ├── photo.jpg               # Photo de profil
    └── CV-Issa-Ahmat-Issa.pdf  # CV téléchargeable
```

## Personnaliser

1. **Nom GitHub** : déjà configuré (`issaahmatissa`) dans `script.js`.
2. **Photo** : pour changer de photo, remplacez simplement le fichier `assets/photo.jpg` (format portrait 4:5 conseillé).
3. **Projets** : ajoutez vos projets dans le tableau `PROJECTS` de `script.js` (texte en fr / en / ar).
4. **Textes et traductions** : tous les textes du site sont dans `i18n.js`, dans les 3 langues.
   Lien direct vers une langue : `?lang=fr`, `?lang=ar` ou `?lang=en` (ex. `https://issaahmatissa.github.io/?lang=ar`).

## Formulaire de contact

Les messages sont envoyés par le service gratuit [FormSubmit](https://formsubmit.co) vers `issaahmatissa0@gmail.com`.
**À la toute première utilisation**, FormSubmit envoie un email « Activate Form » : cliquez sur le lien d'activation,
sinon les messages ne seront pas transmis.

## Déployer sur GitHub Pages

1. Créez un dépôt public nommé **`issaahmatissa.github.io`** sur https://github.com/new
2. Envoyez les fichiers :
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Premier commit : portfolio"
   git branch -M main
   git remote add origin https://github.com/issaahmatissa/issaahmatissa.github.io.git
   git push -u origin main
   ```
   *(Sans Git : sur la page du dépôt, cliquez « Add file → Upload files » et glissez tous les fichiers.)*
3. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch → `main` / `(root)` → Save**.
4. Après 1 à 2 minutes, le site est en ligne à : `https://issaahmatissa.github.io`

# Portfolio — ISSA AHMAT ISSA

Portfolio personnel de **ISSA AHMAT ISSA**, étudiant en 3ᵉ année de licence en Génie Informatique à l'Institut National des Sciences et Techniques d'Abéché (Tchad).

Site statique (HTML, CSS, JavaScript) : responsive, thème clair/sombre, animations au défilement, sans dépendance à installer.

## Structure

```
portfolio/
├── index.html              # Contenu du site
├── style.css               # Design
├── script.js               # Interactions + liste des projets (CONFIG / PROJECTS)
└── assets/
    ├── photo.jpg               # Photo de profil
    └── CV-Issa-Ahmat-Issa.pdf  # CV téléchargeable
```

## Personnaliser

1. **Nom GitHub** : déjà configuré (`issaahmatissa`) dans `script.js`.
2. **Photo** : pour changer de photo, remplacez simplement le fichier `assets/photo.jpg` (format portrait 4:5 conseillé).
3. **Projets** : ajoutez vos projets dans le tableau `PROJECTS` de `script.js`.

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

# Vivek Kumar Gupta — Portfolio Website

A clean, professional, and animated portfolio website built from your resume. Static, fast, and deployable anywhere.

## Features
- Responsive design with modern gradient background and glassmorphism
- Smooth scroll, back-to-top button, mobile-friendly navbar
- AOS (Animate On Scroll) + Typed.js hero text
- Accessible colors, focus styles, and semantic markup
- Open Graph meta + JSON-LD (schema.org Person)

## Structure
```
Resume/
├─ index.html
└─ assets/
   ├─ css/
   │  └─ styles.css
   ├─ js/
   │  └─ main.js
   └─ img/
```

## How to run locally (Windows PowerShell)
- Option 1: Double-click `index.html` to open in your default browser.
- Option 2: From the project folder, run:

```powershell
# Open the site in your default browser
start .\index.html
```

> Tip: For best local dev experience (avoids some browser restrictions), use a lightweight server like the VS Code Live Server extension.

## Update your content
- All content lives in `index.html` as semantic sections (Hero, Summary, Experience, Projects, Skills, Education, Contact).
- Styles are in `assets/css/styles.css`.
- Interactions (typed text, smooth scroll, animations init) are in `assets/js/main.js`.

## Deploy (GitHub Pages)
1. Create a new repository on GitHub and push this folder.
2. In GitHub repo: Settings → Pages → Branch = `main` (or `master`) and folder `/root` → Save.
3. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Credits
- Icons: Font Awesome (CDN)
- Animations: AOS (CDN), Typed.js (CDN)

## License
This project is provided as-is. You can customize and reuse it for your personal portfolio.

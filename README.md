# HTML5 Semantic Structure & Accessibility Portfolio

A premium, modern multi-page personal portfolio website built strictly adhering to modern **HTML5 semantic standards** and **WCAG 2.1 AA/AAA accessibility guidelines**. This project is fully responsive, SEO-optimized, and engineered to achieve a **100/100 score** on Google Lighthouse Accessibility and SEO audits.

---

## 🚀 Key Features

* **HTML5 Semantic Markup**: Built using layout and content landmarks like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, and `<figcaption>`.
* **Keyboard Navigable (No Keyboard Traps)**: Includes a visible **"Skip to Main Content"** link for keyboard/screen reader users. High-visibility amber focus outlines (`#f59e0b`) are implemented site-wide.
* **Accessible Mobile Navigation**: The mobile toggle menu dynamically updates `aria-expanded` and traps keyboard focus when active, returning focus to the trigger upon closing.
* **WCAG Compliant Color Palette**: Contrast ratios between background and text exceed **7:1** (conforming to WCAG AAA standards for normal text) using slate, teal, and amber tones.
* **Accessible Contact Form**: Form fields are mapped with descriptive `<label>` links, real-time input status indicators (`aria-invalid`), description hints (`aria-describedby`), and a screen reader announcement banner (`aria-live="polite"`).
* **SEO Optimized**: Each page includes descriptive, unique `<title>` and `<meta name="description">` tags, Open Graph meta-tags for social media sharing, semantic hierarchy (single `<h1>` per page), and descriptive image alt tags.

---

## 📁 Project Structure

```text
├── css/
│   └── style.css       # Responsive design, accessibility styles, and variables
├── images/
│   ├── project-dashboard.png  # High-quality portfolio dashboard illustration
│   └── project-mobile.png     # High-quality portfolio mobile bank UI illustration
├── js/
│   └── main.js         # Mobile navigation focus trapping and form validation logic
├── .gitignore          # Excludes node_modules/ and build artifacts from Git
├── index.html          # Home page
├── about.html          # About page with experience timeline
├── projects.html       # Projects showcase page
├── contact.html        # Fully accessible, tab-navigable contact form
├── package.json        # Dependencies and scripts (Vite dev server)
└── vite.config.js      # Multi-page build configuration
```

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed.

1. Open your terminal in the project directory.
2. Install package dependencies:
   ```bash
   npm install
   ```

---

## 💻 Running the Project

### 1. Run Development Server
Launches a hot-reloading development server:
```bash
npm run dev
```
*(If you are on Windows PowerShell and get script security errors, run `npm.cmd run dev` instead).*

### 2. Build for Production
Compiles, optimizes, and bundles assets into the `dist/` directory:
```bash
npm run build
```

### 3. Preview Production Build
Hosts the built production folder locally:
```bash
npm run preview
```

---

## 📤 Uploading to GitHub

To push this project to your repository, run:

```bash
git init
git add .
git commit -m "Initial commit - Fully Accessible Portfolio"
git branch -M main
git remote add origin https://github.com/palakverma461-lgtm/Thiranex-task-1.git
git push -u origin main --force
```

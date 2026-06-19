# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project Overview

A single-page personal portfolio website for **Abdullah Haleem** (web developer & YouTuber).
It is a static site built with **plain HTML, CSS, and JavaScript** — intentionally **no frameworks, no build tools, and no dependencies** beyond CDN-loaded fonts and icons.

## File Structure

| File         | Purpose                                                                 |
|--------------|------------------------------------------------------------------------|
| `index.html` | All page structure and content (every section lives here)              |
| `styles.css` | All styling — theming, layout, responsive rules, animations           |
| `script.js`  | All interactivity                                                       |
| `photo.jpg`  | Profile photo (used in both Hero and About). Note: actually AVIF data with a `.jpg` extension — works in modern browsers |

The three-file structure is deliberate. Do not introduce a bundler, framework, or package manager unless explicitly asked.

## What Has Been Built So Far

### Page sections (in `index.html`)
1. **Navbar** — logo, nav links, theme toggle, "Hire Me" mailto button, mobile hamburger
2. **Hero** — greeting pill, animated typing role ticker, CTAs (Download CV, See My Work), social links, portrait with decorative blob/dots and an experience badge, scroll indicator
3. **About** — photo with tag badge, bio, contact details, stats (Projects / Skills / Passion), Download CV button
4. **Skills** — animated progress bars (HTML/CSS/JS/Python) + circular SVG charts (Web Dev, Content, Problem Solving)
5. **Services** — 4 service cards (Web Development, Content Creation, Python Scripting, Technical Education)
6. **Portfolio** — filterable grid (All / Web / YouTube) with gradient thumbnails
7. **Videos** — 3 embedded YouTube videos + Subscribe CTA
8. **Contact** — contact info, social links, and a validated contact form
9. **Footer** — brand, nav links, social icons, copyright

### Styling (`styles.css`)
- CSS custom properties for theming
- Dark theme (`#0f0f0f` background) with a blue accent (`#4f8ef7`); separate **light mode** styles
- Poppins + Inter fonts (Google Fonts)
- Fully responsive layout (mobile → desktop)

### JavaScript (`script.js`)
- **Theme toggle** — dark/light, persisted in `localStorage`
- **Navbar** — scroll shadow + active-link highlighting via `IntersectionObserver`
- **Mobile hamburger** menu open/close
- **Typing role ticker** in the hero
- **Scroll-reveal** animations (`.reveal` → `.visible`)
- **Skill bars + circular charts** animate when scrolled into view
- **Portfolio filter** tabs
- **Contact form** — client-side validation with a success message (no backend; submission is faked)

## Conventions

- Section markers in `index.html` use box-drawing comment banners (e.g. `<!-- ═══ HERO ═══ -->`)
- IDs/classes are kebab-case and BEM-ish (e.g. `pf-card`, `bar-fill`, `circ-prog`)
- Social links are already filled in (X, LinkedIn, Facebook, Instagram); search `<!-- TODO:` for remaining placeholders

## Known Placeholders / TODO

- **YouTube channel URL** — several `href="#"` with `<!-- TODO: Replace # with your YouTube channel URL -->` (Videos CTA, Contact, Footer)
- **Download CV** buttons link to `#` — point them at a real CV file
- **Portfolio "View Project" links** are `#` placeholders
- Embedded videos are currently popular third-party tutorials (Fireship, Mosh, freeCodeCamp), not the user's own

## Working in This Repo

- No build, lint, or test commands — it's a static site
- To preview: open `index.html`, or run `python -m http.server 8000`
- Keep changes within the three core files; match the existing comment and naming style

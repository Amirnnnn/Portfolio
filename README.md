# Amir Hossein Heidary | Portfolio

A single-page portfolio in pure HTML, CSS and vanilla JavaScript. It extends the visual identity of the original `portfolio` starter (olive gradient, glass panels, Poppins, dark-green buttons). English and Persian (RTL) with a language switcher.

## File structure

```
portfolio/
├── index.html
├── Css/
│   ├── common.css       design tokens (:root), reset, body, helpers
│   ├── style.css        navigation, hero, buttons, all sections
│   └── responsive.css   breakpoints (640 / 768 / 1024 / 1440)
├── js/
│   └── script.js        language switch, reveal, scroll-spy, counters, filter, form
└── assets/
    └── icons/           SVG icons used as CSS masks (they inherit text color)
```

## Run it

Use a local server. The nav icons are CSS masks, and Chrome blocks masks loaded from `file://`.

- VS Code: install **Live Server**, right-click `index.html`, choose **Open with Live Server**.
- Or from this folder: `python -m http.server 8000`, then open `http://localhost:8000`.

## Edit the content

- **Text:** every visible string has a `data-i18n="key"` attribute. Edit the English text in `index.html` and the same key in `translations.en` and `translations.fa` in `js/script.js`. If you only edit the HTML, the text reverts when the language is applied.
- **Placeholders to replace:** university name and years, the two "Your next project" cards, the hero avatar (`AH` circle), the Cardioa screenshot, the Cardioa "Source code" link (currently your GitHub profile), and a LinkedIn link (commented out in the Contact section).
- **Counters:** change `data-count` on the `.stat-number` elements.
- **New project:** copy a `.project-card` and set `data-category="web"`, `"biomedical"` or `"web biomedical"`. To add a new filter, add a `.filter-btn` with a matching `data-filter`.
- **Images:** put files in `assets/images/` and use `<img src="..." alt="..." loading="lazy" width="..." height="...">`.

## Change colors and theme

All colors, radii, shadows, blur and motion timings are CSS variables at the top of `Css/common.css`:

| Variable | Role |
| --- | --- |
| `--color-bg-1` to `--color-bg-4` | background gradient stops |
| `--color-text`, `--color-text-muted` | headings and body, hero subtitle |
| `--color-primary`, `--color-primary-dark` | buttons, badges, filters |
| `--color-accent`, `--color-accent-strong` | borders, markers, hover text |
| `--surface-nav`, `--surface-card`, `--surface-hero` | glass panel tints |
| `--transition` | hover duration and easing (160ms ease) |

Check contrast after changing the glass tints: text sits on a gradient that moves as you scroll.

## Contact form

The form builds a `mailto:` link to `amirnnnn1383@gmail.com`, so it opens the visitor's email app. For a real backend (Formspree, Netlify Forms, your own API), set `action` and `method="post"` on the `<form>` and delete the `submit` handler in section 8 of `js/script.js`.

## Language and RTL

The switcher sets `lang` and `dir` on `<html>` and remembers the choice in `localStorage` (wrapped in try/catch, so it works when storage is blocked). The CSS uses logical properties (`margin-inline`, `inset-inline-start`, `border-inline-start`), so layouts mirror automatically. Persian uses Vazirmatn.

## Deploy

- **GitHub Pages:** push the folder to a repo, then Settings, Pages, deploy from the `main` branch root.
- **Netlify or Vercel:** drag the folder in, or connect the repo. No build step is needed.

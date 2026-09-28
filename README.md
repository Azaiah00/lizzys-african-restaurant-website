# Lizzy's African Restaurant — website

A spec website by Couture House Co. for Lizzy's African Restaurant, 5310 Chamberlayne Rd, Richmond, VA 23227.
Static HTML, CSS and vanilla JavaScript. No build step, no frameworks, no external requests (fonts are self-hosted).

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, open-now indicator, trust strip, signature dishes, reviews, first-timer teaser, quick facts, FAQ, order CTA |
| `menu.html` | Popular plates with DoorDash prices and every menu section explained |
| `guide.html` | "New to West African food? Start here" guide: fufu, banku, kenkey, waakye, jollof, egusi, light soup, attieke; how to eat with your hands; heat levels |
| `visit.html` | Hours with live open-now (America/New_York), address, directions, ways to order |
| `404.html` | Friendly not-found page (root-absolute paths) |

Supporting files: `assets/css/site.css`, `assets/css/fonts.css`, `assets/js/site.js`, `assets/fonts/` (Fraunces + Nunito Sans, SIL OFL, from Fontsource), `assets/img/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `netlify.toml`.

## Preview locally
Double-click `index.html`, or for the most accurate preview (fonts, preloads) run a local server from this folder:

```
python3 -m http.server 8080
```

then open http://localhost:8080/.

## Deploy on Netlify
1. Create a new site in Netlify and drag this folder into the "Deploy manually" area, or connect a Git repository containing it.
2. No build command. Publish directory: `.` (already set in `netlify.toml`).
3. Add the custom domain under Domain management and enable HTTPS (automatic with Let's Encrypt).
4. `netlify.toml` sets security headers (including a strict Content Security Policy), long-lived caching for `/assets/*` and the 404 page.

If you change the one inline script in the `<head>` of any page, update its `sha256-` hash in the CSP inside `netlify.toml`.

## Domain
Proposed domain: **lizzysafrican.com**. All canonical, Open Graph and sitemap URLs already use it. If a different domain is registered, find and replace `https://lizzysafrican.com/` across the HTML files, `sitemap.xml`, `robots.txt` and `llms.txt`.

## Before launch
See `LAUNCH-NOTES.md` for every fact to confirm with the owner and the photo approvals needed.

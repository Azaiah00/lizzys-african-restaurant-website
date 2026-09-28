# Launch notes — Lizzy's African Restaurant

Everything below must be confirmed with the owner before the site goes live.

## Facts to confirm
- [ ] **Hours**: Tuesday to Saturday 11 AM to 8 PM, Sunday 1 PM to 8 PM, closed Monday. Taken from the October 2024 Open Day flyer. (DoorDash currently shows 11:00 AM to 7:40 PM, which is likely the delivery cutoff.) Hours appear on every page, in JSON-LD, in `llms.txt` and in the open-now script (`assets/js/site.js`, `HOURS`).
- [ ] **Google rating 4.3 from 190 reviews**: shown on the home page trust strip, reviews section and in home-page JSON-LD `aggregateRating`. Update the numbers at launch.
- [ ] **Menu prices**: the seven prices on `menu.html` (and in `llms.txt` and the Menu JSON-LD) are **delivery-app prices from DoorDash**, fetched September 27, 2026. The page already says "Prices shown are delivery-app prices; in-store prices may differ." Ask for the in-store menu and prices and swap them in.
- [ ] **Full item list**: DoorDash only exposed its featured items to our fetch; the site lists all 21 DoorDash menu sections with plain-English descriptions and links to DoorDash/Grubhub for the full list. Ask for the complete in-store menu to fill each section item by item.
- [ ] **Price guide "$17.99 to $19.99"** (quick facts, FAQ): based on the DoorDash prices above.
- [ ] **Cuisine wording**: "West African, with Ghanaian favorites". Confirm the owner is happy with this (and whether to name specific countries).
- [ ] **Black-owned**: stated on the site (source: EatOkra listing). Confirm the owner wants this highlighted.
- [ ] **Customer quotes**: three short quotes on the home page are excerpts from DoorDash customer reviews (labelled as such). Confirm the owner is comfortable using them, or replace with Google reviews they choose.
- [ ] **Walk-in and counter ordering**: copy says guests can walk in and order at the counter, and that soups and stews are ready in the hot counter (based on their steam-tray posts). Confirm.
- [ ] **Dine-in seating**: not mentioned on the site because it is unverified. If there is seating, add it to the quick facts and FAQ.
- [ ] **Parking**: unknown. The FAQ currently says to call for parking directions. Replace with real details (lot, street parking).
- [ ] **Texting**: `visit.html` includes an sms: link to (804) 716-4259. Remove if the number does not take texts.
- [ ] **Second phone number**: the Open Day flyer shows a second number that is cut off in the image. Ask whether it should be listed.
- [ ] **Price range "$$"** in JSON-LD (from the EatOkra listing).
- [ ] **Owner story**: intentionally not included (the owner's name and story are not verified). Offer an "About Lizzy's" section if the owner wants one.
- [ ] **Catering, reservations, vegetarian options, drinks and desserts**: not claimed. Add only if confirmed.
- [ ] **Geo coordinates**: omitted from JSON-LD (not verified by the owner). EatOkra lists 37.615329, -77.454628 if wanted.

## Photos and logo
- All food photos come from Lizzy's own public Instagram and Facebook posts and **must be approved or licensed by the owner** before launch. Some appear to be widely shared images; confirm they are the restaurant's own food.
- Guide-card images for fufu (light soup with chicken), egusi with fufu and the waakye plate are cropped from the Open Day flyer collage; they are low resolution. Replace with fresh photos of the actual plates.
- The hot-counter photo is a still from a story video (low resolution). A new photo of the counter and the dining room would help.
- **Logo (supplied by Couture House).** The site uses the "Lizzy's African Restaurant" logo (bowl, red and yellow steam, fork, green band). Full-color version `assets/img/lizzys-logo.webp` sits in the page heroes, the menu and the 404 page; a white-lettering version `lizzys-logo-reverse.webp` sits in the dark footer; `lizzys-logo.png` is the schema logo. Because the logo is stacked, the header uses the emblem alone (`lizzys-mark.webp`) beside the name in live type, so it stays readable at header size. Favicons and app icons are built from the emblem. Confirm Lizzy approves it, or ask for her own logo and original vector files for signage and print.
- Photo credits: Lizzy's African Restaurant (Instagram @lizzys_african_restaurant and Facebook).

## Items to swap at launch
- Real in-store menu and prices (see above).
- Updated Google rating and review count.
- Better photos: dining room, storefront, staff (with permission), plates of fufu, banku, kenkey and waakye.
- Search Console + Bing Webmaster verification, then submit `sitemap.xml`.
- Claim/update the Google Business Profile website field to point at the new domain.

## Proposed domain
**lizzysafrican.com** (used for canonical, Open Graph, sitemap and llms.txt URLs). Check availability; alternatives: lizzysafricanrestaurant.com, lizzysrva.com.

## Technical notes
- Hosted as a static site on Netlify; see `README.md`.
- No forms on this site, so nothing depends on Netlify Forms.
- Open-now indicator uses the visitor's clock converted to America/New_York.

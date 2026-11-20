# moomedia.com.au

Static rebuild of the moomedia Australia website (previously WordPress on SiteGround).
Plain HTML/CSS/JS – no build step, no plugins to update.

## Hosting (Cloudflare + GitHub)

1. Push this folder to a GitHub repo (e.g. `moomedia-website`).
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
3. Once deployed, add the custom domains `moomedia.com.au` and `www.moomedia.com.au`
   under the project's **Custom domains** tab.

Every push to `main` redeploys the site automatically.

## Editing

| What | Where |
|---|---|
| Home page | `index.html` |
| Each service page | `<page-name>/index.html` (same URLs as the old site) |
| Portfolio | `all-projects/index.html` |
| Colours, fonts, layout | `assets/css/style.css` (colour variables at the top) |
| Menu, lightbox, filters | `assets/js/main.js` |
| Images | `images/` |
| Old-URL redirects | `_redirects` |

The header, footer and menu are repeated in every page – if you change a menu item,
find-and-replace it across all `index.html` files.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) and is emailed to chris@moomedia.com.au.
The **first** submission sends an activation email to that address – click the link in it once
and every message after that comes straight through. To send to a different address, change the
`action="https://formsubmit.co/..."` line in `contact/index.html`.

## Before switching the domain

- Check email: if moomedia.com.au email is hosted at SiteGround, set up email elsewhere
  (Google Workspace, Microsoft 365, Zoho, etc.) **before** moving DNS, and make sure the MX
  records are in Cloudflare DNS.

## Updating styles or scripts

The CSS and JS links in every page end with `?v=<number>`. When you change
`assets/css/style.css` or `assets/js/main.js`, bump that number in all pages
(find-and-replace) so visitors' browsers load the new file instead of a saved copy.

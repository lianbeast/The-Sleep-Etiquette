# The Sleep Etiquette

Prelaunch landing page with a separate working area for the future store.

## Work locally

From this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

- Landing page: http://localhost:8000/
- Full store review: http://localhost:8000/_studio/preview.html
- Store directly: http://localhost:8000/_studio/index.html

The review lets you switch between pages and desktop, tablet and mobile widths.
Store content and imagery are illustrative pending client approval and real stock.

## Where to edit

- `coming-soon.html`: landing-page source. The publish command synchronizes root `index.html`.
- `_studio/`: store Home, Product, About, Fabrics, Journal and the review screen.
- `styles.css`, `editorial.css`, `script.js`, `assets/`: shared styles, interactions and media.
- `docs/design-direction.md`: design rationale and launch requirements.

## Publish only the landing page

```powershell
python build_public.py
python -m http.server 8001 --directory dist --bind 127.0.0.1
```

Check http://localhost:8001/ before deploying. Publish **only `dist/`**.
The allowlist includes the landing page, its styles, script and bedroom image.
It excludes store drafts, review screens, reports and brand documents. The build
rejects unexpected files in an existing `dist` folder instead of silently shipping them.

A host configured to publish the repository root must be reconfigured to publish
this artifact. Do not deploy the whole repository or rely on an obscure folder
name for privacy.

### GitHub Pages

The local workflow `.github/workflows/pages.yml` builds with Python and uploads
only `dist/`. To activate it:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, change **Source** to **GitHub Actions**.
3. Commit and push the current source changes to `main`, including the workflow,
   `build_public.py`, `coming-soon.html`, shared CSS/JS and bedroom image.
4. In **Actions**, check **Publish coming-soon page**. When its build and deploy
   jobs succeed, open https://lianbeast.github.io/The-Sleep-Etiquette/.

Future pushes to `main` rebuild and publish the landing page automatically.
You can also use **Actions → Publish coming-soon page → Run workflow** after
the workflow exists on GitHub. Do not change the artifact path to `.`; that
would include the studio. The workflow runs without npm or Python packages.
Remote Pages settings and deployment have not been changed by local setup.

If the repository itself is public, visitors can still read draft source on GitHub.
Use a private repository or an authenticated preview host for confidential client work.

## Email signup

Signup is not connected yet. The page says signup is not open, and submission
never reports a successful subscription without a configured collector.
Set `data-endpoint` on the form in `coming-soon.html` when the client provides
an approved endpoint. It accepts JSON with email, name, source, page and timestamp.
Then update the availability notice and run `python build_public.py` again.

## Checks

No root npm project or third-party build dependencies are required.
Use `node --check script.js` and inspect both local previews after shared edits.
Before launch, confirm imagery, product information, policies, contact details,
email collection and payments with the client.

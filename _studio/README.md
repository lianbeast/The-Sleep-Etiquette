# Private working area for the future store

These are development drafts, kept in Git so work can continue until launch.
They are not included by `build_public.py` in the public `dist` artifact.
This is publication separation, not password protection: a public repository
still exposes its source files.

From the repository root run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/_studio/preview.html for the review controls, or
http://localhost:8000/_studio/index.html for the store directly. All internal
store navigation, shared styles, gallery images and bag behavior remain available.
The review's Coming soon button opens the root landing page inside the preview.

Edit the store HTML here and shared `styles.css`, `editorial.css`, `script.js`
and `assets/` in the repo root. Shared changes also affect the landing page;
use page-specific selectors when a change is meant only for the store.

For a landing-only publication build run `python build_public.py` and publish
only `dist/`. Do not deploy the repository root. No hosting changes, commits,
pushes or deployments are performed by this command.

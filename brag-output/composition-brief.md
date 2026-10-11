# Hyperframes Composition Brief: The Sleep Etiquette

## Objective

Create a 20.2-second launch-style brag video for The Sleep Etiquette that feels like a premium fashion campaign and demonstrates the site's real collection logic.

## Output

- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape - 1920x1080
- Duration: 20.2 seconds

## Source material

- Project root: `..`
- Primary files read: `index.html`, `styles.css`, `README.md`
- Product name: The Sleep Etiquette
- Tagline / strongest claim: "Sleep well. Dress better."
- Key UI or visual moment to recreate: six-color portrait collection plus top, bottom, and shade selection resolving into one set summary
- Copy that must appear verbatim:
  - "Sleepwear, considered"
  - "Sleep well. Dress better."
  - "Six shades. One point of view."
  - "Short sleeve shirt + Long pant"
  - "10% set pricing."
  - "Made for sleep. Cut like clothing."
  - "XS-4X. Petite, Regular, Tall."

## Creative direction

- Tone preset: polished
- Creative direction: quiet premium fashion film with magazine pacing
- Interpretation: Use four composed scenes, long readable holds, restrained image parallax, serif-led hierarchy, and soft structural transitions. Motion should feel tailored rather than flashy.
- Angle: Move from bedroom atmosphere to the six-color wardrobe, demonstrate the modular set builder, and close on fabric/fit proof.
- Hook: The real bedroom hero with the full-scale line "Sleep well. Dress better."
- Outro / punchline: The wordmark holds beside "Made for sleep. Cut like clothing." and the real fit range.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Invented product claims, prices, fabrics, or functions
  - Implying the prototype has a live checkout or live waitlist backend
  - Aggressive zooms, neon, glossy app-card styling, or unrelated visual redesign

## Visual identity

- Background: `#F7F3EF`
- Text: `#222222`
- Accent: `#B8C2A8`
- Secondary highlights: `#E8D89A`, `#6B5747`, `#7D8FA1`, `#D7BFC0`, `#FFFFFF`
- Display font: Cormorant Garamond, locally bundled when available; Georgia is the explicit fallback
- Body font: Instrument Sans, locally bundled when available; system sans is the explicit fallback
- Visual references from the project:
  - `assets/coming-soon-hero.jpg`
  - `assets/collection-colorways-v2.webp`
  - `assets/matcha-model-v2.webp`
  - `assets/butter-model-v2.webp`
  - `assets/milk-model-v2.webp`
  - `assets/cocoa-model-v2.webp`
  - `assets/blue-hour-model-v2.webp`
  - `assets/dusty-rose-model-v2.webp`
  - `assets/milk-product-v2.webp`
  - `assets/hero-mix-and-match.png`

## Storyboard

Use `brag-output/brag-plan.md` as the creative contract.

Scene summary:

1. Considered sleepwear - 4.39s - bedroom hero and "Sleep well. Dress better."
2. Six shades - 6.54s - six real model portraits, collection labels, and a full-grid hold longer than 2.5s
3. Build your set - 4.91s - simulated top, bottom, and shade selection resolving to the real set summary
4. Cut like clothing - 4.36s - product detail, inclusive fit proof, and a small final wordmark

Rhythm: slow reveal - hold - measured sequence - interaction - dark proof - final hold.

## Audio

- Audio role: restrained premium bed with sparse professional accents
- Audio arc: music arrives softly, gains slight presence through the colorway sequence, stays quiet during set selection, then fades under the final hold
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: volume 0.24; short fade-in; subtle fade through the final 1.2s
- Music cue guidance: bundled cue preset at `/home/arch/.agents/skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; use 8.19s, 13.11s, and 17.47s as optional major landing hints. Six portrait arrivals may use 5.34s, 6.00s, 6.56s, 7.09s, 7.64s, and 8.19s, followed by a long full-grid hold.
- Audio-reactive treatment: subtle; extracted bass/overall energy may change the hero light, background warmth, and image-panel presence by a few percent. No waveform, equalizer, particles, or text pulsing.
- Audio-coupled moments:
  - Scene 2 final portrait - warm soft impact
  - Scene 3 shade selection - quiet interface click
  - Scene 4 wordmark - warm soft accent
- SFX selection guidance: use low-HF-risk files from `sfx-analysis.md`; preferred candidates are `impact/impactSoft_medium_001.ogg`, `interface/click_003.ogg`, and `interface/bong_001.ogg`
- SFX analysis guidance: `/home/arch/.agents/skills/brag/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes should keep no more than three sparse accents and align each to visible motion.
- Audio files: copy selected files into `brag-output/composition/assets/`

## Hyperframes instructions

Use current Hyperframes conventions from `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-audio`, and `hyperframes-cli`. This is the `/brag` workflow; do not enter a generic promo interview.

Requirements:

- Show real source imagery and exact grounded copy.
- Recreate the set-builder interaction rather than showing abstract feature cards.
- Keep every line readable and every image subject unobstructed.
- Keep all four scenes within 20.2 seconds.
- Prefer a monolithic composition unless a registry component materially reduces code.
- Use the catalog matches only when they fit the direction. `push-in` may inform the hero camera move; `parallax-unzoom` may inform the colorway assembly. Avoid importing extra visual language.
- Use local audio and image assets only.
- Use a single paused, seek-safe timeline registered under the root composition ID.
- Use `fromTo` for scene entrances, finite ambient motion, and wrappers for image transform separation.
- Include a motion sidecar covering headline appearance, colorway sequence order, set-summary appearance, and in-frame behavior.
- Run `hyperframes check --snapshots` as the single pre-preview gate and fix every error.
- Open a local Studio preview for user review before rendering.
- Keep creation and rendering local. Do not publish or upload.

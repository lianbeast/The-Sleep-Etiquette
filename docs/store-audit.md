# Draft store technical audit

Follow-up: all eight findings below have been addressed in the local working
store. See `store-fixes.md` for changes and verification. This report preserves
the original findings and score; it is not a new audit of the corrected code.

Date: October 16, 2026. Scope: `_studio/index.html`, `product.html`, `about.html`,
`standards.html`, `journal.html`, and the shared CSS/JavaScript.

## Implementation integrity verdict

The visual system passes: the brand palette, serif headings, photography and
editorial layouts form a coherent sleepwear identity. Interaction integrity
does not yet pass: product identity and variant information are not consistently
carried from cards to details, imagery and the bag.

This is a development prototype. Unconnected payments, sample product photos,
illustrative reviews, unconfirmed commercial claims, missing real articles and
unavailable newsletter collection are recorded as launch dependencies, not P0
defects or reasons to replace the design.

## Health score

| Dimension | Score | Principal evidence |
| --- | --- | --- |
| Accessibility | 2/4 | Opening the bag leaves focus behind it; the next Tab enters the underlying page |
| Performance | 2/4 | A 2,363,248-byte PNG serves both desktop and mobile; redundant font stylesheet remains |
| Theming | 2/4 | Brand surface tokens also change a product color swatch |
| Responsive design | 3/4 | Five pages inspected at desktop and 320px iframe width; main controls have 44px targets |
| Implementation integrity | 2/4 | Quick-add uses a default variant and product links share a single detail page |
| Total | 11/20 | Acceptable: significant technical work remains |

These are provisional engineering assessments, not a Lighthouse score or WCAG
certification. This narrower store-only prototype audit is not a like-for-like
comparison with the earlier whole-site launch-readiness audit.

8 verified findings: P0 0, P1 3, P2 5, P3 0.

## Findings

### 1. [P1] Bag opens without moving keyboard focus into the dialog

- Category: Accessibility.
- Location: `script.js:89`, `script.js:100`, and the drawer visibility rule in `editorial.css`.
- Reproduction: On store Home, activate Long pant Quick add. The bag opens,
  but the accessibility snapshot still reports focus on Quick add. Press Tab:
  focus moves to the Long pant link behind the overlay. The trap only listens
  for key events inside the drawer, so it cannot contain focus that stayed outside.
- Impact: Keyboard users interact with obscured page content instead of the bag.
- Standard: WCAG 2.4.3 Focus Order; modal dialog keyboard interaction expectations.
- Recommendation: Make the drawer focusable and visible before assigning focus,
  confirm focus enters it, and make the underlying page inert while open. Restore
  page interactivity and the opener on close. After removing a line, place focus
  on a surviving control rather than allowing the focused node to disappear.
- Suggested command: `$impeccable harden`.

### 2. [P1] Quick-add silently substitutes a different variant

- Category: Implementation Integrity.
- Location: `_studio/index.html:87`, `script.js:76`, `script.js:131`.
- Reproduction: Quick-add the Long pant card labeled Sky. The bag displays
  `Long pant / Milk · M · Regular`. The card supplies no variant detail; the bag
  fills the missing value with a hard-coded fallback. Reproduced in the browser.
- Impact: The interface records a different color and an unchosen size/height,
  undermining meaningful product-selection testing and risking wrong orders later.
- Recommendation: Carry explicit product/variant identifiers, preserve the card's
  color, and require or visibly disclose size/height selection before adding.
  Never invent variant data in the bag renderer.
- Suggested command: `$impeccable harden`.

### 3. [P1] Keyboard focus outline disappears on the dark Home section

- Category: Accessibility / Theming.
- Location: `styles.css:81`, `editorial.css:4`, `editorial.css:69`, `editorial.css:141`.
- Evidence: The global outline uses `--after-dark`, now `--olive` (#1C2612).
  The Home proof section uses that exact background. Its fabric-standards link
  is not included in the light-outline overrides supplied for footer, rules
  and fabric sections. Outline against the section background is 1:1.
- Impact: Keyboard users cannot reliably see where they are in that section.
- Standard: WCAG 2.4.7 Focus Visible and 1.4.11 Non-text Contrast.
- Recommendation: Define a semantic focus color for dark surfaces and apply it
  consistently, including `.home-proof`.
- Suggested command: `$impeccable harden`.

### 4. [P2] Product navigation loses product identity

- Category: Implementation Integrity.
- Location: `_studio/index.html:81`, `:89`, `:97`.
- Evidence: Short sleeve shirt, Long pant and Ribbed tank links all target the
  same bare `product.html`; that page always renders Short sleeve shirt.
- Impact: Reviewers cannot test browsing from a particular item into its details.
  This is an inconsistent prototype interaction, separate from unavailable checkout.
- Recommendation: Add a product key to navigation and render matching data, or
  visibly mark nonimplemented products as preview-only rather than linking to a
  different garment. Final inventory can wait for the client.
- Suggested command: `$impeccable harden`.

### 5. [P2] Color selection and gallery represent different variants

- Category: Implementation Integrity.
- Location: `script.js:188`, `script.js:235`, `_studio/product.html:44`.
- Reproduction: Select Matcha. The selected color changes, but the main image
  and its accessible description remain Short sleeve shirt in Milk. Conversely,
  choosing the Matcha gallery thumbnail changes the image without selecting Matcha.
- Impact: Customers and reviewers cannot tell whether the image represents the
  selected product variant.
- Recommendation: Make a single variant state drive swatches, gallery image,
  accessible description and bag detail. If thumbnails are editorial views,
  distinguish those from variant-specific photographs.
- Suggested command: `$impeccable harden`.

### 6. [P2] Surface palette overrides also recolor the Milk product swatch

- Category: Theming.
- Location: `editorial.css:4`, `styles.css:330`.
- Evidence: `--milk` changes from #F7F3EF to the new #F2E0D0 linen surface color;
  `.swatch-milk` still uses `var(--milk)`. A page theme decision therefore changes
  the represented garment color.
- Impact: Brand refinements can unintentionally alter product representation.
- Recommendation: Separate semantic UI surface tokens from immutable product
  colorway tokens. Confirm final product colors with the client when samples arrive.
- Suggested command: `$impeccable document`.

### 7. [P2] Large background delivery and overlapping font loading

- Category: Performance.
- Location: `assets/prelaunch-bedroom-v2.png`, `editorial.css:35`, `:101`,
  `_studio/index.html:12`, `:14` (same font pattern on the other store pages).
- Evidence: The bedroom PNG is 2,363,248 bytes (about 2.25 MiB); the same source
  is used at small mobile widths. Google Fonts still requests Instrument Sans
  while the overriding stylesheet selects Satoshi. CSS background images lack
  native loading, sizes and srcset control.
- Impact: Mobile visitors transfer more imagery than necessary; extra font CSS
  adds network work. This is a payload observation, not a measured speed regression.
- Recommendation: Produce appropriately sized WebP/AVIF variants, use responsive
  delivery, keep the hero prioritized, and remove unused font requests after
  confirming the chosen type system.
- Suggested command: `$impeccable optimize`.

### 8. [P2] Journal Read story links target a nonexistent anchor

- Category: Implementation Integrity.
- Location: `_studio/journal.html:68` and subsequent story links.
- Evidence: Each Read story uses `href="#stories"`, but no element has that ID.
  The list section uses `aria-labelledby="stories-title"`, which does not create
  a `stories` anchor.
- Impact: The link looks actionable but cannot open the advertised story or even
  move to the intended list section.
- Recommendation: Until real articles are supplied, use a clearly labeled
  forthcoming state. Later connect actual article pages or accessible previews.
- Suggested command: `$impeccable clarify`.

## Detector review

56 warnings: 23 cramped-padding, 5 cream-palette, 20 italic-serif-display,
8 wide-tracking. These are heuristic findings, not 56 confirmed defects.

- Cream and italic display type are intentional in the client's supplied visual
  direction, so those warnings are not counted as issues.
- Full-bleed images and the contiguous colorway strip account for inset warnings;
  flush image edges are not, by themselves, cramped content.
- Tracking is primarily on short labels and actions, not long reading passages.
  No separate tracking defect is asserted.

## Patterns and strengths

The main systemic gap is duplicated product truth: card labels, selected state,
image selection and bag detail each have their own partial representation.
A shared product/variant model will fix more than isolated click-handler patches.
The other recurring gap is using brand color tokens for both UI and merchandise.

Keep the coherent page identities, semantic headings, skip links, native buttons,
native material disclosures, selected-state attributes on size/height controls,
hidden collapsed accordion panels, inert closed overlays, explicit form labels,
honest newsletter feedback and reduced-motion alternative. Small-screen layouts
remain readable in the inspected captures and main selection targets use 44px sizes.

## What waits for launch

Payment integration, authentication/search if needed, real product photography,
real review evidence, garment measurements, final material/testing claims, article
content, policy destinations and social handles need client confirmation. They
are not treated as current prototype blockers. Buy now and Checkout should be
clearly described as demo actions during client testing.

## Recommended sequence

1. `$impeccable harden`: modal focus, explicit variants, matching product routes,
   synchronized gallery and contrast-safe focus states.
2. `$impeccable clarify`: truthful forthcoming story actions and demo-commerce labels.
3. `$impeccable document`: record separate UI and merchandise color tokens before
   consolidating their implementation.
4. `$impeccable optimize`: responsive bedroom imagery and font-request cleanup.
5. `$impeccable polish`: finish spacing and visual states after interactions work.

Re-run `$impeccable audit` after fixes.

## Verification and limits

Fresh desktop and 320px iframe-width captures covered all five store pages in
the in-app browser. Browser interaction reproduced wrong quick-add detail, focus
escaping the open bag, and selected color/gallery disagreement. The temporary
bag item was removed after the check. Source review covered shared CSS/JS and
the detector ran once over the five store HTML pages. `node --check script.js`
passed. No root npm project exists, so npm install/dev/lint/typecheck/build do
not apply to these static pages; no dependencies were installed.

Physical touch, synthesized touch, 200% text zoom, full screen-reader navigation,
network throttling, Lighthouse/Core Web Vitals and FPS were not measured. No
claim of full WCAG or device compliance is made. UI sources and the live landing
page were not changed, committed or deployed by this audit.

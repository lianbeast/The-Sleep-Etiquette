# Draft store fixes — October 16, 2026

All eight findings in `store-audit.md` were addressed locally. The original
audit is retained as the before-state evidence. No deployment or new score is
claimed by this implementation pass.

| Audit finding | Resolution |
| --- | --- |
| Bag keyboard focus | Drawer opens before focus assignment; background becomes inert; Tab and Shift+Tab exclude disabled controls and wrap within the drawer; Escape restores the opener; removing an item focuses a surviving control |
| Invented quick-add variant | Cards now offer Choose size and route to the correct product/color; size and height must be chosen before adding; the bag never invents missing variant detail |
| Invisible focus outline | The dark Home section uses a separate light focus token |
| Shared product destination | An illustrative catalog identifies six products; card links and actions carry product/color query parameters; the detail page displays the matching name and price |
| Gallery/color disagreement | Swatch state drives both gallery views and their accessible descriptions; model/product thumbnails show the selected color |
| Product/surface color coupling | Studio product-color tokens preserve the original six garment swatches independently of the new linen surface |
| Heavy background / extra font CSS | Studio-only responsive WebP backgrounds replace PNG requests; unused Instrument Sans requests removed from all five draft pages |
| Broken Journal actions | Nonexistent story links replaced with explicit Story coming soon text |

The set builder now also requires a top size, bottom size and height. Its chosen
color updates the illustrative preview, and the bag records every fit choice.
Checkout is visibly unavailable with a clear no-payments note; the misleading
Buy now action was removed. Stored bag data is validated and rendered text is
escaped before insertion.

## Image payload comparison

| Background | Bytes | Reduction from original |
| --- | ---: | ---: |
| Original PNG | 2,363,248 | — |
| Studio desktop WebP (1280px wide) | 96,034 | 95.9% |
| Studio mobile WebP (640px wide) | 32,734 | 98.6% |

Mobile media queries use the 640px image and desktop uses the 1280px image.
Home preloads match the same media conditions. These are measured file-size
reductions, not Lighthouse or real-network timing claims. The original PNG and
the public landing page's image choices remain unchanged.

## Verification

- Browser path: Home Sky pant Choose size → Long pant, Sky, $64.00.
- Missing-fit Add to bag displays an announced message and focuses the first
  required choice instead of inventing defaults.
- Select L and Tall, switch to Matcha, then product view: accessible gallery
  description and selected swatch both report Matcha.
- Add to bag records Long pant / Matcha · L · Tall / $64.00 and focuses Close bag.
- Shift+Tab wraps to Remove; Tab wraps back to Close bag; the underlying page
  is absent from the accessible subtree while the bag is open.
- Removing the sole item focuses Close bag; Escape returns focus to Add to bag.
- Set builder rejects missing fit; choosing S top, M bottom, Petite, Matcha
  records those choices with the correct selected set and subtotal.
- Test bag items were removed afterward.
- Desktop and 320px iframe captures checked the product layout; Journal and
  editorial layouts were inspected at the small width. This is layout emulation,
  not physical-device or synthesized-touch testing.
- JavaScript syntax, local file references and publication build were checked.
  The existing publication allowlist still excludes all studio pages, its new
  catalog/stylesheet and optimized studio images.

No new project dependencies were installed. Existing bundled Pillow performed
image resizing/encoding. No UI raster artwork was redrawn. Root npm commands do
not apply because this is a static HTML/CSS/JS website with no root package.json.

## Editing boundaries

`_studio/catalog.js` holds illustrative product data. `_studio/store.css` owns
store-only visual fixes. Shared `script.js` holds interactions and remains safe
on the coming-soon page, where no catalog or store controls exist. Store font
cleanup and background overrides are isolated from the public landing page.

Real product photos, article content, reviews, policy details and payment/email
integration remain client-supplied launch dependencies. No claim of full WCAG,
screen-reader or cross-browser certification is made.

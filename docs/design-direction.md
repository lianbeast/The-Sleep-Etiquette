# The Sleep Etiquette: client preview

## Direction

An intimate editorial world: olive #1C2612, earth #403625, walnut #735A45,
taupe #A69180, linen #F2E0D0. Cormorant Garamond preserves the reference's
expressive serif identity. Satoshi provides quiet interface typography.
Collection swatches retain their original product colors.

Open `_studio/preview.html` on the local server to compare all six pages at desktop,
tablet, 390px and 320px iframe widths. These are rendered layout previews,
not physical-device or synthesized-touch tests.

## Page layouts

| Page | Proposed layout | Why |
| --- | --- | --- |
| Coming soon | Full-bleed bedroom, centered brand, short invitation, one email row | One calm, recognizable first impression while product photography is pending |
| Home | Centered cinematic hero; six-shade wardrobe; three product features; set builder; materials; signup | Move from brand mood to browsing to configuration without repeating the same cards |
| Product | Larger gallery on the left; clear name, price and selectors on the right; details below; related pieces | Give the garment and fit decisions priority |
| About | Portrait and opening statement; editorial headings beside a flowing narrative; materials; brand rules | Replace repeated three-column grids with a readable brand story |
| Fabrics | Split hero; three expandable material columns; testing principles; product link | Make material information browsable, with details available on demand |
| Journal | Compact editorial masthead; one wide lead article; two-column story index with filters | Establish an editorial hierarchy instead of six identical tiles |

## Launch staging

Publish only the coming-soon page when approved. The public page now omits store-preview links. Connect the confirmed email collector,
and use confirmed contact/social details. Do not expose speculative commercial
terms, reviews, inventory, fabric certifications, test results, prices or size
ranges as confirmed facts. Existing store copy is preserved as illustrative
client-review content; the store preview banner states this explicitly.

Replace generated collection imagery with approved real product photography
when the stock arrives. Collect founder story, garment measurements, care
instructions, final prices, policies, social handles and launch timing before
implementing production commerce.

## Implementation

`editorial.css` layers this proposal over the original stylesheet. No package
dependencies were installed. Native CSS arrival motion and sticky editorial
sections stand in for the requested skill's GSAP direction because repository
instructions prohibit adding dependencies without explicit approval. Reduced
motion disables entrance effects and the sticky narrative treatment.

Built-in image generation produced `assets/prelaunch-bedroom-v2.png`.
Prompt: create a text-free photorealistic version of the approved bedroom
concept, with cream plaster, soft window shadows, olive foliage and throw,
travertine bedside table, candle, blank-spined books and rumpled linen; leave
the central wall clear for live HTML typography. No generated text or form is
baked into the background.

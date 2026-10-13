# Graph Report - The-Sleep-Etiquette  (2026-10-13)

## Corpus Check
- Large corpus: 93 files · ~698,197 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 258 nodes · 366 edges · 44 communities (23 shown, 21 thin omitted)
- Extraction: 89% EXTRACTED · 10% INFERRED · 1% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.84)
- Token cost: 34,617 input · 9,938 output

## Community Hubs (Navigation)
- GSAP Internal Functions
- Colorway Model and Product Imagery
- Shopping Bag and Cart Drawer
- Brand and Site Core
- GSAP Utility Functions
- Contact Sheet and Frame Snapshots
- HyperFrames Composition Metadata
- GSAP Animation Functions
- Project Package Configuration
- Late-Frame Snapshots
- Six Shade Swatches
- GSAP Timeline Functions
- GSAP Motion Functions
- GSAP Core Functions
- GSAP Utility Functions B
- GSAP Internal Functions B
- Brand Tagline and Deck
- Transcript Entities
- Fabric Standards
- Brag Creative Direction
- GSAP Timeline Functions B
- Set Builder Interaction Frames
- Product Detail Imagery
- GSAP Core Functions C
- GSAP Internal Functions C
- GSAP Utility Functions C
- GSAP Core Functions D
- Bedroom Hero Frames
- Product Fit Proof Frames
- Launch Video and Brand
- Journal Editorial Stories
- Milk Model Duplicate Pair
- Blue Hour Model
- Blue Hour Product
- HyperFrames Composition Project
- GSAP Core Functions E
- Push-In Primitive
- Contact Sheet 2
- The Sleep Etiquette Brand
- Site Screenshot
- Milk Product Image
- Fashion-First Sleepwear Concept

## God Nodes (most connected - your core abstractions)
1. `Tween()` - 13 edges
2. `r()` - 11 edges
3. `s()` - 10 edges
4. `la()` - 10 edges
5. `de()` - 10 edges
6. `t()` - 9 edges
7. `v()` - 8 edges
8. `hb()` - 8 edges
9. `Six-shade colorway grid` - 8 edges
10. `_a()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Six Shades — Matcha Butter Milk Cocoa Sky Petal` --conceptually_related_to--> `Blue Hour Model — Sky Colorway Editorial Portrait`  [INFERRED]
  index.html → assets/blue-hour-model-v2.webp
- `Brand Deck — The Sleep Etiquette` --conceptually_related_to--> `The Sleep Etiquette`  [INFERRED]
  The Sleep Etiquette - Brand Deck.pptx.pdf → README.md
- `Scene Builder — Build Your Set 5.19s` --conceptually_related_to--> `Build Your Set — Modular Wardrobe Builder`  [INFERRED]
  brag-output/composition/compositions/scene-builder.html → index.html
- `Scene Collection — Six Shades 6.82s` --conceptually_related_to--> `Six Shades — Matcha Butter Milk Cocoa Sky Petal`  [INFERRED]
  brag-output/composition/compositions/scene-collection.html → index.html
- `Scene Proof — Cut Like Clothing 4.36s` --references--> `Proof Line — Made for Sleep Cut Like Clothing`  [EXTRACTED]
  brag-output/composition/compositions/scene-proof.html → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Six-Shade Collection System** — index_six_shades, assets_blue_hour_model_v2, brag_output_composition_scene_collection_six_shades, index_color_wardrobe [INFERRED 0.85]
- **Four-Scene Brag Film — Hero Collection Builder Proof** — brag_output_composition_scene_hero_considered_sleepwear, brag_output_composition_scene_collection_six_shades, brag_output_composition_scene_builder_build_your_set, brag_output_composition_scene_proof_cut_like_clothing [EXTRACTED 1.00]
- **Six Shade Colorway Collection** — assets_matcha_model_v2_webp, assets_butter_model_v2_webp, assets_milk_model_v2_webp, assets_cocoa_model_v2_webp, assets_dusty_rose_model_v2_webp [EXTRACTED 0.95]
- **Colorway Model-Product Pairs** — assets_matcha_model_v2_webp, assets_matcha_product_v2_webp, assets_butter_model_v2_webp, assets_butter_product_v2_webp, assets_milk_model_v2_webp, assets_milk_product_v2_webp, assets_cocoa_model_v2_webp, assets_cocoa_product_v2_webp, assets_dusty_rose_model_v2_webp, assets_dusty_rose_product_v2_webp [EXTRACTED 0.95]
- **Six-shade color palette** — matcha_shade, butter_shade, milk_shade, cocoa_shade, sky_shade, petal_shade [EXTRACTED 1.00]
- **Six-model portrait grid** — model_portrait_1, model_portrait_2, model_portrait_3, model_portrait_4, model_portrait_5, model_portrait_6 [EXTRACTED 1.00]
- **Numbered list items in impactSoft_medium_001 transcript** — graphify_out_transcripts_impactsoft_medium_001_coconut_milk, graphify_out_transcripts_impactsoft_medium_001_nature_skeri, graphify_out_transcripts_impactsoft_medium_001_jah_comfortable, graphify_out_transcripts_impactsoft_medium_001_oxygen [AMBIGUOUS 0.20]

## Communities (44 total, 21 thin omitted)

### Community 1 - "GSAP Internal Functions"
Cohesion: 0.15
Nodes (25): _a(), _assertThisInitialized(), cb(), dc(), Fo(), ga(), gb(), hb() (+17 more)

### Community 2 - "Colorway Model and Product Imagery"
Cohesion: 0.10
Nodes (23): Butter model, Butter model v2, Butter product, Butter product v2, Cocoa model, Cocoa model v2, Cocoa product, Cocoa product v2 (+15 more)

### Community 3 - "Shopping Bag and Cart Drawer"
Cohesion: 0.13
Nodes (8): addToBag(), openCart(), openSearch(), renderBag(), saveBag(), setPrice(), trapFocus(), updateSetTotal()

### Community 4 - "Brand and Site Core"
Cohesion: 0.11
Nodes (19): Fit Philosophy — One Pattern Three Heights, Inclusive Sizing — XS-4X, Sleepwear With Standards, Blue Hour Model — Sky Colorway Editorial Portrait, Blue Hour Product — Sky Colorway Product Shot, Main Composition — Root Timeline 20.2s, Scene Builder — Build Your Set 5.19s, Scene Collection — Six Shades 6.82s (+11 more)

### Community 5 - "GSAP Utility Functions"
Cohesion: 0.17
Nodes (15): ae(), Be(), $d(), de(), fe(), ha(), ka(), ma() (+7 more)

### Community 6 - "Contact Sheet and Frame Snapshots"
Cohesion: 0.24
Nodes (12): After Dark text #222222, Six-shade colorway grid, Contact sheet 1 (1816×1108), Frame 4.39s, Milk background #F7F3EF, Model portrait 1, Model portrait 2, Model portrait 3 (+4 more)

### Community 7 - "HyperFrames Composition Metadata"
Cohesion: 0.18
Nodes (10): authoringSkill, media, autoProxy, paths, assets, blocks, components, registry (+2 more)

### Community 8 - "GSAP Animation Functions"
Cohesion: 0.28
Nodes (9): Aa(), Animation(), Ca(), Da(), la(), na(), Ua(), Va() (+1 more)

### Community 9 - "Project Package Configuration"
Cohesion: 0.22
Nodes (8): name, private, scripts, check, dev, publish, render, type

### Community 10 - "Late-Frame Snapshots"
Cohesion: 0.29
Nodes (7): Frame 11.2s, Frame 15.6s, Frame 15.84s, Frame 16.2s, Frame 20.19s, Frame 19.594s, Final wordmark

### Community 11 - "Six Shade Swatches"
Cohesion: 0.33
Nodes (6): Butter shade, Cocoa shade, Matcha shade, Milk shade, Petal shade, Sky shade

### Community 12 - "GSAP Timeline Functions"
Cohesion: 0.40
Nodes (5): Context(), Db(), Eb(), fb(), Jw()

### Community 13 - "GSAP Motion Functions"
Cohesion: 0.40
Nodes (5): ie(), Nd(), Od(), Pd(), Qd()

### Community 14 - "GSAP Core Functions"
Cohesion: 0.40
Nodes (5): kb(), ob(), ra(), rb(), Za()

### Community 15 - "GSAP Utility Functions B"
Cohesion: 0.40
Nodes (5): Sd(), Wd(), Xd(), zd(), ze()

### Community 16 - "GSAP Internal Functions B"
Cohesion: 0.50
Nodes (4): ja(), Mc(), Oc(), Vb()

### Community 17 - "Brand Tagline and Deck"
Cohesion: 0.50
Nodes (4): Share Copy — Sleep Well Dress Better, The Sleep Etiquette, Tagline — Sleep Well Dress Better, Brand Deck — The Sleep Etiquette

### Community 18 - "Transcript Entities"
Cohesion: 0.50
Nodes (4): Coconut Milk (10 ml), Jah Comfortable, Nature Skeri, Oxygen

### Community 19 - "Fabric Standards"
Cohesion: 0.50
Nodes (4): Fabric Standards, Organic Cotton Blends, TENCEL Lyocell, TENCEL Modal

### Community 20 - "Brag Creative Direction"
Cohesion: 0.67
Nodes (3): Brag Plan — Polished Fashion Film 20.2s Four Scenes, Creative Direction — Quiet Premium Fashion Film Magazine Pacing, Composition Brief — Launch Video 1920x1080

### Community 21 - "GSAP Timeline Functions B"
Cohesion: 0.67
Nodes (3): oa(), pa(), qa()

### Community 22 - "Set Builder Interaction Frames"
Cohesion: 0.67
Nodes (3): Frame 10.1s, Frame 10.7s, Set builder interaction

### Community 23 - "Product Detail Imagery"
Cohesion: 0.67
Nodes (3): Battery with small screen for back cover, Mattress, Back of room

## Ambiguous Edges - Review These
- `Battery with small screen for back cover` → `Mattress`  [AMBIGUOUS]
  graphify-out/transcripts/bong_001.txt · relation: conceptually_related_to
- `Mattress` → `Back of room`  [AMBIGUOUS]
  graphify-out/transcripts/bong_001.txt · relation: located_in
- `Coconut Milk (10 ml)` → `Nature Skeri`  [AMBIGUOUS]
  graphify-out/transcripts/impactSoft_medium_001.txt · relation: conceptually_related_to
- `Nature Skeri` → `Jah Comfortable`  [AMBIGUOUS]
  graphify-out/transcripts/impactSoft_medium_001.txt · relation: conceptually_related_to
- `Jah Comfortable` → `Oxygen`  [AMBIGUOUS]
  graphify-out/transcripts/impactSoft_medium_001.txt · relation: conceptually_related_to

## Knowledge Gaps
- **61 isolated node(s):** `Fashion-first sleepwear`, `Color Wardrobe — Six Shades One Point of View`, `Product Gallery with Thumbnails`, `TENCEL Modal`, `TENCEL Lyocell` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Xb()` connect `GSAP Utility Functions C` to `GSAP Vendor Library`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `r()` (e.g. with `gsap.min.js` and `Fo()`) actually correct?**
  _`r()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Fashion-first sleepwear`, `Color Wardrobe — Six Shades One Point of View`, `Product Gallery with Thumbnails` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GSAP Vendor Library` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Why does `Yb()` connect `GSAP Core Functions D` to `GSAP Vendor Library`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Battery with small screen for back cover` and `Mattress`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Mattress` and `Back of room`?**
  _Edge tagged AMBIGUOUS (relation: located_in) - confidence is low._
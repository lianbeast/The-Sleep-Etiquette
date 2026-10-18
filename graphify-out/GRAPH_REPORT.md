# Graph Report - The-Sleep-Etiquette  (2026-10-17)

## Corpus Check
- 22 files · ~829,182 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .ttf 8, (none) 3, .css 3)

## Summary
- 256 nodes · 369 edges · 36 communities (21 shown, 15 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `acdafd0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- GSAP Vendor Library
- GSAP Internal Functions
- Colorway Model and Product Imagery
- Shopping Bag and Cart Drawer
- Brand and Site Core
- GSAP Utility Functions
- Draft store technical audit
- HyperFrames Composition Metadata
- t
- Project Package Configuration
- The Sleep Etiquette — Brand Identity Guidelines
- build_public.py
- GSAP Timeline Functions
- GSAP Motion Functions
- GSAP Core Functions
- GSAP Utility Functions B
- GSAP Internal Functions B
- Brand Tagline and Deck
- The Sleep Etiquette: client preview
- Draft store fixes — October 16, 2026
- Brag Creative Direction
- GSAP Timeline Functions B
- oe
- README.md
- GSAP Internal Functions C
- GSAP Utility Functions C
- GSAP Core Functions D
- Blue Hour Model
- Blue Hour Product
- HyperFrames Composition Project
- GSAP Core Functions E
- Push-In Primitive
- Site Screenshot
- Fashion-First Sleepwear Concept

## God Nodes (most connected - your core abstractions)
1. `Tween()` - 13 edges
2. `r()` - 11 edges
3. `s()` - 10 edges
4. `la()` - 10 edges
5. `de()` - 10 edges
6. `t()` - 9 edges
7. `Draft store technical audit` - 9 edges
8. `Findings` - 9 edges
9. `The Sleep Etiquette — Brand Identity Guidelines` - 9 edges
10. `v()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Six Shades — Matcha Butter Milk Cocoa Sky Petal` --conceptually_related_to--> `Blue Hour Model — Sky Colorway Editorial Portrait`  [INFERRED]
  index.html → assets/blue-hour-model-v2.webp
- `Brand Deck — The Sleep Etiquette` --conceptually_related_to--> `The Sleep Etiquette`  [INFERRED]
  The Sleep Etiquette - Brand Deck.pptx.pdf → README.md
- `Scene Builder — Build Your Set 5.19s` --conceptually_related_to--> `Build Your Set — Modular Wardrobe Builder`  [INFERRED]
  brag-output/composition/compositions/scene-builder.html → index.html
- `Scene Collection — Six Shades 6.82s` --conceptually_related_to--> `Six Shades — Matcha Butter Milk Cocoa Sky Petal`  [INFERRED]
  brag-output/composition/compositions/scene-collection.html → index.html
- `Share Copy — Sleep Well Dress Better` --references--> `Tagline — Sleep Well Dress Better`  [EXTRACTED]
  brag-output/share-copy.txt → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Colorway Model-Product Pairs** — assets_matcha_model_v2_webp, assets_matcha_product_v2_webp, assets_butter_model_v2_webp, assets_butter_product_v2_webp, assets_milk_model_v2_webp, assets_milk_product_v2_webp, assets_cocoa_model_v2_webp, assets_cocoa_product_v2_webp, assets_dusty_rose_model_v2_webp, assets_dusty_rose_product_v2_webp [EXTRACTED 0.95]
- **Six Shade Colorway Collection** — assets_matcha_model_v2_webp, assets_butter_model_v2_webp, assets_milk_model_v2_webp, assets_cocoa_model_v2_webp, assets_dusty_rose_model_v2_webp [EXTRACTED 0.95]
- **Four-Scene Brag Film — Hero Collection Builder Proof** — brag_output_composition_scene_hero_considered_sleepwear, brag_output_composition_scene_collection_six_shades, brag_output_composition_scene_builder_build_your_set, brag_output_composition_scene_proof_cut_like_clothing [EXTRACTED 1.00]
- **Six-Shade Collection System** — index_six_shades, assets_blue_hour_model_v2, brag_output_composition_scene_collection_six_shades, index_color_wardrobe [INFERRED 0.85]

## Communities (36 total, 15 thin omitted)

### Community 1 - "GSAP Internal Functions"
Cohesion: 0.15
Nodes (22): _assertThisInitialized(), cb(), dc(), Fo(), ga(), gb(), ha(), hb() (+14 more)

### Community 2 - "Colorway Model and Product Imagery"
Cohesion: 0.10
Nodes (23): Butter model, Butter model v2, Butter product, Butter product v2, Cocoa model, Cocoa model v2, Cocoa product, Cocoa product v2 (+15 more)

### Community 3 - "Shopping Bag and Cart Drawer"
Cohesion: 0.12
Nodes (10): addToBag(), openCart(), openSearch(), renderBag(), saveBag(), selectColor(), setPrice(), trapFocus() (+2 more)

### Community 4 - "Brand and Site Core"
Cohesion: 0.15
Nodes (13): Blue Hour Model — Sky Colorway Editorial Portrait, Blue Hour Product — Sky Colorway Product Shot, Main Composition — Root Timeline 20.2s, Scene Builder — Build Your Set 5.19s, Scene Collection — Six Shades 6.82s, Scene Hero — Considered Sleepwear 4.67s, Scene Proof — Cut Like Clothing 4.36s, Coming Soon — Waitlist and Guest List (+5 more)

### Community 5 - "GSAP Utility Functions"
Cohesion: 0.21
Nodes (14): Animation(), $d(), Da(), de(), fe(), ka(), la(), ma() (+6 more)

### Community 6 - "Draft store technical audit"
Cohesion: 0.11
Nodes (17): 1. [P1] Bag opens without moving keyboard focus into the dialog, 2. [P1] Quick-add silently substitutes a different variant, 3. [P1] Keyboard focus outline disappears on the dark Home section, 4. [P2] Product navigation loses product identity, 5. [P2] Color selection and gallery represent different variants, 6. [P2] Surface palette overrides also recolor the Milk product swatch, 7. [P2] Large background delivery and overlapping font loading, 8. [P2] Journal Read story links target a nonexistent anchor (+9 more)

### Community 7 - "HyperFrames Composition Metadata"
Cohesion: 0.18
Nodes (10): authoringSkill, media, autoProxy, paths, assets, blocks, components, registry (+2 more)

### Community 8 - "t"
Cohesion: 0.27
Nodes (10): _a(), Aa(), Be(), Ca(), ib(), jb(), na(), t() (+2 more)

### Community 9 - "Project Package Configuration"
Cohesion: 0.22
Nodes (8): name, private, scripts, check, dev, publish, render, type

### Community 10 - "The Sleep Etiquette — Brand Identity Guidelines"
Cohesion: 0.12
Nodes (15): Approved Usage, Clear Space, Colour Palette, Do Not, Embroidery, File Summary, Lockups, Minimum size (+7 more)

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

### Community 18 - "The Sleep Etiquette: client preview"
Cohesion: 0.33
Nodes (5): Direction, Implementation, Launch staging, Page layouts, The Sleep Etiquette: client preview

### Community 19 - "Draft store fixes — October 16, 2026"
Cohesion: 0.40
Nodes (4): Draft store fixes — October 16, 2026, Editing boundaries, Image payload comparison, Verification

### Community 20 - "Brag Creative Direction"
Cohesion: 0.67
Nodes (3): Brag Plan — Polished Fashion Film 20.2s Four Scenes, Creative Direction — Quiet Premium Fashion Film Magazine Pacing, Composition Brief — Launch Video 1920x1080

### Community 21 - "GSAP Timeline Functions B"
Cohesion: 0.67
Nodes (3): oa(), pa(), qa()

### Community 22 - "oe"
Cohesion: 0.67
Nodes (3): ae(), oe(), pe()

## Knowledge Gaps
- **26 isolated node(s):** `Share Copy — Sleep Well Dress Better`, `Brand Deck — The Sleep Etiquette`, `Butter model`, `Butter product`, `Cocoa model` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 123 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Xb()` connect `GSAP Utility Functions C` to `GSAP Vendor Library`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `r()` (e.g. with `gsap.min.js` and `Fo()`) actually correct?**
  _`r()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Share Copy — Sleep Well Dress Better`, `Brand Deck — The Sleep Etiquette`, `Butter model` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `GSAP Vendor Library` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Why does `Yb()` connect `GSAP Core Functions D` to `GSAP Vendor Library`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Should `GSAP Internal Functions` be split into smaller, more focused modules?**
  _Cohesion score 0.1471861471861472 - nodes in this community are weakly interconnected._
- **Should `Colorway Model and Product Imagery` be split into smaller, more focused modules?**
  _Cohesion score 0.10276679841897234 - nodes in this community are weakly interconnected._
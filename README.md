<p align="center">
  <b>The Sleep Etiquette</b><br>
  <i>Fashion-first sleepwear. Sleep well. Dress better.</i>
</p>

<p align="center">
  <a href="https://lianbeast.github.io/The-Sleep-Etiquette/"><img alt="Live Site" src="https://img.shields.io/badge/live%20site-view%20now-222222?style=flat-square&labelColor=F7F3EF"></a>
</p>

---

## Table of Contents

- [About](#about)
- [The Look](#the-look)
- [Palette & Layout](#palette--layout)
- [The Pages](#the-pages)
- [What's Under the Hood](#whats-under-the-hood)
- [Run It Locally](#run-it-locally)
- [Getting on the List](#getting-on-the-list)

---

## About

The Sleep Etiquette is a small sleepwear label with a simple idea: what you wear to bed
should be as considered as what you wear to dinner. Nothing scratchy, nothing shapeless,
nothing you'd be embarrassed to answer the door in.

This is the label's site. Six pages, a working bag, and a coming-soon page for people who
want first access when we open.

**[Visit the site →](https://lianbeast.github.io/The-Sleep-Etiquette/)**

---

## The Look

<p align="center">
  <img src="docs/preview.png" alt="The Sleep Etiquette homepage" width="900">
</p>

---

## Palette & Layout

<p align="center">
  <img src="docs/palette.png" alt="Colour palette, type and layout system" width="900">
</p>

The whole site is built from ten colours and two typefaces. Nothing else.

**Neutrals** do the heavy lifting. A warm off-white is the ground every page sits on, pure
white lifts a section off it, near-black carries all the type, a softer grey carries the
secondary type, and one pale line is the only divider we ever use.

**Five fabric colours** — butter, matcha, dusty rose, cocoa and blue hour — are the exact
colourways the collection sells in. They show up as product swatches *and* as full-bleed
section backgrounds, so the site never invents a colour the clothes don't have.

**Two typefaces.** An elegant serif for anything you read first, a quiet sans for everything
else. The serif always wins the argument.

**The layout is one rhythm.** Every section is separated by the same generous band of space,
and the margin scales with the screen rather than snapping at fixed breakpoints. Grids hold
three across and drop to one on a phone. Change a number in one place at the top of the
stylesheet and the whole site re-flows.

---

## The Pages

| Page | What you'll find |
| --- | --- |
| **Home** | Hero, bestsellers, the set builder, reviews, journal teaser |
| **Product** | Gallery, size / height / colour pickers, quantity, add to bag |
| **Standards** | What the fabric actually is and why it matters |
| **About** | The label itself |
| **Journal** | Writing, with category filters |
| **Coming Soon** | One screen, one field, one sign-up |

---

## What's Under the Hood

No build step. No framework. No `npm install`.

- **Six HTML pages**, one stylesheet, one script.
- **The bag is real** — add things, change pages, close the tab. It's still there.
- **Every page shares one script** that quietly ignores anything it doesn't find, so there's
  no per-page JavaScript to maintain.
- **The design lives in variables.** Change one colour at the top of the stylesheet and the
  whole site follows.
- **One responsive system.** Two breakpoints — one for tablets, one for phones — and the
  whole layout adapts to them.

---

## Run It Locally

Clone the repo and open `index.html`. That's the whole procedure — it's a real folder of
files, not an app that needs starting.

If you'd rather serve it:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Getting on the List

The coming-soon page is currently in **demo mode** — signups validate and animate, but
they stay in your browser and aren't sent anywhere.

To start collecting real emails, give the form a collector URL (Formspree, a Mailchimp or
ConvertKit endpoint, or your own API). The page already knows what to send. The instructions
are in a comment right above the form in `coming-soon.html`.

---

<p align="center">
  <sub>Made with restraint.</sub>
</p>

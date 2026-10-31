# Gurwinder Singh — Portfolio

A dark, cinematic, single-page portfolio for **Gurwinder Singh**, a 3D Generalist, Multimedia Artist and Video Editor. The design takes subtle Batman-inspired cues (dark architectural shapes, wing-like geometry, cool light). It has no characters, logos or comic styling.

## Entry points
| Path | Purpose |
|---|---|
| `index.html` | The whole site (Home, About, Work, Software, Showreel, Contact) |
| `index.html#project/architectural-environment` | Opens the Architectural Environment project page directly (deep link, works with browser back) |

## Files
```
index.html                 markup shell + SEO / Open Graph meta
favicon.svg                original geometric monogram
css/style.css              design system, layout, motion, responsive, reduced-motion
js/config.js               ALL editable content (single source of truth)
js/main.js                 rendering + interactions (cursor, parallax, reveals, players, project page, lightbox)
projects/architectural-environment/
  wide-view.jpg            supplied render: wide high-angle view of the whole complex
  detail-view.jpg          supplied render: eye-level view with the characters
```

## Features
- Hero with an animated canvas (particles, light streaks, perspective grid), a parallax architectural silhouette, a light sweep, a letter-by-letter name reveal, staggered text fade-ins and a scroll indicator.
- Custom cursor (dot + trailing ring, shows "VIEW" over project cards). It only runs on desktop with a mouse and turns off for touch and reduced motion.
- Magnetic buttons, word-by-word heading reveals, mask reveals on project images, parallax on cards.
- About section: two separate editorial blocks with the full text supplied.
- Toolkit section: five cards (Maya, Blender, After Effects, Premiere Pro, Unreal Engine) with Devicon logos. If a logo fails to load, a text badge shows instead. No percentages or claimed years of experience.
- Selected Works: the Architectural Environment card is featured at full width, plus two video cards that scroll to the showreel.
- Project page: intro, hero render, gallery with a full-size lightbox (arrow keys, Esc, swipe), the walkthrough video and a verified-details list. Empty detail fields are hidden.
- Video players: a click-to-play poster (sound only plays after a click), a loading spinner, an error message with an "open file" link, and native controls with fullscreen. Starting one video pauses the others.
- YouTube video: loads from youtube-nocookie only after a click, plus a "Watch on YouTube" link as a fallback.
- Contact: `mailto:` draft to singhguri1718@gmail.com (with a subject line) and the LinkedIn profile link.
- Accessibility: skip link, focus styles, focus is kept inside open dialogs, alt text, ARIA labels, reduced-motion support. If animations fail, a safety timer shows all content anyway.

## Media mapping
| Asset | Where it is used |
|---|---|
| Render (wide view) | Project hero, gallery image 01, card cover, social preview |
| Render (detail view with characters) | Gallery image 02 |
| `WhatsApp Video 2026-10-13 at 2.04.12 AM.mp4` (3:52, Blender walkthrough) | Project page → **Project Walkthrough** |
| `batman2.mp4` (1:47 cinematic montage) | Showreel → **Featured Visual** |
| YouTube `fSiI2Zq4NzI` (1:16, 3D render montage) | Showreel → second card |

The two MP4 files (84 MB and 63 MB) are too large to bundle with the site. Right now they stream from their uploaded file URLs, set in `js/config.js → videos.*.src`. For production, upload compressed copies (or put them in R2 / a CDN) and change only those `src` values.

## Updating content
Edit `js/config.js` only:
- **Add a project:** add an object to `projects` (`slug`, `title`, `category[]`, `summary`, `cover`, `images[]`, optional `video`, `details`). Projects that have `images` open the project page.
- **Add the third architectural render:** save it as `projects/architectural-environment/main-view.jpg` and uncomment the line in `projects[0].images`. To make it the hero render, set `hero` to its index.
- **Swap a video:** change `videos.<id>.src` / `poster`.
- **Hide a field:** set it to `""`.

## Known gaps / next steps
- Only **two** of the three architectural renders were attached. Add the third (`main-view`) once it is available.
- The "Software Used: Blender" detail comes from the walkthrough video, which visibly shows the Blender interface. Change it if that's not accurate.
- `batman2.mp4` has no poster image yet. A frame grab would improve the card.
- Since it's built from movie footage, check the rights to `batman2.mp4` before publishing.
- More portfolio items would strengthen the Work section: modeling turntables, texturing breakdowns, Unreal Engine scenes, motion-graphics pieces.
- The site has not been deployed. Publishing (Hosted Deploy) needs explicit approval.

# Design system

The tokens live in `src/app.css`. This file records the rules behind them. Change both together, and build every new page from this system.

## Direction

A mix of neo-brutalist and maximalist, on a light page. Thick black borders, hard offset shadows, flat saturated fills, and icon stickers stuck on at odd angles. The experience stays plain and predictable (a normal nav, left-aligned text, rows that are links). The interface is where the noise goes.

- Neo-brutalist: 3 px `#111` borders, `5px 5px 0 #111` shadows, 8 to 10 px corners, no blur, no gradients. Buttons press down into their shadow.
- Maximalist: a dot pattern on the page, rotated blocks, a tilted ticker of things I like, stickers that overlap their neighbours.
- Each hiring track gets one accent colour and its own sticker set. Stay inside that theme on every page of the track.

## Type

One family: Archivo (variable, width 62 to 125, weight 100 to 900), self-hosted through `@fontsource-variable/archivo`.

- Expanded width (125%), weight 900: names, page titles, tile names.
- Normal width, regular: body text, 17 px with a 1.6 line height.
- Condensed width (75%), medium, tabular figures: dates (`.meta`).
- Sentence case. No small all-caps labels, no monospace, no numbered sections.
- Nothing is smaller than 14 px.

## Colour

Light mode only.

| Token | Value | Role |
| --- | --- | --- |
| `--ground` | `#F1EEFF` | Page background, with a dot pattern |
| `--raise` | `#FFFFFF` | Cards, fields, nav bar |
| `--sunk` | `#E2DCFF` | Image placeholders |
| `--ink` / `--line` | `#111111` | Text, borders, shadows |
| `--ink-quiet` | `#4A4650` | Dates and captions |
| `--key` | `#FF4D79` | The key colour, a pinkish red. Buttons, brand, ticker. Always carries black text |
| `--key-ink` | `#C4124A` | Pinkish red as text on a light ground |
| `#FFC933` | yellow | The status box and the coffee sticker |

Each track adds one secondary colour through `[data-track]`:

| Track | Accent | Stickers |
| --- | --- | --- |
| web | blue `#5B7CFF` | coffee, greens, tea |
| game | violet `#B57BFF` | straw hat, volleyball, music |
| qa | mint `#2EE59D` | cat, bug, milk |
| software | amber `#FFC933` | vinyl, cooking pot, flower |

Text on any accent fill is black. Accents never carry body text on white; use `--accent-ink`.

## Icons

Only two kinds, both real SVG, drawn in `Icon.svelte`:

- Things I like, drawn for this site: coffee, tea, milk, cat, vinyl, music, flower, leaf, volleyball, straw hat, pot, bug. Black 1.8 px strokes with flat fills.
- Tools I use, from Simple Icons (CC0), looked up by name in `src/lib/icons.ts`. A tool with no mark shows as a text chip.

No icon on every heading, and no decorative icon sets. Anything borrowed is credited on `/footnotes`, which the footer links to.

## Shape and space

- Radius: buttons 8 px, blocks 10 px, images 6 px, chips and the brand pill fully round or 8 px, the business card 3% of its width.
- Spacing on an 8 px scale: 8 px inside a row, 20 px between rows, 96 to 128 px between sections (64 px on phones).
- Page width up to 1,120 px (`.wrap`). Text columns are 62 characters. Side gutter is 20 px.
- Stickers are decoration only: `aria-hidden`, never over a heading or paragraph, and hidden under 640 px.

## Components

- Home: name, pronunciation pill, a yellow status box, four tilted track tiles (each with its own icon), the ticker, then recent work.
- Track page: title, pitch, résumé button, the interactive business card, then rows, tools and a call-to-action block.
- Business card (`BusinessCard.svelte`): the printable 3.5 × 2 in card as a widget. Click the card or "Flip the card" to see the QR code on the back. Copy the email, save the contact, or print it at real size. It lives inside each track page. It is not its own page.
- Project row: a bordered block that lifts on hover. The whole row is the link. The tools show as chips with their logos.
- Footnotes (`/footnotes`): where the icons, logos, type and QR code come from. It is the only page added for the redesign.
- Buttons: `.btn` is the key-colour action with a hard shadow. `.btn-quiet` is an underlined text link. Labels say what happens.
- States: every link and button has hover, pressed, keyboard focus (black outline plus a key-colour ring) and disabled styles. The contact form has error, sending and sent states.
- Targets: at least 44 × 44 px.

## Motion

Short 120 to 150 ms moves: buttons and rows lift or press, tiles straighten, and the card flips in 450 ms. The ticker scrolls slowly and pauses on hover. Everything respects `prefers-reduced-motion`: the ticker stops, and the flip becomes a crossfade.

## Content rules

- Facts match the Career Repository. Nothing goes on the site that the repository does not record.
- First person, short sentences, plain verbs, one honest aside per entry. New copy is run through the humanizer rules before it ships.
- Every page exists in English and French at its own URL (`/fr/...`).
- Skills are never a free-floating list. Each track shows the tools of the projects it displays.
- The part-time non-tech track (barista, customer service) stays off the site.

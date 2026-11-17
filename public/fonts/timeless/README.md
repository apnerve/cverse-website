# Timeless Grotesk

Place the Timeless Grotesk files downloaded from https://www.timeless.co/type here.

Expected file names (rename if your zip differs, or update `src/styles/fonts-timeless.css`):

- `TimelessGroteskVF.woff2`         (upright variable font)
- `TimelessGroteskItalicVF.woff2`   (italic variable font)

If the zip only contains `.ttf` files, they work too: change the `url()` and `format()` in
`src/styles/fonts-timeless.css`. The license (Timeless Free Font License) permits web embedding
and WOFF2 conversion; include a copy of the license text next to the files when you add them.
Until the files are present the Corporate version falls back to Inter.

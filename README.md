# homepage

Personal academic website — plain HTML / CSS / JavaScript, no build step.

Structure follows the [academicpages](https://github.com/academicpages/academicpages.github.io)
layout (top nav + fixed author sidebar + content column), rewritten as static
files so no Jekyll or Ruby is required.

## Files

| File | What it is |
| --- | --- |
| `index.html` | About page (landing) |
| `research.html` | Research projects |
| `projects.html` | Funded projects |
| `cv.html` | Full CV |
| `style.css` | All styling, including dark mode and print |
| `script.js` | Theme toggle, mobile menu, active-page highlight, copy email |
| `images/` | Put `profile.jpg` here |
| `files/` | Put `CV_Eun_Jin_Jeong.pdf` here |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Publishing

Settings → Pages → Build and deployment → Source: **Deploy from a branch**,
branch `main`, folder `/ (root)`.

The site will be served at `https://ag2ya-sketch.github.io/homepage/`.
To serve it at `https://ag2ya-sketch.github.io/` instead, rename the repository
to `ag2ya-sketch.github.io`.

## Editing

The header and sidebar markup is repeated in each of the four HTML files
(there is no template engine). If you change your title, lab, or links,
update all four.

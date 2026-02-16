# Michael Barringer — Portfolio Site

## Overview

Static portfolio site for Michael Barringer, director and creative producer. Built from a Figma design, deployed on Vercel.

- **Live URL:** https://michael-barringer-www.vercel.app
- **GitHub:** https://github.com/brownthings/michael-barringer-www
- **Figma:** https://www.figma.com/design/u44ClNLYuclZWlXX4ScJK6/Untitled?node-id=1-5&m=dev

## Stack

Plain HTML/CSS. No build step, no framework. One `index.html`, one `style.css`.

## Project Structure

```
michael-barringer-www/
├── index.html
├── style.css
├── favicon.ico
└── images/
    ├── portrait.jpg          (760x1139, 128KB — resized/sharpened from 1667x2500 original)
    ├── apple-touch-icon.png
    ├── og.jpg
    ├── project1-chalamet.jpg
    ├── project2-wizardofoz.jpg
    ├── project3-postcard.jpg
    └── project4-postcard2.jpg
```

## Figma Integration

The Figma MCP server is configured in `.mcp.json` on the `reverberation-archive` project:

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp",
      "headers": {
        "Authorization": "Bearer <FIGMA_TOKEN>"
      }
    }
  }
}
```

If the MCP server isn't connected in a session, you can hit the Figma REST API directly:

```bash
# Fetch node data
curl -s -H "X-Figma-Token: <FIGMA_TOKEN>" \
  "https://api.figma.com/v1/files/u44ClNLYuclZWlXX4ScJK6/nodes?ids=1-5"

# Get image URLs for all images in the file
curl -s -H "X-Figma-Token: <FIGMA_TOKEN>" \
  "https://api.figma.com/v1/files/u44ClNLYuclZWlXX4ScJK6/images"

# Render a frame as PNG
curl -s -H "X-Figma-Token: <FIGMA_TOKEN>" \
  "https://api.figma.com/v1/images/u44ClNLYuclZWlXX4ScJK6?ids=1:5&format=png&scale=1"
```

## Design Specs (from Figma)

**Container:** max-width 1440px, padding 96px top/bottom, 128px left/right (1184px content area)

**Typography (all Arial):**
| Style | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Name / Section heading | 36px | 700 | -1.08px | normal |
| Subtitle / Email | 18px | 400 | -0.18px | normal |
| Bio headline | 21px | 400/700 mixed | 0 | 24px |
| Bio body | 16px | 400 | 0 | 21px |
| Project title | 18px | 700/400 mixed | -0.18px | normal |
| Project description | 14px | 400 | -0.14px | 18px |

**Colors:** Black text (#000) on white (#fff). Divider and image borders are rgba(0,0,0,0.2).

**Responsive breakpoints:** 1024px (tablet), 768px (mobile), 480px (small mobile). Bio section and project cards stack to single column on mobile.

## Image Processing

Portrait was resized with Python Pillow for web:

```python
from PIL import Image, ImageFilter

img = Image.open("images/portrait.jpg")
resized = img.resize((760, 1139), Image.LANCZOS)  # 2x retina for 380px display
sharpened = resized.filter(ImageFilter.UnsharpMask(radius=1.0, percent=80, threshold=2))
sharpened.save("images/portrait.jpg", "JPEG", quality=85, optimize=True)
```

## Deploying to Vercel

Vercel CLI v50 has a bug where `--scope` is ignored in non-interactive (no TTY) environments. The fix is to wrap the command with `script` to give it a pseudo-TTY:

```bash
# This DOES NOT work (no TTY):
vercel --prod --yes --scope matt-browns-projects-f9c9a748

# This works:
script -q /dev/null vercel --prod --yes --scope matt-browns-projects-f9c9a748
```

Once linked, the GitHub repo is connected and future pushes to `main` auto-deploy.

**Vercel scope/team:** `matt-browns-projects-f9c9a748` (ID: `team_99IepBrB0PVpQM4M0ZIyuwyM`)

## Local Development

```bash
npx serve .
# Opens at http://localhost:3000
```

## Agentation (Visual Feedback Tool)

There's a commented-out Agentation block at the bottom of `index.html`. To enable it, uncomment the block and run via a local server (not `file:///` — ES module imports need HTTP). See https://agentation.dev.

## Features

- **Copy-to-clipboard email:** Clicking the email address copies it and shows a toast notification
- **Vimeo embed:** Last project ("I Approve This Message") has an embedded Vimeo player
- **SEO:** Meta description, OG tags, Twitter cards, favicon, apple-touch-icon

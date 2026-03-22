# Icon Library — Summary

Date: 2026-01-04

Status: Imported icons from `RemixIcon_Svg_v4.7.0.zip` and generated counts locally.

Figma URL: https://www.figma.com/design/IO6lHV6yC29F9L90h2ITAA/Icon-Library-PyroMedia?node-id=1-16&m=dev

Current totals
- Total icons: 3136
- Total categories: 19

What I tried
- Attempted to load the Figma file programmatically, but the Figma web UI returned a WebGL/access error and the page did not expose the document node list.

How you can provide the icon data (pick one)
1. Grant access: make the Figma file viewable by anyone with the link OR provide a Figma Personal Access Token and the file key. I can then fetch nodes programmatically and produce a complete summary.
2. Export a ZIP: export all icons as individual SVG files, grouped in folders by category, and upload the ZIP here.
3. Provide a CSV/JSON: a simple file with each icon's `name`, `category`, and `filename`.

Quick local counting options (Windows / PowerShell)

If you export icons into a folder structure like `icons/<category>/*.svg`, run this PowerShell from the root of the export to get counts per category:

```powershell
Get-ChildItem -Recurse -Filter *.svg |
  Group-Object DirectoryName |
  Select @{Name='Category';Expression={Split-Path $_.Name -Leaf}}, Count
```

Cross-platform Node.js script (one-liner)

```bash
node -e "const fs=require('fs');const path=require('path');const walk=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):path.join(d,e.name));const files=walk('icons').filter(f=>f.endsWith('.svg'));const byCat={};files.forEach(f=>{const cat=path.basename(path.dirname(f));byCat[cat]=(byCat[cat]||0)+1});console.log(byCat, 'total', files.length)"
```


Summary by category

| Category | Count |
|---|---:|
| Arrows | 178 |
| Buildings | 62 |
| Business | 210 |
| Communication | 92 |
| Design | 232 |
| Development | 62 |
| Device | 172 |
| Document | 238 |
| Editor | 149 |
| Finance | 172 |
| Food | 32 |
| Health & Medical | 83 |
| Logos | 278 |
| Map | 170 |
| Media | 292 |
| Others | 156 |
| System | 348 |
| User & Faces | 128 |
| Weather | 82 |
| **Total** | **3136** |

Generated files

- `icons/` — extracted SVG files (folder)
- `icons_summary.json` — full per-category lists + total (JSON)
- `icons_counts.md` — the markdown table above (generated)

Next steps I can take once you provide data
- If you supply Figma access or an export, I'll parse the icons, update this file with exact counts and a per-icon list, then scaffold a React app to browse and copy icons on click.

If you want, I can also add a small script to this repo that fetches the Figma file (requires a PAT) and produces the summary automatically.

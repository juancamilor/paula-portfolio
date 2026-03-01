# Paula González — Designer Portfolio

A fashion editorial portfolio website showcasing Paula González's work in fashion design, interior design, and surface/wallpaper design.

## 🌐 Live Site

**https://lemon-sky-092c0940f.4.azurestaticapps.net**

## Architecture

| Component | Technology | Details |
|-----------|-----------|---------|
| **Hosting** | Azure Static Web Apps | Free tier, global CDN, auto SSL |
| **Images** | Azure Blob Storage | `stpaulaportfolio` / `images` container |
| **CI/CD** | GitHub Actions | Auto-deploys on push to `main` |
| **Resource Group** | `rg-paula-portfolio` | East US 2 region |
| **Subscription** | Visual Studio Enterprise | Personal Azure subscription |

## Features

- **Fashion Editorial Layout** — Full-bleed hero, editorial grid, catalogue-style cards
- **Lightbox** — Click any portfolio image for an enlarged view
- **Scroll Reveal** — Sections animate in as you scroll
- **Responsive** — Adapts to mobile, tablet, and desktop
- **Fast Loading** — Static site served via CDN, images via Blob Storage CDN
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript

## Quick Start

```bash
# Clone
git clone https://github.com/juancamilor/paula-portfolio.git
cd paula-portfolio

# Run locally
python -m http.server 8080
# Open http://localhost:8080
```

## Managing Images

Images are hosted on Azure Blob Storage (not in the repo). Upload via CLI:

```bash
# Upload
az storage blob upload --account-name stpaulaportfolio --container-name images --file ./photo.jpg --name photo.jpg

# List
az storage blob list --account-name stpaulaportfolio --container-name images --output table
```

Image URL pattern: `https://stpaulaportfolio.blob.core.windows.net/images/<filename>`

Or use [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/) for a visual interface.

## Deployment

Fully automated — push to `main` and GitHub Actions handles the rest. Pull requests get a staging preview environment automatically.

## Infrastructure

See [`infra/setup.ps1`](infra/setup.ps1) to provision Azure resources from scratch.
See [`CONTRIBUTING.md`](CONTRIBUTING.md) for development workflow and image management details.

## Cost

| Resource | Estimated Cost |
|----------|---------------|
| Static Web App (Free tier) | $0/month |
| Blob Storage (~500MB) | ~$0.50/month |
| Bandwidth (~5GB/month) | ~$0.40/month |
| **Total** | **~$1/month** |

## License

© 2025 Paula González. All rights reserved.

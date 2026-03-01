# 📸 Image Upload Guide

This guide explains how to add real portfolio images to the site once you have them ready.

---

## Where Images Live

Images are stored in **Azure Blob Storage** (not in the Git repo). Once uploaded, they're available at:

```
https://stpaulaportfolio.blob.core.windows.net/images/<filename>
```

---

## Step 1: Prepare Your Images

### Naming Convention

Use lowercase, hyphens, and a clear category prefix:

| Category | Naming Pattern | Example |
|----------|---------------|---------|
| Fashion | `fashion-<description>-<##>.jpg` | `fashion-silk-dress-01.jpg` |
| Interior | `interior-<description>-<##>.jpg` | `interior-living-room-01.jpg` |
| Surface/Wallpaper | `surface-<description>-<##>.jpg` | `surface-botanical-print-01.jpg` |
| Portrait/About | `portrait-<description>.jpg` | `portrait-paula-studio.jpg` |

### Recommended Image Specs

| Property | Recommendation |
|----------|---------------|
| **Format** | JPEG for photos, PNG for graphics with transparency |
| **Max width** | 2000px (displays at ~1100px max on site) |
| **Quality** | 80-85% JPEG quality (good balance of size vs. clarity) |
| **File size** | Aim for under 500KB per image |
| **Aspect ratio** | 4:5 (portrait) works best with the current card layout |

### Quick Resize Tip (PowerShell + Python)

If you have Python with Pillow installed:
```bash
pip install Pillow
python -c "
from PIL import Image
img = Image.open('big-photo.jpg')
img.thumbnail((2000, 2500))
img.save('fashion-silk-dress-01.jpg', 'JPEG', quality=82)
"
```

Or just use any image editor (Photoshop, Preview, Paint.NET) to resize before uploading.

---

## Step 2: Upload Images

### Option A: Azure CLI (Recommended)

**Upload a single image:**
```bash
az storage blob upload \
  --account-name stpaulaportfolio \
  --container-name images \
  --file ./fashion-silk-dress-01.jpg \
  --name fashion-silk-dress-01.jpg
```

**Upload all images in a folder at once:**
```bash
az storage blob upload-batch \
  --account-name stpaulaportfolio \
  --destination images \
  --source ./my-portfolio-photos/
```

**List what's currently uploaded:**
```bash
az storage blob list \
  --account-name stpaulaportfolio \
  --container-name images \
  --output table
```

**Delete an image you no longer need:**
```bash
az storage blob delete \
  --account-name stpaulaportfolio \
  --container-name images \
  --name old-placeholder.svg
```

### Option B: Azure Storage Explorer (Visual/GUI)

1. Download [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer/)
2. Sign in with your Azure account (`juan_camilo_r@hotmail.com`)
3. Navigate to: **stpaulaportfolio** → **Blob Containers** → **images**
4. Drag and drop files to upload

### Option C: Azure Portal (Web)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Search for **stpaulaportfolio** storage account
3. Click **Containers** → **images**
4. Click **Upload** and select your files

---

## Step 3: Update the HTML

After uploading, update `index.html` to reference the new images. Replace the placeholder SVGs:

**Before (placeholder):**
```html
<div class="card" data-src="https://stpaulaportfolio.blob.core.windows.net/images/fashion-01.svg">
  <div class="card__img-wrap">
    <img src="https://stpaulaportfolio.blob.core.windows.net/images/fashion-01.svg" alt="Fashion 01" loading="lazy">
  </div>
  <p class="card__label">Fashion 01</p>
</div>
```

**After (real photo):**
```html
<div class="card" data-src="https://stpaulaportfolio.blob.core.windows.net/images/fashion-silk-dress-01.jpg">
  <div class="card__img-wrap">
    <img src="https://stpaulaportfolio.blob.core.windows.net/images/fashion-silk-dress-01.jpg" alt="Silk Dress Collection" loading="lazy">
  </div>
  <p class="card__label">Silk Dress Collection</p>
</div>
```

**Don't forget the hero background in `style.css`:**
```css
.hero {
  background: url('https://stpaulaportfolio.blob.core.windows.net/images/fashion-hero-banner.jpg') center/cover no-repeat;
}
```

---

## Step 4: Deploy

After editing `index.html` and/or `style.css`:

```bash
git add .
git commit -m "Replace placeholder images with real portfolio photos"
git push origin main
```

GitHub Actions will automatically deploy the changes. The site updates in about 30 seconds.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Upload one image | `az storage blob upload --account-name stpaulaportfolio --container-name images --file ./photo.jpg --name photo.jpg` |
| Upload a folder | `az storage blob upload-batch --account-name stpaulaportfolio --destination images --source ./photos/` |
| List images | `az storage blob list --account-name stpaulaportfolio --container-name images --output table` |
| Delete image | `az storage blob delete --account-name stpaulaportfolio --container-name images --name old.jpg` |
| Image URL pattern | `https://stpaulaportfolio.blob.core.windows.net/images/<filename>` |

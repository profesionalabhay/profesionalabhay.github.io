# Abhay Kumar Singh — Auto-updating GitHub Portfolio

## How the auto-update works
The website reads the public GitHub repository folders using GitHub's public Contents API. When you upload a file to a designated folder and commit it, the website lists it automatically on the next refresh. You do not edit HTML for routine document uploads.

## One-time GitHub setup
1. Create a **public** repository named `profesionalabhay.github.io` under GitHub account `profesionalabhay` (this matches the portfolio domain shown in your supplied resume). If that repository already exists, use it instead of creating another.
2. Upload the contents of this ZIP's root directly into the repository root. `index.html` and `portfolio-config.js` must be at repository root.
3. In GitHub → Settings → Pages, select **Deploy from a branch**, branch `main`, folder `/(root)`, Save.
4. Wait for GitHub Pages. Expected site: `https://profesionalabhay.github.io/`.
5. If your actual GitHub username/repository is different, edit only `portfolio-config.js` once:
   - `owner`: your GitHub username
   - `repo`: repository name
   - `branch`: usually `main`

## Routine upload process — no code edits
Use GitHub → your repository → the correct folder → Add file → Upload files → Commit changes.

| What you upload | Folder | Website section |
|---|---|---|
| Latest resume PDF | `documents/resume/` | Resume |
| One-page profile PDF | `documents/one-page-profile/` | One-page profile |
| Degree / education documents | `documents/education/` | Education |
| All 7 certificates (PDF) | `documents/certificates/` | Certificates |
| Top 10 project summary PDF | `documents/project-summaries/` | Project summaries |
| Detailed project case-study PDFs | `projects/case-studies/` | Project portfolio |
| Power BI screenshots / exports | `dashboards/power-bi/` | Power BI |
| Excel dashboard screenshots / exports | `dashboards/excel/` | Excel dashboards |
| MES screenshots / exports | `dashboards/mes/` | MES dashboards |
| Before/after photos | `gallery/before-after/` | Before & after |
| Shop-floor photos | `gallery/shopfloor/` | Shop-floor gallery |
| Kaizen photos | `gallery/kaizen/` | Kaizen gallery |
| Automation photos | `gallery/automation/` | Automation gallery |

## Important file rules
- Use PDF for documents. Use PNG, JPG or WebP for dashboard/gallery images.
- Use clear filenames. Website display labels are generated from filenames.
- Keep only one current resume and one current one-page profile in those folders; delete or move old versions so the page does not show duplicates.
- All files in these public folders can be viewed and downloaded by anyone.
- The dashboard image areas display image files. PDFs are shown as downloadable/openable files only in the document and project lists.
- Refresh the website after GitHub Pages finishes publishing. GitHub's public API may take a short time to reflect a new commit.

## Privacy
This repository is public. Do not upload Aadhaar, PAN, personal identifiers, signatures, home address, confidential company data, customer details or internal screenshots unless explicitly approved for public release.

## Current starter files
Your resume, generated one-page profile and Top 10 Project Summaries PDF are already placed in their respective folders. The remaining folders are ready for your own files.

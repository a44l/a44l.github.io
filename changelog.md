# Changelog

## Unreleased, 14 September 2026 complete teaching schedules

### Teaching

- Expanded the Statistical Inference schedule with the teaching periods, number of weeks, shared group code and both instructors.
- Added the complete Wednesday and Friday schedule for Linear Algebra and Analytic Geometry I, separated into the two parallel lecture groups and distinct Wednesday and Friday TP tables with their times, instructors and rooms.
- Added a prominent explanation that every Linear Algebra TP group meets on both days and that each student should attend both sessions of the group assigned in their personalised University timetable.
- Updated the Linear Algebra co-teaching line to include António Leite and standardized Eliana Duarte's visible name in both language versions.
- Kept the English and Portuguese teaching pages structurally and factually synchronized.
- Added schedule-specific table spacing and protected group and room labels from awkward line breaks on narrow screens.
- Linked the first visible mention of each named instructor to the corresponding localized FCUP SIGARRA profile in both teaching language versions.
- Synchronized the Portuguese schedule introductions and student guidance with the newer English wording while preserving the explanatory note in the source.
- Synchronized the Portuguese Wolfram Player heading and Linear Algebra Moodle access wording with the latest English version.
- Revised the complete Portuguese teaching page for natural European Portuguese rather than literal English phrasing, including the semester heading, course descriptions, schedule guidance, software instructions and Moodle labels.
- Replaced every occurrence of `diapositivos` with the standard FCUP usage `slides`, simplified the Wolfram Player explanation and improved the Portuguese email template for requesting course access.

### Research

- Marked “A Linear-Time Algorithm for Chow Decompositions” as accepted for publication in *SIAM Journal on Applied Algebra and Geometry* while retaining it in the Preprints section until final publication details are available.

### Verification

- Confirmed that all four linked SIGARRA profile destinations return HTTP 200 and identify the intended instructors.
- Built the complete site successfully with `bundle exec jekyll build --trace` and confirmed that all eight schedule tables render with their dedicated responsive class.
- Inspected the final English page at a 1440 pixel desktop viewport and inspected both language versions at a 480 pixel mobile viewport.
- Confirmed that the group labels, times, instructor names and room codes remain legible without horizontal overflow in the final narrow layout.
- Confirmed that the revised Portuguese page uses `slides` consistently, retains the meaning of the English page and renders correctly at desktop and mobile widths.
- Confirmed that the generated Publications page shows the acceptance of “A Linear-Time Algorithm for Chow Decompositions” in *SIAM Journal on Applied Algebra and Geometry*.
- `git diff --check` completed without whitespace errors in the tracked changes.

## Unreleased, 9 September 2026 teaching update

### Teaching

- Added a Markdown table with the verified Tuesday and Thursday times and the official room designation FC1 029 for the jointly taught Statistical Inference curricular units to both teaching language versions. Linked the room to its FCUP facilities record.
- Added English and Portuguese guidance for viewing the Linear Algebra slides with the free Wolfram Player, linked the official Wolfram download and installation information, and clarified that the PDF slides remain a complete alternative.
- Added the note that the first Linear Algebra lecture will cover approximately the first seven slides in both languages.

### Research and scope

- Verified the Statistical Inference times against the public course Google Site and checked the course structure against the official 2026/27 SIGARRA records.
- Did not publish Linear Algebra class times because the current SIGARRA timetable requires an authenticated U.Porto account and no public source with the exact times could be verified. These times remain pending confirmation from the teaching team.

### Verification

- Built the complete site successfully with `bundle exec jekyll build --trace` and confirmed that both Markdown tables and all Wolfram links appear in the generated HTML.
- Inspected desktop and mobile previews of the updated teaching pages. The four column schedule table, including its linked room, remains readable at a 480 pixel viewport and the Portuguese Wolfram guidance displays correctly.
- `git diff --check` completed without whitespace errors.

## Unreleased, 8 September 2026 additional update

### Research

- Added the new preprint “Border Rank=Rank for Kruskal Tensors and a Kruskal’s Theorem for Skew Decompositions,” with Benjamin Lovitz (`arXiv:2608.21562`), at the top of the Preprints table.
- Added a corresponding homepage research highlight announcing the border rank equals rank result for Kruskal tensors and the Kruskal theorem for alternating tensors.
- Generated a permanent static 300 × 300 pixel “SCAN ME” QR code for the arXiv URL through QR Code Generator, matching the style and displayed dimensions of the existing publication codes.

### Teaching and site details

- Synchronized the Portuguese teaching page with the complete current English page, including the Google Site invitation notice, Moodle introduction and R installation guidance; removed Portuguese-only details no longer present in the English version.
- Added localized subject lines and ready to send message templates to Eliana Duarte Gelvez's email links on both teaching pages.
- Linked the Statistical Inference Google Site from both teaching language versions.
- Presented Statistical Inference (`M4061`) and Statistical Inference A (`M4169`) as two distinct curricular units taught together, with separate official SIGARRA links and the supplied Moodle destinations (`id=5894` and `id=5698`); retained the Linear Algebra and Analytic Geometry I Moodle destination (`id=6538`). Applied the same structure in English and Portuguese.
- Marked all three Moodle destinations clearly as becoming available later, in both languages.
- Added a site wide 2026 copyright notice beneath the name in the profile sidebar.

### Verification

- Confirmed the title, authors, abstract, subject classifications, and 21 August 2026 submission date against the official arXiv record.
- Confirmed that the new QR asset is a 300 × 300 pixel RGB PNG and decoded it back to `https://arxiv.org/abs/2608.21562`.
- Confirmed that the official FCUP records identify Statistical Inference as `M4061` and Statistical Inference A as `M4169`, and that all three supplied Moodle destinations return HTTP 200.
- Built the complete site successfully with `bundle exec jekyll build --trace` and resolved all 74 visible local references across the six generated HTML pages.
- Inspected desktop previews of the homepage, Publications page, and both teaching languages, together with a 480 pixel wide Teaching preview. The new research entry, uniform QR sizing, course heading, Moodle labels, and copyright notice display correctly.
- `git diff --check` completed without whitespace errors.

## Unreleased — September 2026 website update

### Current position and visibility

- Replaced the time-dependent Copenhagen/Porto transition text on the homepage and profile sidebar with the current University of Porto affiliation only.
- Added a link to the official FCUP staff profile, which lists the current position as *Professor Auxiliar* in the Department of Mathematics.
- Removed Contact from the navigation, removed the former email line from the profile sidebar, and marked `contact.md` as unpublished. Its retained source text was also reduced to current University of Porto and ORCID information so it is ready for a later reactivation without the former Copenhagen affiliation.
- Removed Blog from the navigation and removed the untracked Blog index and draft posts entirely, ensuring that no unfinished Blog page or post can enter the next commit.
- Removed the broken hyperlink from “Centrum Wiskunde & Informatica (CWI)” on the homepage while preserving the visible sentence unchanged.
- Added the former QMATH Centre postdoctoral position to the same homepage section, with current official links to QMATH and Matthias Christandl.

### Teaching

- Added Teaching to the main navigation and created an English page at `teaching.md` containing only the two first-semester University of Porto courses requested by the user; older teaching remains omitted.
- Added direct links from the English course titles to the current official 2026/27 FCUP records for Statistical Inference A (M4169) and Linear Algebra and Analytic Geometry I (M1010).
- Retained the co-teacher information requested earlier: Eliana Duarte for Statistical Inference and Gabriela Chaves for Linear Algebra and Analytic Geometry I, together with concise topic summaries and the notice that more information will be available soon.
- Changed the teaching descriptions from future to present tense now that the first semester is current.
- Created a complete Portuguese version at `ensino.md`, with course-title links to the corresponding Portuguese FCUP records.
- Linked the two language versions through keyboard-accessible UK and Portuguese flag buttons in the upper-right of the teaching content. Both zoom-sharp SVGs are stored locally from the MIT-licensed `flag-icons` collection, with its license retained alongside them.
- Made the document language page-specific so the Portuguese teaching page is exposed correctly to browsers and assistive technology.

### Publications and layout

- Changed the status of “Nondefectivity of Invariant Secant Varieties” from under review to in press at *Selecta Mathematica*.
- Retained the responsive navigation behavior and strengthened menu-link contrast over bright parts of the banner image.

### Verification

- Built the complete site successfully with `bundle exec jekyll build --trace`.
- Confirmed that the clean build contains six HTML pages and generates neither `blog.html`, a `blog/` post directory, nor `contact.html`.
- Checked 74 non-commented local references across all six generated HTML pages; every local page, stylesheet, image, video, and document target resolves.
- Audited all 28 visible third-party destinations in the generated site. Twenty-five returned successful HTTP responses directly; the three remaining DOI links resolved to their correct Wiley or SIAM publisher pages, whose bot protection returned HTTP 403, and all three DOI records were independently confirmed active through Crossref.
- Confirmed in generated HTML that every menu contains only Home, CV, Publications, Talks, and Teaching; that the publication status reads “In press at Selecta Mathematica”; and that the teaching headings point to the current 2026/27 SIGARRA occurrences.
- Validated both locally stored flag files as well-formed SVG/XML.
- Inspected fresh desktop screenshots of the homepage, Publications page, and both teaching languages, plus a 480-pixel-wide homepage screenshot. The Porto-only affiliation, shortened navigation, course links, language switcher, publication status, and responsive menu all display correctly.
- `git diff --check` completed without whitespace errors.

## 4 August 2026 — CV and website refresh
Created by codex session 019fce74-bf6f-7630-b94b-88f0b1df9de5

### Affiliation and contact data

- Updated the homepage and global profile to show the upcoming appointment as Assistant Professor of Geometry (*Professor Auxiliar*) in the Department of Mathematics at the University of Porto, starting September 2026.
- Kept the University of Copenhagen/QMATH position as current through August 2026, matching the employment dates in the new CV.
- Updated the Copenhagen research-profile link, added the ORCID identifier, and fixed the Contact page title.
- Retained `atb@math.ku.dk` and the Copenhagen office as the current contact details because the new CV does not provide a Porto email address or office address. No contact data was inferred.
- Standardized the navigation label from “cv” to “CV.”

### Curriculum vitae

- Replaced `assets/pdf/cv_en.pdf` with the supplied `new-cv.pdf` dated 4 August 2026, preserving the website’s existing public CV URL.
- Replaced that file with the subsequently supplied corrected CV and used its corrected venue data for the two 2026 “Border rank = rank for Kruskal tensors” talks.
- Updated the CV page to display the document’s update date.
- Relocated the root-level input PDF instead of publishing a redundant second copy.

### Publications and preprints

- Moved “Moment-Sos and Spectral Hierarchies for Polynomial Optimization on the Sphere and Quantum de Finetti Theorems” from Preprints to Publications and updated it to its final citation: *SIAM Journal on Optimization* 36(1) (2026), 204–232, DOI `10.1137/24M1717750`.
- Replaced the former preprint “Unique Powers-of-Forms Decompositions from Simple Gram Spectrahedra” with its final publication title and citation: “On Uniqueness of Power Sum Decomposition,” *SIAM Journal on Applied Algebra and Geometry* 9(1) (2025), 211–234, DOI `10.1137/23M1573355`.
- Completed the citation and DOI link for “Gaussian Mixture Identifiability from Degree 6 Moments,” *Algebraic Statistics* 16(1) (2025), 1–28.
- Completed the volume, issue, page and DOI data for the 2023 *Bulletin of the London Mathematical Society* paper and the 2022 *Linear Algebra and its Applications* paper.
- Added the 2025 preprints “A Linear-Time Algorithm for Chow Decompositions” (`arXiv:2509.10450`) and “On Defectivity of Joins, Reducible Secants and Fröberg’s Conjecture” (`arXiv:2509.10443`).
- Corrected the title of `arXiv:2312.12335` from “Dimensions of Invariant Secant Varieties” to “Nondefectivity of Invariant Secant Varieties” and retained the CV’s “under review at Selecta Mathematica” status.
- Integrated the supplied QR-code assets for the 2025 *Algebraic Statistics* article and the moment-sos paper, and verified the destinations encoded in every publication QR code.
- Generated the two missing 2025-preprint QR codes with the requested [QR Code Generator](https://www.qr-code-generator.com/), explicitly disabled scan tracking to create permanent static codes, and matched the existing central “SCAN ME” design. The codes resolve to `arXiv:2509.10450` and `arXiv:2509.10443`.
- Normalized every publication/preprint QR source image to 300 × 300 pixels. Added one high-specificity shared rule so all eight visible codes render as true 64 × 64 pixel squares in both tables; this also prevents the site theme from squeezing the two tables to different QR widths.
- Added descriptive alternative text to publication QR-code images and removed obsolete commented-out citations.
- Simplified the publication include rendering so Jekyll produces valid HTML tables instead of displaying escaped `<table>` tags.

### Homepage research summary

- Replaced the time-sensitive 2023 “new preprint” highlight with a current overview of the 2025 Chow-decomposition and defectivity preprints.
- Updated the invariant-secants highlight to the paper’s canonical title.
- Replaced references to the now-published Gaussian-mixture and power-sum preprints with their journal DOI links, and added the 2026 moment-sos publication.

### Talks and media

- Added the September 2025 TENORS Workshop recording, “Recent advances in tensor decomposition and identifiability,” to the Talks page.
- Created `assets/videos/tenors-2025-tensor-decomposition.mp4` as a GitHub-compatible web copy. The H.264 video stream remains unchanged; the speech audio was converted from 128 kb/s stereo to 48 kb/s mono, reducing the file from 123.2 MB to 86.8 MB and bringing it below GitHub’s 100 MB file limit.
- Kept the original, untracked recording in the working directory and added its exact path to `.gitignore` and the Jekyll exclude list, so the original is not lost, accidentally committed or copied into local builds.
- Corrected the 2026 “Border rank = rank for Kruskal tensors” venue data from the replacement CV, then removed the complete “Selected recent presentations” section from the Talks page at the user’s request. The corrected complete list remains available in the downloadable CV.
- Added the supplied A1 PDF of “The contraction variety of a tensor,” generated a full-resolution 300-dpi PNG preview, and displayed it with the same centered poster-table layout as the MEGA 2024 poster. Its caption retains the full August 2025 Computations in Algebraic Geometry/ETH Zürich event sentence and includes a PDF-download link.
- Updated the 2023 Oberwolfach recording to point to the final journal article and improved the embedded-video fallback text.

### Layout

- Rebuilt the navigation as a wrapping flex layout with responsive type, spacing and an auto-growing blue header. At moderate zoom it compacts to retain one row; at narrower effective widths it wraps cleanly while keeping Contact visible inside the header.
- Removed the viewport’s `maximum-scale=1` restriction so browser/mobile zoom remains available, and added a visible keyboard-focus treatment to the navigation links.
- Pointed navigation and cross-page links to the generated `.html` files explicitly, avoiding extensionless-path 404 responses on plain static servers.
- Excluded this repository audit log from the generated public site while retaining `changelog.md` for the requested commit review.

### Research sources and scope decisions

Publication status and metadata were checked on 4 August 2026 against the following primary records:

- [SIAM Journal on Optimization article](https://epubs.siam.org/doi/10.1137/24M1717750)
- [SIAM Journal on Applied Algebra and Geometry article](https://epubs.siam.org/doi/10.1137/23M1573355)
- [Algebraic Statistics article](https://msp.org/astat/2025/16-1/astat-v16-n1-p01-s.pdf)
- [Bulletin of the London Mathematical Society article](https://londmathsoc.onlinelibrary.wiley.com/doi/10.1112/blms.12871)
- [Linear Algebra and its Applications article](https://www.sciencedirect.com/science/article/pii/S0024379522001677)
- [arXiv:2509.10450](https://arxiv.org/abs/2509.10450), [arXiv:2509.10443](https://arxiv.org/abs/2509.10443) and [arXiv:2312.12335](https://arxiv.org/abs/2312.12335)

The search also found the large-collaboration preprint [“Benchmarks in Leipzig” (arXiv:2606.05818)](https://arxiv.org/abs/2606.05818), which lists Alexander Taveira Blomenhofer as an author. It was not added to the principal research-preprint list because the newer CV intentionally omits it; it can be added later under a separate collaborative-output heading if desired.

### Verification

- `bundle exec jekyll build --trace` completed successfully with the configured GitHub Pages Architect theme.
- Checked 58 local links and media references across all five generated HTML pages; every local target resolves.
- Visually inspected the generated homepage, Publications page and Talks page at a 1440-pixel desktop viewport, plus the Publications page at a 390-pixel mobile viewport. Corrected publication-table rendering, navigation wrapping and the theme’s QR-image width override found during this review.
- Screenshot-tested the final navigation at 1440-, 720- and 480-pixel viewports, representing normal, approximately 200% zoom and a narrow/high-zoom layout. Contact remains readable inside the blue header at every tested width.
- Verified in the browser that all eight visible QR codes compute to exactly 64 × 64 pixels, confirmed that all nine QR source files are 300 × 300 pixels, decoded every QR destination after resizing, and checked both embedded MP4 files with `ffprobe`.
- Visually inspected the generated contraction-variety poster PNG and the final Talks-page screenshot alongside the existing MEGA poster.
- Confirmed that every deployable video is below GitHub’s 100 MB per-file limit and that the 123.2 MB source recording is ignored and excluded from the build.
- `git diff --check` completed without whitespace errors.

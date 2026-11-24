---
name: Academic Algorithmic Instrument
colors:
  surface: '#f8f9ff'
  surface-dim: '#cedbef'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5efff'
  surface-container-high: '#dce9fe'
  surface-container-highest: '#d6e4f8'
  on-surface: '#0f1c2b'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#253141'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#4f6075'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4fe'
  on-secondary-container: '#55667c'
  tertiary: '#006c4c'
  on-tertiary: '#ffffff'
  tertiary-container: '#52b48c'
  on-tertiary-container: '#00422d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d2e4fe'
  secondary-fixed-dim: '#b6c8e1'
  on-secondary-fixed: '#0a1d2f'
  on-secondary-fixed-variant: '#37485d'
  tertiary-fixed: '#94f6ca'
  tertiary-fixed-dim: '#78d9af'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#005139'
  background: '#f8f9ff'
  on-background: '#0f1c2b'
  surface-variant: '#d6e4f8'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

The design system is constructed as an academic, production-ready utility for algorithmic analysis and document comparison. Designed for high-clarity data presentation, it communicates rigor, institutional credibility, and functional precision without superfluous ornamentation.

The visual direction sits firmly within **Corporate / Modern Technical Minimalism**, pairing clean typographic hierarchies with utilitarian layouts reminiscent of scientific consoles and computational workbenches. The interface avoids speculative trends such as heavy glassmorphism, aggressive neomorphism, or ambient floating glows. Instead, it relies on strict grid boundaries, crisp dividing borders, tactile data tables, and high-readability metrics. Every element feels inspectable, reproducible, and deliberately built for developers, evaluators, and academic reviewers working within standard web standards (HTML5, semantic CSS3, Flask/Jinja templates).

## Colors

The palette establishes an authoritative engineering environment grounded in naval slates and balanced by functional data emeralds.

- **Primary Emerald (`#10B981`) & Dark Green (`#087F5B`)**: Applied purposefully for verified metrics, matching clusters, high-similarity scores, active processing states, and primary CTAs.
- **Deep Navy (`#102235`) & Secondary Navy (`#173047`)**: Structures the global utility header, navigation chrome, terminal blocks, and high-density metric labels.
- **Highlights (`#D9FBE8` Mint, `#FFF2C6` Warm Amber)**: Used exclusively for inline syntactic match highlighting, substring overlaps, warning flags, and match badges.
- **Neutrals & Surfaces**: Main canvas rests on `#F7F9FA`, card containers on crisp `#FFFFFF`, bounded by `#E0E7EC` structural lines. Typography leverages `#172433` for high-contrast legible prose, softened by `#637184` for metadata, timestamps, and parameter labels.

## Typography

Typography prioritizes legibility, systematic scanability, and data density. **Inter** handles narrative structure, UI chrome, table entries, and inputs with neutral geometric precision.

**JetBrains Mono** is introduced for all computational readouts: algorithm performance metrics (e.g., $O(V + E)$, Levenshtein distances, Jaccard indices, runtime in ms), document line numbers, token hashes, and raw string analysis. Letter-spacing is standard for body text, while monospaced labels use slightly relaxed tracking for rapid scanning across side-by-side file comparisons.

## Layout & Spacing

The layout is structured on a 12-column fixed/contained grid maxing out at `1280px` on desktop, ensuring line lengths remain optimal for dual-document side-by-side inspection panes.

- **Desktop (>= 1024px)**: Dual input panes split symmetrically (6 columns each) or an 8/4 split for comparison workbench vs. metric telemetry. Outer margins are anchored at `2rem` (`32px`) with `1.25rem` (`20px`) gutters.
- **Tablet (768px - 1023px)**: Flexible collapse allowing tabs or stacked viewports with `1.5rem` margins and `1rem` gutters.
- **Mobile (< 768px)**: Strict vertical single-column stack. Side-by-side inspections convert to a segmented tabbed toggle ("Doc A" / "Doc B" / "Diff Report"). Canvas margin sits at `1rem`.

Spacing operates strictly on a base-4/8 structural cadence (`4px`, `8px`, `16px`, `24px`, `36px`) to ensure form fields, tables, and inspection panes align seamlessly without fractional jitter.

## Elevation & Depth

Visual hierarchy is communicated through **low-contrast outlines, micro-borders, and tonal framing**, eschewing high-blur multi-layered drop shadows.

- **Base Cards & Panels**: Outlined with a single `1px solid #E0E7EC` border against `#F7F9FA`. Elevation shadow is minimal: `0 1px 3px rgba(16, 34, 53, 0.05)`.
- **Active / Focused Containers**: Outlines transition to `#10B981` (primary focus) or `#173047` (selected pane) with a sharp, crisp `0 0 0 1px` ring.
- **Overlays & Modals**: Used strictly for configuration dialogs or algorithm parameter sheets. Shadow: `0 8px 24px -4px rgba(16, 34, 53, 0.12)`.
- **Interactive Hover**: Shifts border color from `#E0E7EC` to `#637184` with an incremental lift of `0 2px 6px rgba(16, 34, 53, 0.08)`. No motion skewing or scaling transforms.

## Shapes

The shape system is strictly controlled at **Soft (`roundedness: 1`)**, translating to:
- Default elements (buttons, inputs, cards, notification banners): `6px` (`0.375rem`).
- Large outer viewports, comparison split panes, and file dropzones (`rounded-lg`): `8px` (`0.5rem`).
- Monospaced tags, badge indicators, and line-item counters: `4px` (`0.25rem`).

Pill shapes and circular controls are excluded, preserving the aesthetic of a calibrated technical instrument.

## Components

### Buttons
- **Primary Action (Run Analysis / Compare)**: Background `#10B981`, text `#FFFFFF`, border `1px solid #087F5B`. Hover: `#087F5B`. Focus: `2px solid #D9FBE8`.
- **Secondary Action (Clear, Upload, Sample Load)**: Background `#FFFFFF`, text `#172433`, border `1px solid #E0E7EC`. Hover: `#F7F9FA` with border `#637184`.
- **Header Actions**: Background `#173047`, text `#FFFFFF`, border `1px solid rgba(255,255,255,0.1)`.

### Form & Input Fields
- **Document Text Areas & Inputs**: Background `#FFFFFF`, border `1px solid #E0E7EC`, radius `6px`, padding `12px 14px`, text `#172433`. Placeholder in `#637184`.
- **Monospaced Input Option**: When viewing preprocessed token streams, font toggles to `JetBrains Mono` at `13px`.
- **Dropzone Targets**: Dashed border `2px dashed #E0E7EC`, background `#F7F9FA`. On drag hover: background `#D9FBE8` with border `#10B981`.

### Data Comparison Panes & Token Diffing
- **Identical Match Snippets**: Background `#D9FBE8`, border-bottom `1px solid #10B981`, text `#172433`.
- **Approximate / Heuristic Match**: Background `#FFF2C6`, border-bottom `1px solid #E5B800`, text `#172433`.
- **Line Numbers**: Width `44px`, background `#F7F9FA`, text `#637184`, right border `1px solid #E0E7EC`, font `JetBrains Mono 11px`.

### Tables (Algorithm Telemetry & File Lists)
- **Header Row**: Background `#F7F9FA`, bottom border `2px solid #E0E7EC`, font `Inter` 12px semibold, uppercase tracking.
- **Rows**: Alternating or white background, border-bottom `1px solid #E0E7EC`, padding `10px 14px`.
- **Metrics Cells**: Monospaced right-aligned numerical data for execution time, token count, and similarity percentage.

### Badges, Metric Chips & Pills
- **Match Metric Badge**: Radius `4px`, padding `2px 8px`, font `JetBrains Mono` 11px bold. High similarity uses `#D9FBE8` background with `#087F5B` text. Moderate uses `#FFF2C6` background with `#8F6B00` text.
- **Algorithm Tags**: Flat `#F7F9FA` container with `1px solid #E0E7EC`, text `#637184`.

### Checkboxes & Segmented Controls
- **Checkboxes**: Standard square with `3px` radius, border `1.5px solid #637184`. When checked: background `#10B981`, border `#10B981`, white checkmark.
- **Algorithm Mode Selector**: Segmented pill container background `#E0E7EC`, padding `2px`, internal toggle button background `#FFFFFF` with active text `#102235`.
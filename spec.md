# ResumeForge

## Current State
App has 8 resume templates (4 ATS-free: classic, modern-clean, minimalist, professional; 4 premium: sidebar, creative, executive, elegant). Templates use `width: 794px, minHeight: 1123px` with inline styles. Several issues exist: inconsistent margins, compressed text, missing proper section spacing, dates not properly aligned, sections bleed together, no overflow/multi-page awareness, and the preview scale does not guarantee pixel-perfect PDF match.

## Requested Changes (Diff)

### Add
- A shared `ResumePageWrapper` or consistent A4 page style (width 794px, padding: 56px 64px for full-page templates, adjusted for sidebar templates)
- Global print/page CSS via `@page` and `print` media query so PDF output matches preview exactly
- Proper multi-page overflow: `overflow-wrap: break-word`, no fixed heights that truncate

### Modify
- All 8 templates: increase line-height to 1.6-1.7, font-size to 11-12px body, improve section spacing (marginBottom 18-24px per section)
- Classic: increase padding to 56px 64px, section spacing 20px, line-height 1.65
- ModernClean: padding 52px 60px already fine, fix section gap to 20px
- Minimalist: padding 60px 72px, line-height 1.75
- Professional: header padding normalize, content padding 32px 52px, section gap 20px
- Sidebar: main content padding 44px 40px, section gap 18px, sidebar padding 40px 28px
- Creative: header padding 40px 52px, content padding 32px 52px, section gap 20px
- Executive: header padding 36px 56px, content padding 32px 56px, section gap 20px
- Elegant: sidebar padding 44px 24px, main padding 44px 40px, section gap 20px
- All experience entries: marginBottom 14-16px, ul li marginBottom 3px
- All date spans: use flexShrink 0, whiteSpace nowrap, minWidth to prevent wrapping
- Education rows: ensure flexWrap is handled, dates right-aligned properly
- Remove `minHeight: 1123px` and replace with `minHeight: auto` + page-break-inside avoid on sections for proper multi-page

### Remove
- Nothing removed

## Implementation Plan
1. Update all 8 template files with corrected padding, line-height, section spacing, date alignment, overflow-safe styles
2. In LivePreview, ensure the scale transform container height dynamically accommodates content taller than 1123px (remove fixed height constraint)
3. Add a `<style>` tag or global CSS for `@page { size: A4; margin: 0; }` and `@media print` so Download PDF matches preview

# Performance Optimization Plan (P0 & P1)

This plan implements high-priority performance optimizations identified in the latest audit. It focuses on reducing the initial payload (currently ~22MB) and optimizing the initialization of heavy 3D assets, without changing the visual design.

## User Review Required

> [!IMPORTANT]
> I will be using Unsplash's dynamic image API to serve optimized resolutions based on the device. No visual design changes will occur.

## Proposed Changes

### P0: Responsive Image Optimization
Optimize approximately 12MB of high-resolution imagery by implementing `srcSet` and resolution capping.

- **Global Image Optimization Helper**: Create a utility to generate optimized Unsplash/Pexels URLs with specific widths and formats (WebP).
- **Hero Accordion**: Refactor `LandingAccordionItem` to use calculated `srcSet` based on active/inactive states.
- **Team Section**: Update `CardFlip` to load smaller team portraits (300px-400px) instead of full-size originals.
- **Service Pages**: Update `ServiceParallaxContent` to use responsive backgrounds.
- **LCP Optimization**: Ensure above-the-fold images (first hero accordion item) are preloaded/eager-loaded without lazy-loading.

### P1: Spline Viewport-Based Loading
Optimize the 4MB Spline runtime and heavy main-thread work by deferring initialization until the user is near the scene.

- **IntersectionObserver Implementation**: Replace the current timer-based (1s-3s) loading in `SplineScene.tsx` with a viewport trigger.
- **Optimized Margin**: Use a `rootMargin` of `400px` to start loading Spline slightly before it enters the viewport.
- **Placeholder Management**: Maintain the existing background gradient/blur placeholder to prevent layout shifts.
- **Single Initialization**: Ensure the scene loads exactly once and persists to avoid flicker on scroll.

## Technical Details

- **Responsive Breakpoints**:
  - Mobile: 400px-600px
  - Tablet: 768px-900px
  - Desktop: 1200px-1440px
- **Lazy Loading**: Native `loading="lazy"` and `decoding="async"` for all below-the-fold assets.
- **IntersectionObserver**: Use React `useEffect` and `useRef` for robust intersection detection.

## Verification Plan

- **Bundle Analysis**: Compare total transferred bytes before and after.
- **LCP/FCP Check**: Verify that initial paint metrics remain stable or improve.
- **Visual Regression**: Manual check of all 6 service pages, home, and about pages to ensure design parity.
- **Console Audit**: Check for hydration or Spline initialization errors.

# Navigation Performance and Page Load Optimization Plan

Implement route-level code splitting, asset prioritization, and intelligent prefetching to ensure fast navigation while preserving the existing design.

## User Review Required

> [!IMPORTANT]
> This plan uses route-level lazy loading which may cause a brief flash of a loading state (skeleton) during the very first transition to a new page while the code is downloaded. Subsequent transitions will be immediate.

- **Design Preservation**: All Spline 3D scenes, parallax effects, and animations will be kept.
- **Loading Experience**: We will use minimal skeletons only where necessary to prevent layout shifts.

## Proposed Changes

### 1. Route-Level Code Splitting
- Convert all content routes to use lazy loading for their page components.
- Move heavy page-specific imports from the route definition files to the components themselves or use dynamic `lazy()` imports.

### 2. Navigation & Prefetching
- Update `Navbar.tsx` to use TanStack Router's `preload` capabilities.
- Implement `preload: 'intent'` for all main navigation links (preloads when user hovers).

### 3. Global Component Optimization
- **ChatBot**: Defer initialization until the main thread is idle or after initial page render to prevent blocking the main bundle.
- **Spline Scenes**: Further optimize `SplineScene.tsx` to ensure it never blocks the primary navigation transition.

### 4. Image & Asset Priority
- Implement `loading="lazy"` for all below-the-fold images in `AboutUsPage.tsx` and service pages.
- Ensure critical hero images are loaded with higher priority.

## Technical Details

### Route Optimization
- Modify files in `src/routes/` to use lazy imports for components in `src/pages/` and `src/components/`.
- This reduces the `main.js` bundle size significantly as each page gets its own small JS chunk.

### Prefetching Strategy
- Navbar links will be updated: `<Link to="/about" preload="intent">`.
- This fetches the JS chunk for the next page as soon as the user hovers over the link, making the actual click feel instantaneous.

### Deferred ChatBot
- Wrap the `ChatBot` component in `src/routes/__root.tsx` with a `Suspense` boundary and potentially a custom `Deferred` wrapper to ensure it doesn't execute its logic during the critical initial render path.

## Performance Verification
- Measure bundle size reduction.
- Verify "instant" feel of navigation in the preview.
- Ensure no broken animations or parallax effects.

# Plan - Fix Navigation Transitions and Flashing

Fix the brief blue/blank screen flash during client-side navigation between optimized route-level code-split pages while preserving performance gains.

## Diagnosis
The issue is caused by the interaction between TanStack Router and `React.lazy`. When a user navigates to a lazy-loaded route:
1. TanStack Router resolves the route definition.
2. The route's `component` (a `React.lazy` wrapper) is rendered.
3. React triggers a `Suspense` boundary because the lazy component chunk isn't loaded yet.
4. Since the `Suspense` boundary in `__root.tsx` is outside the main content area (currently only wrapping the chatbot), the top-level route rendering falls back to whatever the browser/router defaults to, or causes a layout shift/flash as the new route mounts.

## Proposed Changes

### 1. Optimize Route Definitions
Move from `React.lazy` component wrappers to TanStack Router's built-in `loader` or `component` preloading capabilities where possible, or wrap the main content in a visual-safe `Suspense` boundary.

- **Refactor Lazy Imports**: Instead of `React.lazy` inside the route file, use `component: () => import('@/pages/X').then(m => ({ default: m.default }))` or similar patterns that TanStack Router understands for preloading, OR ensure the `Suspense` fallback is the current page layout to prevent blanking.

### 2. Implement Seamless Suspense Fallback
- Modify `src/routes/__root.tsx` to wrap the main `<Outlet />` in a `<Suspense>` boundary with a fallback that matches the site's base aesthetic (the dark gradient background) to prevent white/blue flashes.
- Use a "stable shell" approach where the background remains visible while the content transitions.

### 3. Verify Preloading
- Ensure `preload="intent"` in `Navbar.tsx` is actually triggering the chunk download.
- Add route-level preloading for critical pages to ensure chunks are ready before the click.

### 4. Technical Steps

#### `src/routes/__root.tsx`
- Wrap `<Outlet />` in `<Suspense fallback={<div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800" />} >`.

#### Route Files (e.g., `src/routes/about.tsx`)
- Keep the code-splitting but ensure TanStack Router knows it's a lazy component.
- The current implementation `component: React.lazy(...)` is correct but needs a local `Suspense` or a better root `Suspense`.

#### `src/router.tsx`
- Adjust `defaultPreloadStaleTime` if needed to ensure preloaded routes stay in memory.

## Verification Plan

### Automated Tests
- Run Playwright navigation tests to ensure transitions are smooth and no "blank" states are detected between steps.

### Manual Verification
1. Navigate between all primary routes (Home, About, Blog, Services).
2. Check first-visit vs. cached-visit transitions.
3. Verify on mobile and desktop.
4. Check for console errors or hydration mismatches.

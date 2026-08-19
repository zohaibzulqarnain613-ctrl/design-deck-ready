# Plan - Enhance Scroll Restoration for Kinetic Navigation

The goal is to ensure correct scroll behavior when navigating via the mobile kinetic menu, supporting both link clicks and back/forward browser navigation. Currently, the site uses a global `ScrollToTop` component that forces a reset to (0,0) on every pathname change, which interferes with TanStack Router's built-in scroll restoration.

## Proposed Changes

### 1. Remove manual ScrollToTop
- Remove the `ScrollToTop` component and its usage in `src/routes/__root.tsx`.
- This allows TanStack Router's `scrollRestoration: true` (already enabled in `src/router.tsx`) to manage position memory for back/forward navigation.

### 2. Update Navbar Navigation logic
- In `src/components/ui/sterling-gate-kinetic-navigation.tsx`:
    - Refine the `handleContactClick` to ensure it correctly scrolls to the `#contact` section even when navigating from other pages.
    - Ensure all `Link` components in the kinetic menu correctly trigger a "scroll to top" for fresh page loads while letting the router handle restoration for history navigation.

### 3. Verify Router Configuration
- Double-check `src/router.tsx` to ensure `scrollRestoration` is active (it is currently set to `true`).

## Technical Details

- **File**: `src/routes/__root.tsx`
    - Delete `ScrollToTop` function.
    - Remove `<ScrollToTop />` from `RootComponent`.
- **File**: `src/components/ui/sterling-gate-kinetic-navigation.tsx`
    - Update navigation handlers to be more robust.

## User Review Required

> [!NOTE]
> Removing `ScrollToTop` is essential for enabling the router's automatic scroll restoration. Without this change, clicking "back" would always land you at the top of the previous page instead of where you were.

# Speed Up Homepage Robot

## Goal
Make the existing homepage robot begin loading immediately and appear sooner without changing its design, placement, animation, or behavior.

## Changes
- Remove the viewport observer delay from the above-the-fold robot so its animation starts loading as soon as the homepage opens.
- Add homepage-only connection hints for the Spline asset host to reduce connection setup time.
- Keep the current robot scene, fallback, dimensions, styling, and error handling unchanged.
- Verify desktop and mobile rendering, robot network timing, browser back behavior, type safety, and the production build.

## Technical details
- Add an eager-loading option to the shared Spline scene wrapper while retaining deferred loading as the default for any future below-the-fold scenes.
- Enable eager loading only for the homepage robot.
- Scope resource hints to the homepage route rather than loading them sitewide.

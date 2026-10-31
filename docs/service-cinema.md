# Services scroll experience

The homepage replaces the accordion with one immersive scene containing five service buttons: Development, Design, Integrations, Migration and Growth. `lib/services.ts` still owns all names, routes, counts and artwork assignments. No service or enquiry routes change.

## Behaviour

- On screens wider than 900px and at least 700px tall, GSAP holds the stage 100px below the viewport top. Scrolling travels through five equal intervals over approximately 2.2 viewport heights (minimum 1200px). Normal scrolling continues after the last interval.
- Active artwork crossfades over 0.65 seconds. The image group travels gently from +5% to −5% with a 0.7 scrub; incoming artwork settles from 1.06 to 1 scale. The service label, count, description and link follow the active scene.
- Mouse hover previews a scene; leaving returns to the scroll-selected scene. Clicking seeks the centre of that service's interval through the existing Lenis controller, or native scrolling when it is unavailable. The chosen scene stays selected while the page travels there. Wheel, touch or page-navigation keys interrupt that selection journey.
- Narrow or short viewports keep normal document flow, without pinning or a tall spacer. Tapping switches scenes in place. Page scrolling still advances scenes through the section, with a smaller background movement.
- Reduced motion disables pinning, scroll-driven changes, settling and crossfades. The five service choices and links still work in place.

## Layout and assets

Use the existing near-black surface, paper text, lime active marker and Unbounded lettering. The reference supplies the layout and interaction direction; the imagery is Claraverse's existing sculpture artwork, enlarged behind the menu. A common dark scrim keeps copy readable. There is no outer card or oversized arrow.

The five existing WebPs total 487 KiB on disk, are loaded lazily, and need no WebGL renderer or additional animation dependency. Assets are served directly so switching does not wait for first-time image transformation. Their dimensions are declared. The shared homepage section rhythm still separates this scene from the brand wall and footer.

## Accessibility and verification

The service selector uses vertical tabs and a labelled panel. Arrow keys, Home and End navigate; Enter or Space selects. Buttons are at least 52px high, with focus outlines. Decorative images, counters and progress marks are hidden from assistive technology. Descriptions and service links remain ordinary HTML. A service overview link remains available without JavaScript.

`node --experimental-strip-types scripts/check-service-scene.mjs` checks scroll/reverse selection, hover restore, stable click journeys, user interruption and touch selection. The catalog check covers the five categories, all 30 offerings, assets and routes. Build and HTTP checks do not establish actual browser appearance, touch behaviour or animation smoothness; those still need visual review in the user's preview browser.

# Claraverse performance audit — 26 October 2026

The reported warning comes from Grammarly injecting `data-new-gr-c-s-check-loaded`
and `data-gr-ext-installed` into the body before React hydrates it. The layout now
uses `suppressHydrationWarning` on **body only**, as a shallow exception for these
external attributes. Application descendants remain checked and server rendering
is preserved. The old warning can remain visible until a page reload.

## Measured results

| Item | Before | After | Method |
| --- | ---: | ---: | --- |
| Desktop geography preparation | 175.29 ms | 0.22 ms | Median of five local CPU runs |
| Mobile-density geography preparation | 120.27 ms | 0.1 ms | Same machine, mobile sampling density |
| Main Three.js chunks, raw | 712,387 B | 518,639 B | Two shared core/renderer files |
| Main Three.js chunks, gzip | 179,964 B | 128,542 B | 28.6% smaller |
| Portfolio imagery | 4,461,437 B | 292,116 B | Same two scenes, WebP quality 85; 93.5% smaller |
| Renderable scene groups | 132 | 10 | Structural upper bound, not measured GPU calls |

The CPU comparison covers the former polygon-scanning/land-point preparation
step, not the entire Three.js startup or page load. Geometry density remains
9,925 desktop and 5,201 mobile land points. Quantization was checked against every
original point and weight. All 36 symbolic stores, 60 locations and 120 routes
remain intact.

## Loading and rendering changes

- Natural Earth sampling runs ahead of time via `scripts/generate-globe-points.mjs`.
  The browser decodes versioned packed samples instead of scanning polygons.
- A server-rendered SVG globe preview (61,845 B raw / 21,621 B gzip)
  stays visible until the first real WebGL frame. Geography is preloaded with
  mobile/desktop media queries and cache headers.
- Desktop geography is 79,408 B raw versus the former 179,824 B JSON. Its gzip
  size is **78,954 B versus 62,669 B**: an explicit bandwidth-for-CPU tradeoff.
  Mobile packed geography is 41,503 B gzip. Do not describe the desktop packed
  data itself as smaller over a compressed connection.
- The grid and storefront glyphs are batched; rings are instanced. Invisible
  hit targets no longer render, and ray selection is verified with installed Three.
- Inactive order trails skip interpolation. A single reusable sampler replaces
  per-flight frame closures. Hidden/off-screen scenes stop animation callbacks.
- Frame scheduling caps are 24 fps in the intro, 45 on desktop when active,
  and 30 on mobile. These are configured limits, **not observed frame rates**.
- Inter and Unbounded are self-hosted and preloaded at weights 400–500. The
  Google stylesheet/DNS request chain is removed. Font licenses and source URLs
  are preserved in `public/fonts/` and `docs/font-sources.json`.
- Portfolio originals remain available; references now use optimized WebP copies.
- Abort, renderer, scene, observer and event-listener cleanup handles remounts and
  partial failures. Diagnostics expose `data-init-ms` and `data-draw-calls` on the
  globe container; regular diagnostics update twice per second.

## Verification and limits

- Production build and TypeScript checks passed for all 30 generated routes.
- Packed-data validation, precision, route finiteness, market focus at five screen
  widths, network counts and hidden-marker ray selection passed.
- Production HTTP checks passed for SSR content, six service pages, quote entry,
  both font preloads, globe data, cache headers, poster and WebP imagery.
- `scripts/audit-globe.mjs` and `scripts/audit-http.py` reproduce the measurements;
  raw results are in the adjacent JSON files. HTTP timings are local server-header
  timings only, not browser page performance.
- Browser automation for localhost was unavailable under the existing URL access
  restriction. No Lighthouse score, LCP, INP, CLS, end-to-end first-frame time or
  real GPU/FPS claim is made. Shader appearance, interactive scroll and real-device
  frame pacing still need a browser run. The local development server also adds
  cold compilation overhead that is absent from the production build.

References: [React hydration guidance](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors),
[Three.js instancing](https://threejs.org/docs/#api/en/objects/InstancedMesh).

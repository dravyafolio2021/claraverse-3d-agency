# Globe interaction

The globe is one scene inside the page, with no separate scrolling area. The old
one-pixel hero progress track has been removed from the markup and stylesheet.

## Direct manipulation

`GlobeScene` projects a circular interaction target over the visible sphere. It
moves and resizes with the orthographic globe, including regional zoom and pan.
The canvas is presentation only; the dedicated target owns pointer capture and
keyboard focus. Empty space around the sphere passes through to the page.

- Primary mouse drag: turn horizontally and tilt vertically.
- Shift-drag, right-drag or middle-drag: pan within bounded horizontal/vertical limits.
- Touch: sideways swipe turns the globe; `touch-action: pan-y` preserves vertical
  page scrolling. Touch cancellation ends the drag without residual momentum.
- Arrow keys: turn and tilt the focused globe. Home recentres the selected market.
- Market chips: focus the region by the shortest yaw path; existing zoom remains.
- Reset view: return to the global view and clear pan/momentum.

Interaction enables once the travelling globe is visible (hero progress 0.4),
rather than waiting for the later controls phase. Invisible intro links are hidden
at the same threshold. Only primary pointer gestures begin a drag. Pointer release,
cancellation, lost capture and scene cleanup all end the gesture safely.

## Page-linked and automatic motion

`lib/globe-interaction.ts` owns motion state independently of Three.js. Page
progress adds a gentle 2.1-radian turn across the full hero journey; reverse
scrolling reverses that contribution. A regional close-up uses a smaller
0.45-radian contribution to keep the selected market readable.

During a drag, scroll progress is consumed without changing the manual target,
so release cannot replay old scroll movement. Release momentum decays quickly;
tilt is bounded before reaching the poles. Market focus and reset clear momentum
and pan, reset the scroll baseline, and select the nearest equivalent yaw.
Idle drift waits after manual input. Pausing order flow stops automatic drift and
traffic; explicit drag, keyboard and scroll inputs remain under user control.
Reduced motion removes automatic drift, page-driven rotation and release inertia.

## Rendering and verification

Existing batched geography, routes and symbolic store hubs remain unchanged. The
scene still stops rendering when offscreen or the document is hidden. Normal frame
caps remain; only active dragging uses 60 fps desktop / 45 fps mobile caps. These
are configured caps, not measured device frame rates.

Run `node --experimental-strip-types scripts/check-globe-interaction.mjs` for
scroll/reverse behaviour, drag priority, touch intent, pan bounds, release decay,
pole constraints, nearest-angle focus, reduced motion, late loading and the
orthographic hit-target mapping at three viewport sizes. Type/build and HTTP checks
are separate from browser visual/gesture verification, which is unavailable in
this session.

The network remains an illustrative explanation of global commerce operations.
The new global-ambition copy makes no client, scale or industry-leadership claim.

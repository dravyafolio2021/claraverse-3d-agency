# Working on Claraverse

The canonical checkout is `/Users/shrutian/Desktop/Claraverse`.
The existing repository is `dravyafolio2021/claraverse-3d-agency`.

## Branches and commits

- Keep `main` as the reviewed baseline. Its prior history is retained.
- Work on `feat/<description>` or `fix/<description>` branches.
- Commit one coherent change at a time, describing the resulting behavior.
- Review the diff and run `npm run typecheck`, `npm run lint:site` and `npm run build` before merging.
- Use a pull request when sharing a branch. Include the change, verification, and any visual verification limits.
- Do not commit `.env*`, `node_modules`, generated output, local documents, credentials or client data.

The quality workflow checks pull requests and can be run manually. It does not deploy.
Remote hosting integrations may react to a push independently; publishing a branch or merging is a separate action from local development.

## Local preview

Use Node.js 22 and `npm ci`, then `npm run dev -- --port 3000`.
Keep one server for this checkout. Verify the process directory before restarting it; an older Documents copy must not own the current preview port.
Next.js 16 isolates development output under `.next/dev`, so the production build can be checked while the preview stays running.

## Globe behavior

- Scroll changes the globe's container size and centre position, never its orientation.
- One Three.js group owns all yaw/pitch. Automatic rotation, cursor movement and drag share the same persistent refs. Do not reintroduce camera OrbitControls or a declarative Euler rotation prop on that group.
- Bound pitch to prevent pole flips. Ease pointer input; do not rotate toward whichever order is active.
- The network is an illustration, with 42 domestic and cross-market routes across 36 locations. Flights have staggered starts, varied durations and arrival pulses. Do not describe it as a live client-order feed.
- Use shallow spherical paths. Keep cards and floating order labels off the globe.
- The Shopify bag is a background graphic behind the globe, never on its surface.
- Reduced-motion users start paused. Keep keyboard rotation, play/pause, zoom, touch scrolling and a static fallback available.
- Keep the project local until the user requests publication.

`npm run lint` also scans the imported UI component library and currently reports pre-existing accessibility/compiler issues there. `lint:site` checks all authored pages, shared site components and library code without suppressing rules.

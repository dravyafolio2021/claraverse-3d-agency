# Studio figures

Current public figures, following the owner’s industry-focus clarification on 2026-11-01:

- Projects completed: **24+**
- Industry specialisms: **4** — Beauty, Fashion, Wellness and Petcare
- Client satisfaction: **92%**
- Years of experience: **4**

`lib/studio-metrics.ts` is the content source. Projects, satisfaction and experience were supplied on 2026-10-30. The previous 5+ industries-served figure has been replaced by the four confirmed current specialisms; this counts focus areas rather than reinterpreting historical delivery. Figures are supplied by the owner; no independent verification or additional measurement methodology is implied. The pending-figures note is only shown when a value is missing, so it no longer appears for this set.

Numbers count up once when the section enters the viewport. Each has a 1.65-second ease-out, a 0.12-second stagger and a small 10px lift/fade. Suffixes stay fixed. Updates use GSAP's numeric state without React rendering every frame. The accessible text always contains the final value. No-JavaScript and reduced-motion layouts show the final figures immediately. Scoped cleanup restores the final values and removes animation styles.

The existing four-column desktop and two-column mobile layouts are retained.

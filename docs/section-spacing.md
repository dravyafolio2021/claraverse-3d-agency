# Homepage section spacing

The homepage uses one shared rhythm on `.home-sections`, rather than adding the bottom padding of one section to the top padding of the next.

| Viewport | Between sections | Heading to content | Smaller content groups | After hero |
| --- | --- | --- | --- | --- |
| Above 1100px | 144–192px, fluid | 56–80px, fluid | 40px | 56–88px, fluid |
| 701–1100px | 112px | 56px | 32px | 64px |
| 421–700px | 80px | 40px | 28px | 44px |
| Up to 420px | 72px | 36px | 28px | 40px |

The shared section gap covers the client marquee, studio statement, counters, Featured Stores, brand wall, services, project bento, client reviews, FAQ and footer. Direct homepage sections keep their existing horizontal gutters and maximum widths. Their vertical padding is reset within this wrapper so gaps do not accumulate.

Featured Stores, the brand-wall introduction, project bento and client reviews use the heading-to-content interval. Portfolio closing links use the smaller content interval. The immersive services stage has its own internal layout; the shared section gap still separates it from the brand wall and footer. FAQ columns share the heading interval when stacked on mobile. Footer interior spacing is independent of its preceding section gap.

Do not add empty spacer elements, fixed section heights or minimum heights to create separation. Interior pages retain their existing spacing. The hero scroll transition and heading animation timing are unchanged.

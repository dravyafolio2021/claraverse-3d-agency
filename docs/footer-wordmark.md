# Footer wordmark

The shared footer ends with an oversized, lowercase `claraverse` wordmark, inspired by the supplied reference. It reuses the hero/header's Unbounded weight 400, paper colour and −0.082em tracking. There is no trailing dot. The descriptor `Shopify Studio` remains in the information row above it, replacing the old duplicate compact wordmark.

`FooterWordmark` is a single home link with a clear accessible name. The visible text is hidden from assistive technology to avoid duplicate announcements. No reference contact details, social destinations or certifications were copied.

CSS provides a fluid initial size. A scoped ResizeObserver then measures the natural word width and adjusts only font size to fit the available container, retaining uniform glyph proportions with a small edge allowance. The measurement runs again after local fonts are ready. Height-only observer changes are ignored to avoid resize loops. Observer and late font callbacks are cleaned up on unmount. No animation, image file or additional dependency is needed.

The link remains visible without JavaScript. Desktop and mobile have appropriate space above the wordmark and a small bottom inset. The homepage section rhythm still controls the space before the footer. The shared footer is used on interior pages as well.

Build/type and HTTP checks verify integration and routes. Actual browser appearance remains a visual review task.

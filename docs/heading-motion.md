# Claraverse heading motion

`Heading` is the shared treatment for visible page, section and editorial headings.
The default is now a scroll-guided word reveal, matching the statement after the
client marquee: every word is visible in muted grey and brightens to full contrast
in reading order. Typography retains the size appropriate to each page or section.

```tsx
<Heading>connected thinking. considered commerce.</Heading>
<Heading>the right foundation.<br/><span>the right details.</span></Heading>
<Heading as="h1" mode="load">your world. thoughtfully connected.</Heading>
<Heading as="h3">a smaller editorial heading.</Heading>
```

## Defaults and timing

- `readingGuide=true`: animate word wrappers from opacity 0.36 to 1.
- `pace="relaxed"`: start at top 82%, finish at top 0%, with a 0.45-second scrub catch-up.
- Each word uses linear easing, 0.22 timeline-second duration and 0.18 stagger,
  creating a small overlap without translating, scaling or masking the text.
- Page openings keep `mode="load"` for a word entrance on arrival.
- The globe keeps `mode="hero"` so the word trail follows the sticky section's
  visible phase rather than the heading's unhelpful document position.
- The complete sentence is available as the accessible heading label. Visual
  words are hidden from duplicate screen-reader announcements.
- Reduced motion and no JavaScript show the complete heading at full contrast.
- MotionReveal skips groups containing Heading so a second fade does not compete.

Word-mode wrappers contain native text, preserving font kerning and reducing the
number of DOM nodes. `readingGuide={false}` is an explicit legacy character option,
not the default. Native service accordion buttons, navigation labels, decorative
wordmarks and screen-reader-only headings are not scroll-faded controls.

## Stable layout and refresh

Opacity endpoints and word order stay fixed. Do not use `invalidateOnRefresh`:
rebuilding a partially completed stagger can leave later words bright ahead of the
reading trail. ScrollTrigger recalculates start/end positions without rebuilding
the animation. Every media-query context and tween cleans up on unmount.

Do not set a nonzero inherited `text-indent` on the animated heading: inline-block
words and characters can each receive the indent. The About statement uses one
empty inline pseudo-element before the first word. Word/character wrappers reset
indent to zero; mobile removes the spacer and keeps normal paragraph wrapping.

## Gentle wheel smoothing

SmoothScroll uses Lenis 1.3.27 only on fine-pointer, hover-capable devices without
reduced motion. A 0.94 wheel multiplier and 0.16 interpolation keep the effect
modest. Touch scrolling stays native. Dropdowns and form controls retain internal
scrolling. Anchor handling retains CSS offsets. The instance shares GSAP's ticker
and notifies ScrollTrigger; callbacks and listeners clean up on route changes,
preference changes and unmount. The package loads dynamically only when eligible.

Reference for scroll integration: https://github.com/darkroomengineering/lenis

## Studio figures

StudioCounters follows the About statement. The owner will supply verified agency
metrics in lib/studio-metrics.ts. Pending null values display an em dash and a
note; no count-up or plus/percentage sign is shown for an unverified value. Supplied
numeric values count once into view over 1.25 seconds. Accessible values stay stable
and reduced motion shows final numbers. Desktop has four columns, mobile has two.

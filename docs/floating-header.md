# Page-aligned sticky navigation

Updated 2026-11-01 after the owner rejected the floating bar and separate rounded dropdown boxes.

## One shared header

`app/layout.tsx` renders `SiteHeader` once, before the page content. `PageShell` and `Hero` no longer own separate headers. The header uses native `position: sticky; top: 0` and is not constrained by the homepage hero's parent. It remains available through the full document, including the footer.

The content aligns to the same 1760px cap and 24–84px gutters as interior pages. The bar is 80px tall on desktop and 68px on phones. That height stays constant while scrolling, preventing layout jumps. There is no floating outer margin, rounded frame, width-expansion animation or direction-based hiding.

At the top, the surface is transparent over dark content. Between 24px and 144px of scroll, a raised jade material settles gradually behind the type. An open menu uses a brighter opaque jade surface, a cast shadow and a dimmed page backdrop so it separates from the document. The existing contrast hook can also give the bar an opaque dark surface over light content; no white header is introduced.

The lowercase wordmark is more prominent at 24px on wide screens, with its Shopify Studio descriptor. A balanced three-column header centres the navigation independently of the logo and enquiry link. The project CTA is an acid-lime text link with a fine animated underline; it retains a 44px target. The CTA reads Start a project, shortened to Let’s talk on phones. No large decorative arrows are used.

## Navigation and menus

At 761px and wider, the five primary destinations are visible from the start. A fine pointer opens Services, Industries and Insights on hover, with a 220ms close grace period. Clicking confirms a hover-opened panel or toggles an explicitly opened category.

All dropdowns meet the header at its lower edge and extend across the viewport as one continuous surface. Their content is capped and aligned to the page gutters. Services displays the full five-column catalogue and all 23 direct service links beneath a concise editorial introduction. Repeated leading Shopify prefixes are omitted visually within this clearly labelled Shopify menu; each link keeps its complete accessible service name. Industry links retain the numbered editorial typography and short contextual descriptions. Insights has its own compact editorial index, described below. An understated underline identifies the current section, including its detail pages. Small chevrons replace the textual plus signs.

At 760px and below, Menu opens a full-width primary list beneath the bar. Selecting a category replaces that list; Back restores focus to its trigger. Services uses five compact category buttons with an underline selection treatment and a two-column list of direct links. The outer mobile menu owns any necessary overflow; there is no nested scroll pane. Desktop panels allow overflow only when their content exceeds the available viewport height.

Keyboard users retain visible focus, ArrowRight into a category, ArrowLeft to its parent and Escape dismissal. Outside pointer events, focus departure, route changes and responsive breakpoint changes reset the menu. Hidden panels use the native hidden attribute; closed mobile navigation uses display:none. Desktop links are never inert. Reduced motion disables decorative transitions.

The smooth-wheel controller allows ordinary page scrolling over closed desktop navigation. An open scrolling menu handles its own wheel input.

## Homepage docking

The home header's negative bottom margin preserves the hero's original document position. `Hero` measures the shared `#site-header-brand` target for its existing wordmark flight and liquid fill. Both logo layers share one grid cell. Opening navigation hides the travelling duplicate while leaving the header identity readable.

## Verification

The production build and TypeScript checks cover the global layout migration. Served HTML should contain one header and one brand target on the homepage and each interior route. The page audit validates IDs, links and ARIA control targets. `scripts/check-navigation-contrast.mjs` checks the actual opaque text, muted text, link and CTA palette pairs.

Build and HTTP checks do not verify real-browser visual layout, sticky movement, hover paths or touch interaction. Browser review remains unavailable in this session.

## Sticky style comparison

The owner approved the normal header and requested sticky variations on 2026-11-01. The normal header retains its structure and proportions. Menu labels and the enquiry CTA use uppercase styling; the wordmark and explanatory copy keep their own casing.

Three sticky treatments share the same outer layout height and menu interactions:

- `depth`: the default, a scroll-driven jade material with subtle perspective settling, continuous compaction and the approved uppercase text CTA. Legacy editorial comparison links resolve to this direction.
- `rail`: a contained rail with small corners, no perimeter outline and surrounding page space.
- `glass`: a smoked backdrop with a compact filled acid-lime CTA and an opaque fallback.

Only the sticky state changes. Open menus continue to use the continuous opaque header surface. Inner logo and navigation positions remain steady when the menu opens. The homepage still measures the same brand target.

Development-only comparison URLs use `?header-preview=1&header-style=depth`, `rail` or `glass`. The opt-in review panel offers all three styles and a normal-header comparison. It scrolls to the sticky state when a choice is selected, honours reduced motion, and preserves other query parameters. Closing the panel removes its preview parameters. It is excluded from production rendering and absent on ordinary local visits.

## Material and motion refinement

The owner approved the uppercase CTA and Industries arrangement, and requested better menu separation and sticky motion. The approved layout is retained. Open navigation uses `--nav-menu: #20372a`, secondary `#294333` and brighter muted text `#d2dec9`, with a dimmed backdrop below the header. Services and Insights use the same material and accessible text hierarchy. Outside pointer dismissal and keyboard behaviour are unchanged. The backdrop does not introduce a body scroll lock or a new scrolling container.

The default Depth treatment uses a GSAP `quickTo` driver, updated from passive scroll events through one scheduled animation frame. The source depth is clamped across 24–144px of scroll and eases with a 0.38s power3 response. A very small bell-shaped perspective bend and vertical settling affect the decorative material only; text remains straight. The bar compacts continuously by 8px on desktop or 6px on phones while the document's header footprint stays constant. The existing brand target remains measured by the homepage wordmark flight.

GSAP match-media owns the driver. Reduced motion switches to a stable static surface; match-media changes and route changes clean up listeners, frames, the tween and custom properties. No extra WebGL scene, image asset, animation loop at rest or dependency is added.

Contrast checks now include both open-menu themes, the sticky elevated material and separation of the menu from the page. Real-browser motion and visual review remain unperformed because browser access is unavailable.

## Insights editorial index

The large preview-card layout was rejected. Insights now uses an open reading index: a short journal introduction, three direct article rows with topic and reading time, and one small shared preview. There are no card backgrounds, cropped image bands, repeated reading actions or oversized titles. Primary navigation and the All insights action retain uppercase styling; article titles keep sentence case.

Wide desktop layouts use three zones: a restrained introduction, the main list, and a 160px contained artwork preview with a short contextual caption. Mouse hover or keyboard focus changes that shared preview with a brief crossfade. The preview is decorative and excluded from the accessibility tree; each article title remains a normal direct link. No tabs, second click or automatic cycling are introduced.

At 1100px and below, the decorative preview is hidden. At 760px and below, the introduction becomes a compact heading row above the article list. The mobile Back control and single menu overflow container remain unchanged. Reduced motion removes the preview transition. Existing local artwork is lazy-loaded with fixed dimensions.

`InsightsMegaMenu.tsx` reads the shared article catalogue and reading-time helper. It owns only the preview selection, with no effects or document listeners. The existing parent menu continues to own hover opening, click, keyboard navigation, Escape and dismissal. Build and markup checks do not verify the real-browser appearance or hover interaction; browser access remains unavailable.

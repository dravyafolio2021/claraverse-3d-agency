# Claraverse studio page

Built on 2026-11-01 at `/about`; the existing `/about-us` redirect remains supported.

## Reference

Inspected https://wecanflyagency.com/about-us. Its structure moves from an agency introduction and customer priorities through figures, six working principles, a three-stage process, a trust section, engagement options and a project conversation. This implementation follows that order with original Claraverse content and the existing design language.

## Claraverse content

- Introduction: ecommerce intelligence connecting the customer experience and the operation for Beauty, Fashion, Wellness and Petcare.
- Priority: the storefront, product information, stock, fulfilment and team considered together.
- Counters: the existing owner-supplied 24+ projects, 92% satisfaction and four years of experience, plus the current four industry specialisms. Values come from the shared metrics data.
- Principles: understanding, clarity, craft, collaboration, purpose and continuity. Six visual studies give the existing sculptures a large, bounded stage, three short signals and one concise caption.
- Process: Discover, Build, Improve, with a narrative, practical outputs and a relevant service link for each phase.
- Focus: four image-backed industry links occupy the reference's trust-wall position. Beauty and Fashion reuse the Ritual and Form photographic scenes. Wellness and Petcare reuse the existing intelligence and integration sculptures. No placeholder identities are presented as real clients.
- Engagement: Project, Programme and Improvement each have an artwork stage, a three-step workflow and a short caption. One shared scope link replaces the repetitive individual invitations. These are planning approaches, with terms agreed together; no price, team size, delivery guarantee or unsupported billing policy is invented.
- Closing invitation: the shared footer handles the final project invitation. The duplicate About-specific pre-footer has been removed.

There are no copied competitor clients, results, staff biographies, partnership badges, office addresses or photos. No new images are created. The page uses the existing local portfolio photography and WebP sculptures, the shared heading treatment, counters, sticky header and footer.

## Implementation

`AboutPage.tsx` is server-rendered composition. `studio-story.ts` holds the principles, process and engagement content. `AboutPageMotion.tsx` only enhances decorative artwork on desktop when reduced motion is not requested. It reverts its GSAP match-media context on unmount or preference changes.

The page stays in normal document flow. Desktop uses three-column principles and engagement galleries, with two large industry cards per row. Principles switch to two columns on smaller desktops. Mobile stacks the cards with bounded artwork and concise captions; counters retain two columns. There is no pinned article, internal section scrollbar or new WebGL canvas. Sculptures are lazy-loaded. Thirteen decorative scenes have subtle desktop parallax, disabled for touch-sized layouts and reduced motion.

## Verification boundary

Use the production build, shared page-catalog checks and served-page validation for unique IDs, one h1, metric values, section order, service destinations and existing image files. These checks do not establish live visual or touch verification; browser access remains unavailable in this session.

# Floating navigation

The header uses a solid olive surface without a perimeter stroke, animated border or decorative arrows. It retains the earlier navigation: Work, Services +, Industries +, About, Insights +. The CTA stays at the right edge.

At rest, a compact Menu control opens the navigation. On desktop after 72px of scroll, all five destinations appear inline as the bar widens. Services, Industries and Insights open their own category dropdowns on mouse hover on wide screens, with an overview link and real destination links. The large numbered, two-column directory has been removed.

- Desktop: 600px at rest, capped at 1120px when expanded, with at least 32px side gutters.
- Tablet: 550px at rest and an 850px expanded cap; navigation opens in a compact list with expandable categories.
- Phone: 480px / 600px caps constrained by 16px / 12px viewport gutters. Menu and CTA retain 44px touch targets. Category links expand within the same navigation surface.
- CTA: **Start a project**, shortened to **Let’s talk** on phones. Both lead to the existing Quote page, without a decorative arrow.

The outline and filled wordmark remain in the same grid cell for the existing hero docking animation. A scoped ResizeObserver tracks the changing header width while the hero wordmark is travelling.

Escape closes a category and restores focus to its trigger, then closes the compact menu when used again. Outside pointer interactions, leaving the menu with keyboard focus, following a link and route changes close navigation. Hidden compact navigation is inert. Reduced motion removes the width transition and dropdown entrance.

Validation uses TypeScript, the production build, stylesheet parsing and local page response checks. Browser visual and interaction checks are unavailable in this session; scroll appearance should be reviewed in the local preview.


## Desktop hover

Mouse hover opens category dropdowns above the 960px mobile-menu breakpoint, and only when the device reports a fine pointer with hover support. A 220ms leave delay lets the pointer cross the gap between a trigger and its panel; entering the panel cancels that delay. Hovering another category switches panels immediately. Hovering Work or About dismisses the category panel without hiding a compact navigation list.

Clicking a category that hover has just opened confirms it instead of unexpectedly closing it; a subsequent click can still toggle it. Touch devices and narrow screens keep the existing tap/click interactions. Leaving the menu closes it unless keyboard-visible focus is still inside. Escape, outside clicks, keyboard focus departure and route navigation continue to close the menu. Timers are cleared on close and unmount.

Hover interaction has not been visually tested in this session; build and served-markup checks are separate from browser behaviour verification.

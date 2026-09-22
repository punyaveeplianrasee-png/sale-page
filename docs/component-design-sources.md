# Component design sources

## Applied September 17, 2026

- Background Paths: discovered at https://21st.dev/@kokonutd/components/background-paths. Source fetched from the author's public registry https://kokonutui.com/r/background-paths.json, documentation https://kokonutui.com/docs/backgrounds/background-paths. Path-generation code adapted under MIT; full license in licenses/kokonutui.txt. Uses deterministic server-rendered SVG and CSS motion in place of Motion, fewer paths, gold strokes, no animation on touch/reduced-motion devices.
- Bento Grid: https://magicui.design/docs/components/bento-grid. Design inspiration; our own implementation for the course, Student and Membership benefits. Lesson tiles illustrate the course topics; not a screenshot of Whop. No invented student messages or results.
- Interactive Hover Button: https://v3.magicui.design/docs/components/interactive-hover-button. Design inspiration; our own CSS reveal treatment on existing semantic CTA links/buttons. Destinations preserved.
- Method: original four-step connected card layout, consistent with the above visual system.
- Existing Spotlight treatment retained throughout the page.

21st preview access requested sign-in after the free previews; no login, registry account, paid service or new dependency was needed. Only Background Paths source was adapted; other patterns were implemented locally rather than claimed as installed registry packages.

Validation: lint and production build; desktop/mobile visual checks, calculator interaction, CTA destination inspection and horizontal-overflow checks.

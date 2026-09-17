# NEXUS ARCHITECTS Premium Landing Page

## Goal
Build the complete first-screen experience at `/` as an ultra-premium, dark EdTech landing page with polished interaction, responsive behavior, and accessible controls.

## Experience
- Create an obsidian visual system with translucent glass surfaces, cyan/violet/emerald track accents, restrained glow, and Inter/Plus Jakarta Sans with JetBrains Mono for technical UI.
- Build a focused navigation and full-bleed hero featuring the supplied messaging, two CTAs, live cohort status, placement proof, hiring-partner marks, and an interactive neural-core scene.
- Add a parallax technology ticker for React, PyTorch, Next.js, TensorFlow, CUDA, and PostgreSQL.
- Build three tabbed program tracks with distinct interactive technical previews: compiling terminal, neural network, and data-cluster plot.
- Add a filterable curriculum timeline, module accordions, capstone details, weekly-hours information, and a full-time/executive pacing slider.
- Add a mentor gallery with tilt interactions and expandable professional proof, plus a working model-playground/SaaS-style sandbox.
- Add tuition options and a working multi-step application dialog with progress and scholarship estimate.

## Interaction and Motion
- Use Framer Motion for reveal, stagger, spring, and modal transitions.
- Use React Three Fiber for the hero scene, with pointer response, reduced particle density on smaller screens, reduced-motion support, and a polished non-WebGL fallback.
- Implement cursor-following highlights and subtle 3D tilt only where they reinforce the premium technical feel.

## Technical Details
- Install the focused runtime dependencies for Framer Motion and React Three Fiber/Three.js.
- Keep browser-only 3D code behind client-only loading so server rendering remains stable.
- Extend the existing semantic Tailwind v4 token system rather than placing raw colors in page markup.
- Reuse the existing button, tabs, accordion, slider, dialog, progress, and form primitives where appropriate.
- Add unique landing-page metadata and load external fonts from the document head.
- Keep the application flow frontend-only in this pass; submissions will show a successful local completion state and will not be persisted or sent externally.

## Validation
- Check the complete flow in the live preview at desktop and mobile widths.
- Verify tab changes, curriculum controls, sandbox interaction, tuition selection, and application steps.
- Confirm the 3D scene renders, remains framed correctly, and falls back cleanly for reduced motion/mobile constraints.
- Check browser console output, contrast, keyboard focus, and text overflow.

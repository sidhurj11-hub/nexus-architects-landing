# Nexus Architects Landing

NEXUS ARCHITECTS — Landing Page Build Prompt (Refined)

Build an ultra-premium, dark-mode landing page for NEXUS ARCHITECTS, an elite EdTech platform offering three career tracks: Full Stack Web Development, AI Engineering, and Data Science & AI.

Aesthetic: Obsidian dark-mode + glassmorphism + glowing neural accents + interactive 3D (Three.js / React Three Fiber or Spline).

1. Design System

Colors: Obsidian #030712 · Glass rgba(15,23,42,0.6) · Cyan #38BDF8 · Violet #A855F7 · Emerald #10B981

Style: Tailwind, backdrop-blur-xl, 1px border-white/10 glows, radial spotlight gradients behind hero elements

Type: Inter / Plus Jakarta Sans (UI) + JetBrains Mono (code/data previews)

3D elements:

Hero: ambient particle mesh or wireframe that reacts to cursor

Cards: 3D tilt (preserve-3d) with cursor-following light reflection

Tech marquee: parallax logo ticker (React, PyTorch, Next.js, TensorFlow, CUDA, PostgreSQL)

2. Page Sections

Hero

Tagline (cyan→violet gradient): "Engineered for the Top 1% of Developers."

Headline: "Master Full Stack, AI, and Data Science with Active Industry Leads."

Interactive 3D viewport: floating neural core / code hyper-cube

CTAs: "Apply for Cohort" (magnetic, neon ring) · "Explore Interactive Curriculum" (glass, play icon)

Social proof: live enrollment ticker, $135k+ avg placement, 3D hiring-partner logos (OpenAI, DeepMind, Stripe, Meta)

Program Tracks (tabbed, one theme color each)

Full Stack (cyan) — Next.js 15, React, Node.js, WASM, distributed systems; live code-terminal compile demo

AI Engineering (violet) — LLMs, PyTorch, agentic frameworks, RAG, LangChain; hover-reactive 3D neural network

Data Science & AI (emerald) — ML, MLOps, big data, predictive analytics; 3D data-cluster scatterplot

Curriculum Matrix

Track filter toggle

Accordion timeline: modules, capstones, weekly hours

Slider: Full-time vs. Executive part-time pacing

Mentorship & Sandbox

Mentor gallery: 3D tilt cards, expandable LinkedIn/GitHub proof

Embedded live demo (fine-tuned model playground or full-stack SaaS preview)

Admissions & Tuition

Tuition toggle: Upfront / Income Share / Corporate Sponsorship

Glass application modal: multi-step progress + scholarship estimator

3. Technical Requirements

Framer Motion: scroll fade-up, stagger children, spring transitions

WebGL fallback for mobile (reduced particle density, 60fps target)

Fully responsive, accessible contrast ratios throughout

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6cf98784-4716-4127-b609-20f9261be4b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

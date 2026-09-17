import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  CircleDot,
  Github,
  Linkedin,
  Menu,
  Network,
  Play,
  Send,
  X,
} from "lucide-react";

import arjun from "@/assets/mentor-arjun.jpg";
import amara from "@/assets/mentor-amara.jpg";
import mei from "@/assets/mentor-mei.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const NexusCore = lazy(() => import("@/components/nexus-core"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS ARCHITECTS | Elite Engineering Programs" },
      {
        name: "description",
        content: "Master full stack, AI engineering, and data science with active industry leads at NEXUS ARCHITECTS.",
      },
      { property: "og:title", content: "NEXUS ARCHITECTS | Elite Engineering Programs" },
      {
        property: "og:description",
        content: "Career-defining engineering programs built and taught by active industry leads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type TrackKey = "fullstack" | "ai" | "data";

const trackData = {
  fullstack: {
    short: "Full Stack",
    index: "01",
    title: "Full Stack Engineering",
    eyebrow: "Systems that scale",
    description: "Build and ship production-grade applications—from reactive interfaces to globally distributed infrastructure.",
    skills: ["Next.js 15", "React", "Node.js", "WASM", "Distributed Systems"],
  },
  ai: {
    short: "AI Engineering",
    index: "02",
    title: "AI Engineering",
    eyebrow: "Intelligence in production",
    description: "Design, fine-tune, evaluate, and deploy intelligent systems that move beyond demos into dependable products.",
    skills: ["LLMs", "PyTorch", "RAG", "Agentic Systems", "LangChain"],
  },
  data: {
    short: "Data Science & AI",
    index: "03",
    title: "Data Science & AI",
    eyebrow: "Signal from complexity",
    description: "Turn complex datasets into defensible decisions through statistical depth, modern ML, and robust MLOps.",
    skills: ["Machine Learning", "MLOps", "Big Data", "Forecasting", "Analytics"],
  },
} satisfies Record<TrackKey, { short: string; index: string; title: string; eyebrow: string; description: string; skills: string[] }>;

const curricula: Record<TrackKey, { title: string; weeks: string; detail: string; capstone: string }[]> = {
  fullstack: [
    { title: "Web systems & interface architecture", weeks: "Weeks 01–05", detail: "Advanced React, Next.js 15, accessibility, state, testing, and performance budgets.", capstone: "Realtime collaborative workspace" },
    { title: "Services, data & reliability", weeks: "Weeks 06–11", detail: "Node.js services, PostgreSQL, event-driven design, queues, observability, and security.", capstone: "Multi-region commerce engine" },
    { title: "Distributed product studio", weeks: "Weeks 12–16", detail: "WASM, edge architecture, system design reviews, incident drills, and production launch.", capstone: "Investor-ready SaaS platform" },
  ],
  ai: [
    { title: "Foundation models from first principles", weeks: "Weeks 01–05", detail: "Transformers, embeddings, PyTorch internals, evaluation, and model economics.", capstone: "Domain-specific language model" },
    { title: "Retrieval & agentic systems", weeks: "Weeks 06–11", detail: "RAG, tool use, orchestration, memory, guardrails, and observability.", capstone: "Autonomous research system" },
    { title: "Production AI engineering", weeks: "Weeks 12–16", detail: "Fine-tuning, inference optimization, human feedback, red-teaming, and deployment.", capstone: "Production AI copilot" },
  ],
  data: [
    { title: "Statistical intelligence", weeks: "Weeks 01–05", detail: "Experimentation, causal inference, forecasting, feature engineering, and uncertainty.", capstone: "Decision intelligence lab" },
    { title: "Machine learning systems", weeks: "Weeks 06–11", detail: "Model selection, pipelines, feature stores, distributed compute, and monitoring.", capstone: "Predictive operations system" },
    { title: "MLOps & executive storytelling", weeks: "Weeks 12–16", detail: "Deployment, drift, governance, business cases, and communicating with stakeholders.", capstone: "End-to-end ML platform" },
  ],
};

const mentors = [
  { name: "Arjun Mehta", role: "Principal Engineer · Ex-Stripe", track: "Distributed systems", image: arjun, accent: "cyan" },
  { name: "Dr. Amara Okafor", role: "AI Research Lead · Ex-DeepMind", track: "Foundation models", image: amara, accent: "violet" },
  { name: "Mei Lin", role: "Director of Data · Ex-Meta", track: "Production MLOps", image: mei, accent: "emerald" },
] as const;

const rise = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={rise}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BrandMark() {
  return (
    <span className="relative grid size-8 place-items-center border border-primary/40" aria-hidden="true">
      <span className="absolute h-px w-5 rotate-45 bg-primary" />
      <span className="absolute h-px w-5 -rotate-45 bg-violet" />
      <span className="size-1.5 bg-foreground" />
    </span>
  );
}

function CornerMarks() {
  return (
    <div className="pointer-events-none absolute inset-3 z-20" aria-hidden="true">
      <span className="absolute left-0 top-0 size-4 border-l border-t border-foreground/25" />
      <span className="absolute right-0 top-0 size-4 border-r border-t border-foreground/25" />
      <span className="absolute bottom-0 left-0 size-4 border-b border-l border-foreground/25" />
      <span className="absolute bottom-0 right-0 size-4 border-b border-r border-foreground/25" />
    </div>
  );
}

function DetailRail({ code, label }: { code: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 border-b border-border pb-3 font-mono text-[9px] uppercase text-muted-foreground">
      <span className="text-primary">{code}</span><span>{label}</span><span className="h-px flex-1 bg-border" />
      <span className="hidden sm:inline">NXS / SYSTEMS EDUCATION</span>
    </div>
  );
}

function SiteHeader({ onApply }: { onApply: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between border-x border-border px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="NEXUS ARCHITECTS home">
          <BrandMark />
          <span className="font-display text-sm font-semibold tracking-normal">NEXUS <span className="text-muted-foreground">/ ARCHITECTS</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {["Programs", "Curriculum", "Mentors", "Tuition"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">{item}</a>
          ))}
        </nav>
        <div className="hidden md:block"><Button variant="glass" onClick={onApply}>Apply now <ArrowRight /></Button></div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background p-5 md:hidden" aria-label="Mobile navigation">
          {["Programs", "Curriculum", "Mentors", "Tuition"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-sm">{item}</a>
          ))}
          <Button variant="hero" className="mt-5 w-full" onClick={onApply}>Apply for cohort</Button>
        </nav>
      )}
    </header>
  );
}

function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section id="top" className="relative min-h-[920px] overflow-hidden border-b border-border pt-16 lg:min-h-[820px]">
      <div className="drafting-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="detail-noise absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between border-x border-b border-border px-5 py-2 font-mono text-[9px] uppercase text-muted-foreground lg:px-8">
        <span>Program architecture / 2026</span><span>37.7749° N · 122.4194° W</span>
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-8 border-x border-border px-5 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20">
        <CornerMarks />
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="relative z-10 flex flex-col justify-center">
          <motion.div variants={rise} className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase text-primary">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-60" /><span className="relative size-2 rounded-full bg-emerald" /></span>
            Admissions open · January cohort
          </motion.div>
          <motion.p variants={rise} className="text-gradient mb-5 font-display text-sm font-semibold sm:text-base">Engineered for the Top 1% of Developers.</motion.p>
          <motion.h1 variants={rise} className="max-w-4xl font-display text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[0.98] tracking-normal">
            Master Full Stack, AI, and Data Science with <span className="text-muted-foreground">Active Industry Leads.</span>
          </motion.h1>
          <motion.div variants={rise} aria-hidden="true" className="outline-type mt-3 select-none font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-none opacity-50">NEXUS / 01</motion.div>
          <motion.p variants={rise} className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            An intensive, mentor-led engineering institute for builders who refuse to learn from yesterday’s playbook.
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="xl" onClick={onApply}>Apply for Cohort <ArrowRight /></Button>
            <Button asChild variant="glass" size="xl"><a href="#curriculum"><Play className="fill-current" /> Explore Interactive Curriculum</a></Button>
          </motion.div>
          <motion.div variants={rise} className="mt-12 grid max-w-2xl grid-cols-3 border-y border-border py-5">
            <Stat value="2,418" label="Builders enrolled" />
            <Stat value="$135k+" label="Avg. placement" border />
            <Stat value="94%" label="Completion rate" border />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="technical-frame pointer-events-none absolute -right-44 top-14 h-[430px] w-[430px] opacity-20 sm:-right-24 sm:h-[540px] sm:w-[540px] sm:opacity-30 lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:min-h-[640px] lg:opacity-100">
          <CornerMarks />
          <div className="absolute inset-0 rounded-full bg-violet/10 blur-[100px]" />
          <div className="absolute inset-0">
            <ClientOnly fallback={<CoreFallback />}>
              <Suspense fallback={<CoreFallback />}><NexusCore /></Suspense>
            </ClientOnly>
          </div>
          <div className="glass-panel absolute right-1 top-10 hidden px-4 py-3 font-mono text-[10px] text-muted-foreground sm:right-8 sm:top-20 lg:block">
            <span className="text-emerald">● ONLINE</span><br />node_map: 01A7
          </div>
          <div className="glass-panel absolute bottom-7 left-0 hidden max-w-[220px] p-4 sm:left-8 sm:bottom-16 lg:block">
            <p className="font-mono text-[10px] text-primary">LIVE SYSTEM</p>
            <p className="mt-2 text-sm font-medium">Cursor-reactive neural mesh</p>
            <p className="mt-1 text-xs text-muted-foreground">Drag your attention through the architecture.</p>
          </div>
        </motion.div>
      </div>
      <div className="relative border-t border-border bg-background/40 py-5">
        <p className="mb-4 text-center font-mono text-[9px] uppercase text-muted-foreground">Our graduates engineer at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 font-display text-sm font-semibold text-muted-foreground sm:gap-x-16">
          {['OpenAI', 'DEEP MIND', 'stripe', 'Meta', 'VERCEL'].map((brand) => <span key={brand}>{brand}</span>)}
        </div>
      </div>
    </section>
  );
}

function CoreFallback() {
  return <div className="absolute inset-[18%] grid place-items-center rounded-full border border-primary/30 shadow-[0_0_80px_color-mix(in_oklab,var(--cyan)_18%,transparent)]"><Network className="size-24 text-primary/50" /></div>;
}

function Stat({ value, label, border = false }: { value: string; label: string; border?: boolean }) {
  return <div className={cn("px-2 sm:px-5", border && "border-l border-border")}><div className="font-display text-lg font-semibold sm:text-2xl">{value}</div><div className="mt-1 text-[10px] text-muted-foreground sm:text-xs">{label}</div></div>;
}

function TechTicker() {
  const tech = ["React", "PYTORCH", "Next.js", "TENSORFLOW", "CUDA", "PostgreSQL"];
  return (
    <div className="relative overflow-hidden border-b border-border bg-obsidian-soft py-4 before:absolute before:inset-y-0 before:left-5 before:z-10 before:w-px before:bg-primary/50 after:absolute after:inset-y-0 after:right-5 after:z-10 after:w-px after:bg-primary/50">
      <div className="tech-ticker flex w-max items-center">
        {[...tech, ...tech].map((name, index) => (
          <div key={`${name}-${index}`} className="flex w-48 items-center justify-center gap-3 font-mono text-xs text-muted-foreground"><CircleDot className="size-3 text-primary" />{name}</div>
        ))}
      </div>
    </div>
  );
}

function ProgramPreview({ track }: { track: TrackKey }) {
  if (track === "fullstack") return (
    <div className="relative h-full overflow-hidden bg-background p-5 font-mono text-[11px] leading-6 sm:p-8 sm:text-xs">
      <div className="mb-5 flex gap-2"><span className="size-2 rounded-full bg-destructive" /><span className="size-2 rounded-full bg-chart-4" /><span className="size-2 rounded-full bg-emerald" /></div>
      <p className="text-muted-foreground">$ nexus deploy --production</p>
      <p className="mt-3 text-primary">✓ Compiled edge runtime in 1.2s</p><p className="text-primary">✓ 48 routes optimized</p><p className="text-emerald">✓ Distributed globally across 31 regions</p>
      <div className="mt-8 border-l-2 border-primary pl-4"><span className="text-violet">export async function</span> <span className="text-foreground">architect</span>() {'{'}<br /><span className="pl-5 text-muted-foreground">return scale.withoutLimits()</span><br />{'}'}</div>
      <div className="scan-line absolute inset-x-0 top-0 h-px bg-primary/50" />
    </div>
  );
  if (track === "ai") return (
    <div className="relative grid h-full place-items-center overflow-hidden bg-background">
      <div className="absolute size-56 rounded-full border border-violet/20" /><div className="absolute size-36 rounded-full border border-violet/40" />
      {[0, 1, 2, 3, 4, 5].map((node) => <motion.span key={node} className="absolute size-3 rounded-full bg-violet shadow-[0_0_24px_var(--violet)]" animate={{ x: Math.cos(node) * 90, y: Math.sin(node * 1.7) * 90 }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 + node * 0.3 }} />)}
      <div className="z-10 grid size-20 place-items-center rounded-full border border-violet bg-violet/20 font-mono text-[10px]">LLM.01</div>
    </div>
  );
  return (
    <div className="relative h-full overflow-hidden bg-background p-8">
      <div className="absolute inset-8 border-b border-l border-border" />
      {Array.from({ length: 34 }).map((_, index) => <motion.span key={index} className="absolute size-2 rounded-full bg-emerald" style={{ left: `${12 + ((index * 37) % 78)}%`, top: `${15 + ((index * 53) % 70)}%`, opacity: 0.35 + (index % 5) * 0.12 }} whileHover={{ scale: 2.4 }} />)}
      <div className="absolute bottom-4 left-8 font-mono text-[9px] text-muted-foreground">CLUSTER MODEL · ACCURACY 98.7%</div>
    </div>
  );
}

function Programs() {
  const [active, setActive] = useState<TrackKey>("fullstack");
  return (
    <section id="programs" className="border-b border-border px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <DetailRail code="SEC.01" label="Discipline index" />
        <Reveal><SectionHeader number="01" eyebrow="Choose your discipline" title="Three tracks. One engineering standard." body="Each program pairs deep technical instruction with production constraints and weekly critique from active industry leaders." /></Reveal>
        <Tabs value={active} onValueChange={(value) => setActive(value as TrackKey)} className="mt-14">
          <TabsList className="grid h-auto w-full grid-cols-1 gap-px border border-border bg-border p-0 sm:grid-cols-3">
            {(Object.keys(trackData) as TrackKey[]).map((key) => (
              <TabsTrigger key={key} value={key} className="h-16 rounded-none bg-background px-4 data-[state=active]:bg-accent data-[state=active]:text-foreground data-[state=active]:shadow-none sm:h-20">
                <span className={cn("mr-3 font-mono text-[10px]", key === "fullstack" ? "text-primary" : key === "ai" ? "text-violet" : "text-emerald")}>{trackData[key].index}</span>{trackData[key].short}
              </TabsTrigger>
            ))}
          </TabsList>
          {(Object.keys(trackData) as TrackKey[]).map((key) => {
            const track = trackData[key];
            return (
              <TabsContent key={key} value={key} className="mt-px outline-none">
                <div className="technical-frame edge-glow grid min-h-[460px] lg:grid-cols-2">
                  <CornerMarks />
                  <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                    <p className={cn("font-mono text-[10px] uppercase", key === "fullstack" ? "text-primary" : key === "ai" ? "text-violet" : "text-emerald")}>{track.eyebrow}</p>
                    <h3 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">{track.title}</h3>
                    <p className="mt-6 max-w-lg leading-7 text-muted-foreground">{track.description}</p>
                    <div className="mt-8 flex flex-wrap gap-2">{track.skills.map((skill) => <span key={skill} className="rounded-sm border border-border bg-glass px-3 py-2 font-mono text-[10px] text-muted-foreground">{skill}</span>)}</div>
                    <a href="#curriculum" className="mt-10 flex items-center gap-2 text-sm font-medium text-foreground">Inspect curriculum <ChevronRight className="size-4 text-primary" /></a>
                  </div>
                  <div className="min-h-[340px] border-t border-border lg:min-h-0 lg:border-l lg:border-t-0"><ProgramPreview track={key} /></div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

function SectionHeader({ number, eyebrow, title, body }: { number: string; eyebrow: string; title: string; body: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:items-end">
      <div className="font-mono text-[10px] uppercase text-primary">{number} / {eyebrow}</div>
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
      <p className="text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function Curriculum() {
  const [track, setTrack] = useState<TrackKey>("fullstack");
  const [pace, setPace] = useState([0]);
  const executive = (pace[0] ?? 0) > 50;
  return (
    <section id="curriculum" className="relative overflow-hidden border-b border-border bg-obsidian-soft px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <DetailRail code="SEC.02" label="Module sequencing" />
        <Reveal><SectionHeader number="02" eyebrow="Curriculum matrix" title="Designed around hard problems." body="Choose a track and pace. Every module resolves into a portfolio-grade system defended before working engineers." /></Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="glass-panel technical-frame h-fit p-5">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">Track filter</p>
            <div className="mt-4 flex flex-col gap-2">{(Object.keys(trackData) as TrackKey[]).map((key) => <Button key={key} variant={track === key ? "secondary" : "ghost"} className="justify-start" onClick={() => setTrack(key)}>{track === key && <span className="size-1.5 rounded-full bg-primary" />}{trackData[key].short}</Button>)}</div>
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex justify-between text-xs"><span className={!executive ? "text-foreground" : "text-muted-foreground"}>Full-time</span><span className={executive ? "text-foreground" : "text-muted-foreground"}>Executive</span></div>
              <Slider value={pace} onValueChange={setPace} max={100} step={100} className="mt-5" aria-label="Program pace" />
              <div className="mt-5 grid grid-cols-2 gap-3"><div><p className="font-display text-2xl font-semibold">{executive ? "24" : "16"}</p><p className="text-[10px] text-muted-foreground">WEEKS</p></div><div><p className="font-display text-2xl font-semibold">{executive ? "12" : "24"}</p><p className="text-[10px] text-muted-foreground">HRS / WEEK</p></div></div>
            </div>
          </aside>
          <div className="border-t border-border">
            <Accordion type="single" collapsible defaultValue="module-0">
              {curricula[track].map((item, index) => (
                <AccordionItem key={item.title} value={`module-${index}`} className="border-border">
                  <AccordionTrigger className="gap-5 py-7 hover:no-underline">
                    <span className="flex min-w-0 items-center gap-5"><span className="font-mono text-[10px] text-primary">0{index + 1}</span><span className="text-left font-display text-base font-semibold sm:text-xl">{item.title}</span></span>
                    <span className="ml-auto hidden whitespace-nowrap font-mono text-[9px] text-muted-foreground sm:block">{item.weeks}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-9 sm:pl-12">
                    <p className="max-w-2xl leading-6 text-muted-foreground">{item.detail}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs"><Award className="size-4 text-violet" /><span className="text-muted-foreground">Capstone:</span> {item.capstone}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mentorship() {
  const [prompt, setPrompt] = useState("Explain retrieval-augmented generation in one sentence.");
  const [answer, setAnswer] = useState("RAG grounds a model’s response in retrieved, verifiable context before generation.");
  const runPrompt = () => setAnswer(prompt.trim() ? `Model output: ${prompt.trim().slice(0, 84)} — evaluated, grounded, and ready for your next iteration.` : "Enter a prompt to begin.");
  return (
    <section id="mentors" className="border-b border-border px-5 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <DetailRail code="SEC.03" label="Faculty verification" />
        <Reveal><SectionHeader number="03" eyebrow="Mentorship & sandbox" title="Learn beside the people shipping it." body="Get direct architecture review, live debugging, and career signal from leaders actively building the systems you study." /></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {mentors.map((mentor) => <MentorCard key={mentor.name} mentor={mentor} />)}
        </div>
        <Reveal className="mt-16 grid overflow-hidden border border-border lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between bg-obsidian-soft p-7 sm:p-10">
            <div><p className="font-mono text-[10px] uppercase text-emerald">Live sandbox · Model 7B</p><h3 className="mt-5 font-display text-3xl font-semibold">Test a fine-tuned model.</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">The real program workflow: prompt, inspect, evaluate, improve. This sample runs locally for demonstration.</p></div>
            <div className="mt-10 flex gap-6 text-xs text-muted-foreground"><span>Latency <b className="text-foreground">82ms</b></span><span>Context <b className="text-foreground">32k</b></span></div>
          </div>
          <div className="bg-background p-5 sm:p-8">
            <div className="rounded-md border border-border bg-card p-4 font-mono text-xs leading-6 text-muted-foreground min-h-40"><span className="text-violet">assistant /</span><br /><br />{answer}</div>
            <Label htmlFor="sandbox-prompt" className="sr-only">Model prompt</Label>
            <div className="mt-4 flex gap-2"><Input id="sandbox-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.key === "Enter" && runPrompt()} className="h-12 border-border bg-glass font-mono text-xs" /><Button variant="hero" size="icon" className="size-12 shrink-0" onClick={runPrompt} aria-label="Run prompt"><Send /></Button></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MentorCard({ mentor }: { mentor: (typeof mentors)[number] }) {
  const [proof, setProof] = useState<"linkedin" | "github" | null>(null);
  return (
    <motion.article whileHover={{ y: -8, rotateX: 2, rotateY: -2 }} transition={{ type: "spring", stiffness: 240, damping: 20 }} className="group technical-frame relative overflow-hidden bg-card [transform-style:preserve-3d]">
      <CornerMarks />
      <img src={mentor.image} alt={`${mentor.name}, ${mentor.track} mentor`} loading="lazy" width={768} height={960} className="aspect-[4/5] w-full object-cover grayscale-[25%] transition duration-500 group-hover:grayscale-0" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent p-6 pt-24">
        <p className={cn("font-mono text-[9px] uppercase", mentor.accent === "cyan" ? "text-primary" : mentor.accent === "violet" ? "text-violet" : "text-emerald")}>{mentor.track}</p>
        <h3 className="mt-2 font-display text-xl font-semibold">{mentor.name}</h3><p className="mt-1 text-xs text-muted-foreground">{mentor.role}</p>
        {proof && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 border-l border-primary pl-3 text-[11px] leading-5 text-muted-foreground">{proof === "linkedin" ? `Verified leadership profile · ${mentor.role}` : `Selected systems reviews · ${mentor.track}`}<span className="block font-mono text-[9px] text-primary">ILLUSTRATIVE PROFILE</span></motion.div>}
        <div className="mt-4 flex gap-2 opacity-70 transition-opacity group-hover:opacity-100"><Button variant="glass" size="icon" aria-label={`Show ${mentor.name} LinkedIn proof`} onClick={() => setProof(proof === "linkedin" ? null : "linkedin")}><Linkedin /></Button><Button variant="glass" size="icon" aria-label={`Show ${mentor.name} GitHub proof`} onClick={() => setProof(proof === "github" ? null : "github")}><Github /></Button></div>
      </div>
    </motion.article>
  );
}

function Tuition({ onApply }: { onApply: () => void }) {
  const [plan, setPlan] = useState("upfront");
  const plans = {
    upfront: { label: "Upfront", price: "$12,800", note: "One payment · save $1,700" },
    isa: { label: "Income Share", price: "$0 today", note: "Pay after you land a qualifying role" },
    corporate: { label: "Corporate", price: "Sponsored", note: "Employer-funded team upskilling" },
  };
  const active = plans[plan as keyof typeof plans] ?? plans.upfront;
  return (
    <section id="tuition" className="relative overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 section-grid opacity-20" />
      <div className="relative mx-auto max-w-5xl text-center">
        <DetailRail code="SEC.04" label="Admissions protocol" />
        <Reveal><p className="font-mono text-[10px] uppercase text-primary">04 / Admissions & tuition</p><h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-semibold sm:text-6xl">Invest in the ceiling you intend to break.</h2><p className="mx-auto mt-6 max-w-2xl leading-7 text-muted-foreground">Flexible paths designed around your ambition—not your current cash flow.</p></Reveal>
        <Reveal className="glass-panel technical-frame edge-glow mx-auto mt-12 max-w-3xl p-3 sm:p-6">
          <CornerMarks />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{Object.entries(plans).map(([key, value]) => <Button key={key} variant={plan === key ? "secondary" : "ghost"} className="h-12" onClick={() => setPlan(key)}>{value.label}</Button>)}</div>
          <div className="mt-8 border-y border-border py-10"><p className="font-display text-4xl font-semibold sm:text-6xl">{active.price}</p><p className="mt-3 text-sm text-muted-foreground">{active.note}</p></div>
          <div className="grid gap-3 py-7 text-left text-sm text-muted-foreground sm:grid-cols-3">{["Live expert instruction", "Unlimited sandbox access", "Career strategy & referrals"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-emerald" />{item}</span>)}</div>
          <Button variant="hero" size="xl" className="w-full" onClick={onApply}>Start your application <ArrowRight /></Button>
        </Reveal>
      </div>
    </section>
  );
}

function ApplicationDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [step, setStep] = useState(1);
  const [salary, setSalary] = useState([85000]);
  const scholarship = useMemo(() => Math.max(0, Math.round((120000 - (salary[0] ?? 85000)) / 20) * 100), [salary]);
  const close = (next: boolean) => { setOpen(next); if (!next) window.setTimeout(() => setStep(1), 250); };
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="glass-panel max-h-[90vh] overflow-y-auto border-border-strong p-6 sm:max-w-xl sm:p-8">
        <DialogHeader><p className="font-mono text-[10px] uppercase text-primary">Application / Step {step} of 3</p><DialogTitle className="font-display text-2xl">{step === 1 ? "Choose your direction." : step === 2 ? "Tell us where you are." : "Your application is ready."}</DialogTitle><DialogDescription>{step < 3 ? "Around four minutes. No generic cover letter required." : "We’ll review your fit and follow up with next steps."}</DialogDescription></DialogHeader>
        <Progress value={(step / 3) * 100} className="my-4 h-1 bg-muted" />
        {step === 1 && <div className="space-y-3">{Object.entries(trackData).map(([key, track]) => <label key={key} className="flex cursor-pointer items-center gap-4 border border-border bg-background/50 p-4 transition hover:border-primary/40"><input type="radio" name="application-track" defaultChecked={key === "fullstack"} className="accent-primary" /><span><b className="block text-sm">{track.title}</b><span className="text-xs text-muted-foreground">{track.eyebrow}</span></span></label>)}</div>}
        {step === 2 && <div className="space-y-5"><div><Label htmlFor="name">Full name</Label><Input id="name" className="mt-2 h-11 bg-background/60" placeholder="Your name" /></div><div><Label htmlFor="email">Work email</Label><Input id="email" type="email" className="mt-2 h-11 bg-background/60" placeholder="you@company.com" /></div><div className="border border-border bg-background/50 p-4"><div className="flex justify-between text-xs"><span>Current annual income</span><span className="font-mono">${(salary[0] ?? 85000).toLocaleString()}</span></div><Slider value={salary} onValueChange={setSalary} min={30000} max={180000} step={5000} className="my-5" /><p className="text-xs text-muted-foreground">Estimated scholarship eligibility: <span className="text-emerald">up to ${scholarship.toLocaleString()}</span></p></div></div>}
        {step === 3 && <div className="grid min-h-56 place-items-center text-center"><div><div className="mx-auto grid size-16 place-items-center rounded-full border border-emerald/40 bg-emerald/10"><Check className="size-7 text-emerald" /></div><p className="mt-5 font-display text-xl font-semibold">Application staged.</p><p className="mt-2 text-sm text-muted-foreground">This preview doesn’t transmit personal details. Your experience is ready for a secure application service.</p></div></div>}
        <div className="mt-3 flex justify-between gap-3"><Button variant="ghost" onClick={() => step === 1 ? close(false) : setStep(step - 1)}>{step === 1 ? "Cancel" : "Back"}</Button>{step < 3 ? <Button variant="hero" onClick={() => setStep(step + 1)}>Continue <ArrowRight /></Button> : <Button variant="hero" onClick={() => close(false)}>Done</Button>}</div>
      </DialogContent>
    </Dialog>
  );
}

function Index() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader onApply={() => setApplicationOpen(true)} />
      <Hero onApply={() => setApplicationOpen(true)} />
      <TechTicker />
      <Programs />
      <Curriculum />
      <Mentorship />
      <Tuition onApply={() => setApplicationOpen(true)} />
      <footer className="border-t border-border px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row"><div className="flex items-center gap-3"><BrandMark /><span className="font-display text-sm font-semibold">NEXUS ARCHITECTS</span></div><p className="text-xs text-muted-foreground">Built for the engineers building what’s next.</p><p className="font-mono text-[9px] text-muted-foreground">© 2026 NEXUS</p></div></footer>
      <ApplicationDialog open={applicationOpen} setOpen={setApplicationOpen} />
    </main>
  );
}
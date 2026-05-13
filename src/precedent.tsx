import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

// =========================================================================
// CONFIG (CUSTOMIZE markers)
// =========================================================================
export const HUBSPOT_MEETINGS_URL = "https://meetings.hubspot.com/precedent-ai/readiness-call";
export const CONTACT_EMAIL = "hello@precedent.ai";
// CHECKLIST_TALLY_URL / CONTACT_TALLY_URL — set when Tally forms are created.

// =========================================================================
// PALETTE
// =========================================================================
export const palette = {
  navy: "#1B2A4A",
  navyDeep: "#141F38",
  parchment: "#F5F0E8",
  gold: "#C9A84C",
  goldDeep: "#A88A3D",
  charcoal: "#2C2C2C",
  smoke: "#E8E4DC",
  muted: "#8A8278",
  cream: "#FAF7F2",
};

const SERIF = "'Cormorant Garamond', serif";
const SANS = "'DM Sans', sans-serif";

// =========================================================================
// CONTENT
// =========================================================================
export const services = [
  {
    slug: "readiness-audit",
    name: "AI Trust & Readiness Audit",
    shortName: "Readiness Audit",
    order: 1,
    duration: "2–4 weeks",
    priceRange: "C$12,000 – C$35,000",
    bestFit: "2–25 lawyer firms, or practice groups inside larger firms",
    oneLiner: "Establish your firm's current AI exposure, workflow readiness, data risk, and best-fit use cases.",
    promise: "In 2–4 weeks, we identify where AI can create value in your firm, where it creates risk, which tools fit, and what your first safe pilot should be.",
    scope: [
      "Current AI tool inventory across practice groups",
      "Unapproved usage review (shadow AI)",
      "Workflow mapping by practice area",
      "Data sensitivity and matter classification review",
      "Practice-area opportunity assessment",
      "Vendor shortlist matched to identified needs",
      "Risk-ranked use-case map",
      "AI readiness score",
      "Recommended first pilot with scope and success metrics",
    ],
    deliverables: [
      "Written readiness report",
      "Risk-ranked use-case map",
      "Vendor shortlist memo",
      "First-pilot recommendation with scope, timeline, and metrics",
      "Executive briefing for partners",
    ],
  },
  {
    slug: "pilot-sprint",
    name: "60-Day AI Pilot Sprint",
    shortName: "Pilot Sprint",
    order: 2,
    duration: "60 days",
    priceRange: "C$25,000 – C$90,000",
    bestFit: "5–50 lawyer firms or one department within a larger firm",
    oneLiner: "Implement one or two controlled AI workflows with clear governance and measurable outcomes.",
    promise: "In 60 days, we launch your first governed AI workflow — with the right tool, the right safeguards, trained users, and measurable results.",
    scope: [
      "One practice group, one named supervising partner, one operations owner",
      "5–20 trained users",
      "Approved tools and approved data classes defined",
      "Lawyer and staff training delivered",
      "Weekly review of outputs and prompts",
      "Metrics dashboard for time saved, rework, and adoption",
      "Go/no-go scale recommendation at day 60",
    ],
    deliverables: [
      "Working AI workflow integrated into the practice group",
      "Pilot governance documentation",
      "Training materials and recordings",
      "Outcomes report with measured ROI",
      "Scale-up roadmap or wind-down plan",
    ],
  },
  {
    slug: "governance-pack",
    name: "AI Governance Pack",
    shortName: "Governance Pack",
    order: 3,
    duration: "3–6 weeks",
    priceRange: "C$15,000 – C$40,000",
    bestFit: "Any firm using or preparing to use AI",
    oneLiner: "The policy and procedural foundation for responsible AI use across your firm.",
    promise: "A complete governance framework — built for LSO obligations, Ontario court expectations, and the realities of legal practice.",
    scope: [
      "AI acceptable-use policy",
      "Approved-tools matrix",
      "Prohibited-use matrix",
      "Client disclosure guidance",
      "Court and tribunal disclosure protocol",
      "Vendor due diligence checklist",
      "Human-review requirements by workflow",
      "Prompt and output audit guidance",
      "Staff and partner training materials",
    ],
    deliverables: [
      "Complete written policy suite, customized to firm",
      "Approved and prohibited use-case matrices",
      "Disclosure protocols for clients, courts, and tribunals",
      "Vendor due diligence template",
      "Implementation roadmap for rollout",
    ],
  },
  {
    slug: "implementation",
    name: "Implementation & Scale-Up",
    shortName: "Implementation",
    order: 4,
    duration: "3–9 months",
    priceRange: "C$60,000 – C$250,000+",
    bestFit: "10–200+ lawyer firms moving from pilot to firm-wide adoption",
    oneLiner: "Move from validated pilot to firm-wide AI adoption — without losing control of governance, quality, or budget.",
    promise: "A structured rollout that preserves what worked in the pilot and adapts it across practices, with measurable adoption and quality safeguards at every stage.",
    scope: [
      "Multi-practice rollout planning",
      "DMS and knowledge management integration",
      "Practice-specific workflow templates",
      "Change management and partner enablement",
      "Adoption dashboards and quality monitoring",
      "Vendor configuration and tenant setup",
      "Role-based training (lawyer, clerk, paralegal, assistant, student)",
      "Internal AI champion enablement",
    ],
    deliverables: [
      "Firm-wide implementation plan",
      "Practice-specific workflow templates",
      "Trained AI champions in each practice group",
      "Adoption and quality dashboards",
      "Ninety-day post-launch governance review",
    ],
  },
  {
    slug: "managed-retainer",
    name: "Managed AI Governance Retainer",
    shortName: "Managed Retainer",
    order: 5,
    duration: "Ongoing",
    priceRange: "C$2,500 – C$20,000 / month",
    bestFit: "Firms with active AI use that need ongoing governance and adoption support",
    oneLiner: "Keep your firm's AI governance current as tools, court rules, privacy expectations, and vendor terms evolve.",
    promise: "Quarterly governance reviews, vendor change monitoring, new use-case approvals, and continuous training — so your AI program stays defensible without dedicated internal headcount.",
    scope: [
      "Quarterly AI policy review",
      "Vendor change and renewal review",
      "New use-case approval workflow",
      "Incident log review",
      "Refresher training for lawyers and staff",
      "Updated court and client disclosure guidance",
      "Adoption and ROI review",
    ],
    deliverables: [
      "Quarterly governance review and updated policy suite",
      "Vendor change advisories",
      "New use-case approvals on demand",
      "Annual ROI and adoption report",
      "Direct access for policy questions",
    ],
  },
];

const trustStack = [
  { layer: "Professional Obligations", question: "Does this use comply with LSO competence, confidentiality, supervision, candour, and tribunal duties?" },
  { layer: "Client Data Protection", question: "What client information enters the system, and under what safeguards?" },
  { layer: "Vendor Controls", question: "Does the vendor train on data, retain prompts, expose data to reviewers, or support audit logs?" },
  { layer: "Matter-Level Rules", question: "Which matters, data classes, and clients are approved or prohibited for AI use?" },
  { layer: "Human Review", question: "Who reviews AI outputs, and what must be verified before they reach a client or court?" },
  { layer: "Source Grounding", question: "Does the tool provide citations, source links, or verifiable document references?" },
  { layer: "Knowledge Governance", question: "Are DMS permissions, ethical walls, and access controls respected by the tool?" },
  { layer: "Disclosure", question: "When must AI use be disclosed to clients, courts, or tribunals?" },
  { layer: "Training", question: "Are lawyers, clerks, paralegals, assistants, and students trained for their specific roles?" },
  { layer: "Monitoring", question: "How will the firm review incidents, adoption, vendor changes, and policy updates over time?" },
];

const problems = [
  { title: "Unmanaged experimentation", body: "Staff are already using ChatGPT, note-taking bots, and browser extensions — often without firm-approved rules or data controls." },
  { title: "Vendor confusion", body: "Harvey, CoCounsel, Lexis+ AI, Clio AI, Microsoft Copilot, Alexi. The landscape is crowded, and the differences matter." },
  { title: "Professional risk", body: "Lawyers remain responsible for confidentiality, supervision, competence, and what gets filed at court. AI doesn't change that." },
  { title: "Workflow uncertainty", body: "Firms know AI can help but don't know which workflows are safe, high-value, and realistic to implement first." },
  { title: "Trust gap", body: "Legal AI outputs need to be reviewable, sourceable, auditable, and correctable. Not every tool delivers that." },
  { title: "Change-management gap", body: "Even purchased tools don't get used consistently without training, governance, and adoption management." },
];

const useCases = [
  { practice: "Litigation", workflow: "Document chronology building and production review", detail: "Compress weeks of associate time into days. AI drafts the chronology; lawyers verify, refine, and direct." },
  { practice: "Labour & Employment", workflow: "Contract review against playbook, summarization of voluminous records", detail: "Standardize first-pass review while preserving lawyer judgment on every meaningful clause." },
  { practice: "Wills & Estates", workflow: "Chronology building, precedent search, instruction intake", detail: "Faster intake, cleaner files, and consistent precedent retrieval across files." },
  { practice: "Real Estate", workflow: "Closing workflow automation, document preparation from templates", detail: "High-volume, template-driven work where AI shortens cycle time without changing the legal product." },
  { practice: "Corporate & Commercial", workflow: "Contract review, due diligence document review", detail: "AI surfaces issues; lawyers escalate, negotiate, and decide. Faster diligence with no loss of judgment." },
  { practice: "Immigration", workflow: "Document preparation from templates, intake summarization", detail: "Repetitive, template-driven workflows that benefit from carefully designed AI assistance." },
];

const whyNowPoints = [
  { headline: "Larger Canadian firms are already integrating AI", body: "BigLaw is piloting CoCounsel, Harvey, and enterprise Copilot deployments. The competitive gap is forming now." },
  { headline: "Legal AI vendors are marketing directly to your associates", body: "Tool selection is being made bottom-up, often without firm-level governance or procurement review." },
  { headline: "Regulatory guidance has caught up", body: "Court directions on AI disclosure, LSO competence expectations, and privacy guidance are now clearer — which makes inaction harder to defend." },
];

const resources = {
  guides: [
    { title: "Ontario Law Firm AI Readiness Checklist", type: "Download", desc: "A practical self-assessment for managing partners and COOs." },
    { title: "Legal AI Vendor Due Diligence Checklist", type: "Download", desc: "The questions to ask before you sign any AI vendor contract." },
    { title: "AI Use Policy Starter Guide", type: "Download", desc: "A foundation for an LSO-aware acceptable-use policy." },
    { title: "First 10 AI Workflows to Evaluate", type: "Download", desc: "Where to start — and where not to — across common practice areas." },
  ],
  articles: [
    { title: "Can Ontario lawyers use ChatGPT?", type: "Article" },
    { title: "What should be in a law firm AI policy?", type: "Article" },
    { title: "Legal AI vs enterprise AI: how to decide", type: "Article" },
    { title: "Why vendor onboarding is not implementation", type: "Article" },
    { title: "AI note-taking bots and privilege risk", type: "Article" },
    { title: "What managing partners should ask before buying AI software", type: "Article" },
  ],
};

// =========================================================================
// MOTION
// =========================================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};
const fadeUpStagger = { visible: { transition: { staggerChildren: 0.12 } } };

// =========================================================================
// SHARED COMPONENTS
// =========================================================================
const Wordmark = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="inline-flex items-baseline gap-1.5 group">
    <span className="text-2xl tracking-tight font-medium" style={{ color: light ? palette.parchment : palette.navy, fontFamily: SERIF }}>Precedent</span>
    <span className="inline-block w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: palette.gold }} />
    <span className="text-2xl tracking-tight font-medium" style={{ color: light ? palette.parchment : palette.navy, fontFamily: SERIF }}>AI</span>
  </Link>
);

type CTAProps = { children: ReactNode; href?: string; to?: string; onClick?: () => void; dark?: boolean };
const PrimaryCTA = ({ children, href, to, onClick, dark = false }: CTAProps) => {
  const cls = "inline-flex items-center gap-2 px-7 py-3.5 font-medium tracking-wide text-sm uppercase transition-all duration-300 group";
  const style = dark ? { backgroundColor: palette.gold, color: palette.navy } : { backgroundColor: palette.navy, color: palette.parchment };
  const inner = (
    <>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  if (to) return <Link to={to} className={cls} style={style}>{inner}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>;
  return <button onClick={onClick} className={cls} style={style}>{inner}</button>;
};

const SecondaryCTA = ({ children, href, to, light = false }: { children: ReactNode; href?: string; to?: string; light?: boolean }) => {
  const cls = "inline-flex items-center gap-2 text-sm tracking-wide uppercase font-medium transition-colors duration-300 group";
  const color = light ? palette.parchment : palette.navy;
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute bottom-[-3px] left-0 w-full h-px" style={{ backgroundColor: palette.gold }} />
      </span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  );
  if (to) return <Link to={to} className={cls} style={{ color }}>{inner}</Link>;
  return <a href={href} className={cls} style={{ color }}>{inner}</a>;
};

const SectionEyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <div className="inline-flex items-center gap-3 mb-6 text-xs tracking-[0.2em] uppercase font-medium" style={{ color: light ? palette.gold : palette.goldDeep }}>
    <span className="w-8 h-px" style={{ backgroundColor: light ? palette.gold : palette.goldDeep }} />
    {children}
  </div>
);

// =========================================================================
// HEADER
// =========================================================================
export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const lightHeader = isHome && !scrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ backgroundColor: lightHeader ? "transparent" : palette.parchment, borderBottom: scrolled ? `1px solid ${palette.smoke}` : "1px solid transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <Wordmark light={lightHeader} />
        <nav className="hidden lg:flex items-center gap-10 text-sm tracking-wide">
          <Link to="/services" className="font-medium" style={{ color: lightHeader ? palette.parchment : palette.charcoal }}>Services</Link>
          <Link to="/about" className="font-medium" style={{ color: lightHeader ? palette.parchment : palette.charcoal }}>About</Link>
          <Link to="/resources" className="font-medium" style={{ color: lightHeader ? palette.parchment : palette.charcoal }}>Resources</Link>
          <PrimaryCTA to="/contact" dark={lightHeader}>Book a Call</PrimaryCTA>
        </nav>
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span className="w-6 h-px" style={{ backgroundColor: lightHeader ? palette.parchment : palette.charcoal }} />
          <span className="w-6 h-px" style={{ backgroundColor: lightHeader ? palette.parchment : palette.charcoal }} />
          <span className="w-6 h-px" style={{ backgroundColor: lightHeader ? palette.parchment : palette.charcoal }} />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="lg:hidden overflow-hidden" style={{ backgroundColor: palette.parchment }}>
            <nav className="flex flex-col gap-1 px-6 py-6 text-base">
              <Link to="/services" className="py-3 border-b" style={{ color: palette.charcoal, borderColor: palette.smoke }}>Services</Link>
              <Link to="/about" className="py-3 border-b" style={{ color: palette.charcoal, borderColor: palette.smoke }}>About</Link>
              <Link to="/resources" className="py-3 border-b" style={{ color: palette.charcoal, borderColor: palette.smoke }}>Resources</Link>
              <Link to="/contact" className="py-3" style={{ color: palette.charcoal }}>Contact</Link>
              <div className="pt-4"><PrimaryCTA to="/contact">Book a Readiness Call</PrimaryCTA></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// =========================================================================
// FOOTER
// =========================================================================
export const Footer = () => (
  <footer style={{ backgroundColor: palette.navyDeep, color: palette.parchment }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Wordmark light />
          <p className="mt-6 max-w-sm text-base leading-relaxed" style={{ color: palette.parchment, opacity: 0.75, fontFamily: SANS }}>
            Legal AI implementation and governance for Ontario law firms. Vendor-neutral. Workflow-specific. Built around privilege, supervision, and proof.
          </p>
          <div className="mt-8">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-base font-medium underline-offset-4 hover:underline" style={{ color: palette.gold }}>{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-5 font-medium" style={{ color: palette.gold }}>Services</h4>
          <ul className="space-y-3 text-sm" style={{ fontFamily: SANS }}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} style={{ color: palette.parchment, opacity: 0.75 }}>{s.shortName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-5 font-medium" style={{ color: palette.gold }}>Firm</h4>
          <ul className="space-y-3 text-sm" style={{ fontFamily: SANS }}>
            <li><Link to="/about" style={{ color: palette.parchment, opacity: 0.75 }}>About</Link></li>
            <li><Link to="/resources" style={{ color: palette.parchment, opacity: 0.75 }}>Resources</Link></li>
            <li><Link to="/contact" style={{ color: palette.parchment, opacity: 0.75 }}>Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-5 font-medium" style={{ color: palette.gold }}>Get Started</h4>
          <p className="text-sm mb-4" style={{ color: palette.parchment, opacity: 0.75, fontFamily: SANS }}>
            Book a short consultation to discuss your firm's workflows, current tools, and readiness for implementation.
          </p>
          <PrimaryCTA to="/contact" dark>Book a Call</PrimaryCTA>
        </div>
      </div>
      <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs" style={{ borderTop: `1px solid ${palette.navy}`, color: palette.parchment, opacity: 0.55, fontFamily: SANS }}>
        <p>© {new Date().getFullYear()} Precedent AI. All rights reserved.</p>
        <p className="max-w-md md:text-right">Precedent AI is a consultancy. We are not a law firm and do not provide legal advice.</p>
      </div>
    </div>
  </footer>
);

// =========================================================================
// HOME SECTIONS
// =========================================================================
const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden" style={{ backgroundColor: palette.navy }}>
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(135deg, ${palette.parchment} 0px, ${palette.parchment} 1px, transparent 1px, transparent 80px)` }} />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
      <motion.div initial="hidden" animate="visible" variants={fadeUpStagger} className="max-w-5xl">
        <motion.div variants={fadeUp}><SectionEyebrow light>Legal AI Implementation · Ontario</SectionEyebrow></motion.div>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-10" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
          AI is entering Ontario law firms.<br />
          <span style={{ color: palette.gold }}>We make sure it enters safely.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
          We help Ontario law firms identify the right AI use cases, select the right tools, build the right governance, and launch measurable pilots — without compromising client confidentiality, privilege, or professional responsibility.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <PrimaryCTA href={HUBSPOT_MEETINGS_URL} dark>Book an AI Readiness Call</PrimaryCTA>
          <SecondaryCTA to="/resources" light>Download the Readiness Checklist</SecondaryCTA>
        </motion.div>
      </motion.div>
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase" style={{ color: palette.parchment, opacity: 0.5, fontFamily: SANS }}>
      Scroll
    </motion.div>
  </section>
);

const ProblemSection = () => (
  <section className="py-28 lg:py-36" style={{ backgroundColor: palette.navy }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="max-w-4xl mb-20">
        <motion.div variants={fadeUp}><SectionEyebrow light>The Reality</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
          AI is already in your firm.<br />The question is whether it's governed.
        </motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {problems.map((p) => (
          <motion.div key={p.title} variants={fadeUp} className="pl-6 border-l" style={{ borderColor: palette.gold }}>
            <h3 className="text-2xl mb-3 leading-tight" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>{p.title}</h3>
            <p className="text-base leading-relaxed" style={{ color: palette.parchment, opacity: 0.75, fontFamily: SANS }}>{p.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const WhyNowSection = () => (
  <section className="py-28 lg:py-36" style={{ backgroundColor: palette.parchment }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <motion.div variants={fadeUp}><SectionEyebrow>Why Now</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl leading-tight tracking-tight mb-8" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
            The window between early adoption and competitive disadvantage is closing.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
            The firms that benefit won't be the ones that chase every new tool. They'll be the ones that choose the right workflows, protect client data, train their people, and keep lawyers in control.
          </motion.p>
        </div>
        <div className="lg:col-span-7 lg:pl-12">
          <motion.div variants={fadeUpStagger} className="space-y-10">
            {whyNowPoints.map((point, idx) => (
              <motion.div key={point.headline} variants={fadeUp} className="flex gap-6">
                <div className="text-3xl shrink-0" style={{ color: palette.gold, fontFamily: SERIF }}>{String(idx + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="text-2xl mb-3 leading-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{point.headline}</h3>
                  <p className="text-base leading-relaxed" style={{ color: palette.charcoal, opacity: 0.85, fontFamily: SANS }}>{point.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const FounderCard = ({ name, role, bullets }: { name: string; role: string; bullets: string[] }) => (
  <motion.div variants={fadeUp}>
    <div className="aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center" style={{ backgroundColor: palette.navy, color: palette.gold, fontFamily: SERIF }}>
      <span className="text-sm tracking-[0.2em] uppercase opacity-60">[ Photo: {name} ]</span>
    </div>
    <h3 className="text-3xl mb-2 leading-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{name}</h3>
    <p className="text-sm tracking-wide uppercase mb-5 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>{role}</p>
    <ul className="space-y-3 text-base leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
      {bullets.map((b) => <li key={b}>{b}</li>)}
    </ul>
  </motion.div>
);

const WhyUsSection = () => (
  <section className="py-28 lg:py-36" style={{ backgroundColor: palette.smoke }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="max-w-4xl mb-20">
        <motion.div variants={fadeUp}><SectionEyebrow>The Team</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
          AI advice for law firms should come from people who understand legal practice.
        </motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUpStagger} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <FounderCard name="Dan Michaelson" role="The Litigator · Co-founder" bullets={[
          "25 years as a practicing Ontario litigator",
          "First-hand understanding of litigation workflows, court expectations, and professional responsibility",
          "Practical judgment about where AI should — and shouldn't — be used in legal practice",
        ]} />
        <FounderCard name="Dan Flatt" role="The Technologist · Co-founder" bullets={[
          "Former Ontario lawyer",
          "Specialist in custom AI implementation, workflow design, and technology strategy",
          "Bridges legal practice and technical execution — building AI systems that fit how legal work actually happens",
        ]} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-20 pt-12 border-t flex flex-col md:flex-row gap-8 justify-between items-start md:items-center" style={{ borderColor: palette.parchment }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {["Vendor-neutral", "Ontario-focused", "Legal-workflow-specific", "ROI-measured"].map((label) => (
            <div key={label}>
              <div className="w-2 h-2 mb-3" style={{ backgroundColor: palette.gold }} />
              <p className="text-sm tracking-wide font-medium" style={{ color: palette.navy, fontFamily: SANS }}>{label}</p>
            </div>
          ))}
        </div>
        <SecondaryCTA to="/about">Read our story</SecondaryCTA>
      </motion.div>
    </div>
  </section>
);

const ServicesOverviewSection = () => (
  <section className="py-28 lg:py-36" style={{ backgroundColor: palette.parchment }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="max-w-4xl mb-20">
        <motion.div variants={fadeUp}><SectionEyebrow>How We Work</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
          A clear path from AI readiness to governed adoption.
        </motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="space-y-4">
        {services.map((service) => (
          <motion.div key={service.slug} variants={fadeUp}>
            <Link to="/services/$slug" params={{ slug: service.slug }} className="group block border-t transition-all duration-500 py-8 hover:pl-4" style={{ borderColor: palette.smoke }}>
              <div className="grid grid-cols-12 gap-6 items-baseline">
                <div className="col-span-12 md:col-span-1"><span className="text-2xl" style={{ color: palette.gold, fontFamily: SERIF }}>{String(service.order).padStart(2, "0")}</span></div>
                <div className="col-span-12 md:col-span-4"><h3 className="text-3xl leading-tight group-hover:opacity-80" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{service.name}</h3></div>
                <div className="col-span-12 md:col-span-5"><p className="text-base leading-relaxed" style={{ color: palette.charcoal, opacity: 0.85, fontFamily: SANS }}>{service.oneLiner}</p></div>
                <div className="col-span-12 md:col-span-2 text-left md:text-right">
                  <p className="text-xs tracking-wide uppercase font-medium mb-1" style={{ color: palette.muted, fontFamily: SANS }}>{service.duration}</p>
                  <p className="text-sm" style={{ color: palette.navy, fontFamily: SANS }}>{service.priceRange}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12 pt-12 border-t" style={{ borderColor: palette.smoke }}>
        <SecondaryCTA to="/services">See all services in detail</SecondaryCTA>
      </div>
    </div>
  </section>
);

const TrustStackSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="py-28 lg:py-36" style={{ backgroundColor: palette.navy }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp}><SectionEyebrow light>Our Framework</SectionEyebrow></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl leading-tight tracking-tight mb-8" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>The Legal AI Trust Stack</motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-6" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
              Every implementation we design is evaluated against ten trust layers — built for LSO obligations, Ontario court expectations, and the realities of legal practice.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: palette.gold, fontFamily: SANS }}>
              This is why we can tell you not just <em>which</em> tool to use — but <em>whether</em> to use it, for what, and under what conditions.
            </motion.p>
          </div>
          <div className="lg:col-span-7">
            <motion.div variants={fadeUpStagger} className="space-y-px" style={{ backgroundColor: palette.navyDeep }}>
              {trustStack.map((item, idx) => (
                <motion.div key={item.layer} variants={fadeUp}>
                  <button onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} className="w-full text-left py-5 px-6 flex items-center justify-between gap-6 transition-colors duration-300" style={{ backgroundColor: openIndex === idx ? palette.navyDeep : "transparent" }}>
                    <div className="flex items-baseline gap-5">
                      <span className="text-sm shrink-0" style={{ color: palette.gold, fontFamily: SERIF }}>{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-xl leading-tight" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>{item.layer}</span>
                    </div>
                    <span className="text-2xl transition-transform duration-300 shrink-0" style={{ color: palette.gold, transform: openIndex === idx ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="pb-6 px-6 pl-16">
                          <p className="text-base leading-relaxed" style={{ color: palette.parchment, opacity: 0.8, fontFamily: SANS }}>{item.question}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const UseCasesSection = () => (
  <section className="py-28 lg:py-36" style={{ backgroundColor: palette.parchment }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="max-w-4xl mb-20">
        <motion.div variants={fadeUp}><SectionEyebrow>Use Cases</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
          AI that fits how your practice actually works.
        </motion.h2>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: palette.smoke }}>
        {useCases.map((u) => (
          <motion.div key={u.practice} variants={fadeUp} className="p-8 lg:p-10" style={{ backgroundColor: palette.parchment }}>
            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4" style={{ color: palette.goldDeep, fontFamily: SANS }}>{u.practice}</p>
            <h3 className="text-2xl leading-tight mb-4" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{u.workflow}</h3>
            <p className="text-base leading-relaxed" style={{ color: palette.charcoal, opacity: 0.8, fontFamily: SANS }}>{u.detail}</p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-12 max-w-2xl text-base italic" style={{ color: palette.muted, fontFamily: SANS }}>
        Not every workflow is appropriate for every tool. We map your practice area first, then match the right AI approach.
      </p>
    </div>
  </section>
);

const LeadMagnetSection = () => (
  <section className="py-28 lg:py-36 relative overflow-hidden" style={{ backgroundColor: palette.navyDeep }}>
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(135deg, ${palette.parchment} 0px, ${palette.parchment} 1px, transparent 1px, transparent 80px)` }} />
    <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUpStagger} className="text-center">
        <motion.div variants={fadeUp} className="flex justify-center"><SectionEyebrow light>Free Resource</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
          Start with the Ontario Law Firm<br /><span style={{ color: palette.gold }}>AI Readiness Checklist.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
          A practical self-assessment covering current tool inventory, shadow AI usage, practice-area opportunities, data sensitivity, vendor selection criteria, and governance gaps. Free. No sales call required.
        </motion.p>
        <motion.div variants={fadeUp} className="max-w-md mx-auto">
          <div className="p-8 text-left" style={{ backgroundColor: palette.navy, border: `1px solid ${palette.gold}` }}>
            <div className="space-y-4 mb-6">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-transparent border outline-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} />
              <input type="text" placeholder="Firm" className="w-full px-4 py-3 bg-transparent border outline-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-transparent border outline-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} />
            </div>
            <button className="w-full py-4 font-medium text-sm tracking-wide uppercase" style={{ backgroundColor: palette.gold, color: palette.navy }}>
              Download the Checklist →
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: palette.parchment, opacity: 0.5, fontFamily: SANS }}>
            We won't email you marketing junk. Just the checklist, and occasional governance updates if you want them.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="py-28 lg:py-40" style={{ backgroundColor: palette.parchment }}>
    <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUpStagger}>
        <motion.div variants={fadeUp} className="flex justify-center"><SectionEyebrow>Get Started</SectionEyebrow></motion.div>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-8" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
          Find your firm's safest, highest-value AI starting point.
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto leading-relaxed mb-12" style={{ color: palette.charcoal, fontFamily: SANS }}>
          Book a short consultation to discuss your firm's workflows, current tools, risk concerns, and readiness for implementation. No commitment — just a practical conversation.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <PrimaryCTA href={HUBSPOT_MEETINGS_URL}>Book an AI Readiness Call</PrimaryCTA>
          <SecondaryCTA href={`mailto:${CONTACT_EMAIL}`}>Or email us directly</SecondaryCTA>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// =========================================================================
// PAGES
// =========================================================================
export const HomePage = () => (
  <>
    <Hero />
    <ProblemSection />
    <WhyNowSection />
    <WhyUsSection />
    <ServicesOverviewSection />
    <TrustStackSection />
    <UseCasesSection />
    <LeadMagnetSection />
    <FinalCTASection />
  </>
);

const FounderDetail = ({ name, role, paragraphs, reverse = false }: { name: string; role: string; paragraphs: string[]; reverse?: boolean }) => (
  <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
    <div className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}>
      <div className="aspect-[4/5] flex items-center justify-center" style={{ backgroundColor: palette.navy, color: palette.gold }}>
        <span className="text-sm tracking-[0.2em] uppercase opacity-60">[ Photo: {name} ]</span>
      </div>
    </div>
    <div className={`md:col-span-7 ${reverse ? "md:order-1" : ""}`}>
      <SectionEyebrow>{role}</SectionEyebrow>
      <h2 className="text-4xl md:text-5xl leading-tight tracking-tight mb-6" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{name}</h2>
      <div className="space-y-5 text-lg leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  </motion.div>
);

export const AboutPage = () => (
  <>
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32" style={{ backgroundColor: palette.navy }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUpStagger}>
          <motion.div variants={fadeUp}><SectionEyebrow light>About Precedent AI</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
            Built by people who understand both law and AI implementation.
          </motion.h1>
        </motion.div>
      </div>
    </section>
    <section className="py-24 lg:py-32" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger}>
          <motion.div variants={fadeUp}><SectionEyebrow>Our Story</SectionEyebrow></motion.div>
          <motion.div variants={fadeUp} className="space-y-6 text-lg leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
            <p>Precedent AI was created to solve a problem both founders saw from different sides: Ontario law firms know AI is becoming important, but most don't have a safe, practical way to implement it.</p>
            <p>On one side, lawyers were facing real pressure — from clients, from competing firms, from associates who were already experimenting with ChatGPT — to adopt AI in their practice. On the other side, AI implementation expertise was being applied everywhere except law, where it was needed most.</p>
            <p>Dan Michaelson has spent 25 years as an Ontario litigator. He has lived inside the workflows, the time pressures, the professional obligations, and the client expectations that define legal practice. Dan Flatt began his career as an Ontario lawyer and now specializes in custom AI implementation, technology strategy, and the marketing operations that surround them.</p>
            <p>Together, they help law firms move beyond generic AI advice and into governed workflows that fit the realities of legal practice.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
    <section className="py-24 lg:py-32" style={{ backgroundColor: palette.smoke }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUpStagger} className="space-y-24">
          <FounderDetail name="Dan Michaelson" role="Co-founder · The Litigator" paragraphs={[
            "Dan has practiced as an Ontario litigator for twenty-five years. His files have spanned commercial disputes, professional liability, and complex civil matters — the kinds of work where document volume, chronology accuracy, and client communication matter most.",
            "His perspective on AI is shaped by what he has done day-to-day: read thousands of pages of productions, drafted motion records under tight deadlines, supervised junior lawyers and clerks, and faced the professional consequences when something is wrong.",
            "He co-founded Precedent AI because he saw both the genuine productivity opportunity and the very real risk of firms adopting AI without thinking carefully about confidentiality, supervision, and what gets filed at court.",
          ]} />
          <FounderDetail reverse name="Dan Flatt" role="Co-founder · The Technologist" paragraphs={[
            "Dan began his career as an Ontario lawyer. He understood the work, the time pressures, and the kinds of repetitive document-heavy tasks that consume associate hours without producing proportionate value.",
            "He moved into technology and now specializes in custom AI implementation — building workflows that integrate with how teams already work, rather than asking them to change everything around a new tool. His engagements have spanned document automation, AI-powered research and review, marketing operations, and integrated systems for service businesses.",
            "He co-founded Precedent AI to apply that implementation expertise to the profession he started in — where the stakes for getting it right, and the cost of getting it wrong, are both real.",
          ]} />
        </motion.div>
      </div>
    </section>
    <section className="py-24 lg:py-32" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="max-w-3xl mb-16">
          <motion.div variants={fadeUp}><SectionEyebrow>What We Are — And Aren't</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
            We sit between the categories that don't fit your firm.
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUpStagger} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { headline: "We are not a software vendor", body: "We are vendor-neutral. We can recommend Harvey, CoCounsel, Lexis+ AI, Copilot, or a custom build — whichever actually fits your firm." },
            { headline: "We are not a generic AI consultancy", body: "We specialize in law firm workflows, LSO obligations, and Ontario court expectations. Not retail. Not banking. Not \"any industry.\"" },
            { headline: "We are not just trainers", body: "We help implement working systems — governance, workflow design, tool configuration, and measured pilots — not just slide decks and lunch-and-learns." },
            { headline: "We are not replacing lawyers", body: "We design lawyer-supervised workflows where AI accelerates production but lawyers retain judgment, supervision, and final accountability." },
          ].map((item) => (
            <motion.div key={item.headline} variants={fadeUp}>
              <div className="w-8 h-px mb-5" style={{ backgroundColor: palette.gold }} />
              <h3 className="text-2xl mb-3 leading-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{item.headline}</h3>
              <p className="text-base leading-relaxed" style={{ color: palette.charcoal, opacity: 0.85, fontFamily: SANS }}>{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <FinalCTASection />
  </>
);

export const ServicesPage = () => (
  <>
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32" style={{ backgroundColor: palette.navy }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUpStagger}>
          <motion.div variants={fadeUp}><SectionEyebrow light>Services</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
            From AI readiness to governed adoption — five engagements designed for the realities of legal practice.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl leading-relaxed" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
            Each service is productized with defined scope, deliverables, and price range. Most firms start with the Readiness Audit and proceed from there.
          </motion.p>
        </motion.div>
      </div>
    </section>
    <section className="py-24 lg:py-32" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="space-y-px" style={{ backgroundColor: palette.smoke }}>
          {services.map((service) => (
            <motion.div key={service.slug} variants={fadeUp} className="p-8 lg:p-12" style={{ backgroundColor: palette.parchment }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-1"><span className="text-3xl" style={{ color: palette.gold, fontFamily: SERIF }}>{String(service.order).padStart(2, "0")}</span></div>
                <div className="lg:col-span-7">
                  <h2 className="text-3xl md:text-4xl leading-tight mb-4" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{service.name}</h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: palette.charcoal, fontFamily: SANS }}>{service.oneLiner}</p>
                  <p className="text-base italic leading-relaxed mb-6" style={{ color: palette.muted, fontFamily: SANS }}>{service.promise}</p>
                  <Link to="/services/$slug" params={{ slug: service.slug }} className="inline-flex items-center gap-2 text-sm tracking-wide uppercase font-medium group" style={{ color: palette.navy }}>
                    <span className="relative">View full scope<span className="absolute bottom-[-3px] left-0 w-full h-px" style={{ backgroundColor: palette.gold }} /></span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <div className="lg:col-span-4">
                  <div className="space-y-5">
                    <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>Duration</p><p className="text-base" style={{ color: palette.navy, fontFamily: SANS }}>{service.duration}</p></div>
                    <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>Investment</p><p className="text-base" style={{ color: palette.navy, fontFamily: SANS }}>{service.priceRange}</p></div>
                    <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>Best Fit</p><p className="text-base leading-snug" style={{ color: palette.navy, fontFamily: SANS }}>{service.bestFit}</p></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <FinalCTASection />
  </>
);

export const ServiceDetailPage = ({ slug }: { slug: string }) => {
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return (
      <section className="pt-40 pb-24" style={{ backgroundColor: palette.navy }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <h1 className="text-4xl mb-6" style={{ color: palette.parchment, fontFamily: SERIF }}>Service not found</h1>
          <Link to="/services" style={{ color: palette.gold }}>← All Services</Link>
        </div>
      </section>
    );
  }
  const nextService = services.find((s) => s.order === service.order + 1);
  return (
    <>
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-28" style={{ backgroundColor: palette.navy }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUpStagger}>
            <motion.div variants={fadeUp} className="mb-8">
              <Link to="/services" className="inline-flex items-center gap-2 text-sm tracking-wide" style={{ color: palette.gold, fontFamily: SANS }}><span>←</span> All Services</Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-baseline gap-6 mb-6">
              <span className="text-3xl" style={{ color: palette.gold, fontFamily: SERIF }}>{String(service.order).padStart(2, "0")}</span>
              <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Service · {service.duration}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8 max-w-4xl" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>{service.name}</motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl max-w-3xl leading-relaxed" style={{ color: palette.parchment, opacity: 0.9, fontFamily: SERIF }}>{service.promise}</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 lg:py-32" style={{ backgroundColor: palette.parchment }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger}>
                <motion.div variants={fadeUp}><SectionEyebrow>Scope</SectionEyebrow></motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl leading-tight tracking-tight mb-8" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>What's included</motion.h2>
                <motion.ul variants={fadeUpStagger} className="space-y-3">
                  {service.scope.map((item) => (
                    <motion.li key={item} variants={fadeUp} className="flex gap-4 text-base leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
                      <span style={{ color: palette.gold }}>—</span><span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger}>
                <motion.div variants={fadeUp}><SectionEyebrow>Deliverables</SectionEyebrow></motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl leading-tight tracking-tight mb-8" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>What you take away</motion.h2>
                <motion.ul variants={fadeUpStagger} className="space-y-3">
                  {service.deliverables.map((item) => (
                    <motion.li key={item} variants={fadeUp} className="flex gap-4 text-base leading-relaxed" style={{ color: palette.charcoal, fontFamily: SANS }}>
                      <span style={{ color: palette.gold }}>—</span><span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8" style={{ backgroundColor: palette.navy }}>
                <h3 className="text-xl mb-6" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>At a glance</h3>
                <div className="space-y-5 mb-8">
                  <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Duration</p><p className="text-base" style={{ color: palette.parchment, fontFamily: SANS }}>{service.duration}</p></div>
                  <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Investment</p><p className="text-base" style={{ color: palette.parchment, fontFamily: SANS }}>{service.priceRange}</p></div>
                  <div><p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Best Fit</p><p className="text-base leading-snug" style={{ color: palette.parchment, fontFamily: SANS }}>{service.bestFit}</p></div>
                </div>
                <PrimaryCTA href={HUBSPOT_MEETINGS_URL} dark>Book a Call</PrimaryCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
      {nextService && (
        <section className="py-20" style={{ backgroundColor: palette.smoke }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link to="/services/$slug" params={{ slug: nextService.slug }} className="block group">
              <p className="text-xs tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>Next Service →</p>
              <h3 className="text-3xl md:text-4xl leading-tight group-hover:opacity-70" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>
                {String(nextService.order).padStart(2, "0")} · {nextService.name}
              </h3>
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export const ResourcesPage = () => (
  <>
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32" style={{ backgroundColor: palette.navy }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUpStagger}>
          <motion.div variants={fadeUp}><SectionEyebrow light>Resources</SectionEyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
            Practical guidance for Ontario law firms adopting AI.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl leading-relaxed" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
            Free guides, articles, and frameworks — written for managing partners, COOs, and practice leaders considering AI adoption.
          </motion.p>
        </motion.div>
      </div>
    </section>
    <section className="py-20 lg:py-24" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" style={{ backgroundColor: palette.navy }}>
          <div className="lg:col-span-8">
            <motion.p variants={fadeUp} className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Featured Resource · Free Download</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl leading-tight tracking-tight mb-6" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
              Ontario Law Firm AI Readiness Checklist
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
              A practical self-assessment covering tool inventory, shadow AI usage, practice-area opportunities, data sensitivity, vendor criteria, and governance gaps.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="lg:col-span-4"><PrimaryCTA href="#checklist-download" dark>Download Free</PrimaryCTA></motion.div>
        </motion.div>
      </div>
    </section>
    <section className="py-24" style={{ backgroundColor: palette.parchment }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="mb-12">
          <motion.div variants={fadeUp}><SectionEyebrow>Guides</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>Practical frameworks and checklists</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: palette.smoke }}>
          {resources.guides.map((guide) => (
            <motion.a key={guide.title} href="#" variants={fadeUp} className="p-8 lg:p-10 group block" style={{ backgroundColor: palette.parchment }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: palette.goldDeep, fontFamily: SANS }}>{guide.type}</p>
              <h3 className="text-2xl leading-tight mb-3" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{guide.title}</h3>
              <p className="text-base leading-relaxed mb-5" style={{ color: palette.charcoal, opacity: 0.8, fontFamily: SANS }}>{guide.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm tracking-wide uppercase font-medium" style={{ color: palette.navy }}>
                Download<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
    <section className="py-24" style={{ backgroundColor: palette.smoke }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpStagger} className="mb-12">
          <motion.div variants={fadeUp}><SectionEyebrow>Articles</SectionEyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl leading-tight tracking-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>Field notes from legal AI implementation</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpStagger} className="space-y-px" style={{ backgroundColor: palette.parchment }}>
          {resources.articles.map((article) => (
            <motion.a key={article.title} href="#" variants={fadeUp} className="py-6 px-8 group flex items-center justify-between gap-6 transition-all duration-300 hover:pl-12" style={{ backgroundColor: palette.smoke }}>
              <h3 className="text-xl md:text-2xl leading-tight" style={{ color: palette.navy, fontFamily: SERIF, fontWeight: 500 }}>{article.title}</h3>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 shrink-0" style={{ color: palette.gold }}>→</span>
            </motion.a>
          ))}
        </motion.div>
        <p className="mt-12 text-base italic" style={{ color: palette.muted, fontFamily: SANS }}>
          New articles publish regularly. Subscribe via the checklist download to be notified.
        </p>
      </div>
    </section>
    <FinalCTASection />
  </>
);

const ContactInput = ({ placeholder, type = "text" }: { placeholder: string; type?: string }) => (
  <input type={type} placeholder={placeholder} className="w-full px-4 py-3 bg-transparent border outline-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} />
);
const ContactSelect = ({ placeholder, children }: { placeholder: string; children: ReactNode }) => (
  <select className="w-full px-4 py-3 bg-transparent border outline-none appearance-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} defaultValue="">
    <option value="" disabled>{placeholder}</option>
    {children}
  </select>
);

export const ContactPage = () => (
  <section className="pt-40 pb-24 lg:pt-48 lg:pb-32" style={{ backgroundColor: palette.navy }}>
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <motion.div initial="hidden" animate="visible" variants={fadeUpStagger}>
            <motion.div variants={fadeUp}><SectionEyebrow light>Contact</SectionEyebrow></motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-8" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>
              Find your firm's safest, highest-value AI starting point.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-10" style={{ color: palette.parchment, opacity: 0.85, fontFamily: SANS }}>
              Book a short consultation to discuss your firm's workflows, current tools, risk concerns, and readiness for implementation.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Book Directly</p>
                <a href={HUBSPOT_MEETINGS_URL} target="_blank" rel="noopener noreferrer" className="text-lg underline-offset-4 hover:underline" style={{ color: palette.parchment, fontFamily: SANS }}>Schedule a 30-minute call →</a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg underline-offset-4 hover:underline" style={{ color: palette.parchment, fontFamily: SANS }}>{CONTACT_EMAIL}</a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: palette.gold, fontFamily: SANS }}>Based In</p>
                <p className="text-lg" style={{ color: palette.parchment, fontFamily: SANS }}>Toronto, Ontario</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="p-8 lg:p-10" style={{ backgroundColor: palette.navyDeep }}>
            <h2 className="text-2xl mb-8" style={{ color: palette.parchment, fontFamily: SERIF, fontWeight: 500 }}>Or send us a message</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ContactInput placeholder="Name" /><ContactInput placeholder="Firm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ContactInput placeholder="Role" /><ContactInput placeholder="Email" type="email" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ContactSelect placeholder="Firm size">
                  <option>Solo / 2–4 lawyers</option><option>5–9 lawyers</option><option>10–24 lawyers</option><option>25–50 lawyers</option><option>50–100 lawyers</option><option>100+ lawyers</option>
                </ContactSelect>
                <ContactSelect placeholder="Practice area">
                  <option>Litigation</option><option>Labour & Employment</option><option>Wills & Estates</option><option>Real Estate</option><option>Corporate / Commercial</option><option>Insurance Defence</option><option>Immigration</option><option>Other</option>
                </ContactSelect>
              </div>
              <ContactSelect placeholder="Main concern">
                <option>Confidentiality / privilege</option><option>Tool selection</option><option>Workflow automation</option><option>Staff training</option><option>Governance / policy</option><option>Custom implementation</option><option>Not sure where to start</option>
              </ContactSelect>
              <ContactInput placeholder="Current AI tools being used (if any)" />
              <textarea placeholder="Tell us about your firm and what you're hoping to accomplish" rows={5} className="w-full px-4 py-3 bg-transparent border outline-none resize-none" style={{ borderColor: palette.muted, color: palette.parchment, fontFamily: SANS }} />
              <button className="w-full py-4 font-medium text-sm tracking-wide uppercase mt-4" style={{ backgroundColor: palette.gold, color: palette.navy }}>
                Book an AI Readiness Call →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

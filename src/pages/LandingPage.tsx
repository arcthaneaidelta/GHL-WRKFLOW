import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  GitBranch,
  CreditCard,
  UserCheck,
  Activity,
  PhoneCall,
  BarChart3,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Building,
  Menu,
  X,
  Send,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';

// Interactive Architecture Nodes
interface ArchNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  description: string;
  workflows: string[];
  samplePayload: string;
  route: string;
}

const architectureNodes: ArchNode[] = [
  {
    id: 'ghl-core',
    name: 'GoHighLevel Core',
    category: 'Central Orchestrator',
    x: 50,
    y: 50,
    description: 'Central workflow trigger engine, subaccount router, custom value manager, and unified CRM contact repository.',
    workflows: ['All Active Sequences', 'Tag Triggers', 'Custom Value Synchronization'],
    samplePayload: '{\n  "engine": "GHL_v2",\n  "status": "OPERATIONAL",\n  "active_instances": 2\n}',
    route: '/app/workflows'
  },
  {
    id: 'biz-alpha',
    name: 'Business Alpha (DTC Funnels)',
    category: 'Digital Products',
    x: 20,
    y: 25,
    description: 'High-volume digital training products, 1-click upsells, abandoned cart sequences, and student LMS onboarding.',
    workflows: ['wf-cart-rec-01', 'wf-upsell-eval-03', 'wf-pay-fail-02'],
    samplePayload: '{\n  "subaccount": "Apex Academy Online",\n  "monthly_rev": "$142,850",\n  "cart_recovery_rate": "18.4%"\n}',
    route: '/app/carts'
  },
  {
    id: 'biz-beta',
    name: 'Business Beta (Advisory)',
    category: 'B2B Consulting',
    x: 80,
    y: 25,
    description: 'Multi-touch B2B lead qualification, round-robin calendar booking, SMS reminders, and contract onboarding.',
    workflows: ['wf-appt-remind-04', 'wf-lead-qual-09', 'wf-no-show-14'],
    samplePayload: '{\n  "subaccount": "Vanguard Advisory",\n  "monthly_rev": "$189,400",\n  "show_up_rate": "92.1%"\n}',
    route: '/app/appointments'
  },
  {
    id: 'node-payments',
    name: 'Stripe & Authorize.net',
    category: 'Payment Infrastructure',
    x: 18,
    y: 75,
    description: 'Tokenized 1-click checkout charges, recurring subscription dunning, chargeback detection, and payout attribution.',
    workflows: ['wf-pay-fail-02', 'wf-upsell-eval-03', 'wf-dispute-alert-20'],
    samplePayload: '{\n  "processor": "Stripe",\n  "tls_mode": "1.3",\n  "dunning_retries": "3_tier"\n}',
    route: '/app/payments'
  },
  {
    id: 'node-telecom',
    name: 'Twilio & Vonage Global',
    category: 'SMS & Voice Routing',
    x: 82,
    y: 75,
    description: 'International E.164 routing, 10DLC registration, DND quiet-hour compliance, and automated carrier fallback.',
    workflows: ['wf-sms-routing-05', 'wf-intl-sms-18'],
    samplePayload: '{\n  "primary": "Twilio_Tier1",\n  "fallback": "Vonage_Direct",\n  "failover_latency": "1.2s"\n}',
    route: '/app/communications'
  },
  {
    id: 'node-webhooks',
    name: 'Webhook & Zapier Bridge',
    category: 'External APIs',
    x: 50,
    y: 85,
    description: 'Idempotent webhook listener with exponential backoff retries, dead letter queue, and cross-platform CRM sync.',
    workflows: ['wf-webhook-retry-06', 'wf-zapier-sync-19'],
    samplePayload: '{\n  "queue_depth": 0,\n  "retry_budget": 5,\n  "avg_processing": "142ms"\n}',
    route: '/app/webhooks'
  }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedArchNode, setSelectedArchNode] = useState<ArchNode>(architectureNodes[0]);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [activeArchLayer, setActiveArchLayer] = useState(0);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    business: '',
    requirements: '',
    message: ''
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scroll opacity detector
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Abstract subtle background canvas animation (PRD Section 5.2)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = 28;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(82, 125, 107, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = 'rgba(82, 125, 107, 0.4)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setContactSuccess(true);
  };

  const architectureLayers = [
    {
      title: 'Layer 1: Business Operations & Subaccounts',
      subtitle: 'Apex Academy (Digital) & Vanguard Advisory (B2B)',
      description: 'Separate multi-tenant client environments preserving distinct branding, custom values, Stripe accounts, and phone pools with unified governance.',
      components: ['Subaccount Isolation', 'Role-Based Access Control', 'Custom Values Sync', 'Deduplication Firewall'],
      failurePoints: 'Contact collision across brands, misattributed ad UTMs',
      monitoring: 'Automated deduplication worker & cross-tenant audit alerts'
    },
    {
      title: 'Layer 2: Workflow Orchestration Engine',
      subtitle: 'Deterministic Multi-Branch Automations',
      description: 'Over 100+ production-grade GoHighLevel workflows executing conditional branches, wait intervals, and smart recovery triggers.',
      components: ['Abandoned Cart Recovery', 'No-Show Shield', 'Failed Payment Dunning', 'LMS Provisioning'],
      failurePoints: 'Stuck wait timers, race conditions on webhooks',
      monitoring: 'Idempotency checks, automated execution retries, SLA alerts'
    },
    {
      title: 'Layer 3: External API & Integration Gateway',
      subtitle: 'Stripe, Twilio, Zapier, SendGrid, Kajabi, Google Sheets',
      description: 'Resilient middleware handling external communication, HMAC-signed webhooks, exponential backoff, and dead letter storage.',
      components: ['Bearer OAuth Refresh', 'Idempotent Webhook Listener', 'Payload Validation', 'Dead Letter Queue'],
      failurePoints: 'Upstream gateway timeouts (HTTP 504), rate limits (HTTP 429)',
      monitoring: 'Real-time HTTP status logging, automatic failover routing'
    },
    {
      title: 'Layer 4: International Telecommunications',
      subtitle: 'Global SMS & Voice Routing Mesh',
      description: 'Intelligent telecom dispatch with country code parsing, local regulatory quiet hours, and instantaneous provider failover from Twilio to Vonage.',
      components: ['E.164 Parser', 'Carrier Latency Probe', '10DLC / Alphanumeric Sender', 'Fallback Auto-Switch'],
      failurePoints: 'Carrier network maintenance, international route degradation',
      monitoring: 'Per-country delivery rate telemetry & 10-second failover'
    },
    {
      title: 'Layer 5: Operational Intelligence & Reporting',
      subtitle: 'Automated KPI Sync & Incident Sentinel',
      description: 'Hourly revenue attribution, spreadsheet synchronizations, incident root-cause logs, and real-time operator alerts.',
      components: ['Google Sheets Sync API', 'Meta Conversions CAPI', 'Incident Investigation Sentinel', 'CSV Export Engine'],
      failurePoints: 'Spreadsheet schema mismatch, API quota exhaustion',
      monitoring: 'Health score indexing, automated CSV verification'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main text-content-primary selection:bg-accent-light selection:text-sidebar-bg">
      {/* 5.1 Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-sidebar-bg/95 backdrop-blur-md border-b border-white/10 shadow-elevated py-3 text-white'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shadow-subtle">
              <svg
                className="w-5 h-5 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold tracking-wider text-sm uppercase text-white">
                GHL COMMAND CENTER
              </span>
              <div className="text-[10px] font-mono text-[#929C96] tracking-tight">
                Enterprise Automation Ecosystem
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-[#929C96]">
            <a href="#overview" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#ecosystem" className="hover:text-white transition-colors">
              Ecosystem Map
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#performance" className="hover:text-white transition-colors">
              Performance
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setContactModalOpen(true)}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Discuss Operations
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/app')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Live Command Center
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-sidebar-bg border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 text-sm text-[#929C96]">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white"
              >
                Platform
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white"
              >
                Capabilities
              </a>
              <a
                href="#ecosystem"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white"
              >
                Ecosystem Map
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white"
              >
                Architecture
              </a>
              <a
                href="#performance"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white"
              >
                Performance
              </a>
            </div>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/app');
                }}
              >
                Enter Live Command Center →
              </Button>
              <Button
                variant="outline"
                className="text-white border-white/20"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
              >
                Discuss Operations
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* 5.2 Hero Section */}
      <section className="relative min-h-[92vh] bg-sidebar-bg text-white pt-28 pb-20 overflow-hidden flex items-center">
        {/* Abstract Motion Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        />

        {/* Ambient Gradient Highlights */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-sidebar-secondary/80 blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ENTERPRISE AUTOMATION OPERATIONS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.1] text-white">
              Every Workflow.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#84B5A0]">
                Every Integration.
              </span>{' '}
              Every Business. Under Control.
            </h1>

            <p className="text-base sm:text-lg text-[#929C96] max-w-2xl font-light leading-relaxed">
              A unified command center for managing complex GoHighLevel automation ecosystems,
              intelligent multi-branch workflows, payment operations, external integrations,
              and mission-critical business processes across two commercial subaccounts.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/app')}
                icon={<ArrowRight className="w-5 h-5" />}
                className="shadow-elevated px-6"
              >
                Explore Live Command Center
              </Button>
              <a href="#ecosystem">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Explore Architecture
                </Button>
              </a>
            </div>

            {/* 3 Compact Indicators */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-bold font-display text-white">02</div>
                <div className="text-xs text-[#929C96] font-mono mt-0.5">Business Environments</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-accent">100+</div>
                <div className="text-xs text-[#929C96] font-mono mt-0.5">Automated Workflows</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-white">99.6%</div>
                <div className="text-xs text-[#929C96] font-mono mt-0.5">Execution Reliability</div>
              </div>
            </div>

            <p className="text-[11px] text-[#929C96]/60 font-mono">
              * Interactive demonstration environment with realistic simulated operational telemetry.
            </p>
          </div>

          {/* Right Floating Product Interface Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-white/10 bg-sidebar-secondary/80 p-5 shadow-2xl backdrop-blur-md">
              {/* Header preview bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-error/80" />
                  <div className="w-3 h-3 rounded-full bg-status-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-status-success/80" />
                  <span className="ml-2 text-xs font-mono text-[#929C96]">ghl-sentinel.live</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                  ALL BUSINESSES
                </span>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] text-[#929C96]">Active Workflows</div>
                  <div className="text-xl font-bold font-display text-white mt-1">42 Active</div>
                  <div className="text-[10px] text-status-success font-mono mt-0.5">↑ 99.6% health</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[11px] text-[#929C96]">Consolidated MRR</div>
                  <div className="text-xl font-bold font-display text-white mt-1">$332,250</div>
                  <div className="text-[10px] text-accent font-mono mt-0.5">Across 2 Accounts</div>
                </div>
              </div>

              {/* Live Activity Preview Stream */}
              <div className="mt-4 space-y-2">
                <div className="text-[11px] font-mono text-[#929C96] uppercase tracking-wider">
                  Live Operations Stream
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                      wf-cart-rec-01 Triggered
                    </span>
                    <span className="font-mono text-[10px] text-[#929C96]">Just now</span>
                  </div>
                  <p className="text-[11px] text-[#929C96]">
                    Cart #1092 recovered ($297) for Marcus Vance via multi-touch SMS.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      1-Click Upsell Settled
                    </span>
                    <span className="font-mono text-[10px] text-[#929C96]">18m ago</span>
                  </div>
                  <p className="text-[11px] text-[#929C96]">
                    Dr. Arthur Pendelton accepted Mastermind Upgrade (+$997).
                  </p>
                </div>
              </div>

              {/* Interactive CTA overlay button */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#929C96]">Enter dashboard to interact:</span>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline"
                >
                  Open Live Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.3 Infrastructure Overview Section */}
      <section id="overview" className="py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              UNIFIED INFRASTRUCTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary font-display tracking-tight">
              One Ecosystem. Multiple Moving Parts. Complete Visibility.
            </h2>
            <p className="text-base text-content-secondary mt-4 leading-relaxed">
              Modern digital businesses depend on interconnected systems. A change in one automation
              can affect sales, payments, customer communication, appointments, and reporting.
              The command center brings those operational dependencies into one manageable environment.
            </p>
          </div>

          {/* 6 Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GitBranch,
                title: 'Workflow Orchestration',
                desc: 'Multi-step conditional logic, delay buffers, goal evaluation gates, and automatic failure safeguards across 40+ subaccount automations.',
                route: '/app/workflows'
              },
              {
                icon: CreditCard,
                title: 'Revenue & Payment Automations',
                desc: 'Smart 3-tier dunning recovery, 1-click upsell and downsell triggers, dynamic Stripe webhooks, and abandoned cart revenue salvage.',
                route: '/app/payments'
              },
              {
                icon: UserCheck,
                title: 'Customer Lifecycle Pipelines',
                desc: 'End-to-end client journey tracking: instant LMS provisioning, student milestone detection, automated check-ins, and churn rescue.',
                route: '/app/onboarding'
              },
              {
                icon: Activity,
                title: 'API & Webhook Sentinel',
                desc: 'Idempotent webhook catchers with exponential backoff retries, dead letter quarantine, and Zapier two-way synchronization.',
                route: '/app/webhooks'
              },
              {
                icon: PhoneCall,
                title: 'Global SMS & Voice Routing',
                desc: 'E.164 country code routing, regulatory quiet-hour compliance, and automated carrier failover from Twilio to Vonage.',
                route: '/app/communications'
              },
              {
                icon: BarChart3,
                title: 'Operational Intelligence',
                desc: 'Real-time KPI synchronization to external spreadsheets, incident root-cause logs, and direct client-side CSV reporting exports.',
                route: '/app/analytics'
              }
            ].map((block, idx) => (
              <div
                key={idx}
                onClick={() => navigate(block.route)}
                className="group relative p-6 rounded-card bg-bg-main/50 border border-border hover:border-accent/50 hover:bg-white hover:shadow-card transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                    <block.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-content-primary font-display group-hover:text-accent transition-colors">
                    {block.title}
                  </h3>
                  <p className="text-xs text-content-secondary mt-2.5 leading-relaxed">
                    {block.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-accent">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.4 Automation Ecosystem Visualization (PRD Section 5.4) */}
      <section id="ecosystem" className="py-24 bg-sidebar-bg text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              SYSTEM ARCHITECTURE MAP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Interactive Automation Ecosystem
            </h2>
            <p className="text-sm text-[#929C96] mt-3">
              Click or tap any node to inspect its specific operational role, active GoHighLevel workflows,
              live payload structure, and connected system dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Architecture Canvas Diagram */}
            <div className="lg:col-span-8 bg-sidebar-secondary/60 rounded-2xl border border-white/10 p-6 relative min-h-[480px] flex items-center justify-center">
              {/* SVG Connecting Paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Central Core to Business Alpha */}
                <path d="M 50 50 L 20 25" stroke="rgba(82, 125, 107, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
                {/* Central Core to Business Beta */}
                <path d="M 50 50 L 80 25" stroke="rgba(82, 125, 107, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
                {/* Central Core to Payments */}
                <path d="M 50 50 L 18 75" stroke="rgba(82, 125, 107, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
                {/* Central Core to Telecom */}
                <path d="M 50 50 L 82 75" stroke="rgba(82, 125, 107, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
                {/* Central Core to Webhooks */}
                <path d="M 50 50 L 50 85" stroke="rgba(82, 125, 107, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>

              {/* Node Buttons positioned on map */}
              <div className="relative w-full h-full min-h-[420px]">
                {architectureNodes.map((node) => {
                  const isSelected = selectedArchNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedArchNode(node)}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute z-10 flex flex-col items-center p-3 rounded-xl transition-all duration-200 group focus:outline-none ${
                        isSelected
                          ? 'bg-accent text-white shadow-elevated scale-105 border-2 border-white/40 ring-4 ring-accent/30'
                          : 'bg-sidebar-bg/90 text-white/90 border border-white/10 hover:border-accent hover:scale-105 shadow-card'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            node.id === 'ghl-core'
                              ? 'bg-accent animate-pulse'
                              : 'bg-status-success'
                          }`}
                        />
                        <span className="text-xs font-semibold whitespace-nowrap">
                          {node.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#929C96] group-hover:text-white/80 mt-0.5">
                        {node.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Node Inspection Side Panel */}
            <div className="lg:col-span-4 bg-sidebar-secondary rounded-2xl border border-white/10 p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                    {selectedArchNode.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-0.5">
                    {selectedArchNode.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-status-success/20 text-status-success text-[10px] font-mono">
                  ACTIVE
                </span>
              </div>

              <div>
                <div className="text-xs text-[#929C96] font-medium mb-1">Operational Mandate</div>
                <p className="text-xs text-white/80 leading-relaxed">
                  {selectedArchNode.description}
                </p>
              </div>

              <div>
                <div className="text-xs text-[#929C96] font-medium mb-2">Governed Workflows</div>
                <div className="space-y-1.5">
                  {selectedArchNode.workflows.map((wf, i) => (
                    <div
                      key={i}
                      className="text-xs font-mono text-accent bg-white/5 px-2.5 py-1.5 rounded border border-white/5 flex items-center justify-between"
                    >
                      <span>{wf}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#929C96] font-medium mb-1.5">Simulated Telemetry Payload</div>
                <pre className="text-[11px] font-mono p-3 rounded-lg bg-black/40 border border-white/5 text-emerald-400 overflow-x-auto leading-relaxed">
                  {selectedArchNode.samplePayload}
                </pre>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => navigate(selectedArchNode.route)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inspect in Command Center
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Capabilities Section */}
      <section id="capabilities" className="py-24 bg-bg-main border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              SPECIALIST CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary font-display tracking-tight">
              Enterprise GoHighLevel Engineering
            </h2>
            <p className="text-sm text-content-secondary mt-3">
              Proven expertise managing complex multi-tier sales funnels, high-touch consultation calendars,
              and mission-critical webhook architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced Workflow Architecture',
                sub: 'Conditionals, waits, event goals, and multi-step recovery branches.',
                features: ['Dynamic IF/ELSE branching', 'Idempotent event processing', 'Graceful fallback logic'],
                route: '/app/workflows'
              },
              {
                title: 'Revenue & Payment Engineering',
                sub: 'Purchase detection, 1-click upsells/downsells, and automated dunning.',
                features: ['Off-session tokenized charges', 'Smart payment retry cascades', 'Cart abandonment salvage'],
                route: '/app/payments'
              },
              {
                title: 'Customer Lifecycle Operations',
                sub: 'Automated student/client onboarding, telemetry progress, and churn guards.',
                features: ['LMS credential dispatch', 'Stalled student detection', 'Milestone completion rewards'],
                route: '/app/onboarding'
              },
              {
                title: 'Executive Calendar Operations',
                sub: 'Multi-advisor round-robin booking, multi-channel reminders, and no-show recovery.',
                features: ['24h & 2h SMS/Email reminders', 'Zoom meeting automated generation', '5-minute no-show rescue'],
                route: '/app/appointments'
              },
              {
                title: 'API & Webhook Sentinel',
                sub: 'Robust middleware handling external CRM sync, Zapier, and retries.',
                features: ['Exponential backoff with jitter', 'Dead letter queue isolation', 'Real-time JSON inspector'],
                route: '/app/webhooks'
              },
              {
                title: 'International SMS & Voice Routing',
                sub: 'Global carrier routing, quiet-hour compliance, and instant provider failover.',
                features: ['E.164 country code detection', 'Twilio to Vonage failover', 'Telecom regulatory compliance'],
                route: '/app/communications'
              }
            ].map((cap, i) => (
              <div
                key={i}
                className="p-6 rounded-card bg-white border border-border shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-content-primary font-display">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-content-secondary mt-2 leading-relaxed">
                    {cap.sub}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-border/60 pt-3">
                    {cap.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-content-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => navigate(cap.route)}
                  >
                    View Interactive Demo →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.6 Architecture Section */}
      <section id="architecture" className="py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              DEEP ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary font-display tracking-tight">
              Designed for Complex Automation Environments
            </h2>
            <p className="text-sm text-content-secondary mt-3">
              Explore the five operational layers that ensure high availability, zero dropped revenue events,
              and resilient cross-business synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Layer Tabs */}
            <div className="lg:col-span-5 space-y-2">
              {architectureLayers.map((layer, idx) => {
                const isActive = activeArchLayer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveArchLayer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${
                      isActive
                        ? 'bg-accent-light/50 border-accent text-sidebar-bg shadow-subtle'
                        : 'bg-bg-main border-border text-content-secondary hover:text-content-primary hover:bg-bg-secondary'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                      Layer 0{idx + 1}
                    </div>
                    <div className="text-sm font-bold font-display mt-0.5 text-content-primary">
                      {layer.title.split(': ')[1]}
                    </div>
                    <div className="text-xs text-content-secondary mt-1 truncate">
                      {layer.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Layer Details Card */}
            <div className="lg:col-span-7 bg-bg-main/60 rounded-2xl border border-border p-8 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-accent font-semibold">
                  Layer 0{activeArchLayer + 1} Specifications
                </span>
                <h3 className="text-2xl font-bold text-content-primary font-display mt-1">
                  {architectureLayers[activeArchLayer].title}
                </h3>
                <p className="text-xs font-mono text-content-muted mt-1">
                  {architectureLayers[activeArchLayer].subtitle}
                </p>
              </div>

              <p className="text-sm text-content-secondary leading-relaxed">
                {architectureLayers[activeArchLayer].description}
              </p>

              <div>
                <div className="text-xs font-semibold uppercase text-content-primary font-mono mb-2">
                  Key Architectural Components
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {architectureLayers[activeArchLayer].components.map((c, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-white border border-border text-xs text-content-primary font-medium flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="p-3.5 rounded-xl bg-status-error-bg/60 border border-status-error/20">
                  <div className="text-[11px] font-mono text-status-error font-semibold uppercase">
                    Failure Vectors Controlled
                  </div>
                  <div className="text-xs text-content-primary mt-1">
                    {architectureLayers[activeArchLayer].failurePoints}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-status-success-bg/60 border border-status-success/20">
                  <div className="text-[11px] font-mono text-status-success font-semibold uppercase">
                    Monitoring Sentinel
                  </div>
                  <div className="text-xs text-content-primary mt-1">
                    {architectureLayers[activeArchLayer].monitoring}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.7 Performance Section */}
      <section id="performance" className="py-24 bg-sidebar-bg text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
              RELIABILITY METRICS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Reliability Is Not Optional
            </h2>
            <p className="text-sm text-[#929C96] mt-3">
              Automated pipelines must run deterministically. Here is the operational benchmark maintained
              across both client environments.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-card bg-sidebar-secondary border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold font-display text-white">99.6%</div>
              <div className="text-xs text-[#929C96] font-mono mt-1">Workflow Success Rate</div>
              <div className="text-[11px] text-accent mt-3 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Over 115,000 runs
              </div>
            </div>
            <div className="p-6 rounded-card bg-sidebar-secondary border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent">&lt; 1.2s</div>
              <div className="text-xs text-[#929C96] font-mono mt-1">Global SMS Latency</div>
              <div className="text-[11px] text-accent mt-3 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Automatic failover
              </div>
            </div>
            <div className="p-6 rounded-card bg-sidebar-secondary border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold font-display text-white">100%</div>
              <div className="text-xs text-[#929C96] font-mono mt-1">Webhook Idempotency</div>
              <div className="text-[11px] text-accent mt-3 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Zero duplicated orders
              </div>
            </div>
            <div className="p-6 rounded-card bg-sidebar-secondary border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold font-display text-accent">&lt; 15m</div>
              <div className="text-xs text-[#929C96] font-mono mt-1">Incident Mitigation SLA</div>
              <div className="text-[11px] text-accent mt-3 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proactive alert sentinel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.8 Final CTA */}
      <section className="py-24 bg-bg-secondary text-content-primary border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-light border border-accent/20 text-accent text-xs font-mono uppercase tracking-wider">
            Ready to scale
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-content-primary">
            Ready to Take Control of Your Automation Infrastructure?
          </h2>
          <p className="text-base text-content-secondary max-w-2xl mx-auto leading-relaxed">
            Explore the operational environment and see how complex GoHighLevel automation ecosystems
            can be managed, monitored, troubleshot, and continuously improved.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/app')}
              icon={<ArrowRight className="w-5 h-5" />}
              className="px-8 shadow-elevated"
            >
              Enter Command Center
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setContactModalOpen(true)}
            >
              Discuss Your Setup
            </Button>
          </div>
        </div>
      </section>

      {/* 5.9 Footer */}
      <footer className="bg-sidebar-bg text-white border-t border-sidebar-border py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <svg
                    className="w-4 h-4 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <span className="font-display font-bold tracking-wider text-sm uppercase">
                  GHL COMMAND CENTER
                </span>
              </div>
              <p className="text-xs text-[#929C96] max-w-sm leading-relaxed">
                Enterprise-grade operations and automation ecosystem designed for high-scale multi-subaccount
                GoHighLevel deployments.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setContactModalOpen(true)}
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Discuss Your Automation Infrastructure
                </Button>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#929C96] mb-3">
                Platform
              </div>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link to="/app" className="hover:text-accent">Overview Dashboard</Link></li>
                <li><Link to="/app/workflows" className="hover:text-accent">Workflow Manager</Link></li>
                <li><Link to="/app/carts" className="hover:text-accent">Abandoned Cart Salvage</Link></li>
                <li><Link to="/app/payments" className="hover:text-accent">Payment Dunning</Link></li>
                <li><Link to="/app/appointments" className="hover:text-accent">Calendar Shield</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#929C96] mb-3">
                Technical
              </div>
              <ul className="space-y-2 text-xs text-white/80">
                <li><Link to="/app/webhooks" className="hover:text-accent">Webhook Monitor</Link></li>
                <li><Link to="/app/communications" className="hover:text-accent">SMS Failover Routing</Link></li>
                <li><Link to="/app/api-inspector" className="hover:text-accent">API Request Inspector</Link></li>
                <li><Link to="/app/health" className="hover:text-accent">Incident Sentinel</Link></li>
                <li><Link to="/app/analytics" className="hover:text-accent">CSV Reporting Engine</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#929C96]">
            <div>
              © 2026 GHL Command Center. Built for Senior GoHighLevel Automation Evaluation.
            </div>
            <div className="font-mono text-[11px] mt-2 sm:mt-0 text-[#929C96]/70">
              Client-Side Interactive Demonstration • Realistic Simulated Telemetry
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal (PRD Section 5.9) */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => {
          setContactModalOpen(false);
          setContactSuccess(false);
        }}
        title="Discuss Your Automation Infrastructure"
        subtitle="Connect with a Senior GoHighLevel Automation Specialist"
      >
        {contactSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-status-success-bg text-status-success mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-content-primary font-display">
              Proposal Request Received
            </h4>
            <p className="text-xs text-content-secondary max-w-sm mx-auto leading-relaxed">
              Thank you for reviewing the GHL Command Center. In a live deployment, this form triggers
              an instant CRM contact creation and schedules a direct discovery session.
            </p>
            <div className="pt-4">
              <Button
                variant="primary"
                onClick={() => {
                  setContactModalOpen(false);
                  setContactSuccess(false);
                  navigate('/app');
                }}
              >
                Proceed to Command Center →
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-content-secondary mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="s.jenkins@enterprise.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-content-secondary mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={contactForm.business}
                  onChange={(e) => setContactForm({ ...contactForm, business: e.target.value })}
                  placeholder="Apex Digital Group"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Primary Automation Needs
              </label>
              <select
                value={contactForm.requirements}
                onChange={(e) => setContactForm({ ...contactForm, requirements: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              >
                <option value="">Select primary focus...</option>
                <option value="cart">Cart Recovery & Funnel Optimization</option>
                <option value="appointments">Appointment Reminders & No-Show Reduction</option>
                <option value="webhooks">Webhook / API / Zapier Resiliency</option>
                <option value="sms">International SMS & Fallback Routing</option>
                <option value="multi-biz">Multi-Subaccount Ecosystem Management</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-content-secondary mb-1">
                Message / Scope Details
              </label>
              <textarea
                rows={3}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Describe your current bottlenecks or upcoming funnel launch..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setContactModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Submit Consultation Request
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};


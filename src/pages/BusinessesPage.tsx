import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Layers,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Users,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const BusinessesPage: React.FC = () => {
  const navigate = useNavigate();
  const { businesses, setBusiness, activeBusiness } = useAppStore();

  const handleSelectBusiness = (bId: 'alpha' | 'beta') => {
    setBusiness(bId);
    navigate('/app');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Multi-Business Environments & Cross-Account Architecture
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Independent GoHighLevel subaccounts operating distinct funnel funnels, billing models, and phone pools with unified governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBusiness('all')}
            className={activeBusiness === 'all' ? 'border-accent text-accent font-semibold' : ''}
          >
            Switch to All Businesses View
          </Button>
        </div>
      </div>

      {/* Side-by-Side In-Depth Business Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Alpha */}
        <Card
          className={`p-6 border-2 space-y-5 transition-all ${
            activeBusiness === 'alpha'
              ? 'border-accent bg-accent-light/10 shadow-elevated'
              : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-display font-bold text-base">
                α
              </div>
              <div>
                <h3 className="text-base font-bold text-content-primary font-display">
                  {businesses.alpha.name}
                </h3>
                <span className="text-xs text-content-secondary font-medium">
                  {businesses.alpha.type}
                </span>
              </div>
            </div>
            <Badge status="healthy" label="Online" size="sm" />
          </div>

          <p className="text-xs text-content-secondary leading-relaxed">
            {businesses.alpha.description}
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Monthly Revenue</span>
              <div className="text-sm font-bold font-sans text-content-primary mt-0.5">
                {formatCurrency(businesses.alpha.monthlyRevenue)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Active Workflows</span>
              <div className="text-sm font-bold text-content-primary mt-0.5">
                {businesses.alpha.activeWorkflows}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Health Score</span>
              <div className="text-sm font-bold text-status-success mt-0.5">
                {businesses.alpha.healthScore}/100
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
              Isolated Tech Stack Integrations
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {businesses.alpha.primarySystems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-bg-main border border-border text-content-secondary text-[11px] font-mono"
                >
                  {sys}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSelectBusiness('alpha')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Apex Academy Workspace
            </Button>
          </div>
        </Card>

        {/* Business Beta */}
        <Card
          className={`p-6 border-2 space-y-5 transition-all ${
            activeBusiness === 'beta'
              ? 'border-accent bg-accent-light/10 shadow-elevated'
              : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center justify-center font-display font-bold text-base">
                β
              </div>
              <div>
                <h3 className="text-base font-bold text-content-primary font-display">
                  {businesses.beta.name}
                </h3>
                <span className="text-xs text-content-secondary font-medium">
                  {businesses.beta.type}
                </span>
              </div>
            </div>
            <Badge status="healthy" label="Online" size="sm" />
          </div>

          <p className="text-xs text-content-secondary leading-relaxed">
            {businesses.beta.description}
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Monthly Revenue</span>
              <div className="text-sm font-bold font-sans text-content-primary mt-0.5">
                {formatCurrency(businesses.beta.monthlyRevenue)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Active Workflows</span>
              <div className="text-sm font-bold text-content-primary mt-0.5">
                {businesses.beta.activeWorkflows}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-main border border-border">
              <span className="text-[10px] text-content-muted uppercase">Health Score</span>
              <div className="text-sm font-bold text-status-success mt-0.5">
                {businesses.beta.healthScore}/100
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
              Isolated Tech Stack Integrations
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {businesses.beta.primarySystems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-bg-main border border-border text-content-secondary text-[11px] font-mono"
                >
                  {sys}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSelectBusiness('beta')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Vanguard Advisory Workspace
            </Button>
          </div>
        </Card>
      </div>

      {/* Shared vs Isolated Architecture Matrix */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-content-primary font-display">
          Cross-Business Infrastructure Dependency Matrix
        </h3>
        <p className="text-xs text-content-secondary leading-relaxed">
          The client operates two separate entities requiring strict data segregation for billing and client privacy,
          while sharing master telecom trunks, Zapier bridges, and executive reporting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
          <div className="p-4 rounded-xl bg-bg-main border border-border space-y-2">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Isolated Per-Subaccount Components</span>
            </div>
            <ul className="space-y-1.5 text-content-secondary pl-5 list-disc text-[11px] leading-relaxed">
              <li>Separate GHL Contact Databases & Custom Values</li>
              <li>Separate Stripe Connected Merchant Accounts</li>
              <li>Dedicated Kajabi LMS Webhook Listener (Alpha only)</li>
              <li>Dedicated DocuSign eSignature Engine (Beta only)</li>
              <li>Independent Appointment Calendar Staff Allocations</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-bg-main border border-border space-y-2">
            <div className="flex items-center gap-2 text-status-info font-semibold">
              <Layers className="w-4 h-4" />
              <span>Shared Enterprise Infrastructure</span>
            </div>
            <ul className="space-y-1.5 text-content-secondary pl-5 list-disc text-[11px] leading-relaxed">
              <li>Global Twilio & Vonage Telecommunications Pool</li>
              <li>Consolidated Contact Deduplication Firewall</li>
              <li>Automated Master Google Sheets Executive Reporting</li>
              <li>Unified Webhook Retry & Dead Letter Sentinel</li>
              <li>High-Level Operational Health Incident Command</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};


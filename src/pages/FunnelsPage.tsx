import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  X,
  CreditCard,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { SalesFunnel, FunnelStage } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';

export const FunnelsPage: React.FC = () => {
  const navigate = useNavigate();
  const { funnels, activeBusiness } = useAppStore();

  const filteredFunnels = funnels.filter(
    (f) => activeBusiness === 'all' || f.businessId === activeBusiness
  );

  const [selectedFunnel, setSelectedFunnel] = useState<SalesFunnel>(filteredFunnels[0] || funnels[0]);
  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Sales Funnel Operations & Multi-Step Analytics
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Monitor traffic progression, stage-by-stage drop-off rates, and associated GoHighLevel workflows.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsPreviewOpen(true)}
          icon={<Eye className="w-4 h-4" />}
        >
          Live Funnel Preview
        </Button>
      </div>

      {/* Funnel Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredFunnels.map((funnel) => {
          const isSelected = selectedFunnel.id === funnel.id;
          return (
            <Card
              key={funnel.id}
              hoverable
              onClick={() => {
                setSelectedFunnel(funnel);
                setSelectedStage(null);
              }}
              className={`p-4 border-2 transition-all ${
                isSelected
                  ? 'border-accent bg-accent-light/10 shadow-card'
                  : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-content-muted">
                    {funnel.type}
                  </span>
                  <h3 className="text-sm font-bold text-content-primary font-display mt-0.5 truncate max-w-[200px]">
                    {funnel.name}
                  </h3>
                </div>
                <Badge
                  status={funnel.activeStatus ? 'healthy' : 'paused'}
                  label={funnel.activeStatus ? 'Live' : 'Draft'}
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border">
                <div>
                  <div className="text-[10px] text-content-muted">Visitors</div>
                  <div className="text-sm font-bold font-display text-content-primary">
                    {formatNumber(funnel.totalVisitors)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-content-muted">Conv. Rate</div>
                  <div className="text-sm font-bold font-display text-status-success">
                    {funnel.conversionRate}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-content-muted">Attributed</div>
                  <div className="text-sm font-bold font-display text-content-primary truncate">
                    {formatCurrency(funnel.totalRevenue)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Visual Multi-Step Funnel Flow Diagram */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-content-primary font-display">
                {selectedFunnel.name} — Conversion Waterfall
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-bg-secondary text-content-muted">
                {selectedFunnel.stages.length} Stages
              </span>
            </div>
            <p className="text-xs text-content-muted mt-0.5">
              Click any stage below to inspect conversion rates and associated GoHighLevel automation triggers.
            </p>
          </div>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Simulate Frontend Checkout</span>
          </button>
        </div>

        {/* Funnel Waterfall Visual */}
        <div className="space-y-3">
          {selectedFunnel.stages.map((stage, idx) => {
            const isFirst = idx === 0;
            const widthPct = Math.max(
              20,
              Math.min(100, (stage.visitors / selectedFunnel.stages[0].visitors) * 100)
            );

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedStage?.id === stage.id
                    ? 'border-accent bg-accent-light/20 ring-2 ring-accent/30 shadow-subtle'
                    : 'border-border bg-bg-main/50 hover:bg-white hover:border-accent/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-xs text-content-primary">
                        {stage.name}
                      </div>
                      <div className="text-[11px] text-content-muted flex items-center gap-2 mt-0.5">
                        <span>{formatNumber(stage.visitors)} visitors reached</span>
                        <span>•</span>
                        <span className="text-status-success font-medium">
                          {formatNumber(stage.conversions)} converted ({stage.conversionRate}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    {!isFirst && (
                      <span className="text-status-error font-medium">
                        ↓ {stage.dropoffRate}% drop-off
                      </span>
                    )}
                    {stage.associatedWorkflowId && (
                      <span className="px-2 py-0.5 rounded bg-accent-light text-accent text-[10px] font-semibold flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {stage.associatedWorkflowId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bar representation */}
                <div className="mt-3 w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300 rounded-full"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Inspection Drawer */}
        {selectedStage && (
          <div className="p-4 rounded-xl bg-sidebar-bg text-white space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accent text-xs">STAGE INSPECTION:</span>
                <span className="font-bold text-xs">{selectedStage.name}</span>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#929C96] text-[10px] uppercase font-mono">Stage Visitors</span>
                <div className="text-sm font-bold font-mono mt-0.5">{formatNumber(selectedStage.visitors)}</div>
              </div>
              <div>
                <span className="text-[#929C96] text-[10px] uppercase font-mono">Stage Conversions</span>
                <div className="text-sm font-bold font-mono text-accent mt-0.5">{formatNumber(selectedStage.conversions)}</div>
              </div>
              <div>
                <span className="text-[#929C96] text-[10px] uppercase font-mono">Stage Drop-off</span>
                <div className="text-sm font-bold font-mono text-status-error mt-0.5">{selectedStage.dropoffRate}%</div>
              </div>
              <div>
                <span className="text-[#929C96] text-[10px] uppercase font-mono">Linked Workflow</span>
                <div className="text-xs font-mono text-emerald-400 mt-0.5 truncate">
                  {selectedStage.associatedWorkflowId || 'Direct Funnel Redirect'}
                </div>
              </div>
            </div>

            {selectedStage.associatedWorkflowId && (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/app/workflows/${selectedStage.associatedWorkflowId}?tab=builder`)}
                  icon={<GitBranch className="w-3.5 h-3.5" />}
                >
                  Inspect Governed Workflow ({selectedStage.associatedWorkflowId})
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Simulated Live Funnel Preview Modal (PRD Section 12) */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Simulated Live Customer Funnel Preview"
        subtitle={`Live customer journey: ${selectedFunnel.name}`}
        maxWidth="2xl"
      >
        <div className="space-y-5 text-xs">
          {/* Simulated browser chrome header */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-secondary border border-border font-mono text-[11px] text-content-muted">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-error/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-warning/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-success/80" />
            </div>
            <span className="ml-2 truncate">{selectedFunnel.previewUrl}</span>
          </div>

          {/* Realistic Landing / Checkout Mock */}
          <div className="p-6 rounded-xl border border-border bg-white shadow-subtle space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-light text-accent font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Special Direct Enrollment
            </div>

            <h3 className="text-xl font-bold font-display text-content-primary">
              Mastery Accelerator: Direct Operations Certification
            </h3>

            <p className="text-content-secondary leading-relaxed text-xs">
              Transform your digital operations with automated multi-touch recovery cascades,
              telecom routing, and multi-subaccount GoHighLevel architectures.
            </p>

            {/* Simulated Checkout Box */}
            <div className="p-4 rounded-xl bg-bg-main border border-border space-y-3">
              <div className="flex items-center justify-between font-semibold text-content-primary">
                <span>Core Enrollment Access</span>
                <span className="font-mono text-sm">$297.00 USD</span>
              </div>

              <div className="p-2.5 rounded bg-white border border-border text-[11px] space-y-1">
                <div className="flex justify-between text-content-secondary">
                  <span>Customer Name:</span>
                  <span className="font-medium text-content-primary">Marcus Vance</span>
                </div>
                <div className="flex justify-between text-content-secondary">
                  <span>Email Address:</span>
                  <span className="font-mono text-content-primary">m.vance@techscale.io</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  alert('Purchase simulated! Webhook order.completed dispatched into GoHighLevel.');
                  setIsPreviewOpen(false);
                }}
                icon={<CreditCard className="w-4 h-4" />}
              >
                Simulate 1-Click Complete Purchase ($297)
              </Button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPreviewOpen(false)}
            >
              Close Funnel Preview
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  ArrowRight,
  GitBranch,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const UpsellDownsellPage: React.FC = () => {
  const navigate = useNavigate();
  const { upsellOffers, simulatePurchaseJourney } = useAppStore();

  const [selectedPathway, setSelectedPathway] = useState<
    'upsell_accepted' | 'downsell_accepted' | 'both_declined'
  >('upsell_accepted');
  const [activeStepHighlight, setActiveStepHighlight] = useState<string | null>(null);

  const handleSimulate = async () => {
    setActiveStepHighlight('fe');
    await new Promise((r) => setTimeout(r, 400));
    setActiveStepHighlight('up');
    await new Promise((r) => setTimeout(r, 600));

    if (selectedPathway === 'upsell_accepted') {
      setActiveStepHighlight('up_yes');
      await new Promise((r) => setTimeout(r, 500));
      setActiveStepHighlight('final');
    } else if (selectedPathway === 'downsell_accepted') {
      setActiveStepHighlight('down');
      await new Promise((r) => setTimeout(r, 600));
      setActiveStepHighlight('down_yes');
      await new Promise((r) => setTimeout(r, 500));
      setActiveStepHighlight('final');
    } else {
      setActiveStepHighlight('down');
      await new Promise((r) => setTimeout(r, 500));
      setActiveStepHighlight('final');
    }

    simulatePurchaseJourney(selectedPathway);
  };

  const handleReset = () => {
    setActiveStepHighlight(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            1-Click Upsell & Downsell Funnel Engineering
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Dynamic post-checkout decision trees using off-session tokenized Stripe charges without re-entering card details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPathway}
            onChange={(e: any) => setSelectedPathway(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-border bg-white text-content-primary focus:outline-none"
          >
            <option value="upsell_accepted">Pathway A: Upsell Accepted (+$997)</option>
            <option value="downsell_accepted">Pathway B: Upsell Declined → Downsell Accepted (+$497)</option>
            <option value="both_declined">Pathway C: Both Declined ($297 Core Only)</option>
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSimulate}
            icon={<Play className="w-4 h-4" />}
          >
            Simulate Journey
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Upsell Take Rate</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            31.2%
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            Mastermind Fast-Track ($997)
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Downsell Salvage Rate</span>
            <TrendingUp className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            29.8%
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            Implementation Toolkit ($497)
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Average Order Value</span>
            <DollarSign className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            $542.80
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            +82.7% boost over $297 baseline
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Attributed Pipeline</span>
            <DollarSign className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1 truncate">
            $1,043,024
          </div>
          <div className="text-[11px] text-content-muted font-mono mt-0.5">
            Generated by 1-click offers
          </div>
        </Card>
      </div>

      {/* Visual Purchase Journey Decision Tree */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-base font-bold text-content-primary font-display">
              Autonomous Post-Purchase Decision Tree
            </h3>
            <p className="text-xs text-content-muted">
              Deterministic routing: Instant tokenized off-session capture via Stripe API
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-upsell-eval-03?tab=builder')}
            icon={<GitBranch className="w-3.5 h-3.5 text-accent" />}
          >
            Inspect wf-upsell-eval-03
          </Button>
        </div>

        {/* Tree Canvas */}
        <div className="p-6 rounded-2xl bg-bg-main/60 border border-border space-y-8">
          {/* Step 1: Frontend Purchase */}
          <div className="flex flex-col items-center">
            <div
              className={`p-4 rounded-xl border-2 max-w-sm w-full text-center transition-all ${
                activeStepHighlight === 'fe'
                  ? 'border-accent bg-accent-light/40 shadow-card scale-105'
                  : 'border-border bg-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-content-muted">Step 1: Frontend Order</div>
              <div className="text-sm font-bold text-content-primary font-display mt-0.5">
                Mastery Accelerator ($297)
              </div>
              <div className="text-[11px] text-status-success font-mono mt-1">
                ✓ Primary card tokenized & authorized
              </div>
            </div>

            <div className="w-0.5 h-8 bg-border my-1" />

            {/* Step 2: Upsell Offer */}
            <div
              className={`p-4 rounded-xl border-2 max-w-md w-full text-center transition-all ${
                activeStepHighlight === 'up'
                  ? 'border-accent bg-accent-light/40 shadow-card scale-105'
                  : 'border-border bg-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-accent font-semibold">
                Step 2: Dynamic 1-Click Upsell Offer
              </div>
              <div className="text-sm font-bold text-content-primary font-display mt-0.5">
                Mastermind Fast-Track Upgrade ($997)
              </div>
              <div className="text-[11px] text-content-secondary mt-1">
                Take Rate: 31.2% • Served immediately before receipt page
              </div>
            </div>

            <div className="w-0.5 h-8 bg-border my-1" />

            {/* Branch Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              {/* Branch Left: Accepted */}
              <div className="flex flex-col items-center space-y-3">
                <div className="px-3 py-1 rounded-full bg-status-success-bg text-status-success font-mono text-xs font-semibold border border-status-success/30">
                  YES: Customer Clicks Accept
                </div>
                <div
                  className={`p-4 rounded-xl border-2 w-full text-center transition-all ${
                    activeStepHighlight === 'up_yes'
                      ? 'border-status-success bg-status-success-bg/60 shadow-card scale-105'
                      : 'border-border bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-content-primary">
                    Capture $997 Stripe Charge
                  </div>
                  <div className="text-[11px] text-content-secondary mt-1">
                    Off-session customer tokenization • Instant VIP tag assigned
                  </div>
                </div>
              </div>

              {/* Branch Right: Declined -> Downsell */}
              <div className="flex flex-col items-center space-y-3">
                <div className="px-3 py-1 rounded-full bg-status-warning-bg text-status-warning font-mono text-xs font-semibold border border-status-warning/30">
                  NO: Customer Declines
                </div>
                <div
                  className={`p-4 rounded-xl border-2 w-full text-center transition-all ${
                    activeStepHighlight === 'down' || activeStepHighlight === 'down_yes'
                      ? 'border-status-warning bg-status-warning-bg/60 shadow-card scale-105'
                      : 'border-border bg-white'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-status-warning font-semibold">
                    Step 3: Downsell Offer
                  </div>
                  <div className="text-xs font-bold text-content-primary mt-0.5">
                    Implementation Toolkit & Templates ($497)
                  </div>
                  <div className="text-[11px] text-content-secondary mt-1">
                    Take Rate: 29.8% • Reduced scope, lower ticket offer
                  </div>
                </div>
              </div>
            </div>

            <div className="w-0.5 h-8 bg-border my-1" />

            {/* Step 4: Final Outcome */}
            <div
              className={`p-4 rounded-xl border-2 max-w-sm w-full text-center transition-all ${
                activeStepHighlight === 'final'
                  ? 'border-accent bg-accent-light/40 shadow-card scale-105'
                  : 'border-border bg-white'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-content-muted">Final Outcome</div>
              <div className="text-sm font-bold text-content-primary font-display mt-0.5">
                Consolidated Receipt & LMS Provisioning
              </div>
              <div className="text-[11px] text-status-success font-mono mt-1">
                Single bundled transaction receipt emailed
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};


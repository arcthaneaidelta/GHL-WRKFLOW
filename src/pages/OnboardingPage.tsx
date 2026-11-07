import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Mail,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { OnboardingCustomer } from '../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { onboardingCustomers, activeBusiness } = useAppStore();

  const [selectedCustomer, setSelectedCustomer] = useState<OnboardingCustomer | null>(null);

  const filteredCustomers = onboardingCustomers.filter(
    (c) => activeBusiness === 'all' || c.businessId === activeBusiness
  );

  const stages = [
    { id: 'welcome', label: '1. Welcome & Access' },
    { id: 'account_setup', label: '2. Account Provisioning' },
    { id: 'first_milestone', label: '3. First Milestone' },
    { id: 'review', label: '4. Executive Review' },
    { id: 'activated', label: '5. Fully Activated' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Customer Onboarding Lifecycle Pipeline
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Automated LMS credentials dispatch, community invites, milestone tracking, and stalled customer intervention.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/app/workflows/wf-cust-onboard-07?tab=builder')}
          icon={<GitBranch className="w-4 h-4 text-accent" />}
        >
          Inspect Onboarding Matrix
        </Button>
      </div>

      {/* Visual Pipeline Stages */}
      <Card className="p-5 space-y-4">
        <h3 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider text-content-muted">
          Onboarding Stage Progression Waterfall
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          {stages.map((st, i) => (
            <div
              key={st.id}
              className="p-3 rounded-xl bg-bg-main border border-border flex flex-col justify-between"
            >
              <span className="font-semibold text-content-primary text-xs">{st.label}</span>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-content-muted">
                <span>Stage 0{i + 1}</span>
                <span className="text-accent font-semibold">
                  {filteredCustomers.filter((c) => c.currentStage === st.id).length} Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCustomers.map((cust) => (
          <Card
            key={cust.id}
            hoverable
            onClick={() => setSelectedCustomer(cust)}
            className="p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-content-primary font-display">
                    {cust.customerName}
                  </h4>
                  <div className="text-[11px] text-content-muted">{cust.company}</div>
                </div>
                <Badge status={cust.status} size="sm" />
              </div>

              <div className="text-xs text-content-secondary font-medium">
                Plan: {cust.productPlan}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-content-muted">Onboarding Progress</span>
                  <span className="text-accent font-bold">{cust.progressPercentage}%</span>
                </div>
                <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${cust.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Checklist preview */}
              <div className="pt-2 border-t border-border space-y-1.5">
                {cust.checklist.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        item.completed ? 'text-status-success' : 'text-content-muted'
                      }`}
                    />
                    <span
                      className={`truncate ${
                        item.completed ? 'text-content-primary' : 'text-content-muted'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-accent font-medium">
              <span>Inspect Checklist Details</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>

      {/* Customer Inspection Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer ? `Onboarding Matrix: ${selectedCustomer.customerName}` : ''}
        subtitle={selectedCustomer ? `${selectedCustomer.company} • ${selectedCustomer.productPlan}` : ''}
        maxWidth="lg"
      >
        {selectedCustomer && (
          <div className="space-y-5 text-xs">
            {/* Meta */}
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-3 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-content-muted uppercase">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedCustomer.status} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Start Date</span>
                <div className="text-content-primary font-medium mt-0.5">
                  {selectedCustomer.startDate}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Overall Progress</span>
                <div className="text-accent font-bold text-sm mt-0.5">
                  {selectedCustomer.progressPercentage}%
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
                Milestone & Credentials Verification Checklist
              </h4>
              <div className="border border-border rounded-xl divide-y divide-border bg-white">
                {selectedCustomer.checklist.map((item, i) => (
                  <div key={i} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          item.completed ? 'text-status-success' : 'text-content-muted'
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          item.completed
                            ? 'text-content-primary font-medium'
                            : 'text-content-muted'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    {item.dateCompleted && (
                      <span className="text-[11px] font-mono text-content-muted">
                        {item.dateCompleted}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


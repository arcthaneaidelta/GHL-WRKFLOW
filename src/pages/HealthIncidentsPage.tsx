import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  ArrowRight,
  GitBranch,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { SystemIncident } from '../types';

export const HealthIncidentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, resolveIncident, activeBusiness } = useAppStore();

  const [selectedIncident, setSelectedIncident] = useState<SystemIncident | null>(null);

  const filteredIncidents = incidents.filter(
    (i) => activeBusiness === 'all' || i.businessId === activeBusiness || i.businessId === 'all'
  );

  const healthServices = [
    { name: 'GoHighLevel Workflow Engine v2', status: 'healthy', latency: '42ms', uptime: '99.98%' },
    { name: 'Stripe Payment Webhook Sentinel', status: 'healthy', latency: '98ms', uptime: '100%' },
    { name: 'Kajabi LMS Course Provisioning Bridge', status: 'attention', latency: '640ms', uptime: '97.2%' },
    { name: 'Twilio 10DLC & International SMS Mesh', status: 'healthy', latency: '410ms', uptime: '99.8%' },
    { name: 'Google Sheets Automated Sync Worker', status: 'healthy', latency: '310ms', uptime: '99.9%' },
    { name: 'Zapier Two-Way Lead Webhook Catch', status: 'healthy', latency: '290ms', uptime: '99.9%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            System Health & Incident Command Sentinel
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Real-time infrastructure health monitoring, automated root-cause isolation, and incident mitigation workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge status="healthy" label="Mesh Sentinel Active" size="sm" />
        </div>
      </div>

      {/* 21.1 System Health Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthServices.map((svc, idx) => (
          <Card key={idx} className="p-4 flex flex-col justify-between space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xs font-bold text-content-primary font-display">
                  {svc.name}
                </h4>
                <div className="text-[11px] font-mono text-content-muted mt-0.5">
                  Latency: {svc.latency}
                </div>
              </div>
              <Badge status={svc.status} size="sm" />
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono">
              <span className="text-content-muted">Availability SLA</span>
              <span className="font-semibold text-status-success">{svc.uptime}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 21.2 Incident Command Records Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Incident Investigation & Mitigation Log
            </h3>
            <p className="text-xs text-content-muted">
              Click any incident to inspect root cause analysis, telemetry traces, and resolution steps
            </p>
          </div>
          <span className="text-xs font-mono text-content-muted">
            {filteredIncidents.length} logged records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Incident ID</th>
                <th className="py-3 px-3 font-semibold">Title & Affected System</th>
                <th className="py-3 px-3 font-semibold">Severity</th>
                <th className="py-3 px-3 font-semibold">Subaccount</th>
                <th className="py-3 px-3 font-semibold">Started</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredIncidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-content-primary group-hover:text-accent">
                    {inc.id}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-content-primary">{inc.title}</div>
                    <div className="text-[10px] text-content-muted font-mono mt-0.5">
                      System: {inc.affectedSystem}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge status={inc.severity} size="sm" />
                  </td>

                  <td className="py-3.5 px-3 font-mono capitalize text-content-secondary">
                    {inc.businessId === 'alpha'
                      ? 'Apex Academy'
                      : inc.businessId === 'beta'
                      ? 'Vanguard'
                      : 'All'}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {inc.startedAt}
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge status={inc.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {inc.status !== 'resolved' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => resolveIncident(inc.id)}
                          className="py-1 px-2.5 text-xs text-status-success hover:bg-status-success-bg"
                        >
                          Mark Resolved
                        </Button>
                      ) : (
                        <span className="text-status-success font-mono text-[11px] font-semibold">
                          ✓ Resolved
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedIncident(inc)}
                        className="py-1 px-2 text-xs text-accent"
                      >
                        Inspect →
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Incident Investigation Detail Modal */}
      <Modal
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        title={selectedIncident ? `[${selectedIncident.id}] ${selectedIncident.title}` : ''}
        subtitle={selectedIncident?.affectedSystem}
        maxWidth="xl"
      >
        {selectedIncident && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-3 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-content-muted uppercase">Severity</span>
                <div className="mt-0.5">
                  <Badge status={selectedIncident.severity} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Current Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedIncident.status} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Duration</span>
                <div className="text-content-primary font-bold mt-0.5">
                  {selectedIncident.startedAt}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-1">
                Root Cause Telemetry Analysis
              </h4>
              <div className="p-3.5 rounded-xl bg-bg-main border border-border text-content-primary leading-relaxed">
                {selectedIncident.rootCause}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-1.5">
                Automated & Operator Mitigation Steps
              </h4>
              <div className="border border-border rounded-xl divide-y divide-border bg-white">
                {selectedIncident.resolutionSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                    <span className="text-content-primary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedIncident.relatedWorkflowId && (
              <div className="p-3 rounded-lg bg-accent-light/40 border border-accent/20 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sidebar-bg">
                    Governing Recovery Workflow: {selectedIncident.relatedWorkflowId}
                  </div>
                  <div className="text-[10px] text-content-muted font-mono mt-0.5">
                    Engineered to prevent cascading subaccount failures
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedIncident(null);
                    navigate(`/app/workflows/${selectedIncident.relatedWorkflowId}?tab=builder`);
                  }}
                >
                  Inspect Workflow →
                </Button>
              </div>
            )}

            <div className="pt-2 border-t border-border flex items-center justify-between">
              {selectedIncident.status !== 'resolved' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    resolveIncident(selectedIncident.id);
                    setSelectedIncident({ ...selectedIncident, status: 'resolved' });
                  }}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Confirm Incident Resolution
                </Button>
              ) : (
                <span className="text-status-success font-mono font-medium">
                  ✓ Incident Resolved & Logged
                </span>
              )}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIncident(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


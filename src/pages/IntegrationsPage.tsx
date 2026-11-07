import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Integration } from '../types';
import { formatNumber } from '../utils/formatters';

export const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { integrations, testIntegration, activeBusiness } = useAppStore();

  const [testingId, setTestingId] = useState<string | null>(null);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const filteredIntegrations = integrations.filter((intg) => {
    if (activeBusiness === 'all') return true;
    if (intg.businessScope === 'both') return true;
    return intg.businessScope === activeBusiness;
  });

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    await testIntegration(id);
    setTestingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Integration Hub & API Gateway
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Enterprise connectivity matrix for payment processors, SMS telecom carriers, and external CRM bridges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/webhooks')}
            icon={<Activity className="w-4 h-4 text-accent" />}
          >
            Webhook Monitor
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/api-inspector')}
            icon={<Terminal className="w-4 h-4" />}
          >
            Open API Inspector
          </Button>
        </div>
      </div>

      {/* Grid of 12 Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((intg) => (
          <Card
            key={intg.id}
            hoverable
            onClick={() => setSelectedIntegration(intg)}
            className="p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-content-muted">
                    {intg.category}
                  </span>
                  <h3 className="text-sm font-bold text-content-primary font-display mt-0.5 truncate max-w-[200px]">
                    {intg.name}
                  </h3>
                </div>
                <Badge status={intg.status} size="sm" />
              </div>

              <div className="text-[11px] font-mono text-content-muted truncate bg-bg-main p-2 rounded border border-border">
                {intg.endpointUrl}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-[11px] font-mono">
                <div>
                  <span className="text-content-muted block text-[10px]">Requests</span>
                  <span className="font-semibold text-content-primary">
                    {formatNumber(intg.requestVolume)}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block text-[10px]">Latency</span>
                  <span className="font-semibold text-content-primary">
                    {intg.latencyMs}ms
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block text-[10px]">Workflows</span>
                  <span className="font-semibold text-accent">
                    {intg.relatedWorkflows} active
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-mono text-content-muted">
                Sync: {intg.lastSync}
              </span>
              <Button
                variant="secondary"
                size="sm"
                loading={testingId === intg.id}
                onClick={() => handleTestConnection(intg.id)}
                className="py-1 px-2.5 text-xs"
              >
                Probe Health
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Integration Detail Modal */}
      <Modal
        isOpen={!!selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
        title={selectedIntegration ? selectedIntegration.name : ''}
        subtitle="Gateway Specification & Security Parameters"
        maxWidth="lg"
      >
        {selectedIntegration && (
          <div className="space-y-5 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-content-muted uppercase">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedIntegration.status} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Latency</span>
                <div className="text-content-primary font-bold mt-0.5">
                  {selectedIntegration.latencyMs}ms
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Error Count</span>
                <div className="text-status-warning font-bold mt-0.5">
                  {selectedIntegration.errorCount} errors
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Scope</span>
                <div className="text-content-primary capitalize mt-0.5">
                  {selectedIntegration.businessScope}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                  API Endpoint URL
                </label>
                <div className="p-2.5 rounded-lg bg-bg-main border border-border font-mono text-content-primary">
                  {selectedIntegration.endpointUrl}
                </div>
              </div>

              <div>
                <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                  Authentication Protocol
                </label>
                <div className="p-2.5 rounded-lg bg-bg-main border border-border font-mono text-content-primary">
                  {selectedIntegration.authType}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedIntegration(null);
                  navigate('/app/api-inspector');
                }}
                icon={<Terminal className="w-3.5 h-3.5" />}
              >
                Inspect API Headers & JSON
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIntegration(null)}
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


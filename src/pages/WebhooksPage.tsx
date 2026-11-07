import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  Send,
  Zap,
  Globe,
  ArrowRight,
  Code,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { WebhookEvent } from '../types';

export const WebhooksPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    webhooks,
    retryWebhook,
    simulateWebhookEvent,
    activeBusiness,
  } = useAppStore();

  const [selectedWebhook, setSelectedWebhook] = useState<WebhookEvent | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const filteredWebhooks = webhooks.filter(
    (wh) => activeBusiness === 'all' || wh.businessId === activeBusiness
  );

  const handleRetry = async (whId: string) => {
    setIsRetrying(true);
    await new Promise((r) => setTimeout(r, 600));
    retryWebhook(whId);
    setIsRetrying(false);
    if (selectedWebhook?.id === whId) {
      setSelectedWebhook((prev) => (prev ? { ...prev, status: 'delivered', httpStatus: 200 } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (Scenario D Entry) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Webhook Monitor & Dead Letter Sentinel
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Real-time packet inspection for inbound payment hooks, LMS provisioning bridges, and automated retry workers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-webhook-retry-06?tab=builder')}
            icon={<Zap className="w-4 h-4 text-accent" />}
          >
            Inspect Retry Worker
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => simulateWebhookEvent('order.completed')}
            icon={<Plus className="w-4 h-4" />}
          >
            Simulate Webhook Event
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Delivered Webhooks</span>
            <CheckCircle2 className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {webhooks.filter((w) => w.status === 'delivered').length} Events
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            HTTP 200 / 201 verified
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Failed / Quarantined</span>
            <AlertTriangle className="w-4 h-4 text-status-error" />
          </div>
          <div className="text-2xl font-bold font-display text-status-error mt-1">
            {webhooks.filter((w) => w.status === 'failed').length} Events
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            Under auto-retry budget
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Retry Budget SLA</span>
            <RotateCcw className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            5 Attempts
          </div>
          <div className="text-[11px] text-accent font-mono mt-0.5">
            Exponential Backoff (2^n)
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Security Header</span>
            <Globe className="w-4 h-4 text-content-muted" />
          </div>
          <div className="text-sm font-bold font-display text-content-primary mt-1">
            HMAC-SHA256
          </div>
          <div className="text-[11px] text-status-success font-mono mt-0.5">
            ✓ Signature validated
          </div>
        </Card>
      </div>

      {/* Webhooks Stream Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Live Webhook Ingestion Feed
            </h3>
            <p className="text-xs text-content-muted">
              Click any event row to inspect JSON body payload or simulate an immediate retry replay
            </p>
          </div>
          <span className="text-xs font-mono text-content-muted">
            {filteredWebhooks.length} events logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Event ID</th>
                <th className="py-3 px-3 font-semibold">Event Type</th>
                <th className="py-3 px-3 font-semibold">Source</th>
                <th className="py-3 px-3 font-semibold">Destination</th>
                <th className="py-3 px-3 font-semibold">HTTP Status</th>
                <th className="py-3 px-3 font-semibold">Timestamp</th>
                <th className="py-3 px-3 font-semibold">Retries</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredWebhooks.map((wh) => (
                <tr
                  key={wh.id}
                  onClick={() => setSelectedWebhook(wh)}
                  className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-content-primary group-hover:text-accent">
                    {wh.id}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-mono text-xs font-semibold text-content-primary">
                      {wh.eventType}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-content-secondary">
                    {wh.source}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-content-secondary text-[11px] truncate max-w-[200px]">
                    {wh.destination}
                  </td>

                  <td className="py-3.5 px-3 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        wh.httpStatus === 200 || wh.httpStatus === 201
                          ? 'bg-status-success-bg text-status-success'
                          : 'bg-status-error-bg text-status-error'
                      }`}
                    >
                      {wh.httpStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {wh.timestamp}
                  </td>

                  <td className="py-3.5 px-3 font-mono">
                    {wh.retryCount} / {wh.maxRetries}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {wh.status === 'failed' ? (
                      <Button
                        variant="danger"
                        size="sm"
                        loading={isRetrying}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetry(wh.id);
                        }}
                        icon={<RotateCcw className="w-3.5 h-3.5" />}
                        className="py-1 px-2.5 text-xs"
                      >
                        Retry Webhook
                      </Button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWebhook(wh);
                        }}
                        className="text-xs text-accent hover:underline font-medium"
                      >
                        Inspect Payload →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Webhook Payload Inspection Modal (Scenario D Inspection) */}
      <Modal
        isOpen={!!selectedWebhook}
        onClose={() => setSelectedWebhook(null)}
        title={selectedWebhook ? `Webhook Event: ${selectedWebhook.id}` : ''}
        subtitle={selectedWebhook?.eventType}
        maxWidth="xl"
      >
        {selectedWebhook && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-3 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-content-muted uppercase">Response Code</span>
                <div
                  className={`text-sm font-bold mt-0.5 ${
                    selectedWebhook.httpStatus === 200
                      ? 'text-status-success'
                      : 'text-status-error'
                  }`}
                >
                  HTTP {selectedWebhook.httpStatus}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Retries</span>
                <div className="text-content-primary font-bold mt-0.5">
                  {selectedWebhook.retryCount} of {selectedWebhook.maxRetries}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedWebhook.status} size="sm" />
                </div>
              </div>
            </div>

            {selectedWebhook.errorMessage && (
              <div className="p-3.5 rounded-xl bg-status-error-bg border border-status-error/30 text-status-error space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Gateway Error</span>
                </div>
                <p className="text-content-secondary leading-relaxed font-mono text-[11px]">
                  {selectedWebhook.errorMessage}
                </p>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-1.5">
                Raw JSON Ingestion Payload
              </div>
              <pre className="p-3.5 rounded-xl bg-sidebar-bg text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-sidebar-border">
                {JSON.stringify(selectedWebhook.payload, null, 2)}
              </pre>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between">
              {selectedWebhook.status === 'failed' ? (
                <Button
                  variant="primary"
                  size="sm"
                  loading={isRetrying}
                  onClick={() => handleRetry(selectedWebhook.id)}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Replay & Force Settle (HTTP 200)
                </Button>
              ) : (
                <span className="text-status-success font-mono text-xs font-medium">
                  ✓ Packet Delivered & Acknowledged
                </span>
              )}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedWebhook(null)}
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


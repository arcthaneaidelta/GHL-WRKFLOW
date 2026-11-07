import React, { useState } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Terminal,
  ExternalLink,
  X,
  Code,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ExecutionRecord } from '../types';

export const ExecutionsPage: React.FC = () => {
  const { executions, retryExecution, activeBusiness } = useAppStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedExecution, setSelectedExecution] = useState<ExecutionRecord | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const filteredExecutions = executions.filter((ex) => {
    if (activeBusiness !== 'all' && ex.businessId !== activeBusiness) return false;
    if (selectedStatus !== 'all' && ex.status !== selectedStatus) return false;
    return true;
  });

  const handleRetry = async (exId: string) => {
    setIsRetrying(true);
    await new Promise((r) => setTimeout(r, 600));
    retryExecution(exId);
    setIsRetrying(false);
    if (selectedExecution?.id === exId) {
      setSelectedExecution((prev) => (prev ? { ...prev, status: 'successful' } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Execution History & Diagnostics
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Audit every automated trigger, inspect node latency profiles, and retry failed payloads.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
            {(['all', 'successful', 'failed', 'running'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded capitalize font-medium ${
                  selectedStatus === st
                    ? 'bg-white text-content-primary shadow-subtle'
                    : 'text-content-secondary'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Executions Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Execution ID</th>
                <th className="py-3 px-3 font-semibold">Workflow</th>
                <th className="py-3 px-3 font-semibold">Contact</th>
                <th className="py-3 px-3 font-semibold">Trigger Event</th>
                <th className="py-3 px-3 font-semibold">Duration</th>
                <th className="py-3 px-3 font-semibold">Started</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredExecutions.map((ex) => (
                <tr
                  key={ex.id}
                  onClick={() => setSelectedExecution(ex)}
                  className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-content-primary group-hover:text-accent">
                    {ex.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-content-primary truncate max-w-xs">
                      {ex.workflowName}
                    </div>
                    <div className="text-[10px] font-mono text-content-muted">
                      {ex.businessId === 'alpha' ? 'Apex Academy' : 'Vanguard Advisory'}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-medium text-content-primary">{ex.contact.name}</div>
                    <div className="text-[10px] text-content-muted">{ex.contact.email}</div>
                  </td>
                  <td className="py-3.5 px-3 text-content-secondary max-w-[180px] truncate">
                    {ex.trigger}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-primary">
                    {ex.duration}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {ex.startedAt}
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge status={ex.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {ex.status === 'failed' ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetry(ex.id);
                        }}
                        loading={isRetrying}
                        icon={<RotateCcw className="w-3.5 h-3.5" />}
                        className="py-1 px-2.5 text-xs"
                      >
                        Retry Run
                      </Button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExecution(ex);
                        }}
                        className="text-xs text-accent hover:underline font-medium"
                      >
                        Inspect Trace →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Execution Diagnostics Modal (Scenario E: Troubleshooting) */}
      <Modal
        isOpen={!!selectedExecution}
        onClose={() => setSelectedExecution(null)}
        title={selectedExecution ? `Execution Trace: ${selectedExecution.id}` : ''}
        subtitle={selectedExecution?.workflowName}
        maxWidth="2xl"
      >
        {selectedExecution && (
          <div className="space-y-5 text-xs">
            {/* Meta summary */}
            <div className="p-3 rounded-xl bg-bg-main border border-border grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div>
                <span className="text-content-muted text-[10px] uppercase">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedExecution.status} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-content-muted text-[10px] uppercase">Contact</span>
                <div className="mt-0.5 text-content-primary font-sans font-medium truncate">
                  {selectedExecution.contact.name}
                </div>
              </div>
              <div>
                <span className="text-content-muted text-[10px] uppercase">Started</span>
                <div className="mt-0.5 text-content-primary">
                  {selectedExecution.startedAt}
                </div>
              </div>
              <div>
                <span className="text-content-muted text-[10px] uppercase">Latency</span>
                <div className="mt-0.5 text-content-primary">
                  {selectedExecution.duration}
                </div>
              </div>
            </div>

            {/* Error banner if failed */}
            {selectedExecution.errorDetails && selectedExecution.status === 'failed' && (
              <div className="p-4 rounded-xl bg-status-error-bg border border-status-error/30 space-y-2">
                <div className="flex items-center justify-between text-status-error font-semibold">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Failed Node Error: {selectedExecution.errorDetails.code}</span>
                  </div>
                  <span className="font-mono text-[10px]">
                    Retry Attempt: {selectedExecution.errorDetails.retryCount}
                  </span>
                </div>
                <p className="text-content-primary leading-relaxed">
                  {selectedExecution.errorDetails.message}
                </p>
                {selectedExecution.errorDetails.endpoint && (
                  <div className="text-[11px] font-mono text-content-secondary">
                    Endpoint: {selectedExecution.errorDetails.endpoint}
                  </div>
                )}
                <div className="pt-2 border-t border-status-error/20 flex items-center justify-between">
                  <span className="text-content-secondary font-medium">
                    Recommendation: {selectedExecution.errorDetails.recoveryPlan}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    loading={isRetrying}
                    onClick={() => handleRetry(selectedExecution.id)}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Retry Execution Now
                  </Button>
                </div>
              </div>
            )}

            {/* Step-by-step logs timeline */}
            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
                Node-by-Node Execution Step Timeline
              </h4>
              <div className="border border-border rounded-xl divide-y divide-border/60 overflow-hidden bg-white">
                {selectedExecution.logs.map((log, idx) => (
                  <div
                    key={log.id}
                    className="p-3 flex items-start justify-between hover:bg-bg-main/50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-accent text-[11px]">
                          [{idx + 1}]
                        </span>
                        <span className="font-semibold text-content-primary">
                          {log.nodeTitle}
                        </span>
                        <Badge
                          status={log.status === 'failed' ? 'failing' : log.status}
                          size="sm"
                          dot={false}
                        />
                      </div>
                      <p className="text-content-secondary text-[11px] font-mono leading-relaxed pl-5">
                        {log.message}
                      </p>
                    </div>
                    <div className="text-right font-mono text-[10px] text-content-muted shrink-0 ml-3">
                      <div>{log.timestamp}</div>
                      <div>{log.latencyMs}ms</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedExecution(null)}
              >
                Close Trace
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


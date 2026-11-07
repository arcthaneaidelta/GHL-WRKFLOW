import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Plus,
  ArrowRight,
  GitBranch,
  ShieldAlert,
  Activity,
  X,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Drawer } from '../components/common/Drawer';
import { Transaction } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const PaymentsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    transactions,
    simulateFailedPayment,
    retryPayment,
    activeBusiness,
  } = useAppStore();

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (activeBusiness !== 'all' && tx.businessId !== activeBusiness) return false;
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    return true;
  });

  const totalSuccessful = transactions
    .filter((tx) => tx.status === 'successful')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalFailed = transactions
    .filter((tx) => tx.status === 'failed')
    .reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header (Scenario B Entry) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Payments, Transactions & Smart Dunning
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Real-time transaction capture, subscription dunning cascades, and Stripe webhook synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-pay-fail-02?tab=builder')}
            icon={<GitBranch className="w-4 h-4 text-accent" />}
          >
            Inspect Dunning Workflow
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={simulateFailedPayment}
            icon={<AlertCircle className="w-4 h-4" />}
          >
            Simulate Failed Payment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Captured Revenue</span>
            <DollarSign className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1 truncate">
            {formatCurrency(totalSuccessful)}
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            Settled via Stripe & Auth.net
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Dunning Queue (Failed)</span>
            <AlertCircle className="w-4 h-4 text-status-error" />
          </div>
          <div className="text-2xl font-bold font-display text-status-error mt-1 truncate">
            {formatCurrency(totalFailed)}
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            Auto-retry worker active
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Webhook Delivery SLA</span>
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            100%
          </div>
          <div className="text-[11px] text-status-success font-mono mt-0.5">
            Zero dropped transaction events
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Payment Protocol</span>
            <CreditCard className="w-4 h-4 text-content-muted" />
          </div>
          <div className="text-sm font-bold font-display text-content-primary mt-1">
            TLS 1.3 / Off-Session
          </div>
          <div className="text-[11px] text-content-muted font-mono mt-0.5">
            1-Click tokenized charges
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Payment Transactions & Webhook Ledger
            </h3>
            <p className="text-xs text-content-muted">
              Click any transaction row to open the complete payment recovery and webhook trace drawer
            </p>
          </div>

          <div className="flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
            {(['all', 'successful', 'failed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded capitalize font-medium ${
                  statusFilter === st
                    ? 'bg-white text-content-primary shadow-subtle'
                    : 'text-content-secondary'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Transaction ID</th>
                <th className="py-3 px-3 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Product</th>
                <th className="py-3 px-3 font-semibold">Amount</th>
                <th className="py-3 px-3 font-semibold">Processor</th>
                <th className="py-3 px-3 font-semibold">Timestamp</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-content-primary group-hover:text-accent">
                    {tx.id}
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-content-primary">{tx.contactName}</div>
                    <div className="text-[10px] text-content-muted">{tx.contactEmail}</div>
                  </td>

                  <td className="py-3.5 px-3 text-content-secondary max-w-[200px] truncate">
                    {tx.product}
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-content-primary">
                    {formatCurrency(tx.amount)}
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-bg-secondary text-content-secondary border border-border">
                      {tx.processor}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {tx.timestamp}
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge status={tx.status} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {tx.status === 'failed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          retryPayment(tx.id);
                        }}
                        className="py-1 px-2.5 text-xs text-status-success hover:bg-status-success-bg"
                      >
                        Settle & Resolve
                      </Button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTx(tx);
                        }}
                        className="text-xs text-accent hover:underline font-medium"
                      >
                        Inspect Drawer →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Detail Drawer (Scenario B Inspection) */}
      <Drawer
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        title={selectedTx ? `Transaction Trace: ${selectedTx.id}` : ''}
        subtitle="Stripe / GoHighLevel Invoicing Sentinel"
      >
        {selectedTx && (
          <div className="space-y-6 text-xs">
            {/* Status Card */}
            <div className="p-4 rounded-xl bg-bg-main border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-content-muted uppercase">
                  Payment Status
                </span>
                <Badge status={selectedTx.status} size="sm" />
              </div>
              <div className="text-2xl font-bold font-display text-content-primary">
                {formatCurrency(selectedTx.amount)}
              </div>
              <div className="text-[11px] text-content-muted font-mono">
                Settled on card ending in •••• {selectedTx.cardLast4 || '4242'}
              </div>
            </div>

            {/* Failure notice if failed */}
            {selectedTx.status === 'failed' && (
              <div className="p-4 rounded-xl bg-status-error-bg border border-status-error/30 space-y-2">
                <div className="flex items-center gap-1.5 text-status-error font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Declined Reason: {selectedTx.failureReason}</span>
                </div>
                <p className="text-content-secondary leading-relaxed">
                  GoHighLevel dunning workflow (wf-pay-fail-02) automatically engaged.
                  A 72-hour grace period was placed on member credentials, and a secure 1-click
                  payment update link was delivered via SMS & email.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      retryPayment(selectedTx.id);
                      setSelectedTx({ ...selectedTx, status: 'successful', failureReason: undefined });
                    }}
                  >
                    Simulate Customer Updating Card (Settle)
                  </Button>
                </div>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-2">
              <h4 className="font-semibold text-content-primary font-display uppercase tracking-wider text-[11px]">
                Customer & Subaccount Profile
              </h4>
              <div className="p-3 rounded-lg bg-bg-main border border-border space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-content-muted">Name:</span>
                  <span className="font-medium text-content-primary">{selectedTx.contactName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-muted">Email:</span>
                  <span className="font-mono text-content-primary">{selectedTx.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-muted">Subaccount:</span>
                  <span className="text-content-primary font-medium">
                    {selectedTx.businessId === 'alpha' ? 'Apex Academy Online' : 'Vanguard Advisory'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-muted">Webhook Verified:</span>
                  <span className="text-status-success font-mono">✓ invoice.payment_succeeded</span>
                </div>
              </div>
            </div>

            {/* Governed Workflow */}
            <div className="space-y-2">
              <h4 className="font-semibold text-content-primary font-display uppercase tracking-wider text-[11px]">
                Triggered Post-Purchase Workflow
              </h4>
              <div className="p-3 rounded-lg bg-accent-light/40 border border-accent/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sidebar-bg">
                    {selectedTx.status === 'failed'
                      ? 'wf-pay-fail-02: Smart Dunning Sentinel'
                      : 'wf-cust-onboard-07: LMS Provisioning Matrix'}
                  </div>
                  <div className="text-[10px] text-content-muted font-mono mt-0.5">
                    Triggered instantaneously upon charge confirmation
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const targetId = selectedTx.status === 'failed' ? 'wf-pay-fail-02' : 'wf-cust-onboard-07';
                    navigate(`/app/workflows/${targetId}?tab=builder`);
                  }}
                >
                  Inspect →
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};


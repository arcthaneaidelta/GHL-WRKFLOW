import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Mail,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { AbandonedCart } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const CartsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    abandonedCarts,
    simulateAbandonedCart,
    recoverCart,
    activeBusiness,
  } = useAppStore();

  const [selectedCart, setSelectedCart] = useState<AbandonedCart | null>(null);

  const filteredCarts = abandonedCarts.filter(
    (c) => activeBusiness === 'all' || c.businessId === activeBusiness
  );

  const totalAbandonedValue = filteredCarts.reduce((acc, c) => acc + c.cartValue, 0);
  const recoveredCarts = filteredCarts.filter((c) => c.recoveryStatus === 'recovered');
  const recoveredRevenue = recoveredCarts.reduce((acc, c) => acc + c.cartValue, 0);
  const recoveryRate = filteredCarts.length
    ? Math.round((recoveredCarts.length / filteredCarts.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header (Scenario A Entry) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Abandoned Cart Recovery Engine
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Autonomous multi-touch recovery cascade with dynamic checkout session re-hydration and SMS fallbacks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-cart-rec-01?tab=builder')}
            icon={<GitBranch className="w-4 h-4 text-accent" />}
          >
            Inspect Cart Workflow
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={simulateAbandonedCart}
            icon={<Plus className="w-4 h-4" />}
          >
            Simulate Abandoned Cart
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Potential Cart Value</span>
            <ShoppingCart className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {formatCurrency(totalAbandonedValue)}
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            {filteredCarts.length} carts in tracking queue
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Recovered Revenue</span>
            <DollarSign className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-2xl font-bold font-display text-status-success mt-1">
            {formatCurrency(recoveredRevenue)}
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            {recoveredCarts.length} carts successfully salvaged
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Recovery Success Rate</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {recoveryRate}%
          </div>
          <div className="text-[11px] text-accent font-medium mt-0.5">
            Industry avg: ~8-12%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Governing Workflow</span>
            <GitBranch className="w-4 h-4 text-accent" />
          </div>
          <div className="text-sm font-bold font-display text-content-primary mt-1 truncate">
            wf-cart-rec-01
          </div>
          <div className="text-[11px] text-status-success font-mono mt-0.5">
            Active 3-Tier Cascade
          </div>
        </Card>
      </div>

      {/* Cart Queue Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Live Abandoned Cart Tracking Queue
            </h3>
            <p className="text-xs text-content-muted">
              Click any customer to inspect the complete multi-touch recovery timeline
            </p>
          </div>
          <span className="text-xs font-mono text-content-muted">
            {filteredCarts.length} active records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-3 font-semibold">Product</th>
                <th className="py-3 px-3 font-semibold">Cart Value</th>
                <th className="py-3 px-3 font-semibold">Abandoned</th>
                <th className="py-3 px-3 font-semibold">Current State</th>
                <th className="py-3 px-3 font-semibold">Last Automation Touch</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCarts.map((cart) => (
                <tr
                  key={cart.id}
                  onClick={() => setSelectedCart(cart)}
                  className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-content-primary group-hover:text-accent">
                      {cart.customerName}
                    </div>
                    <div className="text-[10px] font-mono text-content-muted">
                      {cart.customerEmail} • {cart.customerPhone}
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="font-medium text-content-primary">{cart.product}</div>
                    <div className="text-[10px] font-mono text-content-muted">{cart.id}</div>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-content-primary">
                    ${cart.cartValue}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {cart.abandonedAt}
                  </td>

                  <td className="py-3.5 px-3">
                    <Badge status={cart.recoveryStatus} size="sm" />
                  </td>

                  <td className="py-3.5 px-3 text-content-secondary text-[11px]">
                    {cart.lastContact}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {cart.recoveryStatus !== 'recovered' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          recoverCart(cart.id);
                        }}
                        className="py-1 px-2.5 text-xs text-status-success hover:bg-status-success-bg"
                      >
                        Simulate Recovery
                      </Button>
                    ) : (
                      <span className="font-mono text-status-success text-[11px] font-semibold">
                        ✓ Recovered (${cart.cartValue})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recovery Timeline Modal (Scenario A Inspection) */}
      <Modal
        isOpen={!!selectedCart}
        onClose={() => setSelectedCart(null)}
        title={selectedCart ? `Cart Recovery Journey: ${selectedCart.customerName}` : ''}
        subtitle={selectedCart ? `Cart ID: ${selectedCart.id} • ${selectedCart.product}` : ''}
        maxWidth="xl"
      >
        {selectedCart && (
          <div className="space-y-5 text-xs">
            {/* Summary Banner */}
            <div className="p-3.5 rounded-xl bg-bg-main border border-border grid grid-cols-3 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-content-muted uppercase">Cart Value</span>
                <div className="text-base font-bold text-content-primary mt-0.5">
                  ${selectedCart.cartValue}.00
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Status</span>
                <div className="mt-0.5">
                  <Badge status={selectedCart.recoveryStatus} size="sm" />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-content-muted uppercase">Governing Logic</span>
                <div className="mt-0.5 text-accent font-semibold truncate">
                  wf-cart-rec-01
                </div>
              </div>
            </div>

            {/* Timeline Steps */}
            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-3">
                Automated Touchpoint Execution Timeline
              </h4>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {selectedCart.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        step.status === 'completed'
                          ? 'bg-status-success'
                          : 'bg-status-warning'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-content-primary text-xs">
                        {step.event}
                      </span>
                      <span className="font-mono text-[10px] text-content-muted">
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCart(null);
                  navigate('/app/workflows/wf-cart-rec-01?tab=builder');
                }}
                icon={<GitBranch className="w-3.5 h-3.5" />}
              >
                Inspect Workflow Engine
              </Button>

              <div className="flex items-center gap-2">
                {selectedCart.recoveryStatus !== 'recovered' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      recoverCart(selectedCart.id);
                      setSelectedCart(null);
                    }}
                  >
                    Simulate Customer Checkout (+$ {selectedCart.cartValue})
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCart(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};


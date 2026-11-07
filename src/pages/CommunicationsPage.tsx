import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneCall,
  MessageSquare,
  Globe,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CountrySmsRouting } from '../types';
import { formatNumber } from '../utils/formatters';

export const CommunicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    countrySms,
    calls,
    simulateSmsFailure,
    resetSmsProvider,
  } = useAppStore();

  const [selectedCountryCode, setSelectedCountryCode] = useState('UAE');
  const [isSimulatingFailover, setIsSimulatingFailover] = useState(false);
  const [failoverStep, setFailoverStep] = useState<number | null>(null);

  const handleSimulateFailover = async () => {
    setIsSimulatingFailover(true);
    setFailoverStep(1); // Primary route down
    await new Promise((r) => setTimeout(r, 600));

    setFailoverStep(2); // Detecting fallback
    await new Promise((r) => setTimeout(r, 700));

    setFailoverStep(3); // Rerouting
    await new Promise((r) => setTimeout(r, 600));

    simulateSmsFailure(selectedCountryCode);
    setFailoverStep(4); // Succeeded
    setIsSimulatingFailover(false);
  };

  const totalSmsSent = countrySms.reduce((acc, c) => acc + c.sentCount, 0);
  const totalSmsFailed = countrySms.reduce((acc, c) => acc + c.failedCount, 0);
  const avgSmsDelivery = (
    countrySms.reduce((acc, c) => acc + c.deliveryRate, 0) / countrySms.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header (Scenario C Entry) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            International SMS & Calling Infrastructure
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Global telecommunications routing mesh, regulatory quiet-hour safeguards, and automated carrier failover.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
            disabled={isSimulatingFailover}
            className="text-xs px-3 py-2 rounded-lg border border-border bg-white text-content-primary focus:outline-none"
          >
            {countrySms.map((c) => (
              <option key={c.code} value={c.code}>
                {c.country}
              </option>
            ))}
          </select>

          <Button
            variant="primary"
            size="sm"
            loading={isSimulatingFailover}
            onClick={handleSimulateFailover}
            icon={<Zap className="w-4 h-4" />}
          >
            Simulate Provider Failover
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              resetSmsProvider(selectedCountryCode);
              setFailoverStep(null);
            }}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset Route
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Global SMS Dispatched</span>
            <MessageSquare className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {formatNumber(totalSmsSent)}
          </div>
          <div className="text-[11px] text-status-success font-medium mt-0.5">
            Avg delivery rate: {avgSmsDelivery}%
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Total Voice Calls</span>
            <PhoneCall className="w-4 h-4 text-status-info" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {calls.length} Calls
          </div>
          <div className="text-[11px] text-content-muted mt-0.5">
            VoIP SIP trunking active
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Carrier Failover SLA</span>
            <Zap className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            &lt; 2.5s
          </div>
          <div className="text-[11px] text-status-success font-mono mt-0.5">
            Automatic failover threshold
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-content-secondary font-medium">Compliance Gate</span>
            <ShieldCheck className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-sm font-bold font-display text-content-primary mt-1">
            10DLC & Ofcom Safe
          </div>
          <div className="text-[11px] text-content-muted font-mono mt-0.5">
            Quiet-hour enforcement
          </div>
        </Card>
      </div>

      {/* Provider Routing Visualization (PRD Section 19.2) */}
      <Card className="p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-base font-bold text-content-primary font-display">
              Smart Carrier Failover & Fallback Visualization
            </h3>
            <p className="text-xs text-content-muted">
              Live status for route: {selectedCountryCode} — Twilio Primary ⇄ Vonage Fallback
            </p>
          </div>
          {failoverStep === 4 && (
            <span className="px-2.5 py-1 rounded-full bg-status-success-bg text-status-success text-xs font-mono font-semibold animate-pulse">
              ✓ Fallback Route Active & Settled
            </span>
          )}
        </div>

        {/* Step Progression Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-bg-main border border-border space-y-1">
            <div className="text-[10px] font-mono text-content-muted uppercase">1. Inbound Dispatch</div>
            <div className="font-bold text-content-primary">Outbound SMS Queued</div>
            <p className="text-[11px] text-content-secondary">
              Parse phone number to E.164 country code format.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1 transition-all ${
              failoverStep === 1
                ? 'border-status-error bg-status-error-bg/60 ring-2 ring-status-error/30'
                : 'bg-bg-main border-border'
            }`}
          >
            <div className="text-[10px] font-mono text-content-muted uppercase">2. Primary Route</div>
            <div className="font-bold text-content-primary">Twilio Tier 1 Gateway</div>
            <p className="text-[11px] text-content-secondary">
              {failoverStep === 1 ? 'Latency > 2500ms (Degraded)' : 'Health: Nominal (< 800ms)'}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1 transition-all ${
              failoverStep === 2
                ? 'border-status-warning bg-status-warning-bg/60 ring-2 ring-status-warning/30'
                : 'bg-bg-main border-border'
            }`}
          >
            <div className="text-[10px] font-mono text-content-muted uppercase">3. Auto Failover</div>
            <div className="font-bold text-content-primary">Carrier Switch Triggered</div>
            <p className="text-[11px] text-content-secondary">
              Reroute packet dynamically to secondary provider.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1 transition-all ${
              failoverStep === 3 || failoverStep === 4
                ? 'border-status-success bg-status-success-bg/60 ring-2 ring-status-success/30'
                : 'bg-bg-main border-border'
            }`}
          >
            <div className="text-[10px] font-mono text-content-muted uppercase">4. Fallback Dispatch</div>
            <div className="font-bold text-content-primary">Vonage / Local Direct</div>
            <p className="text-[11px] text-content-secondary">
              Direct connection confirmed. Zero dropped messages.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-bg-main border border-border space-y-1">
            <div className="text-[10px] font-mono text-content-muted uppercase">5. Delivery Receipt</div>
            <div className="font-bold text-status-success">100% Confirmation</div>
            <p className="text-[11px] text-content-secondary">
              Status callback registered in GHL contact profile.
            </p>
          </div>
        </div>
      </Card>

      {/* Country Delivery Table (PRD Section 19.1) */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Country-Level SMS Routing Matrix
            </h3>
            <p className="text-xs text-content-muted">
              Dedicated routes, primary and secondary carriers, and average latencies
            </p>
          </div>
          <span className="text-xs font-mono text-content-muted">5 Regulatory Zones</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Country Destination</th>
                <th className="py-3 px-3 font-semibold">Primary Provider</th>
                <th className="py-3 px-3 font-semibold">Fallback Provider</th>
                <th className="py-3 px-3 font-semibold text-right">Messages Sent</th>
                <th className="py-3 px-3 font-semibold text-right">Delivery Rate</th>
                <th className="py-3 px-3 font-semibold">Avg Latency</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {countrySms.map((route) => (
                <tr key={route.code} className="hover:bg-bg-main/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-content-primary">
                    {route.country}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-secondary">
                    {route.primaryProvider}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-accent">
                    {route.fallbackProvider}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-medium text-content-primary">
                    {formatNumber(route.sentCount)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono">
                    <span
                      className={
                        route.deliveryRate >= 99
                          ? 'text-status-success font-bold'
                          : 'text-status-warning font-bold'
                      }
                    >
                      {route.deliveryRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {route.avgLatency}
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge status={route.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedCountryCode(route.code);
                        handleSimulateFailover();
                      }}
                      className="text-xs text-accent hover:underline font-medium"
                    >
                      Test Failover →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Voice Calls Log (PRD Section 19.3) */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Enterprise Voice & Calling Records
            </h3>
            <p className="text-xs text-content-muted">
              Inbound and outbound telephone sessions mapped to GoHighLevel workflows
            </p>
          </div>
          <span className="font-mono text-xs text-content-muted">
            Subaccount: Vanguard Advisory
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Call ID</th>
                <th className="py-3 px-3 font-semibold">Customer Name</th>
                <th className="py-3 px-3 font-semibold">Phone Destination</th>
                <th className="py-3 px-3 font-semibold">Provider Trunk</th>
                <th className="py-3 px-3 font-semibold">Duration</th>
                <th className="py-3 px-3 font-semibold">Triggered Sequence</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-bg-main/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-content-primary">
                    {call.id}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-content-primary">
                    {call.customerName}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-secondary">
                    {call.phoneNumber} ({call.country})
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-muted">
                    {call.provider}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-content-primary">
                    {call.duration}
                  </td>
                  <td className="py-3.5 px-3 text-accent font-medium">
                    {call.workflowTriggered}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge status={call.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};


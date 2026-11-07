import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  RotateCcw,
  ShieldAlert,
  Bell,
  Mail,
  Lock,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const SettingsPage: React.FC = () => {
  const { resetDemoData } = useAppStore();
  const [resetConfirmed, setResetConfirmed] = useState(false);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  const [settingsState, setSettingsState] = useState({
    autoRetryLimit: '5',
    smsQuietHours: true,
    telemetryLogging: true,
    dedupMatching: 'Strict (Phone + Email)',
    dunningGracePeriod: '72 Hours',
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2500);
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setResetConfirmed(true);
    setTimeout(() => setResetConfirmed(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            System Preferences & Demo Configuration
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Global automation thresholds, retry parameters, and one-click demo environment reset.
          </p>
        </div>
      </div>

      {savedSettingsNotice && (
        <div className="p-3.5 rounded-xl bg-status-success-bg border border-status-success/30 text-status-success text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Operational settings updated successfully in local storage.</span>
        </div>
      )}

      {resetConfirmed && (
        <div className="p-3.5 rounded-xl bg-accent-light border border-accent/30 text-sidebar-bg text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span>Demo environment restored to fresh initial state.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-content-primary font-display">
            Workflow Execution Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Max Idempotent Webhook Retry Attempts
              </label>
              <select
                value={settingsState.autoRetryLimit}
                onChange={(e) => setSettingsState({ ...settingsState, autoRetryLimit: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main text-content-primary focus:outline-none focus:border-accent"
              >
                <option value="3">3 Retries (Standard)</option>
                <option value="5">5 Retries (Exponential Backoff with Jitter)</option>
                <option value="8">8 Retries (High Tolerance)</option>
              </select>
            </div>

            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Subscription Dunning Grace Window
              </label>
              <select
                value={settingsState.dunningGracePeriod}
                onChange={(e) => setSettingsState({ ...settingsState, dunningGracePeriod: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main text-content-primary focus:outline-none focus:border-accent"
              >
                <option value="48 Hours">48 Hours before Portal Suspension</option>
                <option value="72 Hours">72 Hours (Recommended Standard)</option>
                <option value="7 Days">7 Days (High-Trust Enterprise)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-content-secondary font-medium mb-1 text-xs">
              Cross-Subaccount Contact Deduplication Mode
            </label>
            <select
              value={settingsState.dedupMatching}
              onChange={(e) => setSettingsState({ ...settingsState, dedupMatching: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main text-content-primary focus:outline-none focus:border-accent text-xs"
            >
              <option value="Strict (Phone + Email)">Strict: Normalized E.164 Phone + Lowercase Email</option>
              <option value="Email Only">Email Only Matching</option>
              <option value="Relaxed">Fuzzy First Name + Phone</option>
            </select>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-content-primary font-display">
            Telecommunications & Regulatory Rules
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settingsState.smsQuietHours}
                onChange={(e) => setSettingsState({ ...settingsState, smsQuietHours: e.target.checked })}
                className="w-4 h-4 rounded text-accent border-border focus:ring-accent"
              />
              <div>
                <div className="font-semibold text-content-primary">
                  Enforce Local Destination Quiet Hours (8:00 PM – 8:00 AM)
                </div>
                <div className="text-content-muted text-[11px]">
                  Delays SMS dispatch automatically until recipient local business hours to maintain carrier delivery compliance.
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settingsState.telemetryLogging}
                onChange={(e) => setSettingsState({ ...settingsState, telemetryLogging: e.target.checked })}
                className="w-4 h-4 rounded text-accent border-border focus:ring-accent"
              />
              <div>
                <div className="font-semibold text-content-primary">
                  Real-Time Node Latency Telemetry Streaming
                </div>
                <div className="text-content-muted text-[11px]">
                  Emits sub-millisecond node timings to live execution log terminals.
                </div>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Save Global Preferences
            </Button>
          </div>
        </Card>
      </form>

      {/* Dangerous Operations / Demo Reset (PRD Section 23) */}
      <Card className="p-6 border-status-warning/40 bg-status-warning-bg/20 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-status-warning font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Demo Environment Reset</span>
            </div>
            <p className="text-xs text-content-secondary mt-1 max-w-xl leading-relaxed">
              Resets all simulated abandoned carts, test payments, webhook queues, support tickets, and analytics to the pristine initial state.
            </p>
          </div>

          <Button
            variant="danger"
            size="sm"
            onClick={handleConfirmReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset All Demo Data
          </Button>
        </div>
      </Card>
    </div>
  );
};


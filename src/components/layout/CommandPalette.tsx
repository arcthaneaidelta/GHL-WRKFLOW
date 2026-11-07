import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GitBranch, ArrowRight, X, AlertTriangle, Layers, Calendar, CreditCard, ShoppingCart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchOpen, setSearchOpen, workflows, transactions, appointments, integrations, incidents, abandonedCarts } = useAppStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredWorkflows = workflows.filter(
    (w) => w.name.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)
  ).slice(0, 4);

  const filteredTransactions = transactions.filter(
    (t) => t.contactName.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.product.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredAppointments = appointments.filter(
    (a) => a.customerName.toLowerCase().includes(q) || a.appointmentType.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredIntegrations = integrations.filter(
    (i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredIncidents = incidents.filter(
    (inc) => inc.title.toLowerCase().includes(q) || inc.affectedSystem.toLowerCase().includes(q)
  ).slice(0, 2);

  const filteredCarts = abandonedCarts.filter(
    (c) => c.customerName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
  ).slice(0, 2);

  const hasResults =
    filteredWorkflows.length > 0 ||
    filteredTransactions.length > 0 ||
    filteredAppointments.length > 0 ||
    filteredIntegrations.length > 0 ||
    filteredIncidents.length > 0 ||
    filteredCarts.length > 0;

  const handleSelect = (url: string) => {
    navigate(url);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-sidebar-bg/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={() => setSearchOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-modal border border-border overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-bg-main/30">
          <Search className="w-5 h-5 text-content-muted mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workflows, contacts, transactions, webhooks, incidents... (Ctrl + K)"
            className="w-full bg-transparent text-sm text-content-primary placeholder:text-content-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-content-muted hover:text-content-primary rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="ml-2 px-1.5 py-0.5 text-[11px] font-mono bg-bg-secondary text-content-muted rounded border border-border">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4">
          {!hasResults && query && (
            <div className="py-12 text-center text-content-muted text-sm">
              No matching automation records found for "{query}"
            </div>
          )}

          {/* Workflows */}
          {filteredWorkflows.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-accent" /> Workflows ({filteredWorkflows.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredWorkflows.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => handleSelect(`/app/workflows/${w.id}`)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-content-primary group-hover:text-accent transition-colors">
                        {w.name}
                      </div>
                      <div className="text-xs text-content-muted flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px]">{w.id}</span>
                        <span>•</span>
                        <span>{w.category}</span>
                        <span>•</span>
                        <span className="capitalize">{w.businessId === 'alpha' ? 'Apex Academy' : 'Vanguard Advisory'}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions */}
          {filteredTransactions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-accent" /> Transactions
              </div>
              <div className="space-y-1 mt-1">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => handleSelect('/app/payments')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-content-primary">
                        {tx.contactName} — ${tx.amount} ({tx.product})
                      </div>
                      <div className="text-xs text-content-muted font-mono mt-0.5">
                        {tx.id} • {tx.status} • {tx.timestamp}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appointments */}
          {filteredAppointments.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" /> Appointments
              </div>
              <div className="space-y-1 mt-1">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    onClick={() => handleSelect('/app/appointments')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-content-primary">
                        {apt.customerName} ({apt.appointmentType})
                      </div>
                      <div className="text-xs text-content-muted mt-0.5">
                        {apt.scheduledAt} • {apt.assignedStaff}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Abandoned Carts */}
          {filteredCarts.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5 text-status-warning" /> Abandoned Carts
              </div>
              <div className="space-y-1 mt-1">
                {filteredCarts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect('/app/carts')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-content-primary">
                        {c.customerName} — ${c.cartValue} ({c.product})
                      </div>
                      <div className="text-xs text-content-muted mt-0.5 font-mono">
                        {c.id} • Status: {c.recoveryStatus}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {filteredIntegrations.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" /> Integrations
              </div>
              <div className="space-y-1 mt-1">
                {filteredIntegrations.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => handleSelect('/app/integrations')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-content-primary">
                        {i.name}
                      </div>
                      <div className="text-xs text-content-muted mt-0.5">
                        Category: {i.category} • Status: {i.status} • {i.relatedWorkflows} workflows
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {filteredIncidents.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-status-error" /> Incidents
              </div>
              <div className="space-y-1 mt-1">
                {filteredIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    onClick={() => handleSelect('/app/health')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-bg-main cursor-pointer group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-status-error">
                        [{inc.id}] {inc.title}
                      </div>
                      <div className="text-xs text-content-muted mt-0.5">
                        System: {inc.affectedSystem} • Severity: {inc.severity}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-content-muted opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-bg-main border-t border-border flex items-center justify-between text-xs text-content-muted">
          <span>Search GoHighLevel Workflows, Stripe, Twilio & CRM</span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Navigate: ↑↓</span>
            <span>Select: ↵</span>
            <span>Close: ESC</span>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Building2,
  CheckCircle2,
  AlertCircle,
  Info,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface TopNavProps {
  onToggleMobileSidebar: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleMobileSidebar }) => {
  const location = useLocation();
  const {
    activeBusiness,
    setBusiness,
    businesses,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setSearchOpen,
    timeRange,
    setTimeRange,
  } = useAppStore();

  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const businessMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (businessMenuRef.current && !businessMenuRef.current.contains(e.target as Node)) {
        setIsBusinessMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Breadcrumbs title generator
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app') return { title: 'Automation Command Center', section: 'Overview' };
    if (path.startsWith('/app/workflows')) return { title: 'Workflow Management & Builder', section: 'Automation' };
    if (path === '/app/executions') return { title: 'Execution History & Diagnostics', section: 'Automation' };
    if (path === '/app/backlog') return { title: 'Automation Project Backlog', section: 'Automation' };
    if (path === '/app/funnels') return { title: 'Sales Funnel Operations', section: 'Revenue Operations' };
    if (path === '/app/carts') return { title: 'Abandoned Cart Recovery Engine', section: 'Revenue Operations' };
    if (path === '/app/payments') return { title: 'Payment & Dunning Management', section: 'Revenue Operations' };
    if (path === '/app/upsell-downsell') return { title: '1-Click Upsell & Downsell Funnels', section: 'Revenue Operations' };
    if (path === '/app/appointments') return { title: 'Calendar & Appointment Operations', section: 'Customer Operations' };
    if (path === '/app/onboarding') return { title: 'Customer Onboarding Lifecycle', section: 'Customer Operations' };
    if (path === '/app/support') return { title: 'Customer Support Triage & SLA', section: 'Customer Operations' };
    if (path === '/app/integrations') return { title: 'Integration Hub & API Bridge', section: 'Integrations' };
    if (path === '/app/api-inspector') return { title: 'API Request & Response Inspector', section: 'Integrations' };
    if (path === '/app/webhooks') return { title: 'Real-Time Webhook Sentinel', section: 'Integrations' };
    if (path === '/app/communications') return { title: 'Global SMS & Voice Routing', section: 'Integrations' };
    if (path === '/app/analytics') return { title: 'KPI Analytics & Automated Reports', section: 'Intelligence' };
    if (path === '/app/health') return { title: 'System Health & Incident Command', section: 'Intelligence' };
    if (path === '/app/businesses') return { title: 'Multi-Business Architecture', section: 'Business Environments' };
    if (path === '/app/settings') return { title: 'System Settings & Demo Reset', section: 'Administration' };
    return { title: 'Command Center', section: 'Overview' };
  };

  const { title, section } = getPageTitle();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-white/95 px-4 lg:px-6 backdrop-blur">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-content-secondary hover:bg-bg-secondary hover:text-content-primary"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-content-muted">
            <span>{section}</span>
            <span>/</span>
            <span className="text-content-secondary font-medium">{title}</span>
          </div>
          <h1 className="text-base font-semibold text-content-primary font-display leading-tight truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Button */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border border-border bg-bg-main/60 hover:bg-bg-secondary/70 text-xs text-content-muted transition-colors shadow-subtle group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-content-muted group-hover:text-accent transition-colors" />
            <span>Search workflows, transactions, contacts...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-border text-content-secondary shadow-subtle">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Time Range Selector */}
        <div className="hidden xl:flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
          {(['today', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-md capitalize transition-all font-medium ${
                timeRange === range
                  ? 'bg-white text-content-primary shadow-subtle'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'Today'}
            </button>
          ))}
        </div>

        {/* Business Context Switcher */}
        <div className="relative" ref={businessMenuRef}>
          <button
            onClick={() => setIsBusinessMenuOpen(!isBusinessMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white hover:bg-bg-secondary text-xs font-medium text-content-primary transition-colors shadow-subtle"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                activeBusiness === 'all'
                  ? 'bg-accent'
                  : activeBusiness === 'alpha'
                  ? 'bg-[#398568]'
                  : 'bg-[#65849A]'
              }`}
            />
            <span className="hidden sm:inline">
              {activeBusiness === 'all'
                ? 'All Businesses (2)'
                : activeBusiness === 'alpha'
                ? 'Apex Academy'
                : 'Vanguard Advisory'}
            </span>
            <span className="sm:hidden font-mono uppercase">
              {activeBusiness}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-content-muted" />
          </button>

          {isBusinessMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-elevated border border-border py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-content-muted border-b border-border">
                Switch Business Subaccount
              </div>

              <button
                onClick={() => {
                  setBusiness('all');
                  setIsBusinessMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-bg-main transition-colors ${
                  activeBusiness === 'all' ? 'bg-accent-light/40 font-semibold text-accent' : 'text-content-primary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div>
                    <div>All Businesses (Consolidated)</div>
                    <div className="text-[10px] text-content-muted">Unified operations view</div>
                  </div>
                </div>
                {activeBusiness === 'all' && <CheckCircle2 className="w-4 h-4 text-accent" />}
              </button>

              <button
                onClick={() => {
                  setBusiness('alpha');
                  setIsBusinessMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-bg-main transition-colors ${
                  activeBusiness === 'alpha' ? 'bg-accent-light/40 font-semibold text-accent' : 'text-content-primary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#398568]" />
                  <div>
                    <div>Apex Academy Online</div>
                    <div className="text-[10px] text-content-muted">Digital Courses & Funnels</div>
                  </div>
                </div>
                {activeBusiness === 'alpha' && <CheckCircle2 className="w-4 h-4 text-accent" />}
              </button>

              <button
                onClick={() => {
                  setBusiness('beta');
                  setIsBusinessMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-bg-main transition-colors ${
                  activeBusiness === 'beta' ? 'bg-accent-light/40 font-semibold text-accent' : 'text-content-primary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#65849A]" />
                  <div>
                    <div>Vanguard Enterprise Advisory</div>
                    <div className="text-[10px] text-content-muted">B2B High-Ticket Consulting</div>
                  </div>
                </div>
                {activeBusiness === 'beta' && <CheckCircle2 className="w-4 h-4 text-accent" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-bg-secondary transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-error ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-elevated border border-border py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-content-primary">System Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-status-error/10 text-status-error font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-accent hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-content-muted">
                    No active notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs hover:bg-bg-main transition-colors cursor-pointer ${
                        !n.read ? 'bg-bg-secondary/40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          {n.type === 'error' && <AlertCircle className="w-4 h-4 text-status-error" />}
                          {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-status-warning" />}
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-status-success" />}
                          {n.type === 'info' && <Info className="w-4 h-4 text-status-info" />}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-content-primary">{n.title}</div>
                          <div className="text-content-secondary text-[11px] mt-0.5">{n.message}</div>
                          <div className="text-content-muted font-mono text-[10px] mt-1">{n.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2 bg-bg-main/50 border-t border-border flex items-center justify-between text-[11px]">
                <Link
                  to="/app/health"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-accent hover:underline"
                >
                  View Incident Sentinel →
                </Link>
                <span className="font-mono text-content-muted">GoHighLevel Core v2</span>
              </div>
            </div>
          )}
        </div>

        {/* Live Status indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success-bg border border-status-success/20 text-status-success text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping" />
          <span className="text-[11px]">Simulated Engine Active</span>
        </div>
      </div>
    </header>
  );
};


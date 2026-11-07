import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  PlayCircle,
  Kanban,
  Filter,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Calendar,
  UserCheck,
  Headphones,
  Layers,
  Terminal,
  Activity,
  PhoneCall,
  BarChart3,
  ShieldAlert,
  Settings,
  Building,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const {
    activeBusiness,
    setBusiness,
    resetDemoData,
    abandonedCarts,
    incidents,
    backlogTasks,
  } = useAppStore();

  const pendingCartsCount = abandonedCarts.filter((c) => c.recoveryStatus === 'pending' || c.recoveryStatus === 'in_progress').length;
  const activeIncidentsCount = incidents.filter((i) => i.status !== 'resolved').length;
  const inProgressTasksCount = backlogTasks.filter((t) => t.status === 'in_progress').length;

  const navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Command Center', path: '/app', icon: LayoutDashboard },
        { label: 'Business Environments', path: '/app/businesses', icon: Building },
      ],
    },
    {
      title: 'Automation',
      items: [
        { label: 'Workflow Manager', path: '/app/workflows', icon: GitBranch },
        { label: 'Execution History', path: '/app/executions', icon: PlayCircle },
        {
          label: 'Automation Backlog',
          path: '/app/backlog',
          icon: Kanban,
          badge: inProgressTasksCount > 0 ? `${inProgressTasksCount}` : undefined,
          badgeColor: 'bg-white/10 text-white/80',
        },
      ],
    },
    {
      title: 'Revenue Operations',
      items: [
        { label: 'Sales Funnels', path: '/app/funnels', icon: Filter },
        {
          label: 'Cart Recovery',
          path: '/app/carts',
          icon: ShoppingCart,
          badge: pendingCartsCount > 0 ? `${pendingCartsCount}` : undefined,
          badgeColor: 'bg-status-warning/20 text-status-warning',
        },
        { label: 'Payments & Transactions', path: '/app/payments', icon: CreditCard },
        { label: 'Upsell & Downsell', path: '/app/upsell-downsell', icon: TrendingUp },
      ],
    },
    {
      title: 'Customer Operations',
      items: [
        { label: 'Appointments', path: '/app/appointments', icon: Calendar },
        { label: 'Onboarding Lifecycle', path: '/app/onboarding', icon: UserCheck },
        { label: 'Customer Support', path: '/app/support', icon: Headphones },
      ],
    },
    {
      title: 'Integrations & Bridge',
      items: [
        { label: 'Integration Hub', path: '/app/integrations', icon: Layers },
        { label: 'API Inspector', path: '/app/api-inspector', icon: Terminal },
        { label: 'Webhook Monitor', path: '/app/webhooks', icon: Activity },
        { label: 'SMS & Calling', path: '/app/communications', icon: PhoneCall },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        { label: 'Analytics & KPIs', path: '/app/analytics', icon: BarChart3 },
        {
          label: 'System Health & Incidents',
          path: '/app/health',
          icon: ShieldAlert,
          badge: activeIncidentsCount > 0 ? `${activeIncidentsCount}` : undefined,
          badgeColor: 'bg-status-error/30 text-status-error',
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        { label: 'Settings & Demo Reset', path: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-sidebar-bg/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-sidebar-bg text-white border-r border-sidebar-border flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border bg-sidebar-bg shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={onCloseMobile}
          >
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shadow-subtle">
              <svg
                className="w-4 h-4 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider uppercase font-display text-white">
                GHL COMMAND
              </div>
              <div className="text-[10px] font-mono text-[#929C96] tracking-tight">
                Enterprise Operations
              </div>
            </div>
          </Link>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md text-[#929C96] hover:text-white hover:bg-sidebar-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-sidebar-secondary">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-[#929C96]/70">
                {section.title}
              </div>
              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/app'}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-accent text-white shadow-subtle font-semibold'
                          : 'text-[#929C96] hover:text-white hover:bg-sidebar-secondary/70'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <item.icon className="w-4 h-4 shrink-0 transition-colors" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-sidebar-border bg-sidebar-secondary/40 shrink-0 space-y-2">
          {/* Active Context indicator */}
          <div className="px-2.5 py-1.5 rounded-lg bg-sidebar-secondary/60 border border-white/5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2 truncate">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  activeBusiness === 'all'
                    ? 'bg-accent'
                    : activeBusiness === 'alpha'
                    ? 'bg-[#398568]'
                    : 'bg-[#65849A]'
                }`}
              />
              <span className="text-[#929C96] truncate">
                {activeBusiness === 'all'
                  ? 'All Businesses'
                  : activeBusiness === 'alpha'
                  ? 'Apex Academy'
                  : 'Vanguard Advisory'}
              </span>
            </div>
            <Link
              to="/app/businesses"
              className="text-[#929C96] hover:text-white transition-colors"
              title="Change business"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Landing Page link & Reset Demo button */}
          <div className="flex items-center gap-1.5 pt-1">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-white/5 hover:bg-white/10 text-[#929C96] hover:text-white text-[11px] transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Reset all demo metrics and simulated workflows to default?')) {
                  resetDemoData();
                }
              }}
              title="Reset Demo Data"
              className="flex items-center justify-center p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-[#929C96] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};


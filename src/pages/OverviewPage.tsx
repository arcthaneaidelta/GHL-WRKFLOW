import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Building,
  RefreshCw,
  Bell,
  Clock,
  ChevronRight,
  ShoppingCart,
  AlertCircle,
  Play,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeBusiness,
    setBusiness,
    businesses,
    workflows,
    executions,
    transactions,
    activities,
    incidents,
    resolveIncident,
    dismissIncident,
    timeRange,
    setTimeRange,
    simulateAbandonedCart,
    simulateFailedPayment,
  } = useAppStore();

  // Filter based on active context
  const filteredWorkflows = workflows.filter(
    (w) => activeBusiness === 'all' || w.businessId === activeBusiness
  );

  const filteredTransactions = transactions.filter(
    (t) => activeBusiness === 'all' || t.businessId === activeBusiness
  );

  const filteredActivities = activities.filter(
    (a) => activeBusiness === 'all' || a.businessId === activeBusiness
  );

  const filteredIncidents = incidents.filter(
    (i) => activeBusiness === 'all' || i.businessId === activeBusiness || i.businessId === 'all'
  );

  // Consolidated Metrics Calculation
  const totalWorkflowsCount = filteredWorkflows.length;
  const healthyWorkflowsCount = filteredWorkflows.filter((w) => w.health === 'healthy').length;
  const attentionWorkflowsCount = filteredWorkflows.filter((w) => w.health === 'attention').length;
  const failingWorkflowsCount = filteredWorkflows.filter((w) => w.health === 'failing').length;

  const totalMonthlyRevenue =
    activeBusiness === 'all'
      ? businesses.alpha.monthlyRevenue + businesses.beta.monthlyRevenue
      : businesses[activeBusiness].monthlyRevenue;

  const totalActiveContacts =
    activeBusiness === 'all'
      ? businesses.alpha.activeContacts + businesses.beta.activeContacts
      : businesses[activeBusiness].activeContacts;

  const totalExecutions =
    activeBusiness === 'all'
      ? businesses.alpha.totalExecutions + businesses.beta.totalExecutions
      : businesses[activeBusiness].totalExecutions;

  // Chart data based on time range
  const chartData = [
    { time: '00:00', successful: 1240, failed: 8, total: 1248 },
    { time: '04:00', successful: 890, failed: 4, total: 894 },
    { time: '08:00', successful: 2450, failed: 14, total: 2464 },
    { time: '12:00', successful: 4890, failed: 22, total: 4912 },
    { time: '16:00', successful: 5120, failed: 18, total: 5138 },
    { time: '20:00', successful: 3940, failed: 12, total: 3952 },
    { time: 'Now', successful: 4210, failed: 6, total: 4216 },
  ];

  const healthDonutData = [
    { name: 'Healthy', value: healthyWorkflowsCount, color: '#398568' },
    { name: 'Needs Attention', value: attentionWorkflowsCount || 1, color: '#B58A49' },
    { name: 'Failing / Error', value: failingWorkflowsCount, color: '#C16D67' },
  ];

  return (
    <div className="space-y-6">
      {/* 7.1 Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
              Automation Command Center
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-accent-light text-accent text-xs font-mono font-medium">
              Live Simulated Engine
            </span>
          </div>
          <p className="text-xs text-content-secondary mt-1">
            Real-time telemetry, automated recovery cascades, and cross-subaccount operations.
          </p>
        </div>

        {/* Time range & Quick Simulation actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
            {(['today', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md capitalize transition-all font-medium ${
                  timeRange === range
                    ? 'bg-white text-content-primary shadow-subtle'
                    : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Today'}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={simulateAbandonedCart}
            icon={<ShoppingCart className="w-3.5 h-3.5 text-status-warning" />}
            title="Trigger Scenario A: Abandoned Cart"
          >
            + Test Cart
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={simulateFailedPayment}
            icon={<AlertCircle className="w-3.5 h-3.5 text-status-error" />}
            title="Trigger Scenario B: Payment Failure"
          >
            + Test Pay Fail
          </Button>
        </div>
      </div>

      {/* 7.2 KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* KPI 1: Active Workflows */}
        <Card
          hoverable
          onClick={() => navigate('/app/workflows')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Workflows</span>
            <GitBranch className="w-4 h-4 text-accent" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-content-primary">
              {totalWorkflowsCount}
            </div>
            <div className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-0.5">
              <span>↑ 99.4% reliable</span>
            </div>
          </div>
        </Card>

        {/* KPI 2: Successful Executions */}
        <Card
          hoverable
          onClick={() => navigate('/app/executions')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Executions</span>
            <CheckCircle2 className="w-4 h-4 text-status-success" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-content-primary">
              {formatNumber(totalExecutions)}
            </div>
            <div className="text-[11px] text-content-muted mt-0.5">
              Across both accounts
            </div>
          </div>
        </Card>

        {/* KPI 3: Failed / Retrying */}
        <Card
          hoverable
          onClick={() => navigate('/app/executions?status=failed')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Failed / Retried</span>
            <AlertTriangle className="w-4 h-4 text-status-warning" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-status-warning">
              {failingWorkflowsCount || 1}
            </div>
            <div className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-0.5">
              <span>Auto-recovery queued</span>
            </div>
          </div>
        </Card>

        {/* KPI 4: Revenue Attributed */}
        <Card
          hoverable
          onClick={() => navigate('/app/payments')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Attributed MRR</span>
            <DollarSign className="w-4 h-4 text-accent" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-content-primary truncate">
              {formatCurrency(totalMonthlyRevenue)}
            </div>
            <div className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-0.5">
              <span>↑ 14.8% vs last month</span>
            </div>
          </div>
        </Card>

        {/* KPI 5: Active Contacts */}
        <Card
          hoverable
          onClick={() => navigate('/app/onboarding')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Contacts Managed</span>
            <Users className="w-4 h-4 text-content-muted" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-content-primary">
              {formatNumber(totalActiveContacts)}
            </div>
            <div className="text-[11px] text-content-muted mt-0.5">
              Zero duplicate records
            </div>
          </div>
        </Card>

        {/* KPI 6: Integration Health */}
        <Card
          hoverable
          onClick={() => navigate('/app/integrations')}
          className="p-4 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-content-secondary">Integrations</span>
            <ShieldCheck className="w-4 h-4 text-status-success" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-display text-content-primary">
              11 / 12 Up
            </div>
            <div className="text-[11px] text-status-warning font-medium mt-0.5 truncate">
              1 Degraded (Kajabi 504)
            </div>
          </div>
        </Card>
      </div>

      {/* 7.3 Main Activity Chart & 7.5 Health Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Automation Activity Chart */}
        <Card className="lg:col-span-8 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Execution Volume & Deterministic Success
              </h3>
              <p className="text-xs text-content-muted">
                Hourly throughput of active GoHighLevel triggers and webhook consumers
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-content-secondary">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent" /> Successful
              </span>
              <span className="flex items-center gap-1.5 text-content-secondary">
                <span className="w-2.5 h-2.5 rounded-sm bg-status-warning" /> Retried/Failed
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#527D6B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#527D6B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B58A49" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#B58A49" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#929C96"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E9E5' }}
                />
                <YAxis
                  stroke="#929C96"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E9E5' }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#172522',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="successful"
                  stroke="#527D6B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#successGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stroke="#B58A49"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#failedGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 7.5 Workflow Health Distribution */}
        <Card className="lg:col-span-4 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Workflow Health Distribution
              </h3>
              <span className="text-xs font-mono text-content-muted">
                {totalWorkflowsCount} Total
              </span>
            </div>
            <p className="text-xs text-content-muted mt-1">
              Active state distribution across subaccounts
            </p>

            <div className="h-44 w-full flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {healthDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#172522',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <div
              onClick={() => navigate('/app/workflows')}
              className="flex items-center justify-between text-xs hover:bg-bg-main p-1.5 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-success" />
                <span className="text-content-primary font-medium">Healthy & Active</span>
              </div>
              <span className="font-mono text-content-secondary">{healthyWorkflowsCount}</span>
            </div>

            <div
              onClick={() => navigate('/app/workflows')}
              className="flex items-center justify-between text-xs hover:bg-bg-main p-1.5 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-warning" />
                <span className="text-content-primary font-medium">Attention (Retrying)</span>
              </div>
              <span className="font-mono text-status-warning font-semibold">
                {attentionWorkflowsCount || 1}
              </span>
            </div>

            <div
              onClick={() => navigate('/app/workflows')}
              className="flex items-center justify-between text-xs hover:bg-bg-main p-1.5 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-error" />
                <span className="text-content-primary font-medium">Failing / Errors</span>
              </div>
              <span className="font-mono text-content-muted">{failingWorkflowsCount}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 7.4 Multi-Business Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Alpha */}
        <Card
          hoverable
          onClick={() => setBusiness('alpha')}
          className={`p-6 border-2 transition-all ${
            activeBusiness === 'alpha'
              ? 'border-accent bg-accent-light/10'
              : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#398568]" />
              <div>
                <h4 className="text-base font-bold text-content-primary font-display">
                  {businesses.alpha.name}
                </h4>
                <div className="text-xs text-content-secondary">
                  {businesses.alpha.type}
                </div>
              </div>
            </div>
            <Badge status="healthy" label="Active" size="sm" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
            <div>
              <div className="text-[11px] text-content-muted">Monthly Revenue</div>
              <div className="text-lg font-bold font-display text-content-primary mt-0.5">
                {formatCurrency(businesses.alpha.monthlyRevenue)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-content-muted">Workflows</div>
              <div className="text-lg font-bold font-display text-content-primary mt-0.5">
                {businesses.alpha.activeWorkflows}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-content-muted">Success Rate</div>
              <div className="text-lg font-bold font-display text-status-success mt-0.5">
                {businesses.alpha.successRate}%
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-accent font-medium">
            <span>Filter to Apex Academy Context</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>

        {/* Business Beta */}
        <Card
          hoverable
          onClick={() => setBusiness('beta')}
          className={`p-6 border-2 transition-all ${
            activeBusiness === 'beta'
              ? 'border-accent bg-accent-light/10'
              : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#65849A]" />
              <div>
                <h4 className="text-base font-bold text-content-primary font-display">
                  {businesses.beta.name}
                </h4>
                <div className="text-xs text-content-secondary">
                  {businesses.beta.type}
                </div>
              </div>
            </div>
            <Badge status="healthy" label="Active" size="sm" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
            <div>
              <div className="text-[11px] text-content-muted">Monthly Revenue</div>
              <div className="text-lg font-bold font-display text-content-primary mt-0.5">
                {formatCurrency(businesses.beta.monthlyRevenue)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-content-muted">Workflows</div>
              <div className="text-lg font-bold font-display text-content-primary mt-0.5">
                {businesses.beta.activeWorkflows}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-content-muted">Success Rate</div>
              <div className="text-lg font-bold font-display text-status-success mt-0.5">
                {businesses.beta.successRate}%
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-accent font-medium">
            <span>Filter to Vanguard Advisory Context</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Card>
      </div>

      {/* 7.6 Recent Activity Feed & 7.7 Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Feed */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Real-Time Automation Activity
              </h3>
              <p className="text-xs text-content-muted">
                Live stream of executed triggers, SMS routing, and webhook events
              </p>
            </div>
            <span className="text-xs font-mono text-content-muted">
              {filteredActivities.length} Events
            </span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-lg bg-bg-main/60 border border-border/80 flex items-start justify-between text-xs hover:bg-bg-secondary/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-content-primary">
                      {act.eventType}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        act.businessId === 'alpha'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {act.businessId === 'alpha' ? 'Apex' : 'Vanguard'}
                    </span>
                  </div>
                  <p className="text-content-secondary leading-snug">{act.description}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-[11px] font-mono text-content-muted">
                    {act.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 7.7 Critical Alerts Sentinel */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" />
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Operational Incidents & Alerts
              </h3>
            </div>
            <span className="text-xs font-mono text-status-warning font-semibold">
              {filteredIncidents.filter((i) => i.status !== 'resolved').length} Active
            </span>
          </div>

          <div className="space-y-3">
            {filteredIncidents.map((inc) => (
              <div
                key={inc.id}
                className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${
                  inc.status === 'resolved'
                    ? 'bg-status-success-bg/40 border-status-success/20 opacity-70'
                    : 'bg-white border-border shadow-subtle'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-content-muted">[{inc.id}]</span>
                      <span className="font-semibold text-content-primary">{inc.title}</span>
                    </div>
                    <div className="text-[11px] text-content-muted mt-0.5">
                      System: {inc.affectedSystem} • Started: {inc.startedAt}
                    </div>
                  </div>
                  <Badge
                    status={inc.status === 'resolved' ? 'resolved' : inc.severity}
                    size="sm"
                  />
                </div>

                <p className="text-content-secondary text-[11px] leading-relaxed">
                  {inc.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-[10px] font-mono text-content-muted">
                    {inc.affectedRecordsCount} record(s) affected
                  </span>
                  <div className="flex items-center gap-2">
                    {inc.status !== 'resolved' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => resolveIncident(inc.id)}
                        className="text-[11px] py-1"
                      >
                        Resolve Incident
                      </Button>
                    ) : (
                      <span className="text-status-success font-mono text-[11px]">
                        ✓ Resolved
                      </span>
                    )}
                    <button
                      onClick={() => navigate('/app/health')}
                      className="text-xs text-accent hover:underline font-medium"
                    >
                      Investigate →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};


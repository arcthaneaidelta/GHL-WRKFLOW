import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  GitBranch,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Workflow, WorkflowCategory } from '../types';
import { formatNumber } from '../utils/formatters';

export const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const { workflows, activeBusiness, setBusiness } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHealth, setSelectedHealth] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'executions' | 'successRate'>('executions');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Categories list
  const categories: WorkflowCategory[] = [
    'Sales & Checkout',
    'Cart Recovery',
    'Appointments',
    'Onboarding',
    'Customer Support',
    'Integration & Sync',
    'Re-engagement',
  ];

  // Filtering
  const filteredWorkflows = workflows.filter((w) => {
    if (activeBusiness !== 'all' && w.businessId !== activeBusiness) return false;
    if (selectedCategory !== 'all' && w.category !== selectedCategory) return false;
    if (selectedHealth !== 'all' && w.health !== selectedHealth) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = w.name.toLowerCase().includes(q);
      const matchTrigger = w.trigger.toLowerCase().includes(q);
      const matchId = w.id.toLowerCase().includes(q);
      if (!matchName && !matchTrigger && !matchId) return false;
    }
    return true;
  });

  // Sorting
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortField === 'executions') {
      return sortOrder === 'asc' ? a.executions - b.executions : b.executions - a.executions;
    }
    if (sortField === 'successRate') {
      return sortOrder === 'asc' ? a.successRate - b.successRate : b.successRate - a.successRate;
    }
    return 0;
  });

  const toggleSort = (field: 'name' | 'executions' | 'successRate') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Workflow Orchestration Manager
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Browse, inspect, and test 25+ interconnected multi-branch automations across subaccounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/workflows/wf-cart-rec-01?tab=builder')}
            icon={<GitBranch className="w-4 h-4" />}
          >
            Open Visual Builder
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-border p-4 space-y-3 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by workflow name, trigger event, or ID..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent text-content-primary"
            />
          </div>

          {/* Quick Filter Selects */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-bg-main text-content-primary focus:outline-none"
            >
              <option value="all">All Categories ({workflows.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedHealth}
              onChange={(e) => setSelectedHealth(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-border bg-bg-main text-content-primary focus:outline-none"
            >
              <option value="all">All Health States</option>
              <option value="healthy">Healthy Only</option>
              <option value="attention">Needs Attention</option>
              <option value="failing">Failing</option>
            </select>

            {/* Context Filter Pill */}
            <div className="flex items-center bg-bg-secondary rounded-lg p-0.5 border border-border text-xs">
              {(['all', 'alpha', 'beta'] as const).map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setBusiness(ctx)}
                  className={`px-2.5 py-1 rounded capitalize font-medium ${
                    activeBusiness === ctx
                      ? 'bg-white text-content-primary shadow-subtle'
                      : 'text-content-secondary'
                  }`}
                >
                  {ctx === 'all' ? 'All' : ctx === 'alpha' ? 'Alpha' : 'Beta'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflows Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-bg-main border-b border-border text-content-secondary uppercase font-mono text-[11px]">
              <tr>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:text-content-primary"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Workflow Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 font-semibold">Business</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Trigger Event</th>
                <th
                  onClick={() => toggleSort('executions')}
                  className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-content-primary"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Executions</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('successRate')}
                  className="py-3 px-3 font-semibold text-right cursor-pointer hover:text-content-primary"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Success %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 font-semibold">Health</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sortedWorkflows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-content-muted">
                    No matching workflows found. Try clearing your search or filters.
                  </td>
                </tr>
              ) : (
                sortedWorkflows.map((w) => (
                  <tr
                    key={w.id}
                    onClick={() => navigate(`/app/workflows/${w.id}`)}
                    className="hover:bg-bg-main/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-content-primary group-hover:text-accent transition-colors flex items-center gap-2">
                        <span>{w.name}</span>
                        {w.nodes && w.nodes.length > 0 && (
                          <span className="px-1.5 py-0.2 rounded bg-bg-secondary text-[10px] font-mono text-content-muted">
                            {w.nodes.length} nodes
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-content-muted mt-0.5">
                        {w.id} • Last run {w.lastExecuted}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                          w.businessId === 'alpha'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            w.businessId === 'alpha' ? 'bg-[#398568]' : 'bg-[#65849A]'
                          }`}
                        />
                        {w.businessId === 'alpha' ? 'Apex Academy' : 'Vanguard Advisory'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-content-secondary font-medium">
                        {w.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="text-content-primary text-[11px] max-w-[200px] truncate" title={w.trigger}>
                        {w.trigger}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-medium text-content-primary">
                      {formatNumber(w.executions)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono">
                      <span
                        className={
                          w.successRate >= 99
                            ? 'text-status-success font-semibold'
                            : 'text-status-warning font-semibold'
                        }
                      >
                        {w.successRate}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge status={w.health} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/workflows/${w.id}?tab=builder`);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                      >
                        <span>Build</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-bg-main/50 border-t border-border flex items-center justify-between text-xs text-content-muted">
          <span>
            Showing {sortedWorkflows.length} of {workflows.length} workflows
          </span>
          <span className="font-mono text-[11px]">Click any workflow row to inspect nodes or run test scenario</span>
        </div>
      </Card>
    </div>
  );
};


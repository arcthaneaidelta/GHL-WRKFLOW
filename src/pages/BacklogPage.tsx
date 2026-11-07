import React, { useState } from 'react';
import {
  Plus,
  Kanban,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  User,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { BacklogTask } from '../types';

const columns: { id: BacklogTask['status']; title: string }[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'planned', title: 'Planned' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'testing', title: 'Testing' },
  { id: 'completed', title: 'Completed' },
];

export const BacklogPage: React.FC = () => {
  const { backlogTasks, moveBacklogTask, addBacklogTask, activeBusiness } = useAppStore();
  const [selectedTask, setSelectedTask] = useState<BacklogTask | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    category: 'Sales Funnels',
    businessId: 'alpha' as 'alpha' | 'beta' | 'all',
    priority: 'high' as 'critical' | 'high' | 'medium' | 'low',
    description: '',
    estimatedHours: 8,
    dueDate: '2026-11-20',
    assignedTo: 'Lead Automation Specialist',
    status: 'backlog' as BacklogTask['status'],
  });

  const filteredTasks = backlogTasks.filter((t) => {
    if (activeBusiness !== 'all' && t.businessId !== activeBusiness && t.businessId !== 'all') {
      return false;
    }
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskForm.title) return;
    addBacklogTask(newTaskForm);
    setIsAddModalOpen(false);
    setNewTaskForm({
      title: '',
      category: 'Sales Funnels',
      businessId: 'alpha',
      priority: 'high',
      description: '',
      estimatedHours: 8,
      dueDate: '2026-11-20',
      assignedTo: 'Lead Automation Specialist',
      status: 'backlog',
    });
  };

  const getPriorityBadge = (priority: BacklogTask['priority']) => {
    switch (priority) {
      case 'critical':
        return <Badge status="error" label="Critical" size="sm" />;
      case 'high':
        return <Badge status="warning" label="High" size="sm" />;
      case 'medium':
        return <Badge status="info" label="Medium" size="sm" />;
      case 'low':
        return <Badge status="healthy" label="Low" size="sm" />;
    }
  };

  const columnStatusOrder: BacklogTask['status'][] = [
    'backlog',
    'planned',
    'in_progress',
    'testing',
    'completed',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-content-primary font-display tracking-tight">
            Automation Backlog & Task Management
          </h2>
          <p className="text-xs text-content-secondary mt-1">
            Prioritize, track, and stage upcoming GoHighLevel optimization projects and pipeline initiatives.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Automation Initiative
        </Button>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const colIndex = columnStatusOrder.indexOf(col.id);

          return (
            <div
              key={col.id}
              className="bg-bg-main/70 rounded-xl border border-border p-3 flex flex-col min-w-[240px] max-w-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-content-primary font-display uppercase tracking-wider">
                    {col.title}
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-bg-secondary text-[10px] font-mono font-semibold text-content-secondary border border-border">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[70vh] pr-0.5">
                {colTasks.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-content-muted border border-dashed border-border rounded-lg">
                    No tasks in {col.title}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="p-3.5 rounded-lg bg-white border border-border shadow-subtle hover:border-accent/40 hover:shadow-card transition-all cursor-pointer space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-mono text-[10px] text-content-muted">
                          {task.id}
                        </span>
                        {getPriorityBadge(task.priority)}
                      </div>

                      <h4 className="text-xs font-semibold text-content-primary leading-snug group-hover:text-accent transition-colors">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-content-secondary line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-content-muted">
                        <span className="truncate">{task.category}</span>
                        <span>{task.estimatedHours}h est.</span>
                      </div>

                      {/* Quick Move stage buttons */}
                      <div className="pt-1.5 flex items-center justify-between border-t border-border/40">
                        {colIndex > 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBacklogTask(task.id, columnStatusOrder[colIndex - 1]);
                            }}
                            className="p-1 rounded text-content-muted hover:text-content-primary hover:bg-bg-secondary transition-colors"
                            title={`Move to ${columns[colIndex - 1].title}`}
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div />
                        )}

                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            task.businessId === 'alpha'
                              ? 'bg-emerald-50 text-emerald-800'
                              : task.businessId === 'beta'
                              ? 'bg-slate-100 text-slate-800'
                              : 'bg-accent-light text-accent'
                          }`}
                        >
                          {task.businessId === 'alpha'
                            ? 'Alpha'
                            : task.businessId === 'beta'
                            ? 'Beta'
                            : 'All'}
                        </span>

                        {colIndex < columnStatusOrder.length - 1 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBacklogTask(task.id, columnStatusOrder[colIndex + 1]);
                            }}
                            className="p-1 rounded text-content-muted hover:text-content-primary hover:bg-bg-secondary transition-colors"
                            title={`Move to ${columns[colIndex + 1].title}`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      <Modal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask ? `[${selectedTask.id}] ${selectedTask.title}` : ''}
        subtitle="Automation Project Specification"
      >
        {selectedTask && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2">
              {getPriorityBadge(selectedTask.priority)}
              <span className="font-mono text-content-muted">
                Due: {selectedTask.dueDate}
              </span>
              <span className="font-mono text-content-muted">
                • {selectedTask.estimatedHours} hours
              </span>
            </div>

            <div>
              <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                Project Scope & Requirements
              </label>
              <div className="p-3 rounded-lg bg-bg-main border border-border text-content-primary leading-relaxed">
                {selectedTask.description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                  Category
                </label>
                <div className="p-2.5 rounded-lg bg-bg-main border border-border text-content-primary font-medium">
                  {selectedTask.category}
                </div>
              </div>
              <div>
                <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                  Subaccount Scope
                </label>
                <div className="p-2.5 rounded-lg bg-bg-main border border-border text-content-primary capitalize">
                  {selectedTask.businessId === 'alpha'
                    ? 'Apex Academy Online'
                    : selectedTask.businessId === 'beta'
                    ? 'Vanguard Enterprise Advisory'
                    : 'Consolidated (All Businesses)'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-content-muted font-mono uppercase text-[10px] mb-1">
                Move Kanban Stage
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {columns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      moveBacklogTask(selectedTask.id, c.id);
                      setSelectedTask({ ...selectedTask, status: c.id });
                    }}
                    className={`py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition-all ${
                      selectedTask.status === c.id
                        ? 'bg-accent text-white font-semibold shadow-subtle'
                        : 'bg-bg-main border border-border text-content-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedTask(null)}
              >
                Close Task
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Automation Project Initiative"
        subtitle="Stage an upcoming workflow or integration requirement"
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block text-content-secondary font-medium mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={newTaskForm.title}
              onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
              placeholder="e.g. Build 2-Hour WhatsApp Reminder Fallback"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Category
              </label>
              <select
                value={newTaskForm.category}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              >
                <option value="Sales Funnels">Sales Funnels</option>
                <option value="Payments">Payments & Dunning</option>
                <option value="Appointments">Appointments</option>
                <option value="Integrations">Integrations & APIs</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Reporting">Reporting & KPIs</option>
              </select>
            </div>

            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Target Business
              </label>
              <select
                value={newTaskForm.businessId}
                onChange={(e: any) => setNewTaskForm({ ...newTaskForm, businessId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              >
                <option value="alpha">Apex Academy Online</option>
                <option value="beta">Vanguard Advisory</option>
                <option value="all">All Businesses (Global)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Priority
              </label>
              <select
                value={newTaskForm.priority}
                onChange={(e: any) => setNewTaskForm({ ...newTaskForm, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-content-secondary font-medium mb-1">
                Estimated Hours
              </label>
              <input
                type="number"
                min={1}
                value={newTaskForm.estimatedHours}
                onChange={(e) => setNewTaskForm({ ...newTaskForm, estimatedHours: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-content-secondary font-medium mb-1">
              Project Description & Acceptance Criteria
            </label>
            <textarea
              rows={3}
              value={newTaskForm.description}
              onChange={(e) => setNewTaskForm({ ...newTaskForm, description: e.target.value })}
              placeholder="Outline specific trigger criteria, wait duration, and expected recovery metrics..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-main focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Add to Backlog
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


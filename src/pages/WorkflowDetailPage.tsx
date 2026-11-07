import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  GitBranch,
  Clock,
  CheckCircle2,
  AlertCircle,
  Layers,
  Settings,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ChevronRight,
  Terminal,
  Activity,
  Send,
  Mail,
  MessageSquare,
  Globe,
  Filter,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { WorkflowNode, Workflow } from '../types';

export const WorkflowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { workflows, executions, addExecutionRecord } = useAppStore();

  const workflow = workflows.find((w) => w.id === id) || workflows[0];
  const initialTab = searchParams.get('tab') || 'builder';
  const [activeTab, setActiveTab] = useState<'overview' | 'builder' | 'history' | 'dependencies'>(
    initialTab as any
  );

  // Builder States
  const [nodes, setNodes] = useState<WorkflowNode[]>(workflow.nodes || []);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(nodes[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Simulation Runner State
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSimNodeId, setActiveSimNodeId] = useState<string | null>(null);
  const [simulatedLogs, setSimulatedLogs] = useState<
    { step: number; title: string; message: string; status: 'running' | 'success' | 'branch' }[]
  >([]);
  const [selectedScenario, setSelectedScenario] = useState<
    'abandoned_sms' | 'purchased_early' | 'high_intent'
  >('abandoned_sms');

  useEffect(() => {
    setNodes(workflow.nodes || []);
    setSelectedNode(workflow.nodes?.[0] || null);
  }, [workflow]);

  // Run Test Execution Simulation (PRD Section 9.3 & Scenario E)
  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setSimulatedLogs([]);
    setActiveSimNodeId(null);

    const logList: { step: number; title: string; message: string; status: 'running' | 'success' | 'branch' }[] = [];

    const addLog = (title: string, message: string, status: 'running' | 'success' | 'branch') => {
      logList.push({ step: logList.length + 1, title, message, status });
      setSimulatedLogs([...logList]);
    };

    // Scenario logic
    if (selectedScenario === 'abandoned_sms') {
      // Step 1: n1
      setActiveSimNodeId('n1');
      addLog('Trigger: Cart Abandoned', 'Intercepted cart checkout_id #1092 ($297)', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 2: n2
      setActiveSimNodeId('n2');
      addLog('Wait 15 Minutes', 'Simulating timer expiration (15m elapsed)', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 3: n3
      setActiveSimNodeId('n3');
      addLog('Check: Purchase Completed?', 'Evaluated has_purchased = false. Branching to NO.', 'branch');
      await new Promise((r) => setTimeout(r, 700));

      // Step 4: n4
      setActiveSimNodeId('n4');
      addLog('Send Recovery Email #1', 'SendGrid 202: Message dispatched with cart link', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 5: n5
      setActiveSimNodeId('n5');
      addLog('Wait 2 Hours', 'Cooldown interval finished', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 6: n6
      setActiveSimNodeId('n6');
      addLog('Check: Email Opened?', 'Webhook returned email_opened = false. Branching to NO (SMS Fallback)', 'branch');
      await new Promise((r) => setTimeout(r, 700));

      // Step 7: n8
      setActiveSimNodeId('n8');
      addLog('Send SMS Recovery Message', 'Twilio US 10DLC delivered message to +1 (415) 890-2341', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 8: n13
      setActiveSimNodeId('n13');
      addLog('End Workflow', 'Cart salvage cascade completed. Awaiting customer click.', 'success');
    } else if (selectedScenario === 'purchased_early') {
      // Step 1: n1
      setActiveSimNodeId('n1');
      addLog('Trigger: Cart Abandoned', 'Captured cart checkout event', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 2: n2
      setActiveSimNodeId('n2');
      addLog('Wait 15 Minutes', 'Timer completed', 'success');
      await new Promise((r) => setTimeout(r, 600));

      // Step 3: n3
      setActiveSimNodeId('n3');
      addLog('Check: Purchase Completed?', 'Customer purchased in checkout! has_purchased = true. Branching to YES.', 'branch');
      await new Promise((r) => setTimeout(r, 700));

      // Step 4: End
      setActiveSimNodeId('n13');
      addLog('End Workflow', 'Customer self-converted without needing email or SMS. Terminated safely.', 'success');
    } else {
      // high intent
      setActiveSimNodeId('n1');
      addLog('Trigger: High-Ticket Lead Inbound', 'Lead score 94 calculated', 'success');
      await new Promise((r) => setTimeout(r, 600));
      setActiveSimNodeId('n4');
      addLog('Priority Booking Calendar', 'Dispatched VIP partner calendar link', 'success');
    }

    setIsSimulating(false);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setActiveSimNodeId(null);
    setSimulatedLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/workflows')}
            className="p-2 rounded-lg border border-border bg-white hover:bg-bg-secondary text-content-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-content-muted">{workflow.id}</span>
              <span className="text-content-muted">•</span>
              <Badge status={workflow.health} size="sm" />
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                  workflow.businessId === 'alpha'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {workflow.businessId === 'alpha' ? 'Apex Academy' : 'Vanguard Advisory'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-content-primary font-display mt-0.5">
              {workflow.name}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedScenario}
            onChange={(e: any) => setSelectedScenario(e.target.value)}
            disabled={isSimulating}
            className="text-xs px-3 py-2 rounded-lg border border-border bg-white text-content-primary focus:outline-none"
          >
            <option value="abandoned_sms">
              Scenario 1: Abandoned → Unopened Email → SMS Dispatched
            </option>
            <option value="purchased_early">
              Scenario 2: Early Purchase → Bypasses Recovery
            </option>
            <option value="high_intent">
              Scenario 3: Fast-Track Lead Escalation
            </option>
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSimulation}
            loading={isSimulating}
            icon={<Play className="w-4 h-4" />}
          >
            Run Test Execution
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetSimulation}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border text-xs">
        {[
          { id: 'builder', label: 'Visual Workflow Builder', icon: GitBranch },
          { id: 'overview', label: 'Overview & Metadata', icon: Layers },
          { id: 'history', label: 'Execution History', icon: Clock },
          { id: 'dependencies', label: 'Integrations & Webhooks', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSearchParams({ tab: tab.id });
            }}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-content-secondary hover:text-content-primary'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: VISUAL WORKFLOW BUILDER (PRD Section 9.3) */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas Area (9 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Canvas Toolbar */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-border shadow-subtle text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-content-primary">Canvas Engine:</span>
                <span className="font-mono text-content-muted text-[11px]">
                  {nodes.length} connected nodes
                </span>
                {isSimulating && (
                  <span className="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning font-mono text-[10px] animate-pulse">
                    Executing live scenario...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  className="p-1.5 rounded hover:bg-bg-secondary text-content-muted"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-[11px] px-1 text-content-muted">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
                  className="p-1.5 rounded hover:bg-bg-secondary text-content-muted"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded hover:bg-bg-secondary text-content-muted"
                  title="Fit to Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Canvas Board */}
            <div
              className="relative w-full rounded-2xl border border-border bg-bg-main/70 p-8 min-h-[580px] overflow-auto shadow-inner"
              style={{
                backgroundImage: `radial-gradient(rgba(32, 43, 39, 0.08) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            >
              <div
                className="max-w-xl mx-auto space-y-6 transition-transform duration-150 origin-top"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {nodes.map((node, index) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isSimActive = activeSimNodeId === node.id;

                  const getNodeColor = () => {
                    if (node.type === 'trigger') return 'border-accent bg-accent/5 text-accent';
                    if (node.type === 'condition') return 'border-status-warning bg-status-warning-bg text-status-warning';
                    if (node.type === 'email' || node.type === 'sms') return 'border-status-info bg-status-info-bg text-status-info';
                    if (node.type === 'wait') return 'border-slate-300 bg-white text-content-secondary';
                    if (node.type === 'end') return 'border-content-muted bg-bg-secondary text-content-muted';
                    return 'border-border bg-white text-content-primary';
                  };

                  return (
                    <div key={node.id} className="relative flex flex-col items-center">
                      {/* Node Card */}
                      <div
                        onClick={() => setSelectedNode(node)}
                        className={`w-full max-w-md p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-subtle ${getNodeColor()} ${
                          isSelected
                            ? 'ring-4 ring-accent/20 border-accent shadow-card scale-[1.02]'
                            : 'hover:border-accent/40'
                        } ${
                          isSimActive
                            ? 'ring-4 ring-emerald-500 scale-105 border-emerald-500 shadow-modal bg-emerald-50/90'
                            : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {node.type === 'trigger' && <Play className="w-4 h-4 text-accent" />}
                            {node.type === 'condition' && <Filter className="w-4 h-4 text-status-warning" />}
                            {node.type === 'wait' && <Clock className="w-4 h-4 text-content-muted" />}
                            {node.type === 'email' && <Mail className="w-4 h-4 text-status-info" />}
                            {node.type === 'sms' && <MessageSquare className="w-4 h-4 text-status-info" />}
                            {node.type === 'action' && <Activity className="w-4 h-4 text-content-primary" />}
                            {node.type === 'end' && <CheckCircle2 className="w-4 h-4 text-content-muted" />}

                            <span className="font-semibold text-xs text-content-primary">
                              {node.title}
                            </span>
                          </div>

                          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/70 border border-border text-content-muted">
                            {node.type}
                          </span>
                        </div>

                        <p className="text-[11px] text-content-secondary mt-2 leading-relaxed">
                          {node.description}
                        </p>

                        {node.duration && (
                          <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-content-muted">
                            <span>Execution Latency:</span>
                            <span className="text-content-primary">{node.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Connecting Line Downward */}
                      {index < nodes.length - 1 && (
                        <div className="w-0.5 h-6 bg-border relative my-1">
                          <div className="absolute bottom-0 -left-1 w-2.5 h-2.5 border-b-2 border-r-2 border-border rotate-45" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Simulation Execution Logs Terminal */}
            {simulatedLogs.length > 0 && (
              <Card className="p-4 bg-sidebar-bg text-white font-mono text-xs space-y-2 border-sidebar-border">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Terminal className="w-4 h-4" />
                    <span className="font-semibold tracking-wider uppercase text-[11px]">
                      Live Execution Trace Terminal
                    </span>
                  </div>
                  <span className="text-[10px] text-[#929C96]">
                    Scenario: {selectedScenario}
                  </span>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {simulatedLogs.map((log) => (
                    <div key={log.step} className="flex items-start gap-2 text-[11px]">
                      <span className="text-accent shrink-0">[{log.step}]</span>
                      <span className="text-white/90 font-medium shrink-0">{log.title}:</span>
                      <span
                        className={
                          log.status === 'branch'
                            ? 'text-amber-300'
                            : 'text-emerald-300'
                        }
                      >
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Inspection & Configuration Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-sm font-semibold text-content-primary font-display">
                  Node Inspector
                </h3>
                {selectedNode && (
                  <span className="font-mono text-xs text-content-muted">
                    {selectedNode.id}
                  </span>
                )}
              </div>

              {selectedNode ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-content-muted text-[11px] font-mono uppercase mb-1">
                      Node Title
                    </label>
                    <input
                      type="text"
                      value={selectedNode.title}
                      readOnly
                      className="w-full px-3 py-2 rounded-lg bg-bg-main border border-border text-content-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-content-muted text-[11px] font-mono uppercase mb-1">
                      Action Type
                    </label>
                    <div className="px-3 py-2 rounded-lg bg-bg-main border border-border text-content-primary font-mono capitalize">
                      {selectedNode.type}
                    </div>
                  </div>

                  <div>
                    <label className="block text-content-muted text-[11px] font-mono uppercase mb-1">
                      Execution Logic & Conditions
                    </label>
                    <textarea
                      rows={3}
                      value={selectedNode.description}
                      readOnly
                      className="w-full px-3 py-2 rounded-lg bg-bg-main border border-border text-content-primary leading-relaxed resize-none"
                    />
                  </div>

                  {selectedNode.type === 'condition' && (
                    <div className="p-3 rounded-lg bg-status-warning-bg/60 border border-status-warning/20 space-y-1">
                      <div className="font-semibold text-status-warning text-[11px]">
                        Branching Evaluation
                      </div>
                      <div className="text-[11px] text-content-primary">
                        • If YES → Proceeds to confirmation / completion.
                      </div>
                      <div className="text-[11px] text-content-primary">
                        • If NO → Routes into secondary recovery or SMS.
                      </div>
                    </div>
                  )}

                  {selectedNode.type === 'sms' && (
                    <div className="p-3 rounded-lg bg-status-info-bg/60 border border-status-info/20 space-y-1">
                      <div className="font-semibold text-status-info text-[11px]">
                        Carrier Routing Engine
                      </div>
                      <div className="text-[11px] text-content-primary">
                        Dispatches via Twilio Tier 1. Automatic fallback to Vonage if latency exceeds 2.5s.
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-content-muted">
                    <span>Deterministic SLA:</span>
                    <span className="font-mono text-status-success font-medium">99.8%</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-content-muted">
                  Click any node on the canvas to inspect its configuration and payload rules.
                </div>
              )}
            </Card>

            {/* Node Palette (Simulated additions) */}
            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider text-content-muted">
                Available Workflow Node Library
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: '+ Add Wait Timer', icon: Clock },
                  { label: '+ Add Condition', icon: Filter },
                  { label: '+ Add Email Step', icon: Mail },
                  { label: '+ Add SMS Message', icon: MessageSquare },
                  { label: '+ Webhook Post', icon: Globe },
                  { label: '+ Update Contact', icon: Activity },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => alert('Simulated node library: in production, drag onto canvas to connect.')}
                    className="p-2.5 rounded-lg border border-border bg-bg-main hover:bg-bg-secondary text-content-primary flex items-center gap-1.5 text-left font-medium transition-colors"
                  >
                    <item.icon className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="text-[11px] truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-8 p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-content-primary font-display">
                Workflow Specification & Logic
              </h3>
              <p className="text-xs text-content-secondary mt-1 leading-relaxed">
                {workflow.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div>
                <div className="text-[11px] text-content-muted">Total Executions</div>
                <div className="text-xl font-bold font-display text-content-primary mt-0.5">
                  {workflow.executions}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-content-muted">Success Rate</div>
                <div className="text-xl font-bold font-display text-status-success mt-0.5">
                  {workflow.successRate}%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-content-muted">Avg. Duration</div>
                <div className="text-xl font-bold font-display text-content-primary mt-0.5">
                  {workflow.avgDuration}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-content-muted">Last Executed</div>
                <div className="text-xl font-bold font-display text-content-primary mt-0.5">
                  {workflow.lastExecuted}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
                Governing Trigger Event
              </h4>
              <div className="p-3 rounded-lg bg-bg-main border border-border text-xs font-mono text-content-primary">
                {workflow.trigger}
              </div>
            </div>

            {workflow.associatedFunnel && (
              <div>
                <h4 className="text-xs font-semibold text-content-primary font-display uppercase tracking-wider mb-2">
                  Associated Sales Funnel
                </h4>
                <div className="p-3 rounded-lg bg-accent-light/40 border border-accent/20 text-xs text-sidebar-bg font-medium flex items-center justify-between">
                  <span>{workflow.associatedFunnel}</span>
                  <button
                    onClick={() => navigate('/app/funnels')}
                    className="text-accent hover:underline text-xs"
                  >
                    View Funnel Analytics →
                  </button>
                </div>
              </div>
            )}
          </Card>

          <Card className="lg:col-span-4 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-content-primary font-display">
              Integration Dependencies
            </h3>
            <p className="text-xs text-content-muted">
              Systems called or synchronized by this workflow
            </p>

            <div className="space-y-2">
              {workflow.dependencies.map((dep, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-bg-main border border-border text-xs flex items-center justify-between"
                >
                  <span className="font-medium text-content-primary">{dep}</span>
                  <Badge status="healthy" label="Online" size="sm" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: EXECUTION HISTORY */}
      {activeTab === 'history' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-content-primary font-display">
                Execution Logs for {workflow.name}
              </h3>
              <p className="text-xs text-content-muted">Recent workflow triggers and node latencies</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/app/executions')}
            >
              All System Executions →
            </Button>
          </div>

          <div className="divide-y divide-border/60 text-xs">
            {executions
              .filter((ex) => ex.workflowId === workflow.id)
              .map((ex) => (
                <div key={ex.id} className="p-4 hover:bg-bg-main/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-content-muted">{ex.id}</span>
                        <span className="font-semibold text-content-primary">
                          {ex.contact.name} ({ex.contact.email})
                        </span>
                      </div>
                      <div className="text-content-secondary mt-0.5">
                        Trigger: {ex.trigger} • Duration: {ex.duration}
                      </div>
                    </div>
                    <Badge status={ex.status} size="sm" />
                  </div>

                  {/* Step logs */}
                  <div className="mt-3 pt-2 border-t border-border/60 space-y-1">
                    {ex.logs.map((log) => (
                      <div
                        key={log.id}
                        className="text-[11px] font-mono flex items-center justify-between text-content-muted"
                      >
                        <div className="flex items-center gap-2">
                          <span>{log.timestamp}</span>
                          <span className="text-content-primary font-medium">{log.nodeTitle}</span>
                          <span>—</span>
                          <span>{log.message}</span>
                        </div>
                        <span className="text-content-secondary">{log.latencyMs}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* TAB 4: DEPENDENCIES */}
      {activeTab === 'dependencies' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-content-primary font-display">
            Cross-Business & Integration Mesh
          </h3>
          <p className="text-xs text-content-secondary leading-relaxed">
            This workflow communicates with GoHighLevel Core API endpoints, external payment listeners,
            and telecom carriers. If an external service returns an error code (such as HTTP 504),
            the built-in idempotency worker halts progression and routes to an automated retry queue.
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-bg-main border border-border">
              <div className="text-xs font-mono uppercase text-content-muted">Inbound Trigger</div>
              <div className="text-sm font-bold text-content-primary mt-1">{workflow.trigger}</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-main border border-border">
              <div className="text-xs font-mono uppercase text-content-muted">Subaccount Scope</div>
              <div className="text-sm font-bold text-content-primary mt-1">
                {workflow.businessId === 'alpha' ? 'Apex Academy Online' : 'Vanguard Advisory'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-bg-main border border-border">
              <div className="text-xs font-mono uppercase text-content-muted">Failure Policy</div>
              <div className="text-sm font-bold text-status-success mt-1">
                Exponential Backoff (5 Retries)
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};


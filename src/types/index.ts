// GHL Command Center Type Definitions

export type BusinessId = 'alpha' | 'beta' | 'all';

export interface Business {
  id: 'alpha' | 'beta';
  name: string;
  tagline: string;
  type: string;
  description: string;
  activeWorkflows: number;
  totalExecutions: number;
  successRate: number;
  monthlyRevenue: number;
  activeContacts: number;
  healthScore: number;
  color: string;
  primarySystems: string[];
}

export type WorkflowStatus = 'active' | 'paused' | 'draft' | 'error';
export type WorkflowHealth = 'healthy' | 'attention' | 'failing' | 'paused';
export type WorkflowCategory = 
  | 'Sales & Checkout'
  | 'Cart Recovery'
  | 'Appointments'
  | 'Onboarding'
  | 'Customer Support'
  | 'Integration & Sync'
  | 'Re-engagement';

export interface WorkflowNode {
  id: string;
  title: string;
  type: 'trigger' | 'wait' | 'condition' | 'action' | 'email' | 'sms' | 'webhook' | 'goal' | 'end';
  subType?: string;
  description: string;
  config?: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'failed' | 'skipped';
  branch?: 'yes' | 'no' | 'default';
  duration?: string;
  meta?: {
    endpoint?: string;
    method?: string;
    template?: string;
    field?: string;
    condition?: string;
  };
}

export interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  branch?: 'yes' | 'no';
}

export interface Workflow {
  id: string;
  name: string;
  businessId: 'alpha' | 'beta';
  category: WorkflowCategory;
  trigger: string;
  status: WorkflowStatus;
  health: WorkflowHealth;
  executions: number;
  successRate: number;
  lastExecuted: string;
  avgDuration: string;
  description: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  associatedFunnel?: string;
  dependencies: string[];
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeTitle: string;
  status: 'success' | 'failed' | 'info' | 'retry';
  message: string;
  latencyMs: number;
  payload?: any;
}

export interface ExecutionRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  businessId: 'alpha' | 'beta';
  trigger: string;
  startedAt: string;
  duration: string;
  status: 'successful' | 'failed' | 'running' | 'retried';
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  logs: ExecutionLog[];
  failedNode?: string;
  errorDetails?: {
    code: string;
    message: string;
    endpoint?: string;
    responseBody?: string;
    retryCount: number;
    recoveryPlan: string;
  };
}

export interface BacklogTask {
  id: string;
  title: string;
  businessId: 'alpha' | 'beta' | 'all';
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  dueDate: string;
  status: 'backlog' | 'planned' | 'in_progress' | 'testing' | 'completed';
  estimatedHours: number;
  assignedTo: string;
}

export interface FunnelStage {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  dropoffRate: number;
  associatedWorkflowId?: string;
}

export interface SalesFunnel {
  id: string;
  name: string;
  businessId: 'alpha' | 'beta';
  type: string;
  totalVisitors: number;
  totalRevenue: number;
  conversionRate: number;
  stages: FunnelStage[];
  previewUrl: string;
  activeStatus: boolean;
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  product: string;
  cartValue: number;
  businessId: 'alpha';
  abandonedAt: string;
  recoveryStatus: 'pending' | 'in_progress' | 'recovered' | 'expired';
  lastContact: string;
  recoveryStep: number;
  timeline: {
    time: string;
    event: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}

export interface Transaction {
  id: string;
  contactName: string;
  contactEmail: string;
  product: string;
  amount: number;
  processor: 'Stripe' | 'PayPal' | 'Authorize.net';
  status: 'successful' | 'pending' | 'failed' | 'refunded';
  businessId: 'alpha' | 'beta';
  timestamp: string;
  cardLast4?: string;
  failureReason?: string;
  recoveryWorkflowTriggered?: boolean;
  webhookDelivered: boolean;
  upsellEligible: boolean;
}

export interface UpsellOffer {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  conversionRate: number;
  takeRate: number;
  revenueGenerated: number;
  impressions: number;
  workflowId: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentType: string;
  assignedStaff: string;
  scheduledAt: string;
  businessId: 'beta';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  reminderStatus: 'scheduled' | '24h_sent' | '2h_sent' | 'delivered';
  timeline: {
    time: string;
    action: string;
    status: 'done' | 'active' | 'upcoming';
  }[];
}

export interface OnboardingCustomer {
  id: string;
  customerName: string;
  customerEmail: string;
  company: string;
  productPlan: string;
  businessId: 'alpha' | 'beta';
  startDate: string;
  progressPercentage: number;
  currentStage: 'welcome' | 'account_setup' | 'first_milestone' | 'review' | 'activated';
  status: 'on_track' | 'needs_help' | 'stalled' | 'completed';
  checklist: {
    title: string;
    completed: boolean;
    dateCompleted?: string;
  }[];
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  department: 'Billing & Automation' | 'Course Access' | 'Technical Integration' | 'Client Success';
  businessId: 'alpha' | 'beta';
  status: 'open' | 'waiting' | 'escalated' | 'resolved';
  createdAt: string;
  lastActivity: string;
  assignedAgent: string;
  aiClassification: string;
  messages: {
    sender: 'customer' | 'agent' | 'system';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'Payments' | 'Automation' | 'Communications' | 'Analytics' | 'Storage';
  status: 'connected' | 'degraded' | 'disconnected';
  lastSync: string;
  requestVolume: number;
  errorCount: number;
  latencyMs: number;
  authType: string;
  endpointUrl: string;
  relatedWorkflows: number;
  iconName: string;
  businessScope: 'alpha' | 'beta' | 'both';
}

export interface ApiRequestItem {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  status: number;
  statusText: string;
  durationMs: number;
  timestamp: string;
  integrationId: string;
  headers: Record<string, string>;
  requestBody?: any;
  responseBody: any;
}

export interface WebhookEvent {
  id: string;
  eventType: string;
  source: string;
  destination: string;
  status: 'delivered' | 'failed' | 'retrying';
  httpStatus: number;
  timestamp: string;
  retryCount: number;
  maxRetries: number;
  payload: any;
  errorMessage?: string;
  businessId: 'alpha' | 'beta';
}

export interface CountrySmsRouting {
  code: string;
  country: string;
  primaryProvider: string;
  fallbackProvider: string;
  deliveryRate: number;
  sentCount: number;
  failedCount: number;
  avgLatency: string;
  status: 'healthy' | 'degraded';
}

export interface CallRecord {
  id: string;
  customerName: string;
  phoneNumber: string;
  country: string;
  provider: string;
  duration: string;
  status: 'completed' | 'missed' | 'failed';
  timestamp: string;
  workflowTriggered: string;
  businessId: 'beta';
}

export interface SystemIncident {
  id: string;
  title: string;
  severity: 'critical' | 'major' | 'minor';
  affectedSystem: string;
  businessId: 'alpha' | 'beta' | 'all';
  status: 'investigating' | 'mitigated' | 'resolved';
  startedAt: string;
  resolvedAt?: string;
  description: string;
  rootCause: string;
  resolutionSteps: string[];
  relatedWorkflowId?: string;
  affectedRecordsCount: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  businessId: 'alpha' | 'beta';
  eventType: string;
  category: 'workflow' | 'payment' | 'cart' | 'appointment' | 'webhook' | 'sms' | 'support';
  description: string;
  relatedEntityId?: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  linkUrl?: string;
}


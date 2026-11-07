import { ActivityEvent, BacklogTask, ExecutionRecord, SystemIncident } from '../types';

export const initialIncidents: SystemIncident[] = [
  {
    id: 'INC-001',
    title: 'Kajabi LMS Webhook Provisioning Timeout (HTTP 504)',
    severity: 'major',
    affectedSystem: 'Kajabi Course Platform Webhook Bridge',
    businessId: 'alpha',
    status: 'investigating',
    startedAt: '8 mins ago',
    description: 'Outbound webhook request to create membership credentials for customer Marcus Vance timed out after 10 seconds. Auto-retry worker queued retry attempt 2.',
    rootCause: 'Transient latency spike on upstream Kajabi API edge router. Idempotent retry queue successfully held payload without state loss.',
    resolutionSteps: [
      'Executed exponential backoff retry via wf-webhook-retry-06.',
      'Dispatched direct magic login token to customer via SendGrid transactional email as redundant failover.',
      'Logged telemetry and alert sent to operations channel.'
    ],
    relatedWorkflowId: 'wf-webhook-retry-06',
    affectedRecordsCount: 1
  },
  {
    id: 'INC-002',
    title: 'Middle East SMS Carrier Route Latency Spike',
    severity: 'minor',
    affectedSystem: 'Twilio UAE Route (+971)',
    businessId: 'beta',
    status: 'mitigated',
    startedAt: '1 hour ago',
    resolvedAt: '35 mins ago',
    description: 'SMS confirmation delivery times to UAE mobile carriers climbed from 850ms to 4200ms with 3% dropped packets.',
    rootCause: 'Primary telecom provider maintenance window on Dubai SMS aggregator node.',
    resolutionSteps: [
      'Automatic fallback routing dynamically redirected outbound traffic to Etisalat Local Direct connection.',
      'Delivery success rate restored to 99.7%.',
      'Telemetry alert cleared.'
    ],
    relatedWorkflowId: 'wf-sms-routing-05',
    affectedRecordsCount: 4
  },
  {
    id: 'INC-003',
    title: 'Stripe Customer Subscription Dunning Activation',
    severity: 'minor',
    affectedSystem: 'Stripe Payments & Invoicing',
    businessId: 'alpha',
    status: 'mitigated',
    startedAt: '42 mins ago',
    description: 'Recurring monthly charge of $97 for customer Rebecca Sterling declined by issuing bank (insufficient funds).',
    rootCause: 'Customer debit card expired; replaced by bank with new expiration date.',
    resolutionSteps: [
      'Triggered Failed Payment Recovery & Smart Dunning Engine (wf-pay-fail-02).',
      'Placed 72-hour grace period hold on membership access without hard termination.',
      'Delivered self-serve payment update link via SMS & email.'
    ],
    relatedWorkflowId: 'wf-pay-fail-02',
    affectedRecordsCount: 1
  }
];

export const initialBacklogTasks: BacklogTask[] = [
  {
    id: 'TSK-101',
    title: 'Implement 3-Tier Multi-Touch Abandoned Cart Recovery Sequence',
    businessId: 'alpha',
    priority: 'critical',
    category: 'Sales Funnels',
    description: 'Deploy 15-minute wait trigger, conditional email opening evaluation, dynamic discount vouchers, and automated SMS fallback.',
    dueDate: '2026-11-12',
    status: 'in_progress',
    estimatedHours: 12,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-102',
    title: 'International SMS Carrier Fallback & Quiet-Hour Compliance Routing',
    businessId: 'beta',
    priority: 'high',
    category: 'Integrations',
    description: 'Build automatic failover from Twilio to Vonage with dynamic country code inspection and local timezone quiet-hour safeguards.',
    dueDate: '2026-11-14',
    status: 'testing',
    estimatedHours: 8,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-103',
    title: 'Stripe 1-Click Upsell / Downsell Dynamic Decision Engine',
    businessId: 'alpha',
    priority: 'critical',
    category: 'Payments',
    description: 'Wire post-checkout page redirection with off-session tokenized Stripe charges, upsell decline downsell cascade, and receipt bundling.',
    dueDate: '2026-11-10',
    status: 'completed',
    estimatedHours: 16,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-104',
    title: 'B2B Calendar Appointment No-Show Rescue Protocol',
    businessId: 'beta',
    priority: 'high',
    category: 'Appointments',
    description: 'Trigger instant empathetic SMS & video note within 5 minutes of missed Zoom meeting to recapture executive prospects.',
    dueDate: '2026-11-15',
    status: 'planned',
    estimatedHours: 6,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-105',
    title: 'Two-Way Zapier Webhook Error Catching & Dead Letter Queue',
    businessId: 'all',
    priority: 'medium',
    category: 'Infrastructure',
    description: 'Add exponential backoff retry worker with jitter and alert webhooks for failed external system synchronizations.',
    dueDate: '2026-11-18',
    status: 'in_progress',
    estimatedHours: 10,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-106',
    title: 'Real-Time KPI Sync to Master Executive Google Sheets',
    businessId: 'all',
    priority: 'medium',
    category: 'Reporting',
    description: 'Automate hourly extraction of workflow execution volumes, conversion rates, and revenue attribution to external spreadsheets.',
    dueDate: '2026-11-20',
    status: 'backlog',
    estimatedHours: 8,
    assignedTo: 'Lead Automation Specialist'
  },
  {
    id: 'TSK-107',
    title: 'Cross-Subaccount Contact Deduplication & Tag Consolidation',
    businessId: 'all',
    priority: 'high',
    category: 'CRM Architecture',
    description: 'Eliminate duplicate lead records across Business Alpha and Beta with normalized phone matching and earliest UTM preservation.',
    dueDate: '2026-11-16',
    status: 'testing',
    estimatedHours: 7,
    assignedTo: 'Lead Automation Specialist'
  }
];

export const initialExecutions: ExecutionRecord[] = [
  {
    id: 'exec-849102',
    workflowId: 'wf-cart-rec-01',
    workflowName: 'Abandoned Cart Recovery - Multi-Touch Cascade',
    businessId: 'alpha',
    trigger: 'Checkout Initiated (No Purchase within 15m)',
    startedAt: '18 mins ago',
    duration: '15m 12s (Active)',
    status: 'running',
    contact: {
      name: 'Marcus Vance',
      email: 'm.vance@techscale.io',
      phone: '+1 (415) 890-2341'
    },
    logs: [
      { id: 'l1', timestamp: '10:35:12', nodeId: 'n1', nodeTitle: 'Trigger: Cart Abandoned', status: 'success', message: 'Cart event validated for cart_id #1092 ($297)', latencyMs: 14 },
      { id: 'l2', timestamp: '10:35:12', nodeId: 'n2', nodeTitle: 'Wait 15 Minutes', status: 'success', message: 'Scheduled countdown started; timer expired at 10:50:12', latencyMs: 0 },
      { id: 'l3', timestamp: '10:50:12', nodeId: 'n3', nodeTitle: 'Check: Purchase Completed?', status: 'success', message: 'Evaluation: has_purchased = false. Branching to NO.', latencyMs: 18 },
      { id: 'l4', timestamp: '10:50:13', nodeId: 'n4', nodeTitle: 'Send Recovery Email #1', status: 'success', message: 'SendGrid 202: Message ID sg_99182 delivered to inbox', latencyMs: 112 },
      { id: 'l5', timestamp: '10:50:13', nodeId: 'n5', nodeTitle: 'Wait 2 Hours', status: 'info', message: 'Timer running. 1h 45m remaining until email engagement check', latencyMs: 0 }
    ]
  },
  {
    id: 'exec-849101',
    workflowId: 'wf-webhook-retry-06',
    workflowName: 'Idempotent Webhook Recovery & Auto-Retry Worker',
    businessId: 'alpha',
    trigger: 'Outbound Webhook Delivery Returns 4xx/5xx',
    startedAt: '8 mins ago',
    duration: '10.2s',
    status: 'failed',
    contact: {
      name: 'Marcus Vance',
      email: 'm.vance@techscale.io'
    },
    failedNode: 'wr4',
    errorDetails: {
      code: 'HTTP_504_GATEWAY_TIMEOUT',
      message: 'Upstream server at api.kajabi.com failed to respond within 10,000ms threshold.',
      endpoint: 'https://api.kajabi.com/v1/offers/grant',
      responseBody: '{"error": "Gateway Timeout", "timestamp": "2026-11-07T10:48:02Z"}',
      retryCount: 2,
      recoveryPlan: 'Trigger automated retry with exponential backoff (attempt 3 scheduled in 60 seconds) or click Retry Execution now.'
    },
    logs: [
      { id: 'l11', timestamp: '10:48:00', nodeId: 'wr1', nodeTitle: 'Trigger: Webhook Delivery Failed', status: 'success', message: 'Intercepted initial failed webhook call', latencyMs: 8 },
      { id: 'l12', timestamp: '10:48:00', nodeId: 'wr2', nodeTitle: 'Validate Retry Budget', status: 'success', message: 'Current retry_count = 1 <= 4. Permitted to retry.', latencyMs: 12 },
      { id: 'l13', timestamp: '10:48:01', nodeId: 'wr3', nodeTitle: 'Wait with Backoff', status: 'success', message: 'Backoff interval 60s completed', latencyMs: 0 },
      { id: 'l14', timestamp: '10:48:02', nodeId: 'wr4', nodeTitle: 'Dispatch Retry HTTP Request', status: 'failed', message: 'HTTP 504 Gateway Timeout from endpoint', latencyMs: 10042 }
    ]
  },
  {
    id: 'exec-849100',
    workflowId: 'wf-upsell-eval-03',
    workflowName: '1-Click Upsell Qualification & Attribution Routing',
    businessId: 'alpha',
    trigger: 'Order Form Submitted (Frontend Course $297)',
    startedAt: '24 mins ago',
    duration: '1m 45s',
    status: 'successful',
    contact: {
      name: 'Dr. Arthur Pendelton',
      email: 'arthur@pendelton-health.com',
      phone: '+1 (617) 555-0144'
    },
    logs: [
      { id: 'l21', timestamp: '10:32:01', nodeId: 'u1', nodeTitle: 'Frontend Purchase Succeeded', status: 'success', message: 'Stripe charge ch_3M188x771qA verified ($297)', latencyMs: 198 },
      { id: 'l22', timestamp: '10:32:02', nodeId: 'u2', nodeTitle: 'Render Upsell Offer ($997)', status: 'success', message: 'Served dynamic 1-click offer page', latencyMs: 82 },
      { id: 'l23', timestamp: '10:33:14', nodeId: 'u3', nodeTitle: 'Check: Upsell Accepted?', status: 'success', message: 'Customer clicked YES. Tokenized charge approved.', latencyMs: 15 },
      { id: 'l24', timestamp: '10:33:16', nodeId: 'u4', nodeTitle: 'Process $997 Upsell Charge', status: 'success', message: 'Stripe off-session charge ch_3M188x771qB captured ($997)', latencyMs: 220 },
      { id: 'l25', timestamp: '10:33:17', nodeId: 'u8', nodeTitle: 'Send Master Order Confirmation', status: 'success', message: 'Comprehensive welcome receipt & credentials emailed', latencyMs: 130 }
    ]
  },
  {
    id: 'exec-849099',
    workflowId: 'wf-appt-remind-04',
    workflowName: 'B2B Strategic Consultation Reminder & No-Show Shield',
    businessId: 'beta',
    trigger: 'Consultation Booked (GHL Round-Robin Calendar)',
    startedAt: 'Yesterday 10:15 AM',
    duration: '26h 15m (Active)',
    status: 'running',
    contact: {
      name: 'Victoria Hastings',
      email: 'victoria@hastings-capital.co.uk',
      phone: '+44 20 7946 0912'
    },
    logs: [
      { id: 'l31', timestamp: '10:15:02', nodeId: 'ar1', nodeTitle: 'Trigger: Booking Created', status: 'success', message: 'Calendar event apt-501 created', latencyMs: 25 },
      { id: 'l32', timestamp: '10:15:03', nodeId: 'ar2', nodeTitle: 'Send Instant Booking Confirmation', status: 'success', message: 'Calendar ICS + Zoom meeting sent', latencyMs: 140 },
      { id: 'l33', timestamp: '10:15:04', nodeId: 'ar3', nodeTitle: 'Send Instant SMS Confirmation', status: 'success', message: 'Twilio UK SMS delivered', latencyMs: 410 },
      { id: 'l34', timestamp: '14:30:00', nodeId: 'ar5', nodeTitle: 'Send 24h Reminder', status: 'success', message: 'Client replied YES via SMS', latencyMs: 380 },
      { id: 'l35', timestamp: '12:30:00', nodeId: 'ar7', nodeTitle: 'Send 2h Direct Zoom Alert', status: 'success', message: 'Direct Zoom link dispatched', latencyMs: 395 }
    ]
  }
];

export const initialActivities: ActivityEvent[] = [
  { id: 'act-1', timestamp: '4 mins ago', businessId: 'alpha', category: 'cart', eventType: 'Cart Recovery Email Sent', description: 'Recovery Email #1 dispatched to Marcus Vance ($297 Cart)', status: 'info' },
  { id: 'act-2', timestamp: '8 mins ago', businessId: 'alpha', category: 'payment', eventType: 'New Purchase Confirmed', description: 'Captured $297 from Marcus Vance on Mastery Accelerator', status: 'success' },
  { id: 'act-3', timestamp: '14 mins ago', businessId: 'alpha', category: 'webhook', eventType: 'Webhook Gateway Timeout', description: 'Kajabi provisioning endpoint returned 504 timeout. Auto-retry worker queued.', status: 'error' },
  { id: 'act-4', timestamp: '24 mins ago', businessId: 'alpha', category: 'payment', eventType: '1-Click Upsell Captured', description: 'Dr. Arthur Pendelton accepted Mastermind Fast-Track ($997)', status: 'success' },
  { id: 'act-5', timestamp: '31 mins ago', businessId: 'beta', category: 'appointment', eventType: 'Appointment 2-Hour Alert', description: 'Direct Zoom SMS delivered to Victoria Hastings for 2:30 PM consultation', status: 'info' },
  { id: 'act-6', timestamp: '42 mins ago', businessId: 'alpha', category: 'payment', eventType: 'Payment Failure Handled', description: 'Declined recurring $97 charge for Rebecca Sterling. Smart Dunning initiated.', status: 'warning' },
  { id: 'act-7', timestamp: '1 hour ago', businessId: 'beta', category: 'sms', eventType: 'SMS Provider Failover Succeeded', description: 'UAE SMS route automatically switched to Etisalat fallback. Delivery restored.', status: 'success' }
];


import { create } from 'zustand';
import {
  Business,
  BusinessId,
  Workflow,
  ExecutionRecord,
  BacklogTask,
  SalesFunnel,
  AbandonedCart,
  Transaction,
  UpsellOffer,
  Appointment,
  OnboardingCustomer,
  SupportTicket,
  Integration,
  WebhookEvent,
  CountrySmsRouting,
  CallRecord,
  SystemIncident,
  ActivityEvent,
  SystemNotification,
} from '../types';

import { initialBusinesses } from '../data/businesses';
import { initialWorkflows } from '../data/workflows';
import { initialFunnels } from '../data/funnels';
import { initialCarts, initialTransactions, initialUpsellOffers } from '../data/carts';
import { initialAppointments, initialOnboardingCustomers, initialSupportTickets } from '../data/appointments';
import { initialIntegrations, initialWebhooks, initialCountrySms, initialCalls } from '../data/integrations';
import { initialIncidents, initialBacklogTasks, initialExecutions, initialActivities } from '../data/incidents';

interface AppState {
  // Global View Controls
  activeBusiness: BusinessId;
  timeRange: 'today' | '7d' | '30d' | 'custom';
  isSearchOpen: boolean;
  isContactModalOpen: boolean;
  isCinematicLoading: boolean;

  // Data Entities
  businesses: Record<'alpha' | 'beta', Business>;
  workflows: Workflow[];
  executions: ExecutionRecord[];
  backlogTasks: BacklogTask[];
  funnels: SalesFunnel[];
  abandonedCarts: AbandonedCart[];
  transactions: Transaction[];
  upsellOffers: UpsellOffer[];
  appointments: Appointment[];
  onboardingCustomers: OnboardingCustomer[];
  supportTickets: SupportTicket[];
  integrations: Integration[];
  webhooks: WebhookEvent[];
  countrySms: CountrySmsRouting[];
  calls: CallRecord[];
  incidents: SystemIncident[];
  activities: ActivityEvent[];
  notifications: SystemNotification[];

  // Setters & UI controls
  setBusiness: (id: BusinessId) => void;
  setTimeRange: (range: 'today' | '7d' | '30d' | 'custom') => void;
  setSearchOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  setCinematicLoading: (loading: boolean) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<SystemNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Scenario A: Abandoned Cart Recovery
  simulateAbandonedCart: () => void;
  recoverCart: (cartId: string) => void;

  // Scenario B: Payment Failure Recovery
  simulateFailedPayment: () => void;
  retryPayment: (txId: string) => void;

  // Scenario C: International SMS Fallback
  simulateSmsFailure: (countryCode: string) => void;
  resetSmsProvider: (countryCode: string) => void;

  // Scenario D: Webhook Failure Recovery
  retryWebhook: (webhookId: string) => void;
  simulateWebhookEvent: (eventType?: string) => void;

  // Scenario E: Workflow Execution & Troubleshooting
  retryExecution: (executionId: string) => void;
  addExecutionRecord: (record: ExecutionRecord) => void;

  // Incidents
  resolveIncident: (incidentId: string) => void;
  dismissIncident: (incidentId: string) => void;

  // Backlog
  moveBacklogTask: (taskId: string, newStatus: BacklogTask['status']) => void;
  addBacklogTask: (task: Omit<BacklogTask, 'id'>) => void;

  // Appointments
  simulateNoShow: (appointmentId: string) => void;
  rescheduleAppointment: (appointmentId: string, newTime: string) => void;
  simulateReminderDelivery: (appointmentId: string) => void;

  // Support
  simulateSupportRequest: (subject: string, department: SupportTicket['department']) => void;
  resolveTicket: (ticketId: string) => void;

  // Integrations
  testIntegration: (integrationId: string) => Promise<boolean>;

  // Upsell simulation
  simulatePurchaseJourney: (pathway: 'upsell_accepted' | 'downsell_accepted' | 'both_declined') => void;

  // Global Demo Reset
  resetDemoData: () => void;
}

const initialNotifications: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Webhook 504 Timeout',
    message: 'Kajabi LMS provisioning webhook timed out. Auto-retry worker queued.',
    timestamp: '8 mins ago',
    read: false,
    type: 'error',
    linkUrl: '/app/webhooks'
  },
  {
    id: 'notif-2',
    title: 'Payment Declined',
    message: 'Recurring charge of $97 for Rebecca Sterling failed. Smart dunning active.',
    timestamp: '42 mins ago',
    read: false,
    type: 'warning',
    linkUrl: '/app/payments'
  },
  {
    id: 'notif-3',
    title: 'High-Ticket Consultation Confirmed',
    message: 'Victoria Hastings confirmed attendance for 2:30 PM strategy session.',
    timestamp: '1 hour ago',
    read: true,
    type: 'success',
    linkUrl: '/app/appointments'
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  // View Controls
  activeBusiness: 'all',
  timeRange: 'today',
  isSearchOpen: false,
  isContactModalOpen: false,
  isCinematicLoading: false,

  // Entities
  businesses: initialBusinesses,
  workflows: initialWorkflows,
  executions: initialExecutions,
  backlogTasks: initialBacklogTasks,
  funnels: initialFunnels,
  abandonedCarts: initialCarts,
  transactions: initialTransactions,
  upsellOffers: initialUpsellOffers,
  appointments: initialAppointments,
  onboardingCustomers: initialOnboardingCustomers,
  supportTickets: initialSupportTickets,
  integrations: initialIntegrations,
  webhooks: initialWebhooks,
  countrySms: initialCountrySms,
  calls: initialCalls,
  incidents: initialIncidents,
  activities: initialActivities,
  notifications: initialNotifications,

  // View Setters
  setBusiness: (id) => set({ activeBusiness: id }),
  setTimeRange: (range) => set({ timeRange: range }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setContactModalOpen: (open) => set({ isContactModalOpen: open }),
  setCinematicLoading: (loading) => set({ isCinematicLoading: loading }),

  // Notification actions
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  addNotification: (item) =>
    set((state) => ({
      notifications: [
        {
          ...item,
          id: `notif-${Date.now()}`,
          timestamp: 'Just now',
          read: false,
        },
        ...state.notifications,
      ],
    })),

  // SCENARIO A: Abandoned Cart Recovery
  simulateAbandonedCart: () => {
    const newCartId = `cart-${Math.floor(1000 + Math.random() * 9000)}`;
    const names = ['Lucas Vance', 'Sophia Turner', 'Alexander Wright', 'Olivia Hansen'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const email = `${randomName.toLowerCase().replace(' ', '.')}@example.com`;

    const newCart: AbandonedCart = {
      id: newCartId,
      customerName: randomName,
      customerEmail: email,
      customerPhone: '+1 (555) 019-8822',
      product: 'Mastery Accelerator ($297)',
      cartValue: 297,
      businessId: 'alpha',
      abandonedAt: 'Just now',
      recoveryStatus: 'pending',
      lastContact: 'Pending 15-minute wait trigger',
      recoveryStep: 1,
      timeline: [
        { time: 'Just now', event: 'Customer entered checkout and abandoned tab', status: 'completed' },
        { time: 'In 15 mins', event: 'Evaluate purchase & dispatch recovery email #1', status: 'pending' },
        { time: 'In 2 hours', event: 'Secondary SMS fallback trigger', status: 'pending' },
      ],
    };

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      businessId: 'alpha',
      category: 'cart',
      eventType: 'New Abandoned Cart Detected',
      description: `Cart ${newCartId} abandoned by ${randomName} ($297). Triggering wf-cart-rec-01.`,
      status: 'warning',
    };

    set((state) => ({
      abandonedCarts: [newCart, ...state.abandonedCarts],
      activities: [newActivity, ...state.activities],
    }));

    get().addNotification({
      title: 'Cart Abandoned ($297)',
      message: `${randomName} abandoned checkout. Recovery workflow initiated.`,
      type: 'warning',
      linkUrl: '/app/carts',
    });
  },

  recoverCart: (cartId) => {
    const cart = get().abandonedCarts.find((c) => c.id === cartId);
    if (!cart) return;

    const recoveredValue = cart.cartValue;
    const newTx: Transaction = {
      id: `tx_${Date.now().toString(36)}`,
      contactName: cart.customerName,
      contactEmail: cart.customerEmail,
      product: cart.product,
      amount: recoveredValue,
      processor: 'Stripe',
      status: 'successful',
      businessId: cart.businessId,
      timestamp: 'Just now',
      cardLast4: '4242',
      webhookDelivered: true,
      upsellEligible: true,
    };

    const updatedCarts = get().abandonedCarts.map((c) =>
      c.id === cartId
        ? {
            ...c,
            recoveryStatus: 'recovered' as const,
            lastContact: 'Recovered! Customer completed purchase',
            timeline: [
              ...c.timeline,
              { time: 'Just now', event: `Order Completed ($${recoveredValue} Recovered!)`, status: 'completed' as const },
            ],
          }
        : c
    );

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      businessId: 'alpha',
      category: 'cart',
      eventType: 'Cart Successfully Recovered',
      description: `Customer ${cart.customerName} completed checkout via automated recovery sequence ($${recoveredValue}).`,
      status: 'success',
    };

    set((state) => ({
      abandonedCarts: updatedCarts,
      transactions: [newTx, ...state.transactions],
      activities: [newActivity, ...state.activities],
      businesses: {
        ...state.businesses,
        alpha: {
          ...state.businesses.alpha,
          monthlyRevenue: state.businesses.alpha.monthlyRevenue + recoveredValue,
        },
      },
    }));

    get().addNotification({
      title: 'Cart Recovered! (+$' + recoveredValue + ')',
      message: `Automated recovery succeeded for ${cart.customerName}.`,
      type: 'success',
      linkUrl: '/app/carts',
    });
  },

  // SCENARIO B: Payment Failure Recovery
  simulateFailedPayment: () => {
    const txId = `tx_fail_${Date.now().toString(36)}`;
    const customer = 'Jordan Peterson';
    const email = 'jordan@peterson-enterprises.com';

    const newTx: Transaction = {
      id: txId,
      contactName: customer,
      contactEmail: email,
      product: 'Mastery Accelerator ($297)',
      amount: 297,
      processor: 'Stripe',
      status: 'failed',
      businessId: 'alpha',
      timestamp: 'Just now',
      cardLast4: '1099',
      failureReason: 'card_declined: do_not_honor',
      recoveryWorkflowTriggered: true,
      webhookDelivered: true,
      upsellEligible: false,
    };

    const newWebhook: WebhookEvent = {
      id: `wh-${Date.now()}`,
      eventType: 'invoice.payment_failed',
      source: 'Stripe Webhook Listener',
      destination: 'GHL /workflows/wf-pay-fail-02',
      status: 'delivered',
      httpStatus: 200,
      timestamp: 'Just now',
      retryCount: 0,
      maxRetries: 3,
      businessId: 'alpha',
      payload: {
        event: 'charge.failed',
        transaction_id: txId,
        customer_email: email,
        amount: 29700,
        decline_code: 'do_not_honor',
      },
    };

    const newActivity: ActivityEvent = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      businessId: 'alpha',
      category: 'payment',
      eventType: 'Payment Failure Handled',
      description: `Declined $297 card transaction for ${customer}. Smart dunning workflow wf-pay-fail-02 triggered.`,
      status: 'warning',
    };

    set((state) => ({
      transactions: [newTx, ...state.transactions],
      webhooks: [newWebhook, ...state.webhooks],
      activities: [newActivity, ...state.activities],
    }));

    get().addNotification({
      title: 'Payment Failed: $297',
      message: `Card declined for ${customer}. Dunning sequence activated.`,
      type: 'warning',
      linkUrl: '/app/payments',
    });
  },

  retryPayment: (txId) => {
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === txId
          ? {
              ...tx,
              status: 'successful' as const,
              failureReason: undefined,
              timestamp: 'Just now (Retried)',
            }
          : tx
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'alpha',
          category: 'payment',
          eventType: 'Payment Retry Successful',
          description: `Transaction ${txId} successfully settled after card update.`,
          status: 'success',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: 'Payment Recovered',
      message: `Transaction ${txId} succeeded on retry.`,
      type: 'success',
      linkUrl: '/app/payments',
    });
  },

  // SCENARIO C: International SMS Fallback
  simulateSmsFailure: (countryCode) => {
    set((state) => ({
      countrySms: state.countrySms.map((route) =>
        route.code === countryCode
          ? {
              ...route,
              status: 'degraded',
              failedCount: route.failedCount + 1,
              deliveryRate: 95.4,
            }
          : route
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'beta',
          category: 'sms',
          eventType: 'Primary SMS Carrier Outage Detected',
          description: `Primary route for ${countryCode} degraded. Automated failover dynamically engaged secondary carrier!`,
          status: 'warning',
        },
        {
          id: `act-${Date.now() + 1}`,
          timestamp: 'Just now',
          businessId: 'beta',
          category: 'sms',
          eventType: 'Fallback SMS Delivery Succeeded',
          description: `Secondary provider dispatched queued messages with 100% receipt confirmation.`,
          status: 'success',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: `SMS Failover Triggered (${countryCode})`,
      message: 'Primary route failed. Seamlessly switched to fallback carrier without message loss.',
      type: 'warning',
      linkUrl: '/app/communications',
    });
  },

  resetSmsProvider: (countryCode) => {
    set((state) => ({
      countrySms: state.countrySms.map((route) =>
        route.code === countryCode
          ? {
              ...route,
              status: 'healthy',
              deliveryRate: 99.7,
            }
          : route
      ),
    }));
  },

  // SCENARIO D: Webhook Failure Recovery
  retryWebhook: (webhookId) => {
    set((state) => ({
      webhooks: state.webhooks.map((wh) =>
        wh.id === webhookId
          ? {
              ...wh,
              status: 'delivered' as const,
              httpStatus: 200,
              retryCount: wh.retryCount + 1,
              errorMessage: undefined,
              timestamp: 'Just now (Retried)',
            }
          : wh
      ),
      integrations: state.integrations.map((intg) =>
        intg.id === 'int-kajabi'
          ? {
              ...intg,
              status: 'connected' as const,
              errorCount: Math.max(0, intg.errorCount - 1),
            }
          : intg
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'alpha',
          category: 'webhook',
          eventType: 'Webhook Replay Succeeded (HTTP 200)',
          description: `Payload for ${webhookId} successfully received and verified by external endpoint.`,
          status: 'success',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: 'Webhook Replay Succeeded',
      message: `Event ${webhookId} delivered with HTTP 200. Integration health restored.`,
      type: 'success',
      linkUrl: '/app/webhooks',
    });
  },

  simulateWebhookEvent: (eventType = 'contact.tag_added') => {
    const id = `wh-evt-${Date.now().toString(36)}`;
    const newWh: WebhookEvent = {
      id,
      eventType,
      source: 'External Form Webhook',
      destination: 'GHL /workflows/wf-lead-qual-09',
      status: 'delivered',
      httpStatus: 200,
      timestamp: 'Just now',
      retryCount: 0,
      maxRetries: 3,
      businessId: 'beta',
      payload: {
        event: eventType,
        timestamp: new Date().toISOString(),
        client_ip: '192.168.1.1',
        data: {
          lead_score: 92,
          annual_revenue: '$7.5M',
          qualification: 'Enterprise Tier',
        },
      },
    };

    set((state) => ({
      webhooks: [newWh, ...state.webhooks],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'beta',
          category: 'webhook',
          eventType: 'Live Webhook Event Processed',
          description: `Dispatched ${eventType} into lead qualification engine.`,
          status: 'info',
        },
        ...state.activities,
      ],
    }));
  },

  // SCENARIO E: Workflow Troubleshooting
  retryExecution: (executionId) => {
    set((state) => ({
      executions: state.executions.map((ex) =>
        ex.id === executionId
          ? {
              ...ex,
              status: 'successful' as const,
              duration: '1.4s',
              failedNode: undefined,
              errorDetails: undefined,
              logs: [
                ...ex.logs,
                {
                  id: `l-retry-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString(),
                  nodeId: ex.failedNode || 'recovery',
                  nodeTitle: 'Manual Operator Retry',
                  status: 'success',
                  message: 'Execution resumed and verified through downstream steps.',
                  latencyMs: 140,
                },
              ],
            }
          : ex
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'alpha',
          category: 'workflow',
          eventType: 'Execution Retried & Resolved',
          description: `Execution ${executionId} cleared error state and reached workflow completion.`,
          status: 'success',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: 'Execution Recovered',
      message: `Workflow run ${executionId} marked successful.`,
      type: 'success',
      linkUrl: '/app/executions',
    });
  },

  addExecutionRecord: (record) =>
    set((state) => ({ executions: [record, ...state.executions] })),

  // Incidents
  resolveIncident: (incidentId) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'resolved' as const,
              resolvedAt: 'Just now',
            }
          : inc
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'all' as any,
          category: 'workflow',
          eventType: 'Incident Resolved',
          description: `System Incident ${incidentId} was resolved and verified by operator.`,
          status: 'success',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: `Incident ${incidentId} Resolved`,
      message: 'System telemetry restored to optimal operational threshold.',
      type: 'success',
      linkUrl: '/app/health',
    });
  },

  dismissIncident: (incidentId) =>
    set((state) => ({
      incidents: state.incidents.filter((i) => i.id !== incidentId),
    })),

  // Backlog Kanban
  moveBacklogTask: (taskId, newStatus) =>
    set((state) => ({
      backlogTasks: state.backlogTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    })),

  addBacklogTask: (task) =>
    set((state) => ({
      backlogTasks: [
        {
          ...task,
          id: `TSK-${Math.floor(200 + Math.random() * 800)}`,
        },
        ...state.backlogTasks,
      ],
    })),

  // Appointments
  simulateNoShow: (appointmentId) => {
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              status: 'no_show' as const,
              timeline: [
                ...a.timeline,
                { time: 'Just now', action: 'No-Show Recorded: Automated rescue sequence wf-no-show-14 activated', status: 'done' as const },
              ],
            }
          : a
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'beta',
          category: 'appointment',
          eventType: 'No-Show Rescue Protocol Triggered',
          description: `Appointment ${appointmentId} marked as no-show. Empathetic 1-click reschedule SMS sent.`,
          status: 'warning',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: 'No-Show Rescue Sequence Triggered',
      message: `Automated recovery SMS dispatched to missed client.`,
      type: 'warning',
      linkUrl: '/app/appointments',
    });
  },

  rescheduleAppointment: (appointmentId, newTime) => {
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              scheduledAt: newTime,
              status: 'confirmed' as const,
              timeline: [
                ...a.timeline,
                { time: 'Just now', action: `Rescheduled to ${newTime}. Updated calendar invite sent.`, status: 'done' as const },
              ],
            }
          : a
      ),
    }));
  },

  simulateReminderDelivery: (appointmentId) => {
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              reminderStatus: 'delivered' as const,
              timeline: [
                ...a.timeline,
                { time: 'Just now', action: 'On-demand SMS & Email Reminder delivered successfully', status: 'done' as const },
              ],
            }
          : a
      ),
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'beta',
          category: 'appointment',
          eventType: 'Appointment Reminder Delivered',
          description: `Dispatched direct Zoom alert for appointment ${appointmentId}.`,
          status: 'info',
        },
        ...state.activities,
      ],
    }));
  },

  // Support
  simulateSupportRequest: (subject, department) => {
    const id = `tkt-${Math.floor(5000 + Math.random() * 4000)}`;
    const newTicket: SupportTicket = {
      id,
      customerName: 'Marcus Vance',
      customerEmail: 'm.vance@techscale.io',
      subject,
      priority: 'high',
      department,
      businessId: 'alpha',
      status: 'open',
      createdAt: 'Just now',
      lastActivity: 'Just now',
      assignedAgent: 'AI Triage Sentinel',
      aiClassification: `${department} Automation`,
      messages: [
        {
          sender: 'customer',
          senderName: 'Marcus Vance',
          text: subject,
          timestamp: 'Just now',
        },
        {
          sender: 'system',
          senderName: 'Auto-Triage Bot',
          text: 'Ticket analyzed: Intent categorized as high priority. Routed to specialist on call.',
          timestamp: 'Just now',
        },
      ],
    };

    set((state) => ({
      supportTickets: [newTicket, ...state.supportTickets],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          businessId: 'alpha',
          category: 'support',
          eventType: 'New Support Ticket Triaged',
          description: `Ticket #${id} classified and routed to ${department}.`,
          status: 'info',
        },
        ...state.activities,
      ],
    }));

    get().addNotification({
      title: 'New Support Inquiry',
      message: `Marcus Vance submitted: "${subject.slice(0, 40)}..."`,
      type: 'info',
      linkUrl: '/app/support',
    });
  },

  resolveTicket: (ticketId) => {
    set((state) => ({
      supportTickets: state.supportTickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'resolved' as const,
              lastActivity: 'Just now',
              messages: [
                ...t.messages,
                {
                  sender: 'agent',
                  senderName: 'Sarah Lin (Automation Support)',
                  text: 'Issue investigated and resolved. All automated provisioning hooks verified.',
                  timestamp: 'Just now',
                },
              ],
            }
          : t
      ),
    }));
  },

  // Integrations
  testIntegration: async (integrationId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        set((state) => ({
          integrations: state.integrations.map((i) =>
            i.id === integrationId
              ? {
                  ...i,
                  lastSync: 'Just now',
                  status: 'connected' as const,
                  latencyMs: Math.floor(80 + Math.random() * 120),
                }
              : i
          ),
          activities: [
            {
              id: `act-${Date.now()}`,
              timestamp: 'Just now',
              businessId: 'alpha',
              category: 'webhook',
              eventType: 'Integration Health Probe Succeeded',
              description: `Endpoint latency test verified connection for ${integrationId}.`,
              status: 'success',
            },
            ...state.activities,
          ],
        }));
        resolve(true);
      }, 700);
    });
  },

  // Upsell Purchase Journey Simulation
  simulatePurchaseJourney: (pathway) => {
    const customer = 'Julian Rossi';
    const email = 'julian.rossi@apex-partners.com';

    if (pathway === 'upsell_accepted') {
      const tx1: Transaction = {
        id: `tx_fe_${Date.now().toString(36)}`,
        contactName: customer,
        contactEmail: email,
        product: 'Mastery Accelerator ($297)',
        amount: 297,
        processor: 'Stripe',
        status: 'successful',
        businessId: 'alpha',
        timestamp: 'Just now',
        cardLast4: '4242',
        webhookDelivered: true,
        upsellEligible: true,
      };

      const tx2: Transaction = {
        id: `tx_up_${Date.now().toString(36)}`,
        contactName: customer,
        contactEmail: email,
        product: 'Mastermind Fast-Track Upsell ($997)',
        amount: 997,
        processor: 'Stripe',
        status: 'successful',
        businessId: 'alpha',
        timestamp: 'Just now',
        cardLast4: '4242',
        webhookDelivered: true,
        upsellEligible: false,
      };

      set((state) => ({
        transactions: [tx2, tx1, ...state.transactions],
        businesses: {
          ...state.businesses,
          alpha: {
            ...state.businesses.alpha,
            monthlyRevenue: state.businesses.alpha.monthlyRevenue + 1294,
          },
        },
        activities: [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            businessId: 'alpha',
            category: 'payment',
            eventType: '1-Click Upsell Accepted (+$997)',
            description: `${customer} accepted the Mastermind upgrade. Total cart revenue: $1,294.`,
            status: 'success',
          },
          ...state.activities,
        ],
      }));

      get().addNotification({
        title: '1-Click Upsell Captured (+$997)',
        message: `${customer} accepted Mastermind Fast-Track.`,
        type: 'success',
        linkUrl: '/app/upsell-downsell',
      });
    } else if (pathway === 'downsell_accepted') {
      const tx1: Transaction = {
        id: `tx_fe_${Date.now().toString(36)}`,
        contactName: customer,
        contactEmail: email,
        product: 'Mastery Accelerator ($297)',
        amount: 297,
        processor: 'Stripe',
        status: 'successful',
        businessId: 'alpha',
        timestamp: 'Just now',
        cardLast4: '4242',
        webhookDelivered: true,
        upsellEligible: true,
      };

      const tx2: Transaction = {
        id: `tx_down_${Date.now().toString(36)}`,
        contactName: customer,
        contactEmail: email,
        product: 'Implementation Toolkit Downsell ($497)',
        amount: 497,
        processor: 'Stripe',
        status: 'successful',
        businessId: 'alpha',
        timestamp: 'Just now',
        cardLast4: '4242',
        webhookDelivered: true,
        upsellEligible: false,
      };

      set((state) => ({
        transactions: [tx2, tx1, ...state.transactions],
        businesses: {
          ...state.businesses,
          alpha: {
            ...state.businesses.alpha,
            monthlyRevenue: state.businesses.alpha.monthlyRevenue + 794,
          },
        },
        activities: [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            businessId: 'alpha',
            category: 'payment',
            eventType: 'Downsell Accepted (+$497)',
            description: `Upsell declined, but ${customer} accepted the Downsell Implementation Toolkit ($497).`,
            status: 'success',
          },
          ...state.activities,
        ],
      }));
    } else {
      // both declined
      const tx1: Transaction = {
        id: `tx_fe_${Date.now().toString(36)}`,
        contactName: customer,
        contactEmail: email,
        product: 'Mastery Accelerator ($297)',
        amount: 297,
        processor: 'Stripe',
        status: 'successful',
        businessId: 'alpha',
        timestamp: 'Just now',
        cardLast4: '4242',
        webhookDelivered: true,
        upsellEligible: true,
      };

      set((state) => ({
        transactions: [tx1, ...state.transactions],
        activities: [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            businessId: 'alpha',
            category: 'payment',
            eventType: 'Frontend Order Completed ($297)',
            description: `${customer} completed core order. Upsell & Downsell offers declined.`,
            status: 'info',
          },
          ...state.activities,
        ],
      }));
    }
  },

  // Demo Reset Action
  resetDemoData: () => {
    set({
      businesses: initialBusinesses,
      workflows: initialWorkflows,
      executions: initialExecutions,
      backlogTasks: initialBacklogTasks,
      funnels: initialFunnels,
      abandonedCarts: initialCarts,
      transactions: initialTransactions,
      upsellOffers: initialUpsellOffers,
      appointments: initialAppointments,
      onboardingCustomers: initialOnboardingCustomers,
      supportTickets: initialSupportTickets,
      integrations: initialIntegrations,
      webhooks: initialWebhooks,
      countrySms: initialCountrySms,
      calls: initialCalls,
      incidents: initialIncidents,
      activities: initialActivities,
      notifications: initialNotifications,
      activeBusiness: 'all',
      timeRange: 'today',
    });

    get().addNotification({
      title: 'Demo Environment Reset',
      message: 'All simulated data, metrics, and workflows restored to initial state.',
      type: 'info',
    });
  },
}));


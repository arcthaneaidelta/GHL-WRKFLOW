import { ApiRequestItem, CountrySmsRouting, CallRecord, Integration, WebhookEvent } from '../types';

export const initialIntegrations: Integration[] = [
  {
    id: 'int-ghl',
    name: 'GoHighLevel Agency Core API',
    category: 'CRM',
    status: 'connected',
    lastSync: '12s ago',
    requestVolume: 148200,
    errorCount: 12,
    latencyMs: 142,
    authType: 'OAuth 2.0 (Bearer Token)',
    endpointUrl: 'https://services.leadconnectorhq.com/v2',
    relatedWorkflows: 42,
    iconName: 'Layers',
    businessScope: 'both'
  },
  {
    id: 'int-stripe',
    name: 'Stripe Payments & Invoicing',
    category: 'Payments',
    status: 'connected',
    lastSync: '24s ago',
    requestVolume: 89400,
    errorCount: 4,
    latencyMs: 98,
    authType: 'Restricted API Key (TLS 1.3)',
    endpointUrl: 'https://api.stripe.com/v1',
    relatedWorkflows: 18,
    iconName: 'CreditCard',
    businessScope: 'both'
  },
  {
    id: 'int-twilio',
    name: 'Twilio Programmable SMS & Voice',
    category: 'Communications',
    status: 'connected',
    lastSync: '4s ago',
    requestVolume: 64200,
    errorCount: 18,
    latencyMs: 210,
    authType: 'Account SID + Auth Token',
    endpointUrl: 'https://api.twilio.com/2010-04-01',
    relatedWorkflows: 22,
    iconName: 'MessageSquare',
    businessScope: 'both'
  },
  {
    id: 'int-vonage',
    name: 'Vonage (Nexmo) International Fallback',
    category: 'Communications',
    status: 'connected',
    lastSync: '1m ago',
    requestVolume: 12400,
    errorCount: 2,
    latencyMs: 185,
    authType: 'API Key & Secret',
    endpointUrl: 'https://rest.nexmo.com/sms/json',
    relatedWorkflows: 8,
    iconName: 'PhoneCall',
    businessScope: 'both'
  },
  {
    id: 'int-zapier',
    name: 'Zapier Enterprise Automation Bridge',
    category: 'Automation',
    status: 'connected',
    lastSync: '30s ago',
    requestVolume: 42100,
    errorCount: 3,
    latencyMs: 290,
    authType: 'Signed Webhook HMAC-SHA256',
    endpointUrl: 'https://hooks.zapier.com/hooks/catch',
    relatedWorkflows: 14,
    iconName: 'Zap',
    businessScope: 'both'
  },
  {
    id: 'int-kajabi',
    name: 'Kajabi Course Platform Webhook Bridge',
    category: 'CRM',
    status: 'degraded',
    lastSync: '2m ago',
    requestVolume: 18900,
    errorCount: 48,
    latencyMs: 640,
    authType: 'Webhook Secret + Bearer Token',
    endpointUrl: 'https://api.kajabi.com/v1',
    relatedWorkflows: 6,
    iconName: 'BookOpen',
    businessScope: 'alpha'
  },
  {
    id: 'int-sheets',
    name: 'Google Sheets Automated KPI Sync',
    category: 'Analytics',
    status: 'connected',
    lastSync: '5m ago',
    requestVolume: 31200,
    errorCount: 1,
    latencyMs: 310,
    authType: 'Google Cloud Service Account (JWT)',
    endpointUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
    relatedWorkflows: 9,
    iconName: 'FileSpreadsheet',
    businessScope: 'both'
  },
  {
    id: 'int-docusign',
    name: 'DocuSign eSignature API',
    category: 'Automation',
    status: 'connected',
    lastSync: '14m ago',
    requestVolume: 1450,
    errorCount: 0,
    latencyMs: 410,
    authType: 'OAuth 2.0 JWT Grant',
    endpointUrl: 'https://demo.docusign.net/restapi/v2.1',
    relatedWorkflows: 4,
    iconName: 'FileText',
    businessScope: 'beta'
  },
  {
    id: 'int-sendgrid',
    name: 'SendGrid Transactional Email Engine',
    category: 'Communications',
    status: 'connected',
    lastSync: '10s ago',
    requestVolume: 112000,
    errorCount: 9,
    latencyMs: 115,
    authType: 'API Key (Full Access)',
    endpointUrl: 'https://api.sendgrid.com/v3/mail/send',
    relatedWorkflows: 28,
    iconName: 'Mail',
    businessScope: 'both'
  },
  {
    id: 'int-circle',
    name: 'Circle.so Member Community API',
    category: 'CRM',
    status: 'connected',
    lastSync: '3m ago',
    requestVolume: 9800,
    errorCount: 2,
    latencyMs: 230,
    authType: 'Bearer Community Token',
    endpointUrl: 'https://app.circle.so/api/v1',
    relatedWorkflows: 5,
    iconName: 'Users',
    businessScope: 'alpha'
  },
  {
    id: 'int-meta-capi',
    name: 'Meta Conversions API (CAPI Server-Side)',
    category: 'Analytics',
    status: 'connected',
    lastSync: '45s ago',
    requestVolume: 58200,
    errorCount: 7,
    latencyMs: 165,
    authType: 'System User Access Token',
    endpointUrl: 'https://graph.facebook.com/v19.0',
    relatedWorkflows: 11,
    iconName: 'BarChart2',
    businessScope: 'alpha'
  },
  {
    id: 'int-zoom',
    name: 'Zoom Server-to-Server Video API',
    category: 'Communications',
    status: 'connected',
    lastSync: '1m ago',
    requestVolume: 4300,
    errorCount: 1,
    latencyMs: 280,
    authType: 'OAuth Server-to-Server App',
    endpointUrl: 'https://api.zoom.us/v2',
    relatedWorkflows: 6,
    iconName: 'Video',
    businessScope: 'beta'
  }
];

export const initialWebhooks: WebhookEvent[] = [
  {
    id: 'wh-evt-9901',
    eventType: 'order.completed',
    source: 'Stripe Payments',
    destination: 'GHL /workflows/wf-cart-rec-01',
    status: 'delivered',
    httpStatus: 200,
    timestamp: '2 mins ago',
    retryCount: 0,
    maxRetries: 3,
    businessId: 'alpha',
    payload: {
      event: 'checkout.session.completed',
      id: 'cs_live_99214ab',
      customer: {
        name: 'Marcus Vance',
        email: 'm.vance@techscale.io',
        phone: '+14158902341'
      },
      amount_total: 29700,
      currency: 'usd',
      payment_status: 'paid',
      metadata: {
        product_id: 'prod_mastery_accel',
        funnel_id: 'fn-01',
        utm_source: 'youtube_ad_04'
      }
    }
  },
  {
    id: 'wh-evt-9902',
    eventType: 'lms.user.provision',
    source: 'GHL /workflows/wf-cust-onboard-07',
    destination: 'Kajabi Members API',
    status: 'failed',
    httpStatus: 504,
    timestamp: '8 mins ago',
    retryCount: 2,
    maxRetries: 4,
    businessId: 'alpha',
    errorMessage: 'Gateway Timeout: Kajabi external endpoint took > 10,000ms to respond',
    payload: {
      action: 'grant_offer',
      offer_id: 104921,
      member: {
        email: 'm.vance@techscale.io',
        name: 'Marcus Vance'
      },
      send_email: true
    }
  },
  {
    id: 'wh-evt-9903',
    eventType: 'calendar.appointment.booked',
    source: 'GHL Calendar Engine',
    destination: 'Zoom API /users/me/meetings',
    status: 'delivered',
    httpStatus: 201,
    timestamp: '14 mins ago',
    retryCount: 0,
    maxRetries: 3,
    businessId: 'beta',
    payload: {
      booking_id: 'apt-501',
      client_name: 'Victoria Hastings',
      start_time: '2026-11-07T14:30:00Z',
      duration: 45,
      topic: 'Enterprise Strategy Assessment',
      meeting_url: 'https://zoom.us/j/9928172911'
    }
  },
  {
    id: 'wh-evt-9904',
    eventType: 'payment.failed',
    source: 'Stripe Webhook Listener',
    destination: 'GHL /workflows/wf-pay-fail-02',
    status: 'delivered',
    httpStatus: 200,
    timestamp: '42 mins ago',
    retryCount: 0,
    maxRetries: 3,
    businessId: 'alpha',
    payload: {
      event: 'invoice.payment_failed',
      id: 'in_1M182k901zE',
      attempt_count: 1,
      customer_email: 'rebecca@sterling-brands.co.uk',
      amount_due: 9700,
      reason: 'card_declined: insufficient_funds'
    }
  },
  {
    id: 'wh-evt-9905',
    eventType: 'zapier.lead.sync',
    source: 'Typeform High-Ticket Assessment',
    destination: 'GHL Contacts API',
    status: 'delivered',
    httpStatus: 200,
    timestamp: '1 hour ago',
    retryCount: 0,
    maxRetries: 3,
    businessId: 'beta',
    payload: {
      lead_id: 'tf_89129',
      company: 'Vanguard Industrial Co',
      estimated_budget: '$50,000+',
      timeline: 'immediate',
      lead_score: 94
    }
  }
];

export const initialApiRequests: ApiRequestItem[] = [
  {
    id: 'req-8801',
    method: 'POST',
    endpoint: '/contacts/upsert',
    status: 200,
    statusText: 'OK',
    durationMs: 142,
    timestamp: '1 min ago',
    integrationId: 'int-ghl',
    headers: {
      'Authorization': 'Bearer ghl_live_sec_8829104fa2...',
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    requestBody: {
      email: 'm.vance@techscale.io',
      phone: '+14158902341',
      firstName: 'Marcus',
      lastName: 'Vance',
      tags: ['customer_mastery', 'upsell_eligible', 'utm_youtube']
    },
    responseBody: {
      contact: {
        id: 'cnt_8829101',
        email: 'm.vance@techscale.io',
        phone: '+14158902341',
        dateAdded: '2026-11-07T10:35:12Z'
      },
      action: 'updated'
    }
  },
  {
    id: 'req-8802',
    method: 'POST',
    endpoint: '/charges/tokenized',
    status: 200,
    statusText: 'OK',
    durationMs: 215,
    timestamp: '18 mins ago',
    integrationId: 'int-stripe',
    headers: {
      'Authorization': 'Bearer rk_live_51M00...',
      'Stripe-Version': '2023-10-16',
      'Idempotency-Key': 'idem_9921_up_997'
    },
    requestBody: {
      customer: 'cus_88921a',
      amount: 99700,
      currency: 'usd',
      off_session: true,
      confirm: true,
      description: 'Mastermind Fast-Track Upsell 1-Click'
    },
    responseBody: {
      id: 'ch_3M188x771qB',
      object: 'charge',
      amount: 99700,
      status: 'succeeded',
      paid: true
    }
  },
  {
    id: 'req-8803',
    method: 'POST',
    endpoint: '/v1/offers/grant',
    status: 504,
    statusText: 'GATEWAY_TIMEOUT',
    durationMs: 10040,
    timestamp: '8 mins ago',
    integrationId: 'int-kajabi',
    headers: {
      'Authorization': 'Bearer kj_live_api_4412...',
      'Content-Type': 'application/json'
    },
    requestBody: {
      member_email: 'm.vance@techscale.io',
      offer_id: 104921
    },
    responseBody: {
      error: 'Upstream gateway timeout',
      message: 'Kajabi provisioning cluster timed out while compiling access token. Retry scheduled in 60s.'
    }
  }
];

export const initialCountrySms: CountrySmsRouting[] = [
  { code: 'US', country: 'United States (+1)', primaryProvider: 'Twilio 10DLC', fallbackProvider: 'Vonage US Tier 1', deliveryRate: 99.8, sentCount: 14200, failedCount: 28, avgLatency: '420ms', status: 'healthy' },
  { code: 'UK', country: 'United Kingdom (+44)', primaryProvider: 'Twilio UK Shortcode', fallbackProvider: 'Vonage UK Route', deliveryRate: 99.4, sentCount: 6810, failedCount: 41, avgLatency: '610ms', status: 'healthy' },
  { code: 'CA', country: 'Canada (+1)', primaryProvider: 'Twilio Canada Longcode', fallbackProvider: 'Vonage CA', deliveryRate: 99.6, sentCount: 3940, failedCount: 16, avgLatency: '450ms', status: 'healthy' },
  { code: 'AU', country: 'Australia (+61)', primaryProvider: 'Twilio AU Alpha Sender', fallbackProvider: 'Vonage AU', deliveryRate: 99.1, sentCount: 2840, failedCount: 25, avgLatency: '890ms', status: 'healthy' },
  { code: 'UAE', country: 'United Arab Emirates (+971)', primaryProvider: 'Twilio UAE Route', fallbackProvider: 'Etisalat Local Direct', deliveryRate: 97.6, sentCount: 1940, failedCount: 46, avgLatency: '1120ms', status: 'healthy' }
];

export const initialCalls: CallRecord[] = [
  {
    id: 'call-911',
    customerName: 'Marcus Vance',
    phoneNumber: '+1 (415) 890-2341',
    country: 'United States',
    provider: 'Twilio Voice',
    duration: '04m 12s',
    status: 'completed',
    timestamp: '2 hours ago',
    workflowTriggered: 'Inbound VIP Support Line',
    businessId: 'beta'
  },
  {
    id: 'call-910',
    customerName: 'Victoria Hastings',
    phoneNumber: '+44 20 7946 0912',
    country: 'United Kingdom',
    provider: 'Twilio UK Trunk',
    duration: '18m 45s',
    status: 'completed',
    timestamp: 'Yesterday 3:15 PM',
    workflowTriggered: 'Pre-Meeting Orientation Briefing',
    businessId: 'beta'
  },
  {
    id: 'call-909',
    customerName: 'Klaus Brandstätter',
    phoneNumber: '+49 89 1234 5678',
    country: 'Germany',
    provider: 'Vonage SIP Interconnect',
    duration: '00m 00s',
    status: 'missed',
    timestamp: 'Yesterday 11:02 AM',
    workflowTriggered: 'Outbound Consultation Bridge',
    businessId: 'beta'
  }
];


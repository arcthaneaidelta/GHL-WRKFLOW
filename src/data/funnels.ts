import { SalesFunnel } from '../types';

export const initialFunnels: SalesFunnel[] = [
  {
    id: 'fn-01',
    name: 'Mastery Accelerator Launch Funnel',
    businessId: 'alpha',
    type: 'Frontend Product + 1-Click Upsell',
    totalVisitors: 48210,
    totalRevenue: 184920,
    conversionRate: 4.8,
    activeStatus: true,
    previewUrl: 'https://apexacademy.io/mastery-accelerator',
    stages: [
      { id: 's1', name: 'Opt-in / Landing Page', visitors: 48210, conversions: 12480, conversionRate: 25.9, dropoffRate: 74.1, associatedWorkflowId: 'wf-cart-rec-01' },
      { id: 's2', name: 'Sales VSL Page', visitors: 12480, conversions: 3820, conversionRate: 30.6, dropoffRate: 69.4, associatedWorkflowId: 'wf-lead-qual-09' },
      { id: 's3', name: 'Checkout Page ($297)', visitors: 3820, conversions: 2314, conversionRate: 60.6, dropoffRate: 39.4, associatedWorkflowId: 'wf-cart-rec-01' },
      { id: 's4', name: 'Mastermind Upsell ($997)', visitors: 2314, conversions: 694, conversionRate: 30.0, dropoffRate: 70.0, associatedWorkflowId: 'wf-upsell-eval-03' },
      { id: 's5', name: 'Downsell Toolkit ($497)', visitors: 1620, conversions: 486, conversionRate: 30.0, dropoffRate: 70.0, associatedWorkflowId: 'wf-downsell-16' },
      { id: 's6', name: 'Order Confirmation & Onboarding', visitors: 2314, conversions: 2314, conversionRate: 100.0, dropoffRate: 0.0, associatedWorkflowId: 'wf-cust-onboard-07' }
    ]
  },
  {
    id: 'fn-02',
    name: 'Enterprise Advisory Discovery Pipeline',
    businessId: 'beta',
    type: 'B2B Lead Qualification & Booking',
    totalVisitors: 14200,
    totalRevenue: 245000,
    conversionRate: 3.2,
    activeStatus: true,
    previewUrl: 'https://vanguardadvisory.com/enterprise-assessment',
    stages: [
      { id: 'sb1', name: 'Advisory Case Study Page', visitors: 14200, conversions: 3550, conversionRate: 25.0, dropoffRate: 75.0 },
      { id: 'sb2', name: 'Qualification Quiz (Typeform)', visitors: 3550, conversions: 1065, conversionRate: 30.0, dropoffRate: 70.0, associatedWorkflowId: 'wf-lead-qual-09' },
      { id: 'sb3', name: 'Calendar Booking Page', visitors: 1065, conversions: 458, conversionRate: 43.0, dropoffRate: 57.0, associatedWorkflowId: 'wf-appt-remind-04' },
      { id: 'sb4', name: 'Strategy Session Completed', visitors: 458, conversions: 384, conversionRate: 83.8, dropoffRate: 16.2, associatedWorkflowId: 'wf-no-show-14' },
      { id: 'sb5', name: 'Enterprise Retainer Closed ($25k+)', visitors: 384, conversions: 46, conversionRate: 12.0, dropoffRate: 88.0, associatedWorkflowId: 'wf-enterprise-onboard-15' }
    ]
  },
  {
    id: 'fn-03',
    name: 'Continuity & Certification Club',
    businessId: 'alpha',
    type: 'Monthly Membership Subscription',
    totalVisitors: 28400,
    totalRevenue: 98400,
    conversionRate: 5.6,
    activeStatus: true,
    previewUrl: 'https://apexacademy.io/inner-circle',
    stages: [
      { id: 'sc1', name: 'Invitation Page', visitors: 28400, conversions: 7100, conversionRate: 25.0, dropoffRate: 75.0 },
      { id: 'sc2', name: 'Free 14-Day Trial Checkout', visitors: 7100, conversions: 1590, conversionRate: 22.4, dropoffRate: 77.6, associatedWorkflowId: 'wf-pay-fail-02' },
      { id: 'sc3', name: 'First Month Renewal ($97/mo)', visitors: 1590, conversions: 1320, conversionRate: 83.0, dropoffRate: 17.0, associatedWorkflowId: 'wf-pay-fail-02' }
    ]
  }
];


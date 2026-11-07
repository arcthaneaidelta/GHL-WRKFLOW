import { Business } from '../types';

export const initialBusinesses: Record<'alpha' | 'beta', Business> = {
  alpha: {
    id: 'alpha',
    name: 'Apex Academy Online',
    tagline: 'High-Volume Digital Courses & Certification Funnels',
    type: 'Digital Products & Education',
    description: 'Specializes in direct-to-consumer digital training products, complex checkout funnels with 1-click upsells, automated cart abandonment sequences, and scalable member onboarding.',
    activeWorkflows: 24,
    totalExecutions: 84210,
    successRate: 99.4,
    monthlyRevenue: 142850,
    activeContacts: 38420,
    healthScore: 98,
    color: '#398568',
    primarySystems: ['GoHighLevel Funnels', 'Stripe Payments', 'ActiveCampaign Sync', 'Twilio SMS', 'Kajabi Webhook Bridge'],
  },
  beta: {
    id: 'beta',
    name: 'Vanguard Enterprise Advisory',
    tagline: 'High-Ticket B2B Consulting & Discovery Pipelines',
    type: 'Consulting & High-Value Services',
    description: 'Manages multi-touch B2B lead qualification, automated round-robin sales appointment calendars, multi-tier SMS/email confirmation cascades, no-show rescue sequences, and enterprise client onboarding.',
    activeWorkflows: 18,
    totalExecutions: 31490,
    successRate: 98.8,
    monthlyRevenue: 189400,
    activeContacts: 12150,
    healthScore: 96,
    color: '#65849A',
    primarySystems: ['GoHighLevel CRM', 'Calendly / Custom Cal Sync', 'Zapier Enterprise', 'Dialpad VoIP', 'DocuSign API'],
  },
};


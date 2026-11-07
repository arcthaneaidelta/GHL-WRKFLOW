import { Appointment, OnboardingCustomer, SupportTicket } from '../types';

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-501',
    customerName: 'Victoria Hastings',
    customerEmail: 'victoria@hastings-capital.co.uk',
    customerPhone: '+44 20 7946 0912',
    appointmentType: 'Enterprise Strategy Assessment (45m)',
    assignedStaff: 'Alistair Vance (Senior Partner)',
    scheduledAt: 'Today, 2:30 PM (in 1h 34m)',
    businessId: 'beta',
    status: 'confirmed',
    reminderStatus: '2h_sent',
    timeline: [
      { time: 'Yesterday 10:15 AM', action: 'Appointment Booked via Discovery Funnel', status: 'done' },
      { time: 'Yesterday 10:15 AM', action: 'Instant Calendar Invite + Intake Questionnaire Dispatched', status: 'done' },
      { time: 'Yesterday 2:30 PM', action: '24-Hour Confirmation SMS Delivered (Client replied YES)', status: 'done' },
      { time: 'Today 12:30 PM', action: '2-Hour Direct Zoom Link SMS Dispatched', status: 'done' },
      { time: 'Today 2:30 PM', action: 'Video Consultation Start', status: 'upcoming' }
    ]
  },
  {
    id: 'apt-502',
    customerName: 'Graham Bell-Scott',
    customerEmail: 'graham@clyde-industries.com',
    customerPhone: '+1 (416) 555-0182',
    appointmentType: 'Operations Scale Review (30m)',
    assignedStaff: 'Elena Rostova (Lead Architect)',
    scheduledAt: 'Today, 4:00 PM',
    businessId: 'beta',
    status: 'scheduled',
    reminderStatus: '24h_sent',
    timeline: [
      { time: '2 days ago', action: 'Booked by Sales Rep via Cold Outreach', status: 'done' },
      { time: 'Yesterday 4:00 PM', action: '24h Reminder Email Sent', status: 'done' },
      { time: 'Today 2:00 PM', action: '2h SMS Alert Scheduled', status: 'upcoming' }
    ]
  },
  {
    id: 'apt-503',
    customerName: 'Rajesh Subramaniam',
    customerEmail: 'rajesh@subram-tech.in',
    customerPhone: '+91 98200 12345',
    appointmentType: 'Enterprise Architecture Scoping (60m)',
    assignedStaff: 'Alistair Vance (Senior Partner)',
    scheduledAt: 'Yesterday, 3:00 PM',
    businessId: 'beta',
    status: 'completed',
    reminderStatus: 'delivered',
    timeline: [
      { time: '3 days ago', action: 'Booked', status: 'done' },
      { time: 'Yesterday 3:00 PM', action: 'Call Attended (Duration: 54 mins)', status: 'done' },
      { time: 'Yesterday 4:00 PM', action: 'Proposal #PROP-882 Sent via DocuSign', status: 'done' }
    ]
  },
  {
    id: 'apt-504',
    customerName: 'Klaus Brandstätter',
    customerEmail: 'klaus@munich-logistics.de',
    customerPhone: '+49 89 1234 5678',
    appointmentType: 'Executive Audit Consultation (45m)',
    assignedStaff: 'Claire Beaumont (Consulting Director)',
    scheduledAt: 'Yesterday, 11:00 AM',
    businessId: 'beta',
    status: 'no_show',
    reminderStatus: 'delivered',
    timeline: [
      { time: '4 days ago', action: 'Booked', status: 'done' },
      { time: 'Yesterday 11:10 AM', action: 'No-Show Detected: Lead did not connect to Zoom', status: 'done' },
      { time: 'Yesterday 11:15 AM', action: 'Automated No-Show Rescue SMS Sent with 1-Click Reschedule', status: 'done' }
    ]
  }
];

export const initialOnboardingCustomers: OnboardingCustomer[] = [
  {
    id: 'onb-101',
    customerName: 'Siddharth Patel',
    customerEmail: 'spatel@cloudmatrix.com',
    company: 'CloudMatrix Technologies',
    productPlan: 'Enterprise Advisory Retainer',
    businessId: 'beta',
    startDate: '3 days ago',
    progressPercentage: 80,
    currentStage: 'first_milestone',
    status: 'on_track',
    checklist: [
      { title: 'DocuSign MSA & SOW Executed', completed: true, dateCompleted: '3 days ago' },
      { title: 'Dedicated Slack Connect Channel Created', completed: true, dateCompleted: '3 days ago' },
      { title: 'Executive Kickoff Call Scheduled', completed: true, dateCompleted: '2 days ago' },
      { title: 'System Access & Credentials Vault Shared', completed: true, dateCompleted: 'Yesterday' },
      { title: 'First 30-Day Operational Roadmap Approved', completed: false }
    ]
  },
  {
    id: 'onb-102',
    customerName: 'Miriam Sterling',
    customerEmail: 'miriam@sterling-digital.io',
    company: 'Sterling Digital Academy',
    productPlan: 'Mastery Accelerator ($297)',
    businessId: 'alpha',
    startDate: '5 days ago',
    progressPercentage: 60,
    currentStage: 'first_milestone',
    status: 'on_track',
    checklist: [
      { title: 'SSO Login Credentials Created & Emailed', completed: true, dateCompleted: '5 days ago' },
      { title: 'First Community Intro Post in Circle', completed: true, dateCompleted: '4 days ago' },
      { title: 'Completed Module 1: System Foundations', completed: true, dateCompleted: '2 days ago' },
      { title: 'Submitted Practice Automation Blueprint', completed: false },
      { title: 'Attended First Live Group Q&A', completed: false }
    ]
  },
  {
    id: 'onb-103',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos@mendoza-logistics.mx',
    company: 'Mendoza Logistics Group',
    productPlan: 'Enterprise Advisory Retainer',
    businessId: 'beta',
    startDate: '10 days ago',
    progressPercentage: 40,
    currentStage: 'account_setup',
    status: 'needs_help',
    checklist: [
      { title: 'Contract Signed', completed: true, dateCompleted: '10 days ago' },
      { title: 'Deposit Payment Processed', completed: true, dateCompleted: '9 days ago' },
      { title: 'System Access Provided (Awaiting 2FA token)', completed: false },
      { title: 'Intake Discovery Questionnaire (Pending Client)', completed: false }
    ]
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt-4091',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@techscale.io',
    subject: 'Course portal login link not generating after purchase',
    priority: 'high',
    department: 'Course Access',
    businessId: 'alpha',
    status: 'open',
    createdAt: '18 mins ago',
    lastActivity: '12 mins ago',
    assignedAgent: 'AI Triage Sentinel',
    aiClassification: 'Access / Credentials Provisioning',
    messages: [
      {
        sender: 'customer',
        senderName: 'Marcus Vance',
        text: 'Hi team, I just purchased the Mastery Accelerator course 20 minutes ago (Transaction ID tx_3M190v492aL) but I have not received my login password email yet.',
        timestamp: '18 mins ago'
      },
      {
        sender: 'system',
        senderName: 'Auto-Sentinel Bot',
        text: 'Automated Diagnostic: Verified valid payment on record. SSO Webhook to Kajabi returned HTTP 504. Triggered auto-provisioning retry.',
        timestamp: '17 mins ago'
      },
      {
        sender: 'agent',
        senderName: 'Sarah Lin (Automation Support)',
        text: 'Hi Marcus! Our webhook retry engine has just successfully re-sent your credentials to m.vance@techscale.io. You can also click your instant one-time login link here: https://learn.apexacademy.io/auth/magic?token=928a3f',
        timestamp: '12 mins ago'
      }
    ]
  },
  {
    id: 'tkt-4089',
    customerName: 'Victoria Hastings',
    customerEmail: 'victoria@hastings-capital.co.uk',
    subject: 'Reschedule Today’s Strategy Call to 3:30 PM?',
    priority: 'medium',
    department: 'Billing & Automation',
    businessId: 'beta',
    status: 'resolved',
    createdAt: '2 hours ago',
    lastActivity: '1 hour ago',
    assignedAgent: 'Alistair Vance',
    aiClassification: 'Calendar & Rescheduling',
    messages: [
      {
        sender: 'customer',
        senderName: 'Victoria Hastings',
        text: 'Can we push our 2:30 call back by 1 hour to 3:30 PM due to an executive board meeting overrun?',
        timestamp: '2 hours ago'
      },
      {
        sender: 'agent',
        senderName: 'Alistair Vance',
        text: 'Hi Victoria, absolutely no problem. I have adjusted the calendar slot to 3:30 PM GMT and your Zoom link has automatically updated.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'tkt-4085',
    customerName: 'Rebecca Sterling',
    customerEmail: 'rebecca@sterling-brands.co.uk',
    subject: 'Update Credit Card on File for Membership',
    priority: 'urgent',
    department: 'Billing & Automation',
    businessId: 'alpha',
    status: 'waiting',
    createdAt: '35 mins ago',
    lastActivity: '20 mins ago',
    assignedAgent: 'Billing Bot',
    aiClassification: 'Payment Failure / Update',
    messages: [
      {
        sender: 'customer',
        senderName: 'Rebecca Sterling',
        text: 'I got a notice that my card was declined. My bank issued a new card due to expiration. How do I update it?',
        timestamp: '35 mins ago'
      },
      {
        sender: 'system',
        senderName: 'Stripe Billing Sentinel',
        text: 'Delivered secure Stripe Customer Portal URL via encrypted SMS and Email.',
        timestamp: '20 mins ago'
      }
    ]
  }
];


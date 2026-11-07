import { AbandonedCart, Transaction, UpsellOffer } from '../types';

export const initialCarts: AbandonedCart[] = [
  {
    id: 'cart-1092',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@techscale.io',
    customerPhone: '+1 (415) 890-2341',
    product: 'Mastery Accelerator ($297)',
    cartValue: 297,
    businessId: 'alpha',
    abandonedAt: '18 mins ago',
    recoveryStatus: 'in_progress',
    lastContact: 'Email #1 sent (3 mins ago)',
    recoveryStep: 1,
    timeline: [
      { time: '18 mins ago', event: 'Checkout Initiated on Mastery Accelerator', status: 'completed' },
      { time: '3 mins ago', event: '15m Wait Finished - Recovery Email #1 Dispatched', status: 'completed' },
      { time: 'In 1h 45m', event: 'Evaluate Email Engagement & Dispatch SMS if unopened', status: 'pending' },
      { time: 'In 13h 45m', event: 'Final 10% Discount Closing Window', status: 'pending' }
    ]
  },
  {
    id: 'cart-1091',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@rostova-design.com',
    customerPhone: '+44 7911 123456',
    product: 'Mastery Accelerator + VIP Bundle ($494)',
    cartValue: 494,
    businessId: 'alpha',
    abandonedAt: '2 hours ago',
    recoveryStatus: 'in_progress',
    lastContact: 'SMS Recovery Dispatched (5 mins ago)',
    recoveryStep: 2,
    timeline: [
      { time: '2 hours ago', event: 'Customer reached step 2 of checkout and closed tab', status: 'completed' },
      { time: '1h 45m ago', event: 'Recovery Email #1 Sent (Unopened)', status: 'completed' },
      { time: '5 mins ago', event: 'Smart SMS with direct 1-click cart restoration delivered', status: 'completed' },
      { time: 'In 10h', event: 'Check Final Conversion Status', status: 'pending' }
    ]
  },
  {
    id: 'cart-1090',
    customerName: 'David Chen',
    customerEmail: 'dchen@chenconsulting.com',
    customerPhone: '+1 (312) 555-0199',
    product: 'Certification Fast-Track ($997)',
    cartValue: 997,
    businessId: 'alpha',
    abandonedAt: '5 hours ago',
    recoveryStatus: 'recovered',
    lastContact: 'Customer clicked recovery SMS & completed order',
    recoveryStep: 3,
    timeline: [
      { time: '5 hours ago', event: 'Cart Abandoned at Payment Step', status: 'completed' },
      { time: '4h 45m ago', event: 'Recovery Email #1 Sent', status: 'completed' },
      { time: '2h 45m ago', event: 'SMS Recovery Sent with 10% Voucher', status: 'completed' },
      { time: '1h 10m ago', event: 'Order Completed ($897.30 Recovered!)', status: 'completed' }
    ]
  },
  {
    id: 'cart-1089',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sjenkins@innovate-now.org',
    customerPhone: '+1 (206) 431-9870',
    product: 'Mastery Accelerator ($297)',
    cartValue: 297,
    businessId: 'alpha',
    abandonedAt: '1 day ago',
    recoveryStatus: 'recovered',
    lastContact: 'Recovered via Email #2 voucher',
    recoveryStep: 3,
    timeline: [
      { time: '1 day ago', event: 'Cart Abandoned', status: 'completed' },
      { time: '22 hours ago', event: 'Follow-up offer opened', status: 'completed' },
      { time: '18 hours ago', event: 'Stripe Payment Captured ($297)', status: 'completed' }
    ]
  },
  {
    id: 'cart-1088',
    customerName: 'Liam O’Connor',
    customerEmail: 'liam@dublinfintech.ie',
    customerPhone: '+353 87 123 4567',
    product: 'Inner Circle Annual ($997)',
    cartValue: 997,
    businessId: 'alpha',
    abandonedAt: '3 days ago',
    recoveryStatus: 'expired',
    lastContact: 'Expired (Max retries reached)',
    recoveryStep: 3,
    timeline: [
      { time: '3 days ago', event: 'Cart Abandoned', status: 'completed' },
      { time: '2.5 days ago', event: 'Full 3-touch sequence completed without conversion', status: 'completed' },
      { time: '2 days ago', event: 'Tagged as Cold Abandoner and moved to 30-day reactivation queue', status: 'completed' }
    ]
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx_3M190v492aL',
    contactName: 'Marcus Vance',
    contactEmail: 'm.vance@techscale.io',
    product: 'Mastery Accelerator ($297)',
    amount: 297,
    processor: 'Stripe',
    status: 'successful',
    businessId: 'alpha',
    timestamp: '8 mins ago',
    cardLast4: '4242',
    webhookDelivered: true,
    upsellEligible: true
  },
  {
    id: 'tx_3M188x771qB',
    contactName: 'Dr. Arthur Pendelton',
    contactEmail: 'arthur@pendelton-health.com',
    product: 'Mastermind Fast-Track Upsell ($997)',
    amount: 997,
    processor: 'Stripe',
    status: 'successful',
    businessId: 'alpha',
    timestamp: '24 mins ago',
    cardLast4: '8821',
    webhookDelivered: true,
    upsellEligible: false
  },
  {
    id: 'tx_3M182k901zE',
    contactName: 'Rebecca Sterling',
    contactEmail: 'rebecca@sterling-brands.co.uk',
    product: 'Continuity Membership ($97/mo)',
    amount: 97,
    processor: 'Stripe',
    status: 'failed',
    businessId: 'alpha',
    timestamp: '42 mins ago',
    cardLast4: '0019',
    failureReason: 'card_declined: insufficient_funds',
    recoveryWorkflowTriggered: true,
    webhookDelivered: true,
    upsellEligible: false
  },
  {
    id: 'tx_3M175m512fW',
    contactName: 'Harrison Ford-Smith',
    contactEmail: 'harrison@apexventures.com',
    product: 'Strategic Advisory Retainer ($15,000)',
    amount: 15000,
    processor: 'Stripe',
    status: 'successful',
    businessId: 'beta',
    timestamp: '2 hours ago',
    cardLast4: '9134',
    webhookDelivered: true,
    upsellEligible: true
  },
  {
    id: 'tx_3M169j220vC',
    contactName: 'Chloe Dupont',
    contactEmail: 'chloe@lux-events.fr',
    product: 'Downsell Implementation Toolkit ($497)',
    amount: 497,
    processor: 'Stripe',
    status: 'successful',
    businessId: 'alpha',
    timestamp: '3 hours ago',
    cardLast4: '3109',
    webhookDelivered: true,
    upsellEligible: false
  },
  {
    id: 'tx_3M155a881tM',
    contactName: 'Jonathan Meyer',
    contactEmail: 'jmeyer@meyer-law.com',
    product: 'Enterprise Advisory Discovery Audit ($2,500)',
    amount: 2500,
    processor: 'Authorize.net',
    status: 'successful',
    businessId: 'beta',
    timestamp: '6 hours ago',
    cardLast4: '5561',
    webhookDelivered: true,
    upsellEligible: true
  }
];

export const initialUpsellOffers: UpsellOffer[] = [
  {
    id: 'up-01',
    name: 'Mastermind Fast-Track Upgrade',
    price: 997,
    originalPrice: 1997,
    conversionRate: 31.2,
    takeRate: 31.2,
    revenueGenerated: 692912,
    impressions: 2220,
    workflowId: 'wf-upsell-eval-03'
  },
  {
    id: 'down-01',
    name: 'Implementation Toolkit & Templates Downsell',
    price: 497,
    originalPrice: 997,
    conversionRate: 29.8,
    takeRate: 29.8,
    revenueGenerated: 241542,
    impressions: 1620,
    workflowId: 'wf-downsell-16'
  },
  {
    id: 'order-bump-01',
    name: 'Checkout Order Bump: 1-Click Audio Book Bundle',
    price: 47,
    originalPrice: 97,
    conversionRate: 58.4,
    takeRate: 58.4,
    revenueGenerated: 108570,
    impressions: 3950,
    workflowId: 'wf-cart-rec-01'
  }
];


export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export function getStatusColor(status: string): { bg: string; text: string; border: string; dot: string } {
  switch (status.toLowerCase()) {
    case 'active':
    case 'healthy':
    case 'connected':
    case 'delivered':
    case 'successful':
    case 'recovered':
    case 'completed':
    case 'confirmed':
    case 'on_track':
    case 'resolved':
      return {
        bg: 'bg-status-success-bg',
        text: 'text-status-success',
        border: 'border-status-success/30',
        dot: 'bg-status-success',
      };
    case 'pending':
    case 'in_progress':
    case 'needs_help':
    case 'attention':
    case 'degraded':
    case 'investigating':
    case 'waiting':
    case 'scheduled':
    case '24h_sent':
    case '2h_sent':
      return {
        bg: 'bg-status-warning-bg',
        text: 'text-status-warning',
        border: 'border-status-warning/30',
        dot: 'bg-status-warning',
      };
    case 'failed':
    case 'failing':
    case 'error':
    case 'disconnected':
    case 'expired':
    case 'stalled':
    case 'no_show':
    case 'critical':
    case 'urgent':
      return {
        bg: 'bg-status-error-bg',
        text: 'text-status-error',
        border: 'border-status-error/30',
        dot: 'bg-status-error',
      };
    default:
      return {
        bg: 'bg-status-info-bg',
        text: 'text-status-info',
        border: 'border-status-info/30',
        dot: 'bg-status-info',
      };
  }
}


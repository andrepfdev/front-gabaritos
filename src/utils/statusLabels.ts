/** Traduz status crus da API (enums tipo PENDING/ACTIVE) pra rótulos em pt-BR. */
function humanizeFallback(status: string): string {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
}

const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pagamento pendente',
  ACTIVE: 'Ativa',
  CANCELED: 'Cancelada',
  CANCELLED: 'Cancelada',
  EXPIRED: 'Expirada',
  TRIALING: 'Em teste',
  PAST_DUE: 'Pagamento atrasado',
}

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  SUCCEEDED: 'Pago',
  FAILED: 'Falhou',
  CANCELED: 'Cancelado',
  CANCELLED: 'Cancelado',
  REFUNDED: 'Reembolsado',
}

export function subscriptionStatusLabel(status: string): string {
  return SUBSCRIPTION_STATUS_LABELS[status.toUpperCase()] ?? humanizeFallback(status)
}

export function paymentStatusLabel(status: string): string {
  return PAYMENT_STATUS_LABELS[status.toUpperCase()] ?? humanizeFallback(status)
}

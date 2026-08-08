/** Traduz status crus da API (enums tipo PENDING/ACTIVE) pra rótulos em pt-BR. */
function humanizeFallback(status: string): string {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
}

// Valores reais do enum SubscriptionStatus do backend: PENDING, AUTHORIZED, PAUSED,
// CANCELED, PAST_DUE, EXPIRED (ver prisma/schema.prisma em api-gabaritos).
const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pagamento pendente',
  AUTHORIZED: 'Ativa',
  PAUSED: 'Pausada',
  CANCELED: 'Cancelada',
  PAST_DUE: 'Pagamento atrasado',
  EXPIRED: 'Expirada',
}

// Valores reais do enum PaymentStatus do backend: PENDING, APPROVED, IN_PROCESS,
// REJECTED, REFUNDED, CANCELLED.
const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  IN_PROCESS: 'Em processamento',
  REJECTED: 'Rejeitado',
  REFUNDED: 'Reembolsado',
  CANCELLED: 'Cancelado',
}

export function subscriptionStatusLabel(status: string): string {
  return SUBSCRIPTION_STATUS_LABELS[status.toUpperCase()] ?? humanizeFallback(status)
}

export function paymentStatusLabel(status: string): string {
  return PAYMENT_STATUS_LABELS[status.toUpperCase()] ?? humanizeFallback(status)
}

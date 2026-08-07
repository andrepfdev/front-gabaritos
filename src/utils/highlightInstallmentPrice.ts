// Destaca valores em R$ (ex.: "R$ 13,93") dentro da descrição do plano —
// preço de parcela chama bastante atenção pro público brasileiro. A
// descrição vem da API (texto confiável), mas escapamos mesmo assim antes
// de inserir o <strong>, pra não depender disso.
const CURRENCY_RE = /R\$\s?\d{1,3}(?:\.\d{3})*,\d{2}/g

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function highlightInstallmentPrice(text: string): string {
  return escapeHtml(text).replace(CURRENCY_RE, (match) => `<strong class="gab-price-highlight">${match}</strong>`)
}

import { todayColombia } from './date.util';

export function calculateTaxFromIncludedPrice(
  totalWithTax: number,
  taxRate: number,
): { subtotal: number; taxAmount: number; total: number } {
  const total = Number(totalWithTax.toFixed(2));
  const taxAmount = Number((total - total / (1 + taxRate)).toFixed(2));
  const subtotal = Number((total - taxAmount).toFixed(2));
  return { subtotal, taxAmount, total };
}

export function generateTicketNumber(): string {
  const date = todayColombia().replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `TKT-${date}-${random}`;
}

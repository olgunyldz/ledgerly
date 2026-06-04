export function parsePoundsToPence(value: string): number | null {
  const trimmedValue = value.trim();

  if (!/^\d+(\.\d{1,2})?$/.test(trimmedValue)) {
    return null;
  }

  const [pounds, pence = ''] = trimmedValue.split('.');
  return Number(pounds) * 100 + Number(pence.padEnd(2, '0'));
}

export function formatPenceAsPounds(pence: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(pence / 100);
}

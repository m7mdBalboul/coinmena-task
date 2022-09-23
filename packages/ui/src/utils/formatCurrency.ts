export const formatCurrency = (
  ...[value, locale = 'en-US', options]: [
    value: number,
    ...rest: Parameters<typeof Intl.NumberFormat>
  ]
) =>
  new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 2,
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(value);


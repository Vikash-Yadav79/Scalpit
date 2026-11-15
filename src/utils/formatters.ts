/**
 * Financial & Currency Formatting Utilities
 */

export const formatCurrency = (amount: number, showDecimals: boolean = true): string => {
  if (isNaN(amount)) return '₹0.00';
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  })}`;
};

export const formatPercentage = (percent: number, showSign: boolean = true): string => {
  if (isNaN(percent)) return '0.00%';
  const sign = showSign && percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};

export const formatPoints = (points: number, showSign: boolean = true): string => {
  if (isNaN(points)) return '0.00';
  const sign = showSign && points > 0 ? '+' : '';
  return `${sign}${points.toFixed(2)}`;
};

export const maskMobile = (mobile: string): string => {
  if (!mobile || mobile.length < 10) return mobile;
  return `${mobile.slice(0, 2)}******${mobile.slice(-2)}`;
};

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
};

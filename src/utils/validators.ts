export const isValidIndianMobile = (mobile: string): boolean => {
  const clean = mobile.replace(/[^0-9]/g, '');
  return /^[6-9]\d{9}$/.test(clean);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidOtp = (otp: string, length = 6): boolean => {
  const clean = otp.replace(/[^0-9]/g, '');
  return clean.length === length;
};

export const isValidPAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.trim().toUpperCase());
};

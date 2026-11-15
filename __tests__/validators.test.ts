import {
  isValidIndianMobile,
  isValidEmail,
  isValidOtp,
  isValidPAN,
} from '../src/utils/validators';

describe('Validation Utilities', () => {
  describe('isValidIndianMobile', () => {
    it('validates 10-digit Indian numbers starting with 6-9', () => {
      expect(isValidIndianMobile('9876543210')).toBe(true);
      expect(isValidIndianMobile('8765432109')).toBe(true);
      expect(isValidIndianMobile('7654321098')).toBe(true);
      expect(isValidIndianMobile('6543210987')).toBe(true);
    });

    it('rejects invalid mobile numbers', () => {
      expect(isValidIndianMobile('1234567890')).toBe(false);
      expect(isValidIndianMobile('987654321')).toBe(false);
      expect(isValidIndianMobile('98765432100')).toBe(false);
      expect(isValidIndianMobile('abcdefghij')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('validates standard email addresses', () => {
      expect(isValidEmail('investor@scalpit.io')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.in')).toBe(true);
    });

    it('rejects malformed email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false);
      expect(isValidEmail('@missingusername.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
    });
  });

  describe('isValidOtp', () => {
    it('validates 6 digit numeric OTPs', () => {
      expect(isValidOtp('123456')).toBe(true);
      expect(isValidOtp('000000')).toBe(true);
      expect(isValidOtp('12345')).toBe(false);
      expect(isValidOtp('1234567')).toBe(false);
    });
  });

  describe('isValidPAN', () => {
    it('validates 10-character Indian PAN numbers', () => {
      expect(isValidPAN('ABCDE1234F')).toBe(true);
      expect(isValidPAN('BNZPK8923L')).toBe(true);
    });

    it('rejects invalid PAN numbers', () => {
      expect(isValidPAN('12345ABCDE')).toBe(false);
      expect(isValidPAN('ABCDE1234')).toBe(false);
      expect(isValidPAN('ABC123456D')).toBe(false);
    });
  });
});

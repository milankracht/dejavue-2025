import { describe, it, expect } from 'vitest';
import { readableDate, hyperlink } from './helper';

describe('readableDate', () => {
  it('should return a formatted date string for a valid date input', () => {
    const result = readableDate('2023-01-01');
    expect(result).toBe('January 1, 2023');
  });

  it('should return "Unknown" for null input', () => {
    const result = readableDate(null);
    expect(result).toBe('Unknown');
  });

  it('should return "Unknown" for undefined input', () => {
    const result = readableDate(undefined);
    expect(result).toBe('Unknown');
  });

  it('should handle invalid date strings gracefully', () => {
    const result = readableDate('invalid-date');
    expect(result).toBe('Unknown');
  });
});

describe('hyperlink', () => {
  it('should convert a URL in a string to an HTML anchor tag', () => {
    const result = hyperlink('Check this out: https://example.com');
    expect(result).toBe(
      'Check this out: <a href="https://example.com" target="_blank">https://example.com</a>',
    );
  });

  it('should handle multiple URLs in a string', () => {
    const result = hyperlink('Visit https://example.com and https://test.com');
    expect(result).toBe(
      'Visit <a href="https://example.com" target="_blank">https://example.com</a> and <a href="https://test.com" target="_blank">https://test.com</a>',
    );
  });

  it('should return the original string if no URLs are present', () => {
    const result = hyperlink('No links here!');
    expect(result).toBe('No links here!');
  });

  it('should handle an empty string input', () => {
    const result = hyperlink('');
    expect(result).toBe('');
  });
});

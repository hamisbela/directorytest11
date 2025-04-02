// Utility functions for data formatting

/**
 * Formats an address with city and state
 */
export function formatAddress(address?: string, city?: string, state?: string, postalCode?: string): string {
  const cityState = city && state ? `${city}, ${state}` : '';
  const zipCode = postalCode ? ` ${postalCode}` : '';
  
  if (address) {
    return `${address}, ${cityState}${zipCode}`.trim();
  }
  
  return cityState;
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Formats a location string from city and state
 */
export function formatLocation(city?: string, state?: string): string {
  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  return 'Location not specified';
}
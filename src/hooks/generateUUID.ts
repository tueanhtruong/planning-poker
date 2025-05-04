import { getLocalStorageInfo } from '@/modules';

export function generateUUID() {
  return crypto.randomUUID();
}
export function generateShortID() {
  // Get current timestamp
  const timestamp = Date.now().toString(36);

  // Generate a random UUID-like part (simplified)
  const randomPart = getLocalStorageInfo('userId').substring(2, 8);

  // Combine them to create a short unique ID
  return `${timestamp}${randomPart}`;
}

import { apiClient } from './client';

export const ensureSession = async (): Promise<string> => {
  let token = sessionStorage.getItem('session_token');

  if (!token) {
    try {
      const response = await apiClient.get<{ token: string }>('/session-token');
      token = response.data.token;

      sessionStorage.setItem('session_token', token);
    } catch (error) {
      console.warn('Backend unavailable, generating mock token.');
      token = 'mock-session-token-' + Date.now();

      sessionStorage.setItem('session_token', token);
    }
  }

  return token;
};

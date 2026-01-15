import { apiClient } from './client';

export const ensureSession = async (): Promise<string> => {
  let token = sessionStorage.getItem('session_token');

  if (token) return token;

  try {
    const response = await apiClient.get<{ token: string }>('/session-token');
    token = response.data.token;

    if (token) {
      sessionStorage.setItem('session_token', token);
      return token;
    } else {
      throw new Error('No token received from backend');
    }
  } catch (error) {
    console.error('Failed to initialize session:', error);
    throw error; // let the UI handle the critical failure
  }
};

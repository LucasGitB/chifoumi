import { api } from '../lib/api.js';

export const authService = {
  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{token: string}>}
   */
  login: async (username, password) => {
    const response = await api.post('/login', {
      username,
      password,
    });
    return response.data;
  },

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{_id: string, username: string}>}
   */
  register: async (username, password) => {
    const response = await api.post('/register', {
      username,
      password,
    });
    return response.data;
  },
};

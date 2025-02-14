import { api } from '../lib/api.js';

export const matchesService = {
  /**
   * @returns {Promise<{_id: string, user1: Object, user2: Object|null, turns: Array}>}
   */
  createMatch: async () => {
    const response = await api.post('/matches', null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },

  /**
   * @param {{page?: number, itemsPerPage?: number, order?: string}} params
   * @returns {Promise<Array>}
   */
  getMatches: async (params = {}) => {
    const response = await api.get('/matches', {
      params,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },

  /**
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getMatch: async (id) => {
    const response = await api.get(`/matches/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },

  /**
   * @param {string} matchId
   * @param {number} turnId
   * @param {string} move
   * @returns {Promise<void>}
   */
  playTurn: async (matchId, turnId, move) => {
    const response = await api.post(
      `/matches/${matchId}/turns/${turnId}`,
      {
        move,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    return response.data;
  },

  /**
   * @param {string} matchId
   * @returns {Promise<void>}
   */
  subscribeToMatch: async (matchId) => {
    const response = await api.get(`/matches/${matchId}/subscribe`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
};

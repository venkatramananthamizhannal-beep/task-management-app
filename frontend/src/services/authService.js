import api from './api';

export const authService = {
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.put('/auth/profile', data);
    return res.data;
  },

  changePassword: async (passwordData) => {
    const res = await api.put('/auth/change-password', passwordData);
    return res.data;
  },

  deleteAccount: async () => {
    const res = await api.delete('/auth/account');
    return res.data;
  },
};

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userName: (state) => {
      if (!state.user) return '';
      const name = state.user.name || '';
      const last = state.user.last_name || '';
      const second = state.user.second_last_name || '';
      return `${name} ${last} ${second}`.trim();
    },
  },

  actions: {
    setAuth({ token, user }) {
      this.token = token;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.user = null;
    },
  },

  persist: {
    storage: localStorage,
  },
});

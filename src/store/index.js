import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: null,
      token: null,
      permission: null,
      data: null,
      notifications: []
    }
  },
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ],
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setPages(state, payload) {
      state.paginator = payload;
    }
  },
  actions: {
    // ALWAYS ASYNC
    // IF CHANGING SOMETHING IN MUTATION USER .COMMIT : USER .DISPATCH
    setUser(state, payload) {
      state.commit('setUser', payload);
    },
    setPages(state, payload) {
      state.commit(payload);
    }
  },
  getters: {
    getUser: state => state.user || {},
    getUserNotifications: state => state.user.notifications || [],
    getPaginator: state => state.paginator || {}
  }
});

export default store;

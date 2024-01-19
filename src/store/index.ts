// src/store/index.ts
import { createStore, Store } from 'vuex';

interface User {
  id: number;
  name: string;
  email: string;
  numero: string;
 
}

interface RootState {
  token: string | null;
  user: User | null;
}

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const defaultState: RootState = {
  token: storedToken !== null ? storedToken : null,
  user: storedUser !== null ? JSON.parse(storedUser) : null,
};

const store = createStore<RootState>({
  state: defaultState,
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    loginUser({ commit }, { token, user }: { token: string; user: User }) {
      commit('setToken', token);
      commit('setUser', user);
    },
  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,
  },
});

export function useStore() {
  return store as Store<RootState>;
}

// store.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // Armazenará as informações do usuário
  },
  mutations: {
    setUser(state, user) {
      console.log('Mutation setUser chamada. Novo usuário:', user);
      state.user = user;
    },
  },
  actions: {
    // Pode conter ações relacionadas ao usuário, se necessário
  },
  getters: {
    getUser(state) {
      
      return state.user;
    } 
  },
});

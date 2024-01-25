// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isPlaying: false, // ou um valor inicial adequado
    selectedGenre: null,
    selectedImage: null,
    songs: []
  },
  mutations: {
    setIsPlaying(state, value) {
      state.isPlaying = value;
    },
    setGenre(state, genre) {
      state.selectedGenre = genre;
    },
    setImage(state, image) {
      state.selectedImage = image;
    },
  },
  actions: {
    playComposition({ commit, dispatch }, composition) {
      // Adicione lógica adicional conforme necessário
      commit('setIsPlaying', true);
      dispatch('musicPlayer/selectComposition', composition, { root: true });
    },
    pauseComposition({ commit }) {
      // Adicione lógica adicional conforme necessário
      commit('setIsPlaying', false);
    },
    updateGenreAndImage({ commit }, { genre, image }) {
      commit('setGenre', genre);
      commit('setImage', image);
    },
  },
  modules: {
    musicPlayer: {
      namespaced: true,
      state: {
        selectedComposition: null,
      },
      mutations: {
        setSelectedComposition(state, composition) {
          state.selectedComposition = composition;
        },
      },
      actions: {
        selectComposition({ commit }, composition) {
          commit('setSelectedComposition', composition);
        },
      },
      getters: {
        getSelectedComposition: state => state.selectedComposition,
      },
    },
  },
});

export default store;

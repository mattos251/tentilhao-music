<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-full">
        <HeaderPerfil />
      </div>
      <div class="column is-full">
          <div>
            <div class="tabs is-medium is-centered">
              <ul>
                <li v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': activeTab === tab.name }" @click="changeTab(tab.name)">
                  <a>{{ tab.label }}</a>
                </li>
              </ul>
            </div>

            <div v-show="activeTab === 'music'">
              <MusicPlaylistUsuario/>
            </div>

            <div v-show="activeTab === 'about'">
              <p>Conteúdo da aba Sobre.</p>
            </div>

            <div v-show="activeTab === 'newMusic'">
              <p>Conteúdo da aba de Novas Músicas.</p>
            </div>
          </div>
        </div>

        <footer class="footer is-0-desktop is-0-mobile" v-show="activeTab === 'music'">
          <div class="content">
            <PlayerMusic />
          </div>
        </footer>
      </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import PlayerMusic from "@/components/PlayerMusic.vue";
import MusicPlaylistUsuario from "@/components/MusicPlaylistUsuario.vue";

export default defineComponent({
  name: "PaginaPerfil",
  components: {
    HeaderPerfil,
    PlayerMusic,
    MusicPlaylistUsuario
},
  data() {
    return {
      activeTab: 'music',
      tabs: [
        { name: 'music', label: 'Music' },
        { name: 'about', label: 'Sobre' },
        { name: 'newMusic', label: 'Novas músicas' },
      ],
    };
  },
  methods: {
    changeTab(tabName: string) {
      this.activeTab = tabName;
    },
  },
});
</script>

<style scoped>

.footer {
  position: fixed;
  bottom: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #4f9ac4; /* Adapte a cor de fundo conforme necessário */
}



</style>

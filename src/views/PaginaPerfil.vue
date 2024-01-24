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
              <li
                v-for="tab in tabs"
                :key="tab.name"
                :class="{ 'is-active': activeTab === tab.name }"
                @click="changeTab(tab.name)"
              >
                <a>{{ tab.label }}</a>
              </li>
            </ul>
          </div>

          <div v-show="activeTab === 'music'">
            <MusicPlaylistUsuario />
          </div>

          <div v-show="activeTab === 'about'" class="about-User">
            <div class="box area-about">
              <p>
                É um fato conhecido de todos que um leitor se distrairá com o conteúdo de
                texto legível de uma página quando estiver examinando sua diagramação. A
                vantagem de usar Lorem Ipsum é que ele tem uma distribuição normal de
                letras, ao contrário de "Conteúdo aqui, conteúdo aqui", fazendo com que
                ele tenha uma aparência similar a de um texto legível. Muitos softwares de
                publicação e editores de páginas na internet agora usam Lorem Ipsum como
                texto-modelo padrão, e uma rápida busca por 'lorem ipsum' mostra vários
                websites ainda em sua fase de construção. Várias versões novas surgiram ao
                longo dos anos, eventualmente por acidente, e às vezes de propósito
                (injetando humor, e coisas do gênero).
              </p>
            </div>
          </div>

          <!-- <div v-show="activeTab === 'newMusic'">
            <p>Conteúdo da aba de Novas Músicas.</p>
          </div> -->
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
    MusicPlaylistUsuario,
  },
  data() {
    return {
      activeTab: "music",
      tabs: [
        { name: "music", label: "Music" },
        { name: "about", label: "Sobre" },
        // { name: "newMusic", label: "Novas músicas" },
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

.about-User {
  display: flex;
  justify-content: center;
}
.about-User .area-about {
  width: 60%;
}
</style>

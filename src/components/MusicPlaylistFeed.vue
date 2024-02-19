<template>
  <div class="music-playlist is-flex is-justify-content-center">
    <div class="playlist-container is-flex is-justify-content-center">
      <ul class="playlist">
        <li
          v-for="(composition, index) in compositions"
          :key="index"
          class="composition-items"
        >
          <div class="icons">
            <svg-icon
              type="mdi"
              :path="Play"
              @click="handlePlayClick(composition)"
            ></svg-icon>
          </div>

          <p class="info userName">{{ composition.nome_usuario }}</p>
          <p class="info titulo">{{ composition.titulo }}</p>

          <div class="actions">
            <router-link
              :to="{
                name: 'PaginaPerfilID',
                params: { userId: composition.usuario_id },
              }"
            >
              <svg-icon type="mdi" :path="profile"></svg-icon>
            </router-link>

            <!-- <a @click="enviarMensagem(composition.compositorPhoneNumber)">
                <svg-icon type="mdi" :path="Sendmessage"></svg-icon>
              </a> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountBox, mdiPlay, mdiSendCircleOutline } from "@mdi/js";
import axios from "axios";
import { mapActions } from "vuex";

export default defineComponent({
  nome: "MusicPlaylistFeed",
  components: { SvgIcon },
  props: {
    genero: String, // Adicione esta propriedade para receber o gênero selecionado
  },
  data() {
    return {
      Play: mdiPlay,
      profile: mdiAccountBox,
      Sendmessage: mdiSendCircleOutline,
      idUser: "",
      compositions: {},
    };
  },
  methods: {
    ...mapActions("musicPlayer", ["selectComposition"]),

    handlePlayClick(composition: never) {
      this.selectComposition(composition); // Chame a ação para selecionar a composição
    },

    enviarMensagem(numeroTelefone: number) {
      const mensagem = "Olá, quero falar sobre a música!";
      const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(
        mensagem
      )}`;

      // Abra o link do WhatsApp em uma nova janela ou guia
      window.open(linkWhatsApp, "_blank");
    },
  },
  async mounted() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3333/api/composicoesGeneros/${this.genero}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response.data);
      this.compositions = response.data;
    } catch (error: any) {
      console.error("Erro ao obter composições:", error.message);
    }
  },
});
</script>

<style scoped>
.playlist-container {
  border: 1px solid #f5f5f5;
  opacity: 100%;
  width: 50%;
  border-radius: 5px;
  height: 290px;
  overflow-y: overlay;
  margin-top: 20px;
}

.playlist-container .playlist {
  width: 100%;
}

.playlist .icons p {
  color: black;
}

.playlist li {
  margin-bottom: 20px;
  border-bottom: 1px solid #3636362b;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.playlist li path {
  fill: #000;
  cursor: pointer;
}

.composition-items {
  display: grid;
  grid-template-columns: 0fr 1fr 1fr 0fr;
  align-items: center;
}

.icons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .playlist-container {
    border: 1px solid #f5f5f5;
    opacity: 100%;
    width: 90%;
    border-radius: 5px;
    height: 290px;
    overflow-y: overlay;
    margin-top: 20px;
  }
}
</style>

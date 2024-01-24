<template>
  <div class="music-playlist is-flex is-justify-content-center">
    <div class="playlist-container is-flex is-justify-content-center p-4">
      <ul class="playlist">
        <li v-for="(composition, index) in compositions" :key="index">
          <div
            class="icons is-flex is-align-items-center is-justify-content-space-between"
          >
            <svg-icon
              type="mdi"
              :path="Play"
              @click="handlePlayClick(composition)"
            ></svg-icon>
            <p>{{ composition.userName }}</p>
            <p>{{ composition.titulo }}</p>

            <div class="is-flex">
              <svg-icon type="mdi" :path="Delete"></svg-icon>
              <svg-icon type="mdi" :path="Editar"></svg-icon>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiDelete, mdiSquareEditOutline } from "@mdi/js";
import axios from "axios";
import { mapActions } from "vuex";

export default defineComponent({
  name: "MusicPlaylistFeed",
  components: { SvgIcon },
  data() {
    return {
      Play: mdiPlay,
      Delete: mdiDelete,
      Editar: mdiSquareEditOutline,
      compositions: [],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const usuarioId = this.decodeToken(token);
      this.fetchComposicoes(usuarioId, token);
    }
  },

  methods: {
    ...mapActions("musicPlayer", ["selectComposition"]),

    handlePlayClick(composition: never) {
      this.selectComposition(composition); // Chame a ação para selecionar a composição
    },

    decodeToken(token: string) {
      try {
        const [header, payload] = token.split(".").slice(0, 2);
        const decodedPayload = JSON.parse(atob(payload));
        console.error("token:", decodedPayload);
        return decodedPayload.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    },

    async fetchComposicoes(userId: any, token: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/api/composicoesUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        for (const composition of response.data) {
          const userResponse = await axios.get(
            `http://localhost:3333/api/usuarios/${composition.usuario_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Adicionar o nome do usuário à composição
          composition.userName = userResponse.data.usuario.nome_completo;
        }

        this.compositions = response.data;
        // console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar composições:", error);
      }
    },
  },
});
</script>

<style>
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
</style>

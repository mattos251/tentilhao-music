<template>
  <div class="music-playlist is-flex is-justify-content-center">
    <div class="playlist-container is-flex is-justify-content-center p-4">
      <ul class="playlist">
        <!-- v-for="musica in filtrarMusicasPorGenero" :key="musica.id" -->
        <li v-for="(composition, index) in compositions" :key="index">
          <div
            class="icons is-flex is-align-items-center is-justify-content-space-between"
          >
            <svg-icon type="mdi" :path="Play"></svg-icon>
            <p>{{ composition.userName }}</p>
            <p>{{ composition.titulo }}</p>
            <div class="is-flex">
              <router-link to="/perfil">
                <svg-icon type="mdi" :path="profile"></svg-icon>
              </router-link>

              <a @click="enviarMensagem(composition.compositorPhoneNumber)">
                <svg-icon type="mdi" :path="Sendmessage"></svg-icon>
              </a>
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
import { mdiAccountBox, mdiPlay, mdiSendCircleOutline } from "@mdi/js";
import axios from "axios";

export default defineComponent({
  nome: "MusicPlaylistFeed",
  components: { SvgIcon },
  data() {
    return {
      Play: mdiPlay,
      profile: mdiAccountBox,
      Sendmessage: mdiSendCircleOutline,
      idUser: "",
      compositions: [],
    };
  },
  methods: {
    enviarMensagem(numeroTelefone: number) {
      const mensagem = "Olá, quero falar sobre a música!";
      const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(
        mensagem
      )}`;

      // Abra o link do WhatsApp em uma nova janela ou guia
      window.open(linkWhatsApp, "_blank");
    },

    // isProfileOfCurrentUser(compositions) {
    //   const token = localStorage.getItem("token");

    //   if (token) {
    //     try {
    //       // Decodifica o token (assumindo que seja um token JWT)
    //       const decodedToken = JSON.parse(atob(token.split(".")[1]));

    //       // Agora você pode acessar as informações do usuário
    //       this.idUser = decodedToken.userId;
    //     } catch (error) {
    //       console.error("Erro ao decodificar o token:", error);
    //     }
    //   } else {
    //     console.log("Nenhum token encontrado no localStorage");
    //   }

    //   const usuarioIdAtual = this.idUser; // Obtenha o ID do usuário atual da sua aplicação;
    //   return compositions.usuario_id === usuarioIdAtual;
    // },
  },
  async mounted() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3333/api/composicoes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Endpoint para obter as composições

      // Iterar sobre as composições para buscar o nome do usuário
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
    } catch (error: any) {
      console.error("Erro ao obter composições:", error.message);
    }
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

<template>
  <div class="music-playlist is-flex is-justify-content-center">
    <div class="playlist-container is-flex is-justify-content-center p-4">
      <ul class="playlist">
        <li v-for="(song, index) in songs" :key="index">
          <div
            class="icons is-flex is-align-items-center is-justify-content-space-between"
          >
            <svg-icon type="mdi" :path="Play"></svg-icon>
            <p>{{ song.artist }}</p>
            <p>{{ song.title }}</p>
            <div class="is-flex">
              <router-link
                to="{name: 'perfil', params: { compositorId: song.compositorId }}"
              >
                <svg-icon type="mdi" :path="profile"></svg-icon>
              </router-link>

              <a @click="enviarMensagem(song.compositorPhoneNumber)">
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

export default defineComponent({
  nome: "MusicPlaylistFeed",
  components: { SvgIcon },
  data() {
    return {
      Play: mdiPlay,
      profile: mdiAccountBox,
      Sendmessage: mdiSendCircleOutline,
      songs: [
        {
          artist: "Link Park",
          title: "In the End",
          compositorId: 1,
          compositorPhoneNumber: "+123456789",
        },
        {
          artist: "Spiliquid",
          title: "meu ovo",
          compositorId: 2,
          compositorPhoneNumber: "89994758809",
        },
        // Adicione mais itens conforme necessário
      ],
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

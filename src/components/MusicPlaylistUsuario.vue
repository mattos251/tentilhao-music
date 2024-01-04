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

export default defineComponent({
  name: "MusicPlaylistFeed",
  components: { SvgIcon },
  data() {
    return {
      Play: mdiPlay,
      Delete: mdiDelete,
      Editar: mdiSquareEditOutline,
      songs: [
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        { artist: "Link Park", title: "In the End" },
        // Adicione mais itens conforme necessário
      ],
    };
  },
  // methods: {
  //   deleteSong() {
  //     // Implemente a lógica de exclusão aqui
  //     this.songs.splice(2, 1);
  //   },
  //   editSong() {
  //     // Implemente a lógica de edição aqui
  //     console.log("Editar música", this.songs[2]);
  //   },
  // },
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

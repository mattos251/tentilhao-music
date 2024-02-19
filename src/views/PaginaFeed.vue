<template>
  <div class="is-desktop">
    <NavbarNavigation />

    <div class="m-2 is-large">
      <div class="is-flex is-justify-content-center m-2">
        <div
          class="banner-central box is-flex is-justify-content-center is-align-items-center"
        >
          <img :src="imagem" alt="" />
          <h1>{{ nome_genero }}</h1>
        </div>
      </div>

      <!-- <div class="is-flex is-justify-content-center m-2">
        <input class="input input-search" type="text" placeholder="Loading input" />
      </div> -->

      <section>
        <MusicPlaylistFeed :genero="genero" />
      </section>
    </div>

    <section class="footer">
      <PlayerMusic />
    </section>
  </div>
</template>

<script lang="ts">
import MusicPlaylistFeed from "@/components/MusicPlaylistFeed.vue";
import PlayerMusic from "@/components/PlayerMusic.vue";
import NavbarNavigation from "@/components/NavbarNavigation.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaginaFeed",
  components: {
    MusicPlaylistFeed,
    PlayerMusic,
    NavbarNavigation,
  },
  data() {
    return {
      imagem_genero: "",
      nome_genero: "",
    };
  },
  computed: {
    genero(): string | null {
      const value = this.$store.state.selectedGenre;
      return value;
    },

    imagem(): string | null {
      const value = this.$store.state.selectedImage;
      return value;
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

.input-search {
  border-radius: 50px;
  height: 35px;
  border: 2px solid #519bc4;
  width: 50%;
}

img {
  height: 200px;
  width: 500px;
  object-fit: fill;
  position: absolute;
}

.banner-central {
  width: 60%;
  height: 200px;
}
.banner-central h1 {
  font-size: x-large;
  background-color: rgba(255, 255, 255, 0.7); /* Cor de fundo com opacidade */
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(0.5px); /* Valor de desfoque */
  color: #333; /* Cor do texto */
}
</style>

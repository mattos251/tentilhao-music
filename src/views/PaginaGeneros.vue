<template>
  <div class="is-desktop">
    <NavbarNavigation />

    <div class="m-2 is-large">
      <div class="is-flex is-justify-content-center m-2">
        <BanerIdentidade />
      </div>

      <div class="is-flex is-justify-content-center m-2">
        <input class="input input-search" type="text" placeholder="Loading input" />;
      </div>

      <!-- <div class="is-flex is-justify-content-center">
                <TopMusic/>
            </div> -->

      <section>
        <MusicPlaylistFeed />
      </section>
    </div>

    <section class="footer">
      <PlayerMusic />
    </section>
  </div>
</template>

<script lang="ts">
import BanerIdentidade from "@/components/BanerIdentidade.vue";
import MusicPlaylistFeed from "@/components/MusicPlaylistFeed.vue";
import NavbarNavigation from "@/components/NavbarNavigation.vue";
import PlayerMusic from "@/components/PlayerMusic.vue";
// import TopMusic from "@/components/TopMusic.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaginaGeneros",
  components: {
    NavbarNavigation,
    BanerIdentidade,
    MusicPlaylistFeed,
    PlayerMusic,
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
</style>

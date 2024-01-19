<template>
  <div class="is-desktop">
    <div class="container box-list">
      <div class="columns item-music">
        <div class="column" v-for="song in topSongs" :key="song.id">
          <div class="top-list is-flex">
            <div class="is-flex is-justify-content-center">
              <img :src="song.imageUrl" alt="Imagem da Música" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopMusic",
  data() {
    return {
      topSongs: [
        {
          id: 1,
          title: "Nome da Música 1",
          artist: "Artista 1",
          description: "Descrição da música 1.",
          imageUrl:
            "https://th.bing.com/th/id/OIP.bQAqo7cZ4lmOuWF7gnlC2QHaDw?w=310&h=177&c=7&r=0&o=5&pid=1.7",
        },
        {
          id: 2,
          title: "Nome da Música 2",
          artist: "Artista 2",
          description: "Descrição da música 2.",
          imageUrl:
            "https://th.bing.com/th/id/OIP.bQAqo7cZ4lmOuWF7gnlC2QHaDw?w=310&h=177&c=7&r=0&o=5&pid=1.7",
        },
        {
          id: 3,
          title: "Nome da Música 2",
          artist: "Artista 2",
          description: "Descrição da música 2.",
          imageUrl:
            "https://th.bing.com/th/id/OIP.bQAqo7cZ4lmOuWF7gnlC2QHaDw?w=310&h=177&c=7&r=0&o=5&pid=1.7",
        },
        {
          id: 4,
          title: "Nome da Música 2",
          artist: "Artista 2",
          description: "Descrição da música 2.",
          imageUrl:
            "https://th.bing.com/th/id/OIP.bQAqo7cZ4lmOuWF7gnlC2QHaDw?w=310&h=177&c=7&r=0&o=5&pid=1.7",
        },
        {
          id: 5,
          title: "Nome da Música 2",
          artist: "Artista 2",
          description: "Descrição da música 2.",
          imageUrl:
            "https://th.bing.com/th/id/OIP.bQAqo7cZ4lmOuWF7gnlC2QHaDw?w=310&h=177&c=7&r=0&o=5&pid=1.7",
        },
      ],
    };
  },
});
</script>

<style scoped>
.box-list {
  width: 100%;
}
.top-list img {
  display: flex;
  justify-content: center;
  width: 50%;
  border-radius: 100%;
}

.top-list figure {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  width: 200px;
  height: 60px;
  border-radius: 100%;
}
</style>

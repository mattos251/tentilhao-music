<template>
  <div class="container is-full is-justify-content-space-around cards-lists">
    <div class="columns is-multiline is-flex">
      <div v-for="card in cards" :key="card.id" class="card-box column is-one-fifth">
        <div @click="navigateToFeed(card)" class="card-content title-card">
          <div class="image is-5by4">
            <img :src="card.imagem_genero" alt="Card Image" />
          </div>
          <h2>{{ card.genero }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CardComponent",
  data() {
    return {
      cards: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3333/api/generos");
      this.cards = response.data;
    } catch (error: any) {
      console.error("Erro ao obter generos:", error.message);
    }
  },
  methods: {
    navigateToFeed(card: { genero: string; imagem_genero: string }) {
      this.$store.dispatch("updateGenreAndImage", {
        genre: card.genero,
        image: card.imagem_genero,
      });
      const router = this.$router;
      router.push(`/feeds/${card.genero}`);
    },
  },
});
</script>

<style scoped>
.card-content {
  padding: 0;
}

.cards-lists {
  display: flex;
  height: 20px;
  cursor: pointer;
  /* ou outro valor conforme necessário */
}

.title-card h2 {
  font-size: 20px;
  color: #519bc4;
  display: flex;
  justify-content: center;
}

.card-box {
  border: 1px solid #0093ff42;
  border-radius: 18px;
  width: 10%;
  margin: 10px;
}
</style>

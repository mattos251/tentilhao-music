<template>
  <div class="is-full is-justify-content-space-around cards-lists">
    <div class="columns card-area is-multiline is-flex is-justify-content-space-around">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card-box column is-one-fifth-desktop is-one-third-tablet is-half-mobile"
      >
        <div @click="navigateToFeed(card)" class="card-content title-card">
          <div class="image is-1by1">
            <img :src="card.imagem_genero" alt="Card Image" />
          </div>
          <h2 class="title-genres">{{ card.genero }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { apiDomain } from "@/config";

export default defineComponent({
  name: "CardComponent",
  data() {
    return {
      cards: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${apiDomain}/api/generos`);
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

.card-area {
  width: 100%;
}

.cards-lists {
  display: flex;
  width: 100%;
  height: 65vh;
  cursor: pointer;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 8px; /* Largura da barra de rolagem */
}

::-webkit-scrollbar-thumb {
  background-color: #036faa; /* Cor do polegar (barra de rolagem ativa) */
  border-radius: 6px; /* Borda do polegar da barra de rolagem */
}

::-webkit-scrollbar-track {
  background-color: #e4f2ff; /* Cor do fundo da barra de rolagem */
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
  margin: 20px;
  width: 20%;
  height: auto;
}

@media screen and (max-width: 768px) {
  .column .is-half-mobile {
    flex: none;
    width: 30%;
  }

  .card-box {
    border: 1px solid #0093ff42;
    border-radius: 18px;
    margin: 6px;
    width: 20%;
    height: auto;
  }

  .card-area {
    width: auto;
  }
}
</style>

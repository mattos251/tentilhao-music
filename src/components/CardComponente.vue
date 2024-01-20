<template>
  <div class="container is-full is-justify-content-space-around cards-lists">
    <div class="columns is-multiline is-flex">
      <div v-for="card in cards" :key="card.id" class="card-box column is-one-fifth">
        <router-link :to="'/feeds/' + card.genero" class="card-content title-card">
          <div class="image is-5by4">
            <img :src="card.imagem_genero" alt="Card Image" />
          </div>
          <h2>{{ card.genero }}</h2>
        </router-link>
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
      // genres: [
      //   {
      //     id: 1,
      //     link: "/feeds",
      //     imageSrc: require("@/assets/turmadopagode2.jpg"),
      //     title: "Pagode",
      //   },
      // ],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3333/api/generos");
      this.cards = response.data;
      console.log("generos", this.cards);
    } catch (error: any) {
      console.error("Erro ao obter generos:", error.message);
    }
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

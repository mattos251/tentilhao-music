<template>
  <div class="container is-full is-justify-content-space-around cards-lists">
    <div class="columns is-multiline is-flex">
      <div v-for="card in cards" :key="card.id" class="card-box column is-one-fifth">
        <router-link :to="card.link" class="card-content title-card">
          <figure class="image is-5by4">
            <img :src="card.imageSrc" alt="Card Image" />
          </figure>
          <h2>{{ card.title }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardComponent",
  data() {
    return {
      cards: [
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },
        {
          id: 1,
          link: "/feeds",
          imageSrc: "../assets/turmadopagode2.jpg",
          title: "Pagode",
        },

        // Adicione mais cards conforme necessário
      ],
    };
  },
});
</script>

<style scoped>
.cards-lists {
  display: flex;
  height: auto;
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

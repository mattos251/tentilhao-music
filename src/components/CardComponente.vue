<template>
  <div class="container is-full is-justify-content-space-around cards-lists">
    <div class="columns is-multiline is-flex">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card-box column is-one-fifth"
      >
        <router-link :to="card.link" class="card-content title-card">
          <div class="image is-5by4">
            <img :src="card.imageSrc" alt="Card Image" />
          </div>
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
          imageSrc: require("@/assets/turmadopagode2.jpg"),
          title: "Pagode",
        },
        {
          id: 2,
          link: "/feeds",
          imageSrc: require("@/assets/brega.jpg"),
          title: "Brega",
        },
        {
          id: 3,
          link: "/feeds",
          imageSrc: require("@/assets/phonk.jpg"),
          title: "Phonk",
        },
        {
          id: 4,
          link: "/feeds",
          imageSrc: require("@/assets/pop.jpg"),
          title: "Pop",
        },
        {
          id: 5,
          link: "/feeds",
          imageSrc: require("@/assets/rock.jpg"),
          title: "Rock",
        },
        {
          id: 6,
          link: "/feeds",
          imageSrc: require("@/assets/sertanejo.jpg"),
          title: "Sertanejo",
        },
        {
          id: 7,
          link: "/feeds",
          imageSrc: require("@/assets/jazz.jpg"),
          title: "Jazz",
        },
        {
          id: 8,
          link: "/feeds",
          imageSrc: require("@/assets/eletronica.jpg"),
          title: "Eletronica",
        },

        // Adicione mais cards conforme necessário
      ],
    };
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

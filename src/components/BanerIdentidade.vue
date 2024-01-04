<template>
  <div class="banner-central box is-flex is-justify-content-center is-align-items-center">
    <h1>Genero</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BanerIdentidade",
});
</script>

<style scoped>
.banner-central {
  width: 80%;
  height: 120px;
  background-image: url("../assets/turmadopagode2.jpg");
  background-size: cover;
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

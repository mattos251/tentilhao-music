<template>
  <div class="container">
    <div class="column">
      <div class="control">
        <!-- <div class="is-flex is-justify-content-center">
          <input class="input input-search" type="text" placeholder="Loading input" />
        </div> -->
        <div>
          <h1 class="title title-generos">Qual seu genero preferido?</h1>
        </div>

        <CardComponente />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardComponente from "../components/CardComponente.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    CardComponente,
  },
});
</script>

<style scoped>
/* .input-search {

  height: 40px;
  border: 2px solid #519bc4;
  width: 80%;
} */

.title-generos {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: #519bc4;
  margin-bottom: 30px;
  font-size: x-large;
}
</style>

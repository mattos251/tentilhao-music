<template>
  <div class="container">
    <div class="column">
      <div class="control">
        <input class="input input-search" type="text" placeholder="Loading input" />
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
.input-search {
  border-radius: 50px;
  height: 40px;
  border: 2px solid #519bc4;
}

.title-generos {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: #519bc4;
  margin-bottom: 30px;
}
</style>

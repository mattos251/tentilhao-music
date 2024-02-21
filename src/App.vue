<template>
  <div>
    <router-view></router-view>
    <footer class="footer">
      <PlayerMusic v-if="tokenExists" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerMusic from "@/components/PlayerMusic.vue";

export default defineComponent({
  name: "App",
  components: {
    PlayerMusic,
  },
  data() {
    return {
      tokenExists: localStorage.getItem("token") !== null,
    };
  },
  mounted() {
    // Executa a verificação inicial
    this.checkTokenExists();

    // Adiciona um observador para mudanças na rota
    this.$router.afterEach(() => {
      this.checkTokenExists();
    });
  },
  methods: {
    checkTokenExists() {
      this.tokenExists = localStorage.getItem("token") !== null;
    },
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
  /* Adapte a cor de fundo conforme necessário */
}
</style>

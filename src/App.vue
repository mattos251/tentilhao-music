<template>
  <div>
    <router-view></router-view>
    <!-- <footer>
      <PlayerMusic />
    </footer> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import PlayerMusic from "@/components/PlayerMusic.vue";

export default defineComponent({
  name: "App",
  // components: {
  //   PlayerMusic,
  // },
});
</script>

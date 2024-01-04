<template>

  <div>
    <router-view to="/"> </router-view >
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import NavbarNavigation from './components/NavbarNavigation.vue'
// import SidbarNavigation from './components/SidbarNavigation.vue'


export default defineComponent({
  name: 'App',
  components:{

  }
}

);
</script>


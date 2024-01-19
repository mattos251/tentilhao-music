<template>
  <div>
    <div class="columns is-desktop">
      <div class="column page">
        <NavbarNavigation />
        <div class="columns">
          <div class="column is-2 sidbar">
            <SidbarNavigation />
          </div>
          <div class="column is-10">
            <div>
              <router-view to="/HomePage"></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavbarNavigation from "../components/NavbarNavigation.vue";
import SidbarNavigation from "../components/SidbarNavigation.vue";

export default {
  name: "PaginaPrincipal",
  components: {
    NavbarNavigation,
    SidbarNavigation,
  },
};
</script>

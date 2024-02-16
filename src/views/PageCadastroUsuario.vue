<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-logo">
        <div>
          <router-link :to="{ path: '/Login' }">
            <img src="../assets/TENTILHO-nav.png" width="180" height="60" />
          </router-link>
        </div>
        <a
          role="button"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"> </span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link
                v-if="showLoginButton"
                :to="{ path: '/Login' }"
                class="button-login"
              >
                Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PageCadastroUsuario",
  setup() {
    const showLoginButton = ref(true);
    const route = useRoute();

    watch(
      () => route.path,
      (to) => {
        // Esconder o botão de login na página de login e de cadastro
        showLoginButton.value = to !== "/Login" && to !== "/CadastroUsuario";
      },
      { immediate: true }
    );

    return { showLoginButton };
  },
  methods: {
    login() {
      // Implemente sua lógica de login aqui
    },
    moveToRegister() {
      // Implemente sua lógica de navegação para a página de registro aqui
    },
  },
});
</script>

<style scoped>
.navbar {
  background: #fff;
  height: 50px;
}
.navbar-logo {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}
.navbar-logo img {
  height: auto;
  max-width: 70%;
  cursor: pointer;
}

.navbar-menu {
  margin-right: 20px;
}

.button-login {
  border-bottom: 1px solid #4f9ac4;
  color: #4f9ac4;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  height: 100%;
  padding-bottom: 5px;
}
</style>

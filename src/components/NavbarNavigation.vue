<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-logo">
        <div>
          <router-link to="/homepage">
            <img
              src="../assets/TENTILHO Logo - Original with Transparent Background - 5000x5000 (2).png"
            />
            <!-- width="180"
              height="50" -->
          </router-link>
        </div>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="true"
          data-target="navbarBasicExample"
          @click="toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isMenuActive }"
      >
        <div class="navbar-end">
          <div class="navbar-item navbar-dropdown has-dropdown">
            <div class="buttons navbar-dropdown">
              <a class="button is-light">
                <router-link to="/homepage"> Home </router-link>
              </a>
              <!-- <a class="button is-light">
                <router-link to="/feeds"> Feed </router-link>
              </a> -->
              <a class="button is-light" @click="logout"> Sair </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarNavigation",
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    enviarMensagem() {
      const numeroTelefone = "89994758809";
      const mensagem = "Olá! Como você está?";
      const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(linkWhatsApp, "_blank");
    },
    logout() {
      // Remove o token do localStorage
      localStorage.removeItem("token"); // Substitua 'seuToken' pelo nome real do seu token

      // Recarrega a página
      location.reload();
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
});
</script>

<style scoped>
.navbar {
  /* background: #519bc4; */
  background: #013a59;
  height: 50px;
}
.navbar-logo {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}
.navbar-logo img {
  height: auto;
  width: 130px;
}

.navbar-dropdown {
  flex-direction: row;
  align-items: flex-start;
}

.navbar-menu {
  margin-right: 20px;
}
</style>

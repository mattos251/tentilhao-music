<template>
  <div class="columns menu-sidbar is-centered">
    <div class="column is-12">
      <div class="area-navegacao">
        <div class="perfil-usuario">
          <router-link to="/perfil">
            <figure class="image is-128x150">
              <img class="is-rounded" :src="usuario.imagem_perfil" />
            </figure>
          </router-link>
        </div>

        <ul class="menu-nav is-justify-content-center">
          <div class="title-perfil">
            <h2 class="subtitle">{{ usuario.nome }}</h2>
          </div>

          <li>
            <router-link to="/perfil">
              <a>Editar perfil</a>
            </router-link>
          </li>

          <li>
            <router-link to="/cadastro">
              <a href="">Nova música</a>
            </router-link>
          </li>

          <li><a>Mensagem</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidbarNavigation",

  data() {
    return {
      usuario: {
        nome: "",
        imagem_perfil: "",
      },
    };
  },

  mounted() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodifica o token (assumindo que seja um token JWT)
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Agora você pode acessar as informações do usuário
        this.usuario.nome = decodedToken.nome_completo;
        this.usuario.imagem_perfil = decodedToken.imagem_perfil;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Nenhum token encontrado no localStorage");
    }
  },
});
</script>

<style scoped>
.menu-sidbar {
  border-top: 4px solid #036faa;
  border-bottom: 4px solid #036faa;
  background: #e4f2ff;
  opacity: 85%;
  height: 100vh;
  margin: 0;
}

.menu-nav li {
  background: #036faa;
  opacity: 70%;
  margin-top: 50px;
  border-radius: 10px;
  font-size: large;
}

.menu-nav li a {
  color: white;
  justify-content: center;
  display: flex;
  font-size: smaller;
}
.perfil-usuario {
  display: flex;
  justify-content: center;
  width: 100%;
}
.perfil-usuario figure img {
  width: 80px;
}

.title-perfil {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>

<template>
  <div class="header-perfil">
    <div class="columns is-centered">
      <div class="column is-half-tablet is-one-third-desktop">
        <div class="is-flex">
          <div class="midia-contant">
            <figure class="image is-96x96">
              <img class="image-perfil" src="@/assets/perfil.jpg" alt="User Image" />
            </figure>
          </div>
          <div class="media-content is-align-self-center">
            <p class="title is-4">{{ usuario.nome }}</p>
            <p class="subtitle is-6">
              {{ usuario.tipo_usuario ? "Compositor" : "Produtor" }}
            </p>
          </div>
        </div>
        <div class="navegation">
          <ul class="is-flex is-justify-content-space-around">
            <router-link to="/homepage">
              <li>Home</li>
            </router-link>
            <router-link to="/feeds">
              <li>Feed</li>
            </router-link>
          </ul>
        </div>
      </div>

      <div class="column is-one-third-desktop is-align-self-center">
        <div class="is-flex is-justify-content-end">
          <figure class="image logo-perfil">
            <img
              src="@/assets/TENTILHO Logo - Original with Transparent Background - 5000x5000 (2).png"
              alt="Logo"
            />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderPerfil",
  data() {
    return {
      usuario: {
        nome: "",
        tipo_usuario: "", // Inicializar com um valor padrão ou vazio
        // Adicione outros campos do usuário conforme necessário
      },
    };
  },

  mounted() {
    // Recupera o token do localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodifica o token (assumindo que seja um token JWT)
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Agora você pode acessar as informações do usuário
        this.usuario.nome = decodedToken.nome_completo;
        this.usuario.tipo_usuario = decodedToken.tipo_usuario_id;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Nenhum token encontrado no localStorage");
    }
  },
};
</script>

<style scoped>
.header-perfil {
  background: #4f9ac4;
  padding: 20px; /* Reduzi o padding para tornar mais compacto */
  border-bottom: 1px solid #ffffff; /* Corrigi a cor da borda para branco */
}

.navegation {
  width: 100%; /* Ajustei a largura para ocupar 100% do container */
  margin-top: 20px; /* Adicionei um espaço superior */
}

.navegation li {
  padding: 10px;
  color: white;
  font-weight: bold; /* Adicionei negrito para melhor legibilidade */
}

.image-perfil {
  height: auto; /* Corrigi a altura para ser automática */
  max-width: 100%; /* Garante que a imagem não ultrapasse o contêiner */
  border-radius: 50%; /* Corrigi o valor do raio para 50% */
}

.logo-perfil {
  width: 80%; /* Ajustei a largura do logo para 80% do contêiner */
  height: auto;
}
</style>

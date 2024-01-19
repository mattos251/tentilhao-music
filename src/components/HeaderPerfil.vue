<template>
  <div class="columns is-mobile header-perfil">
    <div class="columns is-centered">
      <div class="column is-half-tablet is-one-third-desktop">
        <div class="">
          <div class="is-flex">
            <div class="midia-contant">
              <figure class="image is-96x96">
                <img class="image-perfil" src="../assets/perfil.jpg" alt="User Image" />
              </figure>
            </div>
            <div class="media-content is-align-self-center">
              <p class="title is-4">{{ usuario.nome }}</p>
              <p class="subtitle is-6">Compositor</p>
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
      </div>

      <div class="column is-one-third-desktop is-align-self-center">
        <div class="is-flex is-justify-content-end">
          <figure class="image logo-perfil">
            <img
              src="../assets/TENTILHO Logo - Original with Transparent Background - 5000x5000 (2).png"
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
        nome: "", // Inicializar com um valor padrão ou vazio
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
.navegation {
  width: 50%;
  position: relative;
  top: 20px;
}
.navegation li {
  padding-left: 10px;
  color: aliceblue;
}
.image-perfil {
  height: 100%;
  border-radius: 100%;
}

.header-perfil {
  background: #4f9ac4;
  padding: 30px;
  border-bottom: 1px solid #ffff;
}

.media-content p {
  color: white;
  padding-left: 10px;
}
.logo-perfil {
  display: flex;
  justify-content: center;
  width: 45%;
  height: auto;
}

.contente-perfil {
  display: flex;
  justify-content: center;
}

.linha {
  border-bottom: 1px solid red;
}
</style>

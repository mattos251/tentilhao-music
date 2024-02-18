<template>
  <div class="columns menu-sidbar is-centered m-0">
    <div class="column is-12">
      <div class="area-navegacao">
        <div class="perfil-usuario">
          <router-link to="/perfil">
            <figure class="image is-128x128">
              <img
                class="is-fullwidth"
                :src="usuario.imagem_perfil ? usuario.imagem_perfil : imagem_padrao"
                alt="Imagem do Perfil"
                loading="lazy"
              />
            </figure>

            <div class="title-perfil">
              <h2 class="subtitle">{{ usuario.nome }}</h2>
            </div>
          </router-link>
        </div>

        <ul class="menu-nav is-justify-content-center">
          <li>
            <router-link to="/perfil">
              <a>Editar perfil</a>
            </router-link>
          </li>

          <li>
            <router-link to="/cadastro">
              <a>Nova música</a>
            </router-link>
          </li>

          <li><a @click="logout"> Sair </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import imagemPadrao from "@/assets/OIP.jpg";

const imagem_padrao = ref(imagemPadrao);

const usuario = ref({
  nome: "",
  imagem_perfil: "",
  userId: "",
});

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};

const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  usuario.value.userId = decodedToken.userId;

  try {
    const response = await axios.get(
      `http://localhost:3333/api/usuario/${usuario.value.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = response.data;
    usuario.value.nome = userData.usuario.nome_completo;
    usuario.value.imagem_perfil = userData.usuario.imagem_perfil;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
.area-navegacao {
  text-align: -webkit-center;
}

.button-logout {
  display: flex;
  justify-content: center;
  position: relative;
  top: 0;
}

.menu-sidbar {
  border-top: 4px solid #036faa;
  border-bottom: 4px solid #036faa;
  background: #e4f2ff;
  opacity: 85%;
  height: 100%;
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
  width: 100%;
  display: flex;
  justify-content: center;
}
.perfil-usuario img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
}

.title-perfil {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .menu-sidbar {
    height: auto;
  }

  .perfil-usuario {
    margin-bottom: 20px;
  }

  .menu-nav {
    display: flex;
  }
  .menu-nav li {
    background: #036faa;
    opacity: 70%;
    margin: 5px;
    width: 30%;
    font-size: large;
  }
}
</style>

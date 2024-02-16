<template>
  <div class="header-perfil">
    <div class="columns is-centered">
      <div class="user-card column is-half-tablet is-one-third-desktop">
        <div class="user-info is-flex">
          <div>
            <figure class="image is-128x128 figure-image">
              <img
                class="profile-image is-rounded"
                :src="usuario.imagem_perfil ? usuario.imagem_perfil : imagem_padrao"
                alt="User Image"
              />
            </figure>
          </div>
          <div class="text-info is-align-self-center">
            <p class="title-profile">{{ usuario.nome }}</p>
            <p class="subtitle-profile">
              {{ usuario.tipo_usuario ? "Compositor" : "Produtor" }}
            </p>
            <div class="links-pages">
              <ul class="is-flex">
                <router-link to="/homepage" class="nav-link">
                  <li>Home</li>
                </router-link>
                <!-- <router-link to="/feeds" class="nav-link">
                  <li>Feed</li>
                </router-link> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third-desktop is-align-self-center">
        <div class="is-flex is-justify-content-end">
          <figure class="image logo-perfil">
            <img src="../assets/Tentilhao.png" alt="Logo" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import imagemPadrao from "../assets/OIP.jpg";

const imagem_padrao = ref(imagemPadrao);

const usuario = ref({
  nome: "",
  tipo_usuario: "",
  imagem_perfil: "",
  imagem_padrão: "../assets/OIP.jpg",
  userId: "",
});

console.log("banana cru", usuario.value.imagem_perfil);

const fetchUserData = async () => {
  const token = localStorage.getItem("token");

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
    usuario.value.tipo_usuario = userData.usuario.tipo_usuario_id;
    usuario.value.imagem_perfil = userData.usuario.imagem_perfil;
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      usuario.value.userId = decodedToken.userId;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  } else {
    console.log("Nenhum token encontrado no localStorage");
  }

  fetchUserData();

  setInterval(() => {
    fetchUserData();
  }, 300000);
});
</script>

<style scoped>
.header-perfil {
  background: #4f9ac4;
  padding: 20px; /* Reduzi o padding para tornar mais compacto */
  border-bottom: 1px solid #ffffff; /* Corrigi a cor da borda para branco */
}

.links-pages {
  padding-top: 20px;
  color: white;
  font-weight: bold;
  /* Adicionei negrito para melhor legibilidade */
}
.links-pages ul li {
  /* padding: 10px; */
  position: relative;
  color: white;
  font-weight: bold;
  padding-right: 25px; /* Adicionei negrito para melhor legibilidade */
}

.figure-image {
  display: flex;
  align-items: end;
  justify-content: center;
}

.image img.is-rounded {
  border-radius: 100%;
  width: 85%;
  height: 85%;
}

.logo-perfil {
  width: 80%; /* Ajustei a largura do logo para 80% do contêiner */
  height: auto;
}

.text-info .title-profile {
  color: aliceblue;
  font-size: 20px;
  position: relative;
  top: 5px;
}
.text-info .subtitle-profile {
  color: aliceblue;
  position: relative;
  top: 6px;
  font-size: small;
  border-bottom: 1px solid #ffffff;
}

@media screen and (max-width: 768px) {
  .logo-perfil img {
    display: none;
  }
}
</style>

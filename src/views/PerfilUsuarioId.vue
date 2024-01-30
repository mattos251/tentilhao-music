<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-full">
        <div class="columns is-mobile header-perfil">
          <div class="columns is-centered">
            <div class="user-card column is-half-tablet is-one-third-desktop">
              <div class="user-info is-flex">
                <div>
                  <figure class="image is-128x128 figure-image">
                    <img
                      class="profile-image is-rounded"
                      :src="usuario.imagem_perfil"
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
                      <router-link to="/feeds" class="nav-link">
                        <li>Feed</li>
                      </router-link>
                    </ul>
                  </div>
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
      </div>
      <div class="column is-full">
        <div>
          <div class="tabs is-medium is-centered">
            <ul>
              <li
                v-for="tab in tabs"
                :key="tab.name"
                :class="{ 'is-active': activeTab === tab.name }"
                @click="changeTab(tab.name)"
              >
                <a>{{ tab.label }}</a>
              </li>
            </ul>
          </div>

          <div v-show="activeTab === 'music'">
            <!-- <MusicPlaylistUsuario /> -->
            <div class="music-playlist is-flex is-justify-content-center">
              <div class="playlist-container is-flex is-justify-content-center">
                <ul class="playlist">
                  <li v-for="(composition, index) in compositions" :key="index">
                    <div
                      class="icons is-flex is-align-items-center is-justify-content-space-between"
                    >
                      <svg-icon
                        type="mdi"
                        :path="Play"
                        @click="handlePlayClick(composition)"
                      ></svg-icon>
                      <p>{{ composition.userName }}</p>
                      <p>{{ composition.titulo }}</p>
                      <a @click="enviarMensagem(numero_telefone)">
                        <svg-icon type="mdi" :path="Sendmessage"></svg-icon>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'about'" class="about-User">
            <div class="box area-about">
              <p>
                É um fato conhecido de todos que um leitor se distrairá com o conteúdo de
                texto legível de uma página quando estiver examinando sua diagramação. A
                vantagem de usar Lorem Ipsum é que ele tem uma distribuição normal de
                letras, ao contrário de "Conteúdo aqui, conteúdo aqui", fazendo com que
                ele tenha uma aparência similar a de um texto legível. Muitos softwares de
                publicação e editores de páginas na internet agora usam Lorem Ipsum como
                texto-modelo padrão, e uma rápida busca por 'lorem ipsum' mostra vários
                websites ainda em sua fase de construção. Várias versões novas surgiram ao
                longo dos anos, eventualmente por acidente, e às vezes de propósito
                (injetando humor, e coisas do gênero).
              </p>
            </div>
          </div>

          <!-- <div v-show="activeTab === 'newMusic'">
              <p>Conteúdo da aba de Novas Músicas.</p>
            </div> -->
        </div>
      </div>

      <footer class="footer is-0-desktop is-0-mobile" v-show="activeTab === 'music'">
        <div class="content">
          <PlayerMusic />
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerMusic from "@/components/PlayerMusic.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiDelete, mdiSquareEditOutline, mdiSendCircleOutline } from "@mdi/js";
import { mapActions } from "vuex";

import axios from "axios";

export default defineComponent({
  name: "PaginaPerfilID",
  components: {
    PlayerMusic,
    SvgIcon,
  },
  data() {
    return {
      activeTab: "music",
      Play: mdiPlay,
      Delete: mdiDelete,
      Editar: mdiSquareEditOutline,
      Sendmessage: mdiSendCircleOutline,
      numero_telefone: "",
      compositions: [],
      tabs: [
        { name: "music", label: "Music" },
        { name: "about", label: "Sobre" },
      ],
      usuario: {
        nome: "",
        tipo_usuario: "",
        numero_telefone: "",
      },
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = this.$route.params.userId;
      this.fetchComposicoes(userId, token);
    }

    const userId = this.$route.params.userId;

    const response = await axios.get(
      `https://tentilhao-backend.vercel.app/api/usuarios/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    this.usuario = response.data.usuario;
    this.numero_telefone = this.usuario.numero_telefone;
  },

  methods: {
    changeTab(tabName: string) {
      this.activeTab = tabName;
    },

    ...mapActions("musicPlayer", ["selectComposition"]),

    handlePlayClick(composition: never) {
      this.selectComposition(composition);
    },

    decodeToken(token: string) {
      try {
        const [header, payload] = token.split(".").slice(0, 2);
        const decodedPayload = JSON.parse(atob(payload));
        console.error("token:", decodedPayload);
        return decodedPayload.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    },

    async fetchComposicoes(userId: any, token: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://tentilhao-backend.vercel.app/api/composicoesUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        for (const composition of response.data) {
          const userResponse = await axios.get(
            `https://tentilhao-backend.vercel.app/api/usuarios/${composition.usuario_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Adicionar o nome do usuário à composição
          composition.userName = userResponse.data.usuario.nome_completo;
        }

        this.compositions = response.data;
      } catch (error) {
        console.error("Erro ao buscar composições:", error);
      }
    },

    enviarMensagem(numero_telefone: string) {
      const mensagem = "Olá, quero falar sobre a música!";
      const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numero_telefone}&text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(linkWhatsApp, "_blank");
    },
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #4f9ac4; /* Adapte a cor de fundo conforme necessário */
}

.about-User {
  display: flex;
  justify-content: center;
}
.about-User .area-about {
  width: 60%;
}

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

.playlist-container {
  border: 1px solid #f5f5f5;
  opacity: 100%;
  width: 50%;
  border-radius: 5px;
  height: 290px;
  overflow-y: overlay;
  margin-top: 20px;
}

.playlist-container .playlist {
  width: 100%;
}

.playlist .icons p {
  color: black;
}

.playlist li {
  margin-bottom: 20px;
  border-bottom: 1px solid #3636362b;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.playlist li path {
  fill: #000;
  cursor: pointer;
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

@media screen and (max-width: 768px) {
  .logo-perfil img {
    display: none;
  }

  .playlist-container {
    border: 1px solid #f5f5f5;
    opacity: 100%;
    width: 100%;
    border-radius: 5px;
    height: 290px;
    overflow-y: overlay;
    margin-top: 20px;
  }
}
</style>

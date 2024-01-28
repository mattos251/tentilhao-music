<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-full">
        <HeaderPerfil />
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
            <MusicPlaylistUsuario />
          </div>

          <div v-show="activeTab === 'perfil'" class="Perfil">
            <div class="box area-edit">
              <form @submit.prevent="registerUser">
                <div
                  class="midia-contant is-flex is-justify-content-space-between is-align-items-center"
                >
                  <figure class="image-profile is-96x96">
                    <img src="../assets/perfil.jpg" alt="User Image" />
                  </figure>

                  <div class="file is-info">
                    <label class="file-label">
                      <input
                        class="file-input"
                        type="file"
                        @change="handleImageUpload"
                        accept="image/*"
                      />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                          {{ imageFile ? imageFile.name : "Upload imagem" }}</span
                        >
                      </span>
                    </label>
                  </div>
                </div>

                <div class="field">
                  <!-- <label class="label" for="name">Nome completo</label> -->
                  <div class="control">
                    <input
                      class="input is-small"
                      type="text"
                      v-model="name"
                      :placeholder="usuario.nome_completo"
                    />
                  </div>
                </div>

                <div class="field">
                  <!-- <label class="label" for="password">Numero de contato</label> -->
                  <div class="control">
                    <input
                      class="input is-small"
                      type="tel"
                      v-model="telefone"
                      :placeholder="usuario.numero_telefone"
                    />
                  </div>
                </div>

                <div class="control">
                  <div
                    class="select is-small is-flex is-align-items-center is-justify-content-space-between mb-2"
                  >
                    <label class="label" for="Tipo-usuario"> Genero musical </label>
                    <select v-model="selectedGenre">
                      <option
                        v-for="genre in genres"
                        :key="genre.id"
                        :value="genre.genero"
                      >
                        {{ genre.genero }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="control">
                  <textarea class="textarea" placeholder="Disabled textarea">

                  É um fato conhecido de todos que um leitor se distrairá com o conteúdo de
                  texto legível de uma página quando estiver examinando sua diagramação. A
                  vantagem de usar Lorem Ipsum é que ele tem uma distribuição normal de
                  letras, ao contrário de "Conteúdo aqui, conteúdo aqui", fazendo com que
                  ele ten

                  </textarea>
                </div>

                <div class="alternative-option mt-4">
                  <div>
                    <label class="checkbox">
                      <input type="checkbox" v-model="agreeTerms" />
                      I agree to the <a href="#">terms and conditions</a>
                    </label>
                  </div>
                </div>

                <button
                  v-if="!successMessage"
                  type="submit"
                  class="button is-fullwidth-mobile cadastro-button"
                  id="registration_button"
                  @click="registerUser"
                >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>

          <div v-show="activeTab === 'newMusic'">
            <p>Conteúdo da aba de Novas Músicas.</p>
          </div>
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
import { defineComponent, ref } from "vue";
import HeaderPerfil from "../components/HeaderPerfil.vue";
import PlayerMusic from "@/components/PlayerMusic.vue";
import MusicPlaylistUsuario from "@/components/MusicPlaylistUsuario.vue";
import router from "@/router";
import axios from "axios";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/firebase";

export default defineComponent({
  name: "PaginaPerfil",
  components: {
    HeaderPerfil,
    PlayerMusic,
    MusicPlaylistUsuario,
  },
  data() {
    return {
      activeTab: "music",
      tabs: [
        { name: "music", label: "Music" },
        { name: "perfil", label: "perfil" },
      ],
      usuario: {
        nome_completo: "",
        email: "",
        tipo_usuario_id: "",
        genero_musical_id: "",
        numero_telefone: "",
        imagem_perfil: null,
        password: "",
        userId: null,
      },
      edit: true,
      name: "",
      telefone: "",
      userType: "Compositor" as "Compositor" | "Produtor", // Ajuste de tipagem
      genres: [] as { id: number; genero: string }[], // Ajuste de tipagem
      selectedGenre: "Forró romantico" as string, // Ajuste de tipagem
      agreeTerms: false,
      errorMessage: "",
      successMessage: "",
      imageUrl: ref<string | null>(null),
      imageFile: ref<File | null>(null),
    };
  },

  // computed: {
  //   isValidForm() {
  //     return (
  //       this.name !== null &&
  //       this.imageFile !== null &&
  //       this.selectedGenre !== "" &&
  //       this.agreeTerms
  //     );
  //   },
  // },

  async mounted() {
    try {
      const response = await axios.get("http://localhost:3333/api/generos");
      this.genres = response.data;
    } catch (error: any) {
      console.error("Erro ao obter generos:", error.message);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodifica o token (assumindo que seja um token JWT)
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Agora você pode acessar as informações do usuário
        this.usuario.nome_completo = decodedToken.nome_completo;
        this.usuario.tipo_usuario_id = decodedToken.tipo_usuario_id;
        this.usuario.imagem_perfil = decodedToken.imagem_perfil;
        this.usuario.genero_musical_id = decodedToken.genero_musical_id;
        this.usuario.numero_telefone = decodedToken.numero_telefone;
        this.usuario.email = decodedToken.email;
        this.usuario.password = decodedToken.senha;
        this.usuario.userId = decodedToken.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Nenhum token encontrado no localStorage");
    }
  },

  methods: {
    changeTab(tabName: string) {
      this.activeTab = tabName;
    },

    async handleImageUpload(event: { target: { files: File[] } }) {
      const file = event.target.files[0];

      if (file) {
        try {
          const imageStorageRef = storageRef(storage, `images/${file.name}`);
          await uploadBytesResumable(imageStorageRef, file);

          // Após o upload bem-sucedido, obtenha a URL da imagem
          const imageUrl = await getDownloadURL(imageStorageRef);

          // Agora, você pode armazenar a URL da imagem na variável imageUrl
          this.imageUrl = imageUrl;
          // Armazene também o arquivo, se necessário para o envio ao servidor
          this.imageFile = file;
        } catch (error) {
          console.error("Erro ao fazer upload da imagem:", error);
          // Trate erros de upload, se necessário
        }
      }
    },

    async registerUser() {
      try {
        if (this.imageFile) {
          // Faça upload apenas se houver uma nova imagem selecionada
          const imageStorageRef = storageRef(storage, `images/${this.imageFile.name}`);
          await uploadBytesResumable(imageStorageRef, this.imageFile);

          // Após o upload bem-sucedido, obtenha a URL da imagem
          const imageUrl = await getDownloadURL(imageStorageRef);

          // Agora, você pode usar a URL da imagem no corpo do pedido POST
          const userData = {
            nome_completo: this.name || this.usuario.nome_completo,
            email: "" || this.usuario.email,
            senha: "" || this.usuario.password,
            tipo_usuario_id:
              this.userType === "Compositor" ? 1 : 2 || this.usuario.tipo_usuario_id,
            genero_musical_id:
              this.genres.find((genre) => genre.genero === this.selectedGenre)?.id ||
              this.usuario.genero_musical_id,
            numero_telefone: this.telefone || this.usuario.numero_telefone,
            imagem_perfil: imageUrl, // Usando a URL da imagem
          };

          // console.log("userData", userData);

          const UserId = this.usuario.userId;
          // console.log("UserId", UserId);

          const token = localStorage.getItem("token");
          const response = await axios.put(
            `http://localhost:3333/api/usuarios/updateUser/${UserId}`,
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          location.reload();
          if (response) {
            this.successMessage = response.data.message;
            router.push("/");
            this.errorMessage = "";
          } else {
            // this.errorMessage = response.message;
            this.successMessage = "";
          }

          this.name = "";
          this.telefone = "";
          this.imageFile = null;
        } else {
          const userData = {
            nome_completo: this.name || this.usuario.nome_completo,
            email: "" || this.usuario.email,
            senha: "" || this.usuario.password,
            tipo_usuario_id:
              this.userType === "Compositor" ? 1 : 2 || this.usuario.tipo_usuario_id,
            genero_musical_id:
              this.genres.find((genre) => genre.genero === this.selectedGenre)?.id ||
              this.usuario.genero_musical_id,
            numero_telefone: this.telefone || this.usuario.numero_telefone,
            imagem_perfil: this.usuario.imagem_perfil, // Usando a URL da imagem
          };

          const UserId = this.usuario.userId;
          // console.log("UserId", UserId);

          const token = localStorage.getItem("token");
          const response = await axios.put(
            `http://localhost:3333/api/usuarios/updateUser/${UserId}`,
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          location.reload();

          if (response) {
            this.successMessage = response.data.message;
            router.push("/");
            this.errorMessage = "";
          } else {
            // this.errorMessage = response.message;
            this.successMessage = "";
          }

          this.name = "";
          this.telefone = "";
          this.imageFile = null;
          // Lógica para lidar com o caso em que nenhuma imagem foi carregada
        }
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        this.errorMessage = "Erro ao cadastrar usuário.";
        this.successMessage = "";
      }
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
  /* Adapte a cor de fundo conforme necessário */
}

.about-User {
  display: flex;
  justify-content: center;
}
.about-User .area-perfil {
  width: 60%;
}

.Perfil {
  display: flex;
  justify-content: center;
}

.image-profile img {
  width: 50px;
  border-radius: 50%;
}
.area-edit {
  min-width: 40%;
}

.is-small.input,
.is-small.textarea {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  /* border-radius: 2px; */
}
</style>

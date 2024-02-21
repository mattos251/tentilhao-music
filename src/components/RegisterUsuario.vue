<template>
  <div class="background-register mt-4">
    <div class="box-register container box">
      <form @submit.prevent="registerUser">
        <h1 class="mb-3">Cadastro</h1>
        <div class="field">
          <label class="label" for="name">Nome completo</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              v-model="name"
              placeholder="Nome completo"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control">
            <input
              class="input is-small"
              type="text"
              v-model="email"
              placeholder="email@address.com"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="password">Numero de contato</label>
          <div class="control">
            <input
              class="input is-small"
              type="tel"
              v-model="telefone"
              placeholder="Numero para contato"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="password">Password</label>
          <div class="control">
            <input
              class="input is-small"
              type="password"
              v-model="password"
              placeholder="password123"
            />
          </div>
        </div>

        <div
          class="select is-small is-flex is-align-items-center is-justify-content-space-between mb-2"
        >
          <label class="label" for="Tipo-usuario"> Tipo de usuario </label>
          <select v-model="userType">
            <option>Compositor</option>
            <option>Produtor</option>
          </select>
        </div>

        <div class="control">
          <div
            class="select is-small is-flex is-align-items-center is-justify-content-space-between mb-2"
          >
            <label class="label" for="Tipo-usuario"> Genero musical </label>
            <select v-model="selectedGenre">
              <option v-for="genre in genres" :key="genre.id" :value="genre.genero">
                {{ genre.genero }}
              </option>
            </select>
          </div>
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
        >
          Cadastrar
        </button>
      </form>

      <div v-if="errorMessage" class="notification is-danger mt-4">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="notification is-success mt-4">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import axios from "axios";
import { apiDomain } from "@/config";

export default defineComponent({
  name: "RegisterUsuario",

  data() {
    return {
      name: "",
      email: "",
      telefone: "",
      password: "",
      userType: "Compositor" as "Compositor" | "Produtor", // Ajuste de tipagem
      genres: [] as { id: number; genero: string }[], // Ajuste de tipagem
      selectedGenre: "Forró romantico" as string, // Ajuste de tipagem
      agreeTerms: false,
      errorMessage: "",
      successMessage: "",
    };
  },

  async mounted() {
    try {
      const response = await axios.get(`${apiDomain}/api/generos`);
      this.genres = response.data;
    } catch (error: any) {
      console.error("Erro ao obter generos:", error.message);
    }
  },

  methods: {
    async registerUser() {
      try {
        const userData = {
          nome_completo: this.name,
          email: this.email,
          senha: this.password,
          tipo_usuario_id: this.userType === "Compositor" ? 1 : 2,
          genero_musical_id:
            this.genres.find((genre) => genre.genero === this.selectedGenre)?.id || 0,
          numero_telefone: this.telefone,
          imagem_perfil: null,
        };

        const response = await fetch(`${apiDomain}/api/usuarios/cadastro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (response.ok) {
          this.successMessage = responseData.message;
          router.push("/");
          this.errorMessage = "";
        } else {
          this.errorMessage = responseData.message;
          this.successMessage = "";
        }

        this.name = "";
        this.email = "";
        this.telefone = "";
        this.password = "";
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
.background-register {
  background: url("../assets/back-capa.png");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-register {
  background-color: rgb(255 255 255 / 6%);
  padding: 20px;
  position: absolute;
  border-radius: 8px;
  min-width: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Sombra suave */
}
.box-register label {
  color: aliceblue;
}
.box-register h1 {
  display: flex;
  color: aliceblue;
  font-size: 30px;
  justify-content: center;
}
.notification {
  background: aliceblue;
}

.cadastro-button {
  margin-top: 10px;
  background-color: aliceblue;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
}

.cadastro-button:hover {
  background-color: #04314afd;
  color: white;
}
</style>

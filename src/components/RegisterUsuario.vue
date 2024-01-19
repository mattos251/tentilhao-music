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
              <option v-for="genre in genres" :key="genre.id" :value="genre.name">
                {{ genre.name }}
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
          class="mt-4 is-flex is-align-items-cente button is-primary"
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { app } from "@/firebase";
import { FirebaseError } from "firebase/app";

export default defineComponent({
  name: "RegisterUsuario",

  data() {
    return {
      name: "",
      email: "",
      telefone: "",
      password: "",
      userType: "Compositor",
      genres: [
        { id: 1, name: "Generos" },
        { id: 2, name: "Pop" },
        { id: 3, name: "Hip Hop" },
        { id: 4, name: "Eletrônica" },
        { id: 5, name: "Jazz" },
      ],
      selectedGenre: "Generos",
      agreeTerms: false,
      errorMessage: "",
      successMessage: "",
    };
  },

  methods: {
    async registerUser() {
      try {
        // Código existente...

        // Dados a serem enviados ao backend
        const userData = {
          nome_completo: this.name,
          email: this.email,
          senha: this.password,
          tipo_usuario_id: this.userType === "Compositor" ? 1 : 2, // Exemplo de atribuição baseada no tipo de usuário
          genero_musical_id:
            this.genres.find((genre) => genre.name === this.selectedGenre)?.id || 0, // Id do gênero musical selecionado
          numero_telefone: this.telefone,
        };

        // Enviar dados para o backend
        const response = await fetch("http://localhost:3333/api/usuarios/cadastro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const responseData = await response.json();

        if (response.ok) {
          // Sucesso
          this.successMessage = responseData.message;
          router.push("/");

          this.errorMessage = "";
        } else {
          // Erro
          this.errorMessage = responseData.message;
          this.successMessage = "";
        }

        // Limpar campos após o cadastro
        this.name = "";
        this.email = "";
        this.telefone = "";
        this.password = "";
      } catch (error) {
        // Tratar erro
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
  background-color: #04314afd;
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
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  position: absolute;
  top: 50px;
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
</style>

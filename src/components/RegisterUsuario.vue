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
        if (!this.agreeTerms) {
          this.errorMessage = "Você precisa concordar com os termos para se cadastrar.";
          return;
        }

        const auth = getAuth(app);
        const { email, password } = this;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const userData = {
          name: this.name,
          telefone: this.telefone,
          userType: this.userType,
          selectedGenre: this.selectedGenre,
        };

        // Referência ao nó "users" no Firebase Realtime Database
        const db = getDatabase(app);
        const userRef = ref(db, `users/${user.uid}`);

        // Envia os dados do usuário para o Firebase Realtime Database
        await set(userRef, userData);

        console.log("Usuário cadastrado com sucesso:", user);
        console.log("Dados do usuário enviados para o Firebase:", userData);

        this.name = "";
        this.email = "";
        this.telefone = "";
        this.password = "";

        this.successMessage = "Usuário cadastrado com sucesso!";
        this.errorMessage = "";
      } catch (error) {
        const firebaseError = error as FirebaseError;

        if (firebaseError.code === "auth/email-already-in-use") {
          this.errorMessage = "E-mail já está em uso.";
        } else {
          this.errorMessage = "Erro ao cadastrar usuário: " + firebaseError.message;
        }

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

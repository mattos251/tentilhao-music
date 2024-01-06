<template>
  <div class="background-register">
    <div class="box-register container box">
      <form @submit.prevent="EnvioLogin">
        <h1 class="mb-3">Login</h1>

        <div class="field">
          <label class="label" for="email">Email address</label>
          <div class="control">
            <input
              required
              class="input"
              type="email"
              v-model="email"
              name="email"
              placeholder="email@address.com"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="password">Password</label>
          <div class="control">
            <input
              required
              class="input"
              v-model="password"
              type="password"
              name="password"
              placeholder="password123"
            />
          </div>
        </div>

        <button
          type="submit"
          class="mt-4 is-flex is-align-items-cente button is-primary"
          id="Login_button"
        >
          Entrar
        </button>
        <div class="notification is-warning mt-5 is-hidden" role="alert">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          <button type="button" class="delete" aria-label="Close"></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { getAuth, signInWithEmailAndPassword, Auth } from "firebase/auth";
import { defineComponent } from "vue";
import { app } from "@/firebase"; // Certifique-se de importar o objeto app
import router from "@/router";

export default defineComponent({
  name: "LoginUsuario",
  data() {
    return {
      email: "",
      password: "",
      error: null as string | null,
    };
  },
  methods: {
    async EnvioLogin() {
      try {
        // Obtenha o objeto Auth chamando o método getAuth() diretamente no Firebase
        const auth: Auth = getAuth(app);
        const { email, password } = this;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuário autenticado com sucesso:", userCredential.user);

        this.$router.push({ name: "PageCadastroUsuario" });

        router.push("/homepage");
      } catch (error: any) {
        // Lidar com erros de autenticação
        console.error("Erro de autenticação:", error.message);
        this.error = error.message as string;
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
  position: fixed;
  border-radius: 8px;
  width: 30%;
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

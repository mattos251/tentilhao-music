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
import { defineComponent, ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginUsuario",

  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref<string | null>(null);
    const store = useStore();

    const EnvioLogin = async () => {
      console.log("Requisição de login recebida:", {
        email: email.value,
        senha: password.value,
      });
      try {
        const { email: userEmail, password: userPassword } = {
          email: email.value,
          password: password.value,
        };

        const response = await axios.post(
          "http://localhost:3333/api/login",
          {
            email: userEmail,
            password: userPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              body: JSON.stringify({ email, password }),
            },
          }
        );

        if (response.data.token) {
          const token = response.data.token;
          console.log("token", token);

          // const user = response.data.user;

          // store.dispatch("loginUser", { token, user });

          localStorage.setItem("token", token);

          // localStorage.setItem("user", JSON.stringify(user));

          router.push("/homepage");
        } else {
          console.error("Erro de autenticação:", response.data.message);
          error.value = response.data.message;
        }
      } catch (error: any) {
        console.error("Erro de autenticação:", error.message);
        error.value = error.message as string;
      }
    };

    return {
      email,
      password,
      error,
      EnvioLogin,
    };
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

<template>
  <div class="background-register">
    <div class="box-register container">
      <form @submit.prevent="EnvioLogin">
        <h1 class="heading">Login</h1>

        <div class="field">
          <label class="label" for="email">Email address</label>
          <input
            required
            class="input"
            type="email"
            v-model="email"
            name="email"
            placeholder="Email@address.com"
          />
        </div>

        <div class="field">
          <label class="label" for="password">Password</label>
          <input
            required
            class="input"
            v-model="password"
            type="password"
            name="password"
            placeholder="Password123"
          />
        </div>

        <p class="mt-3">
          Don't have an account?
          <router-link to="/registro" class="create-account-link">
            Create an account here
          </router-link>
        </p>

        <button
          type="submit"
          class="button is-fullwidth-mobile login-button"
          id="Login_button"
        >
          Sign In
        </button>

        <div class="notification is-warning mt-5" v-if="loginError">
          {{ loginError }}
          <button
            @click="resetError"
            type="button"
            class="delete"
            aria-label="Close"
          ></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import router from "@/router";
import { apiDomain } from "@/config";
// import { useStore } from "vuex";

export default defineComponent({
  name: "LoginUsuario",

  setup() {
    const email = ref("");
    const password = ref("");
    const loginError = ref<string | null>(null);

    const EnvioLogin = async () => {
      try {
        const response = await axios.post(`${apiDomain}/api/login`, {
          email: email.value,
          password: password.value,
        });

        if (response.data.token) {
          const token = response.data.token;
          console.log("token", token);
          localStorage.setItem("token", token);
          router.push("/homepage");
        } else {
          console.error("Erro de autenticação:", response.data.message);
          loginError.value = response.data.message;
        }
      } catch (error: any) {
        console.error("Erro de autenticação:", error.message);
        loginError.value = "Erro ao processar a solicitação. Tente novamente mais tarde.";
      }
    };

    const resetError = () => {
      loginError.value = null;
    };

    return {
      email,
      password,
      loginError,
      EnvioLogin,
      resetError,
    };
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
  position: fixed;
  border-radius: 8px;
  width: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.box-register label,
.box-register p,
.box-register h1 {
  color: aliceblue;
}

.heading {
  display: flex;
  font-size: 30px;
  justify-content: center;
}

.create-account-link {
  color: #a2b8ca94;
  font-size: small;
  text-decoration: underline;
}

.login-button {
  margin-top: 10px;
  background-color: aliceblue;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
}

.login-button:hover {
  background-color: #04314afd;
  color: white;
}

@media screen and (max-width: 768px) {
  .box-register[data-v-0e286d35] {
    background-color: rgb(255 255 255 / 6%);
    padding: 20px;
    position: fixed;
    border-radius: 8px;
    width: 80%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .box-register {
    background-color: rgb(255 255 255 / 6%);
    padding: 20px;
    position: fixed;
    border-radius: 8px;
    width: 75%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>

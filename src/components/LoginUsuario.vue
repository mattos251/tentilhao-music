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
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserCredential } from "firebase/auth";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import router from "@/router";

export default defineComponent({
  name: "LoginUsuario",

  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref<string | null>(null);

    const store = useStore();
    const user = computed(() => store.getters.getUser);

    const EnvioLogin = async () => {
      try {
        const auth = getAuth();
        const { email: userEmail, password: userPassword } = {
          email: email.value,
          password: password.value,
        };

        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );

        // Aguarde a atualização do estado do usuário antes de acessar o banco de dados
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Ajuste o tempo conforme necessário

        // Atualiza o estado do usuário no Vuex
        store.commit("setUser", userCredential.user);
        console.log("Usuário autenticado com sucesso:", userCredential.user);

        // Agora, você pode acessar o Realtime Database
        if (userCredential.user) {
          const db = getDatabase();
          const userRef = dbRef(db, `users/${userCredential.user.uid}`);
          const userSnapshot = await get(userRef);
          const userData = userSnapshot.val();
          console.log("Dados do usuário do Realtime Database:", userData);
        } else {
          console.error("Usuário não encontrado após autenticação.");
        }

        router.push("/homepage");
      } catch (error: any) {
        // Lidar com erros de autenticação
        console.error("Erro de autenticação:", error.message);
        error.value = error.message as string;
      }
    };

    // Assista a mudanças no usuário para fins de depuração
    watch(user, (newUser) => {
      console.log("Usuário atualizado no Vuex:", newUser);
    });

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

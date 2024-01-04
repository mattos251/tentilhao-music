<template>
  <div class="background-register mt-4">
    <div class="box-register container box">
      <form @submit.prevent="login">
        <h1 class="mb-3">Cadastro</h1>
        <div class="field">
          <label class="label" for="name">Nome completo</label>
          <div class="control">
            <input class="input is-small" type="text" name="name" placeholder="Nome completo" />
          </div>
        </div>

        <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control ">
            <input
              class="input is-small"
              type="text"
              name="email"
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
              name="telefone"
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
              name="password"
              placeholder="password123"
            />
          </div>
        </div>

        <div class="select is-small is-flex is-align-items-center is-justify-content-space-between mb-2">
          <label class="label" for="Tipo-usuario"> Tipo de usuario </label>
          <select>
            <option>Compositor</option>
            <option>Produtor</option>
          </select>
        </div>

        <div class="control">
          <div class="select is-small is-flex is-align-items-center is-justify-content-space-between mb-2">
            <label class="label" for="Tipo-usuario"> Genero musical </label>
            <select :v-model="selectedGenre">
              <option v-for="genre in genres" :key="genre.id" :value="genre.name">
                {{ genre.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="alternative-option mt-4">
          <div>
            <label class="checkbox">
              <input type="checkbox" />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="mt-4 is-flex is-align-items-cente button is-primary"
          id="registration_button"
          
        >
          <RouterLink to="/Login">Cadastrar</RouterLink>
          
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// import { mdiGeneratorStationary } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegisterUsuario",

  data() {
    return {
      genres: [
        { id: 1, name: 'Generos' },
        { id: 2, name: 'Pop' },
        { id: 3, name: 'Hip Hop' },
        { id: 4, name: 'Eletrônica' },
        { id: 5, name: 'Jazz' },
      ],
      selectedGenre: 1,
    };
  },

  methods: {
    login() {
      // Implement your login logic here
    },
    moveToRegister() {
      // Implement your navigation logic to registration page here
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

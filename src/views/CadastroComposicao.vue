<template>
  <div class="container form">
    <div class="content">
      <h1>Cadastre sua composição</h1>
      <div class="form-page">
        <h6>Faça upload do audio</h6>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label"> Primary file… </span>
            </span>
          </label>
        </div>
      </div>

      <div class="form-page">
        <h6>Faça upload da imagem</h6>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label"> Primary file… </span>
            </span>
          </label>
        </div>
      </div>

      <div class="is-flex is-justify-content-center m-2">
        <h6>Titulo da composição</h6>
        <input class="input" type="text" placeholder="Titulo" />
      </div>

      <div class="form-page">
        <h6>Genero musical</h6>
        <div class="select">
          <select :v-model="selectedGenre">
            <option v-for="genre in genres" :key="genre.id" :value="genre.name">
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <textarea class="text-area" placeholder="e.g. Hello world"></textarea>
        <label class="checkbox">
          <input type="checkbox" />
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>

      <div class="is-flex is is-justify-content-center">
        <router-link to="/perfil">
          <button class="button is-fullwidth is-responsive envio-formulario">
            Envia
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CadastroComposicao",
  data() {
    return {
      genres: [
        { id: 1, name: "Generos" },
        { id: 2, name: "Pop" },
        { id: 3, name: "Hip Hop" },
        { id: 4, name: "Eletrônica" },
        { id: 5, name: "Jazz" },
      ],
      selectedGenre: 1,
    };
  },
});
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 10px;
  padding: 10px;
  width: 50%;
  background: #81c6eb;
  border-radius: 20px;
}
.content h1 {
  display: flex;
  justify-content: center;
  color: white;
}
.content h6 {
  color: white;
}

.form-page {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
}

.text-area {
  max-width: 100%;
  width: 100%;
  border-radius: 5px;
  height: 80px;
  /* background: #deedf5; */
  border: 1px solid white;
}
.envio-formulario {
  margin-top: 10px;
  background: #003857;
  color: white;
}

.file-cta {
  background-color: white;
  color: #003857;
  width: 200px;
}
select {
  background-color: white;
  color: #003857;
  width: 200px;
}
</style>

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
          <select>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
      </div>

      <div>
        <textarea class="text-area" placeholder="e.g. Hello world"></textarea>
        <label class="checkbox">
          <input type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>

      <div>
        <router-link to="/"> 
          <button class="button is-responsive envio-formulario">
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
  width: 40%;
  background: #81c6eb;
  border-radius: 20px;
}
.content h1 {
  display: flex;
  justify-content: center;
  color: white;
}
.content h6{
  color: white;
}

.form-page {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.input,
.textarea {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 70%;
}

.file-input{
    width:90%;
}

.envio-formulario{
  width: 80%;
  margin-top:10px;
  background: #003857;
  color: white;
  display: flex;
}
</style>

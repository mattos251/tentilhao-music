<template>
  <div class="are-cadastro">
    <div class="content">
      <h1>Cadastre sua composição</h1>
      <div class="form-page">
        <h6>Faça upload do áudio</h6>
        <div class="file">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              @change="handleAudioUpload"
              accept="audio/*"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-file-audio"></i>
              </span>
              <span class="file-label">{{
                audioFile ? audioFile.name : "Selecione um arquivo de áudio"
              }}</span>
            </span>
          </label>
        </div>
      </div>

      <div class="form-page">
        <h6>upload da imagem</h6>
        <div class="file">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              @change="handleImageUpload"
              accept="image/*"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-file-image"></i>
              </span>
              <span class="file-label">{{
                imageFile ? imageFile.name : "Selecione um arquivo de imagem"
              }}</span>
            </span>
          </label>
        </div>
      </div>

      <div class="form-page">
        <h6>Título da composição</h6>
        <input
          class="input"
          v-model="compositionTitle"
          type="text"
          placeholder="Título"
        />
      </div>

      <div class="form-page">
        <h6>Gênero musical</h6>
        <div class="select">
          <select v-model="selectedGenre">
            <option value="" disabled>Selecione um gênero</option>

            <!-- Opções dinâmicas baseadas no loop -->
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.genero }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <textarea
          class="text-area"
          v-model="compositionDescription"
          placeholder="Texto da musica"
        ></textarea>
        <!-- <label class="checkbox">
        <input v-model="agreeTerms" type="checkbox" />
        Concordo com os <a href="#">termos e condições</a>
      </label> -->
      </div>

      <div class="is-flex is-justify-content-center">
        <button
          v-if="!loading"
          @click="submitComposition"
          class="button is-fullwidth is-responsive envio-formulario"
          :disabled="!isValidForm"
        >
          Enviar
        </button>
      </div>

      <!-- <a  class="button is-loading">Loading</a> -->
      <div v-if="loading">
        <progress class="progress is-large is-info" max="100"></progress>
        <h6 class="is-flex is-justify-content-center">Realizando cadastro...</h6>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { storage } from "../firebase";

const selectedGenre = ref();
const audioFile = ref<File | null>(null);
const imageFile = ref<File | null>(null);
const compositionTitle = ref("");
const compositionDescription = ref("");
// const agreeTerms = ref(false);
const usuaID = ref("");
const genres = ref([]);
const loading = ref(false);

const router = useRouter();

const handleAudioUpload = (event: { target: { files: File[] } }) => {
  audioFile.value = event.target.files[0];
};

const handleImageUpload = (event: { target: { files: File[] } }) => {
  imageFile.value = event.target.files[0];
};

const isValidForm = computed(() => {
  console.log("Selected genre", selectedGenre.value);
  return (
    audioFile.value !== null &&
    imageFile.value !== null &&
    compositionTitle.value.trim() !== "" &&
    selectedGenre.value !== "" &&
    selectedGenre.value !== undefined
  );
});

const submitComposition = async () => {
  try {
    loading.value = true;

    const audioStorageRef = storageRef(storage, `audio/${audioFile.value.name}`);
    const imageStorageRef = storageRef(storage, `images/${imageFile.value.name}`);

    console.log({
      audioStorageRef,
      imageStorageRef,
    });

    const [audioUploadTask, imageUploadTask] = await Promise.all([
      uploadBytesResumable(audioStorageRef, audioFile.value),
      uploadBytesResumable(imageStorageRef, imageFile.value),
    ]);

    const [audioUrl, imageUrl] = await Promise.all([
      getDownloadURL(audioStorageRef),
      getDownloadURL(imageStorageRef),
    ]);

    const token1 = localStorage.getItem("token");

    if (token1) {
      try {
        const decodedToken = JSON.parse(atob(token1.split(".")[1]));
        usuaID.value = decodedToken.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Nenhum token encontrado no localStorage");
    }

    const compositionData = {
      usuarioId: usuaID.value,
      imagem_capa: imageUrl,
      audio: audioUrl,
      title: compositionTitle.value,
      genero_musical_id: selectedGenre.value,
      texto: compositionDescription.value,
    };

    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3333/api/cadastro/ComposicaoUser",
      compositionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    loading.value = false;
    router.push({ path: "/perfil" });
  } catch (error) {
    console.error("Erro durante o upload:", error.message);
  }
};

onMounted(async () => {
  try {
    const [genresResponse] = await Promise.all([
      axios.get("http://localhost:3333/api/generos"),
    ]);
    genres.value = genresResponse.data;
  } catch (error: any) {
    console.error("Erro ao obter generos:", error.message);
  }
});
</script>

<style scoped>
.button.is-loading {
  width: 100%;
  color: #ededed00 !important;
  pointer-events: none;
  background: #00223e;
}
.are-cadastro {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 90vh;
}

.content {
  margin-top: 40px;
  padding: 32px;
  min-width: 40px;
  background: #013a59;
  position: relative;
  align-self: center;
  width: 100%;
  height: 600px;
  max-width: 570px;
  backdrop-filter: blur(4px);
  border-radius: 18px;
}

.content h1 {
  display: flex;
  justify-content: center;
  color: white;
}
.content h6 {
  color: white;
}
h6 {
  color: white;
}

.form-page {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.input,
.textarea {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  width: 200px;
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
  background: #036faa;
  color: white;
}
.content-align {
  display: flex;
  align-items: center;
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

@media screen and (max-width: 768px) {
  /* Apply styles for screens larger than 768px width */
  .are-cadastro {
    display: flex;
    justify-content: center;
  }

  .content {
    padding: 10px;
    top: 0;
    width: 90%;
    background: #013a59;
    border-radius: 30px;
    height: 500px;
  }

  .file {
    align-items: stretch;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .input,
  .textarea {
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
    max-width: 100%;
    width: 200px;
  }

  .form-page {
    padding: 10px;
    width: 100%;
  }

  .content h1 {
    font-size: 16px;
    margin-bottom: 0.5em;
  }
}
</style>

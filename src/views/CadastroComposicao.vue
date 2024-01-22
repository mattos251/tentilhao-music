<template>
  <div class="container form">
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
        <h6>Faça upload da imagem</h6>
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

      <div class="is-flex is-justify-content-center m-2">
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
          placeholder="e.g. Hello world"
        ></textarea>
        <label class="checkbox">
          <input v-model="agreeTerms" type="checkbox" />
          Concordo com os <a href="#">termos e condições</a>
        </label>
      </div>

      <div class="is-flex is-justify-content-center">
        <button
          @click="submitComposition"
          class="button is-fullwidth is-responsive envio-formulario"
          :disabled="!isValidForm"
        >
          Enviar
        </button>
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

const selectedGenre = ref(1);
const audioFile = ref<File | null>(null);
const imageFile = ref<File | null>(null);
const compositionTitle = ref("");
const compositionDescription = ref("");
const agreeTerms = ref(false);
const usuaID = ref("");
const genres = ref([]);

const router = useRouter();

const handleAudioUpload = (event: { target: { files: File[] } }) => {
  audioFile.value = event.target.files[0];
};

const handleImageUpload = (event: { target: { files: File[] } }) => {
  imageFile.value = event.target.files[0];
};

const isValidForm = computed(() => {
  return (
    audioFile.value !== null &&
    imageFile.value !== null &&
    compositionTitle.value.trim() !== "" &&
    selectedGenre.value !== 1 &&
    agreeTerms.value
  );
});

const submitComposition = async () => {
  try {
    // Fazer upload do áudio
    const audioStorageRef = storageRef(storage, `audio/${audioFile.value.name}`);
    const audioUploadTask = uploadBytesResumable(audioStorageRef, audioFile.value);

    // Fazer upload da imagem
    const imageStorageRef = storageRef(storage, `images/${imageFile.value.name}`);
    const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile.value);

    // Aguardar a conclusão de ambos os uploads
    await Promise.all([audioUploadTask, imageUploadTask]);

    // Agora você pode acessar as URLs de download dos arquivos se necessário
    const audioUrl = await getDownloadURL(audioStorageRef);

    const imageUrl = await getDownloadURL(imageStorageRef);

    // Aqui você pode realizar qualquer lógica adicional, como enviar os URLs para o seu backend
    // console.log("Áudio URL:", audioDownloadURL);
    // console.log("Imagem URL:", imageDownloadURL);
    const token1 = localStorage.getItem("token");

    if (token1) {
      try {
        // Decodifica o token (assumindo que seja um token JWT)
        const decodedToken = JSON.parse(atob(token1.split(".")[1]));

        // Agora você pode acessar as informações do usuário
        usuaID.value = decodedToken.userId;
        console.log("pao com ovo", usuaID.value);
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

    console.log(compositionData);

    const token = localStorage.getItem("token");
    axios.post("http://localhost:3333/api/cadastro/ComposicaoUser", compositionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    router.push({ path: "/perfil" });
    // Continuar com a lógica do seu aplicativo (por exemplo, enviar dados para o backend)
  } catch (error) {
    console.error("Erro durante o upload:", error.message);
    // Lógica de tratamento de erro, se necessário
  }
};

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3333/api/generos");
    genres.value = response.data;
    console.log("generos", genres.value);
  } catch (error: any) {
    console.error("Erro ao obter generos:", error.message);
  }
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

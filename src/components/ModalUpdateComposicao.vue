<template>
  <div class="container form">
    <div class="content">
      <h1>Atualize sua composição</h1>
      <!-- <div class="form-page">
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
      </div> -->

      <!-- <div class="form-page">
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
      </div> -->

      <div class="is-flex is-justify-content-center m-2">
        <h6>Título da composição</h6>
        <input
          class="input"
          type="text"
          placeholder="Título"
          v-model="localCompositionData.compositionData.titulo"
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
          placeholder="e.g. Hello world"
          v-model="localCompositionData.compositionData.texto"
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
        <button
          @click="fecharModal"
          class="button is-fullwidth is-responsive button-cancel"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { storage } from "../firebase";

const selectedGenre = ref(1);
// const audioFile = ref<File | null>(null);
// const imageFile = ref<File | null>(null);
const compositionTitle = ref("");
const compositionDescription = ref("");
const agreeTerms = ref(false);
const usuaID = ref("");
const genres = ref([]);

const compositionData = defineProps(["compositionData"]);
const localCompositionData = ref({ ...compositionData });

console.log("localCompositionData", localCompositionData);

onMounted(() => {
  console.log("brawnie", localCompositionData.value.compositionData);
  // Inicialize localCompositionData aqui se necessário
});

const router = useRouter();

const emit = defineEmits(["fecharModal"]);

const fecharModal = () => {
  // Emitir um evento chamado 'fecharModal' para indicar que o modal deve ser fechado
  emit("fecharModal");
};

// const handleAudioUpload = (event: { target: { files: File[] } }) => {
//   audioFile.value = event.target.files[0];
//   console.log("handleAudioUpload", handleAudioUpload);
// };

// const handleImageUpload = (event: { target: { files: File[] } }) => {
//   imageFile.value = event.target.files[0];
// };

const isValidForm = computed(() => {
  const isValid =
    (compositionTitle.value.trim() !== "" ||
      (localCompositionData.value &&
        localCompositionData.value.compositionData.titulo.trim() !== "")) &&
    (selectedGenre.value !== 1 ||
      (localCompositionData.value &&
        localCompositionData.value.compositionData.genero_musical_id !== 1)) &&
    agreeTerms.value;

  return isValid;
});

console.log("isValidForm:", isValidForm);

const submitComposition = async () => {
  try {
    const token1 = localStorage.getItem("token");

    if (token1) {
      try {
        // Decodifica o token (assumindo que seja um token JWT)
        const decodedToken = JSON.parse(atob(token1.split(".")[1]));

        usuaID.value = decodedToken.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Nenhum token encontrado no localStorage");
    }

    const compositionData = {
      usuario_id: localCompositionData.value.compositionData.usuario_id,
      imagem_capa: localCompositionData.value.compositionData.imagem_capa,
      audio: localCompositionData.value.compositionData.audio,
      titulo: compositionTitle.value || localCompositionData.value.compositionData.titulo,
      genero_musical_id:
        selectedGenre.value ||
        localCompositionData.value.compositionData.genero_musical_id,
      texto:
        compositionDescription.value || localCompositionData.value.compositionData.texto,
    };

    console.log("compositionData", compositionData);

    const token = localStorage.getItem("token");
    const compositionId = localCompositionData.value.compositionData.id; // Substitua "id" pelo nome correto do campo que armazena o ID da composição

    // Fazendo um pedido PUT
    await axios.put(
      `http://localhost:3333/api/atualizar/Composicao/${compositionId}`,
      compositionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    emit("fecharModal");

    // router.push({ path: "/perfil" });
  } catch (error) {
    console.error("Erro durante o upload:", error.message);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3333/api/generos");
    genres.value = response.data;
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

.button-cancel {
  margin-top: 10px;
  /* background: #003857; */
  color: black;
}
</style>

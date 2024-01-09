<template>
  <div class="container form">
    <div class="content">
      <h1>Cadastre sua composição</h1>
      <div class="form-page">
        <h6>Faça upload do áudio</h6>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" @change="handleAudioUpload" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">{{
                audioFile ? audioFile.name : "Selecione o arquivo"
              }}</span>
            </span>
          </label>
        </div>
      </div>

      <div class="form-page">
        <h6>Faça upload da imagem</h6>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" @change="handleImageUpload" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">{{
                imageFile ? imageFile.name : "Selecione o arquivo"
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
              {{ genre.name }}
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
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const genres = [
  { id: 1, name: "Gêneros" },
  { id: 2, name: "Pop" },
  { id: 3, name: "Hip Hop" },
  { id: 4, name: "Eletrônica" },
  { id: 5, name: "Jazz" },
];

const selectedGenre = ref(1);
const audioFile = ref<File | null>(null);
const imageFile = ref<File | null>(null);
const compositionTitle = ref("");
const compositionDescription = ref("");
const agreeTerms = ref(false);

const router = useRouter();

const handleAudioUpload = (event: { target: { files: File[] } }) => {
  audioFile.value = event.target.files[0];
};

const handleImageUpload = (event: { target: { files: File[] } }) => {
  imageFile.value = event.target.files[0];
};

const submitComposition = async () => {
  try {
    const storage = getStorage();
    const db = getFirestore();

    const audioRef = storageRef(storage, `audio/${audioFile.value?.name}`);
    await uploadBytes(audioRef, audioFile.value!);

    const imageRef = storageRef(storage, `images/${imageFile.value?.name}`);
    await uploadBytes(imageRef, imageFile.value!);

    const audioUrl = await getDownloadURL(audioRef);
    const imageUrl = await getDownloadURL(imageRef);

    // Save composition data to Firestore
    const compositionData = {
      genreId: selectedGenre.value,
      title: compositionTitle.value,
      description: compositionDescription.value,
      audioUrl,
      imageUrl,
      agreeTerms: agreeTerms.value,
    };

    const docRef = await addDoc(collection(db, "compositions"), compositionData);

    console.log("Composition added with ID: ", docRef.id);
    console.log("compositionData: ", compositionData);

    router.push({ path: "/perfil" });
  } catch (error) {
    console.error("Error uploading files or saving composition:", error);
  }
};
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

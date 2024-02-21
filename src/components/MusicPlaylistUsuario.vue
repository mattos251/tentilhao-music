<template>
  <div class="music-playlist is-flex is-justify-content-center">
    <div class="playlist-container is-flex is-justify-content-center p-4">
      <ul class="playlist">
        <li
          v-for="(composition, index) in compositions"
          :key="index"
          class="composition-item"
        >
          <div class="img_capa">
            <img :src="composition.imagem_capa" alt="" />
          </div>

          <div class="icons">
            <svg-icon
              type="mdi"
              :path="Play"
              @click="handlePlayClick(composition)"
            ></svg-icon>
          </div>

          <p class="info userName">{{ composition.userName }}</p>
          <p class="info titulo">{{ composition.titulo }}</p>

          <div class="actions">
            <svg-icon
              type="mdi"
              :path="Delete"
              @click="openModal('del', composition.id)"
            ></svg-icon>
            <svg-icon
              type="mdi"
              :path="Editar"
              @click="showModalUpdateClick(composition)"
            ></svg-icon>
          </div>

          <ModalUpdateComposicao
            class="modal"
            v-if="showModalUpdate"
            :compositionData="compositionToUpdate"
            @fecharModal="fecharModalUpdate"
          />
        </li>
      </ul>
    </div>

    <div class="modal" :class="{ 'is-active': showModalDelete }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close" @click="openModal('del')"></button>
        </header>
        <section class="modal-card-body">
          Tem certeza que deseja remover esta música?
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button class="button is-danger" @click="removeMusic(compositionToDeleteId)">
            Remover musica
          </button>
          <button class="button" @click="openModal('del')">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiDelete, mdiSquareEditOutline } from "@mdi/js";
import axios from "axios";
import { mapActions } from "vuex";
import ModalUpdateComposicao from "./ModalUpdateComposicao.vue";
import { apiDomain } from "@/config";

export default defineComponent({
  name: "MusicPlaylistFeed",
  components: { SvgIcon, ModalUpdateComposicao },
  data() {
    return {
      key: 0,
      Play: mdiPlay,
      Delete: mdiDelete,
      Editar: mdiSquareEditOutline,
      compositions: [] as any[],
      compositionToUpdate: null as any | null,
      showModalDelete: false,
      showModalUpdate: false,
      compositionToDeleteId: null as number | null,
    };
  },
  // watch: {
  //   compositions(newCompositions) {
  //     console.log("compositions foi atualizado:", newCompositions);
  //   },
  // },
  mounted() {
    this.showModalUpdate = false;

    const token = localStorage.getItem("token");
    if (token) {
      const usuarioId = this.decodeToken(token);
      this.fetchComposicoes(usuarioId, token);
    }
  },

  methods: {
    showModalUpdateClick(composition: any) {
      this.compositionToUpdate = composition;
      this.showModalUpdate = true;
    },

    fecharModalUpdate() {
      this.showModalUpdate = false;
    },
    openModal(modalType: string, compositionId: number) {
      if (modalType === "del") {
        this.showModalDelete = !this.showModalDelete;
        this.compositionToDeleteId = compositionId;
      } else if (modalType === "put") {
        this.compositionToUpdate = this.compositions.find(
          (composition) => composition.id === compositionId
        );
        this.showModalUpdate = true;
      }
    },

    async removeMusic(compositionId: number | null) {
      try {
        if (compositionId !== null) {
          const token = localStorage.getItem("token");

          const response = await axios.delete(
            `${apiDomain}/api/deletar/Composicao/${compositionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.reload();

          this.openModal("del", compositionId);
        }
      } catch (error) {
        console.error("Erro ao remover a música:", error);
      }
    },

    ...mapActions("musicPlayer", ["selectComposition"]),

    handlePlayClick(composition: any) {
      this.selectComposition(composition);
    },

    decodeToken(token: string) {
      try {
        const [header, payload] = token.split(".").slice(0, 2);
        const decodedPayload = JSON.parse(atob(payload));
        console.error("token:", decodedPayload);
        return decodedPayload.userId;
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    },

    async fetchComposicoes(userId: number, token: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiDomain}/api/composicoesUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        for (const composition of response.data) {
          const userResponse = await axios.get(
            `${apiDomain}/api/usuario/${composition.usuario_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          composition.userName = userResponse.data.usuario.nome_completo;
        }

        this.compositions = response.data;
      } catch (error) {
        console.error("Erro ao buscar composições:", error);
      }
    },
  },
});
</script>

<style>
.playlist-container {
  border: 1px solid #f5f5f5;
  opacity: 100%;
  width: 50%;
  border-radius: 5px;
  height: 290px;
  overflow-y: overlay;
  margin-top: 20px;
}

.playlist-container .playlist {
  width: 100%;
}

.playlist .icons p {
  color: black;
}

.playlist li path {
  fill: #000;
  cursor: pointer;
}

.img_capa {
  display: flex;
  align-items: center;
  width: 25px;
  height: auto;
}

.playlist .icons {
  cursor: pointer;
}

.playlist li {
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #3636362b;
  border-radius: 5px;
  cursor: pointer;
}

.composition-item {
  display: grid;
  grid-template-columns: 0fr 0fr 1fr 1fr 0fr;
  align-items: center;
}

.img_capa img {
  max-width: 100%;
  height: auto;
}

.icons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .playlist-container {
    border: 1px solid #f5f5f5;
    opacity: 100%;
    width: 100%;
    border-radius: 5px;
    height: 290px;
    overflow-y: overlay;
    margin-top: 20px;
  }
}
</style>

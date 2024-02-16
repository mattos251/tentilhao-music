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
import { defineComponent, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiDelete, mdiSquareEditOutline } from "@mdi/js";
import axios from "axios";
import { mapActions } from "vuex";
import ModalUpdateComposicao from "./ModalUpdateComposicao.vue";

export default defineComponent({
  name: "MusicPlaylistFeed",
  components: { SvgIcon, ModalUpdateComposicao },
  data() {
    return {
      key: 0,
      Play: mdiPlay,
      Delete: mdiDelete,
      Editar: mdiSquareEditOutline,
      compositions: [] as any[], // Defina o tipo apropriado para as composições
      compositionToUpdate: null as any | null, // Defina o tipo apropriado para a composição a ser atualizada
      showModalDelete: false,
      showModalUpdate: false,
      compositionToDeleteId: null as number | null,
    };
  },
  watch: {
    compositions(newCompositions) {
      console.log("compositions foi atualizado:", newCompositions);
      // Você pode adicionar ações adicionais aqui se necessário
    },
  },
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
      console.log("banana", this.compositionToUpdate);
      this.showModalUpdate = true;
    },

    fecharModalUpdate() {
      // Fechar o modal de atualização
      this.showModalUpdate = false;
    },
    openModal(modalType: string, compositionId: number) {
      if (modalType === "del") {
        this.showModalDelete = !this.showModalDelete;
        this.compositionToDeleteId = compositionId;
      } else if (modalType === "put") {
        // Busque a composição a ser editada
        this.compositionToUpdate = this.compositions.find(
          (composition) => composition.id === compositionId
        );
        this.showModalUpdate = true;
      }
      // Adicione a lógica para outros tipos de modal, se necessário
    },

    async removeMusic(compositionId: number | null) {
      try {
        if (compositionId !== null) {
          // Lógica para remover a música usando o ID
          console.log("Removendo música com o ID:", compositionId);
          const token = localStorage.getItem("token");

          const response = await axios.delete(
            `http://localhost:3333/api/deletar/Composicao/${compositionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.location.reload();

          this.openModal("del", compositionId);

          // Incrementar a chave para forçar o remontagem do component

          console.log("Música removida com sucesso!", response);
        }
      } catch (error) {
        console.error("Erro ao remover a música:", error);
      }
    },

    ...mapActions("musicPlayer", ["selectComposition"]),

    handlePlayClick(composition: any) {
      this.selectComposition(composition); // Chame a ação para selecionar a composição
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

    async fetchComposicoes(userId: any, token: string) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3333/api/composicoesUser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        for (const composition of response.data) {
          const userResponse = await axios.get(
            `http://localhost:3333/api/usuarios/${composition.usuario_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Adicionar o nome do usuário à composição
          composition.userName = userResponse.data.usuario.nome_completo;
        }

        this.compositions = response.data;
        console.log(this.compositions);
      } catch (error) {
        console.error("Erro ao buscar composições:", error);
      }
    },

    // closeModal() {
    //   this.isModalOpen = false;
    // },
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
  grid-template-columns: 0fr 0.5fr 1fr 1fr 0fr;
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
</style>

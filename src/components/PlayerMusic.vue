<template>
  <div class="player-footer">
    <div class="container music-player">
      <img
        :src="`${currentComposition?.imagem_capa || profilee}`"
        alt="Album Cover"
        class="album-cover"
        loading="lazy"
      />

      <div class="track-info">
        <p class="title is-5">
          {{ currentComposition?.titulo || "Titulo" }}
        </p>
        <p class="subtitle is-6">
          {{ currentComposition?.userName || "Nome do Artista" }}
        </p>
      </div>

      <div class="controls">
        <!-- <svg-icon
          class="control-icon"
          type="mdi"
          :path="Left"
          @click="handlePrevious"
        ></svg-icon> -->
        <svg-icon
          class="control-icon"
          type="mdi"
          :path="isPlaying ? Pausa : Play"
          @click="handlePlayPause"
        ></svg-icon>
        <!-- <svg-icon
          class="control-icon"
          type="mdi"
          :path="Right"
          @click="handleNext"
        ></svg-icon> -->
      </div>

      <div class="time">
        <span class="current-time">{{ currentTime }}</span>
        <div class="progress-bar">
          <input
            type="range"
            class="seek-bar"
            id="seek"
            min="0"
            :max="seekbar.max"
            v-model="seekbar.value"
            @input="handleSeek"
          />
          <!-- <div
            class="bar-fill"
            :style="{ width: (seekbar.value / seekbar.max) * 100 + '%' }"
          ></div> -->
          <div class="dot"></div>
        </div>
        <span class="duration">{{ duration }}</span>
      </div>

      <div class="controls">
        <svg-icon
          class="control-icon"
          type="mdi"
          :path="voluAlto"
          @click="toggleVolumeControl"
        ></svg-icon>
        <!-- v-if="showVolume" -->
        <input
          type="range"
          class="vol-seek"
          id="vol-seek"
          min="0"
          v-model="volume.range"
          :max="100"
          @input="handleVolumeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiPlay,
  mdiArrowLeft,
  mdiArrowRight,
  mdiVolumeHigh,
  mdiPauseBoxOutline,
} from "@mdi/js";
import { mapState, mapActions } from "vuex";

interface Music {
  paused: boolean;
  element: HTMLAudioElement;
}

interface Seekbar {
  max: number;
  value: number;
}

interface Volume {
  range: number;
}

const vuexMixin = {
  computed: {
    ...mapState(["isPlaying"]),
    currentComposition(this: any) {
      return this.$store.getters["musicPlayer/getSelectedComposition"];
    },
  },
  methods: {
    ...mapActions([
      "playComposition",
      "pauseComposition",
      "musicPlayer/selectComposition",
    ]),
  },
};

export default {
  nome: "PlayMusic",
  components: { SvgIcon },
  mixins: [vuexMixin], // Use o mixin aqui
  data() {
    return {
      Play: mdiPlay,
      Left: mdiArrowLeft,
      Right: mdiArrowRight,
      voluAlto: mdiVolumeHigh,
      Pausa: mdiPauseBoxOutline,
      profilee: require("@/assets/OIP.jpg"),
      music: {
        paused: false,
        element: new Audio(),
      } as Music,
      seekbar: {
        max: 100,
        value: 0,
      } as Seekbar,
      volume: {
        range: 50,
      } as Volume,
      duration: "0:00",
      currentTime: "0:00",
      // showVolume: false,
    };
  },

  methods: {
    handlePlayPause(this: PlayMusic): void {
      console.log("isPlaying:", this.isPlaying);

      if (this.isPlaying) {
        this.pauseComposition();
      } else {
        this.playComposition(this.currentComposition);
      }
    },
    playComposition(this: PlayMusic, composition: any): void {
      console.log("composition", composition);
      if (
        composition &&
        typeof composition.audio === "string" &&
        composition.audio.trim() !== ""
      ) {
        console.log(composition);

        this.music.element.src = composition.audio;

        // Atualiza o estado isPlaying para true antes de tocar
        this.$store.commit("setIsPlaying", true);

        // Inicia a reprodução imediatamente após carregar a nova música
        this.music.element.play();

        // Se necessário, você pode adicionar lógica para selecionar a nova composição
        this["musicPlayer/selectComposition"](composition);
      } else {
        console.error('Composição inválida ou sem propriedade "audio".');
      }
    },

    // Atualize o método pauseComposition para pausar efetivamente a música e atualizar o estado isPlaying
    pauseComposition(this: PlayMusic): void {
      this.music.element.pause();
      this.$store.commit("setIsPlaying", false);
    },

    // toggleVolumeControl() {
    //   this.showVolume = !this.showVolume;
    // },

    // handleResize() {
    //   this.showVolume = window.innerWidth > 780;
    // },

    handleSeek(this: PlayMusic): void {
      this.music.element.currentTime = this.seekbar.value;
    },

    handleVolumeChange(this: PlayMusic): void {
      this.music.element.volume = this.volume.range / 100;
    },
    handlePrevious(this: PlayMusic): void {
      // Adicione a lógica para reproduzir a faixa anterior
      // const currentIndex = this.$store.state.musicPlayer.selectedCompositionIndex;
      // const compositions = this.$store.state.musicPlayer.compositions;
      // if (currentIndex > 0) {
      //   const previousComposition = compositions[currentIndex - 1];
      //   this.playComposition(previousComposition);
      // }
    },
    handleNext(this: PlayMusic): void {
      // Adicione a lógica para reproduzir a próxima faixa
      // const currentIndex = this.$store.state.musicPlayer.selectedCompositionIndex;
      // const compositions = this.$store.state.musicPlayer.compositions;
      // if (currentIndex < compositions.length - 1) {
      //   const nextComposition = compositions[currentIndex + 1];
      //   this.playComposition(nextComposition);
      // } else {
      //   // Se estiver na última faixa, pode implementar algum comportamento desejado,
      //   // como reiniciar a reprodução desde o início ou parar a reprodução.
      //   // Neste exemplo, apenas pausa a reprodução.
      //   this.pauseComposition();
      // }
    },
    formatTime(time: number): string {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  mounted(this: PlayMusic): void {
    this.$watch(
      () => this.$store.getters["musicPlayer/getSelectedComposition"],
      (newComposition: any) => {
        if (newComposition) {
          // Se houver uma nova composição, reproduza-a
          this.playComposition(newComposition);
        }
      }
    );

    // Inicie a reprodução com a composição atual
    this.playComposition(this.currentComposition);

    this.music.element.addEventListener("error", (event) => {
      this.playComposition(this.currentComposition);
      console.error("Erro no elemento de áudio:", event);
    });

    this.music.element.addEventListener("timeupdate", () => {
      this.currentTime = this.formatTime(this.music.element.currentTime);
      this.seekbar.value = this.music.element.currentTime;
    });

    this.music.element.addEventListener("loadedmetadata", () => {
      this.duration = this.formatTime(this.music.element.duration);
      this.seekbar.max = this.music.element.duration;
    });
    // Adicione um listener para lidar com o término da faixa
    this.music.element.addEventListener("ended", () => {
      // Adicione a lógica para reproduzir a próxima faixa automaticamente
      this.handleNext();
    });

    // window.addEventListener("resize", this.handleResize);
    // this.handleResize();
    // this.music.element.addEventListener("pause", () => {
    //   // Atualiza o estado isPlaying para false após a pausa
    //   this.$store.commit("setIsPlaying", true);
    // });
  },
};

// Adicione uma interface para o componente para melhorar a inferência de tipos
interface PlayMusic {
  [x: string]: any;
  music: Music;
  seekbar: Seekbar;
  volume: Volume;
  duration: string;
  currentTime: string;
  isPlaying: boolean; // Adicione a propriedade isPlaying à interface
  playComposition: (composition: any) => void; // Adicione a assinatura de playComposition à interface
  pauseComposition: () => void; // Adicione a assinatura de pauseComposition à interface
}
</script>

<style scoped>
.music-player {
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
}

.player-footer {
  display: flex;
  background-color: #333;
}

.subtitle {
  color: white;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}
.title {
  color: white;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}

.album-cover {
  height: 48px;
  border-radius: 7%;
  margin-right: 10px;
}

/* .track-info {
  flex-grow: 1;
  text-align: left;
} */

.controls,
.time {
  display: flex;
  align-items: center;
}

.control-icon {
  cursor: pointer;
  margin: 0 5px;
  color: white;
}

.time span {
  font-size: 12px;
  color: #fff;
  margin: 0 5px;
}

.seek-bar,
.vol-seek {
  width: 100%;
}

.bar-fill {
  position: absolute;
  height: 100%;
  background-color: #4f9ac4; /* Altere para a cor desejada */
}

.vol-seek {
  margin-left: 5px;
}

@media screen and (max-width: 768px) {
  .player-footer {
    flex-direction: column;
    align-items: center;
  }

  .music-player {
    padding: 10px;
  }
  .time {
    display: none;
  }

  .control-icon {
    margin: 5px;
  }

  /* .album-cover {
    margin-bottom: 10px;
  } */
}
</style>

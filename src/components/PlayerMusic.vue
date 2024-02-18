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
        <svg-icon class="control-icon" type="mdi" :path="voluAlto"></svg-icon>

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

interface PlayerMusic {
  [x: string]: any;
  currentComposition: any; // Adicione o tipo adequado para a composição
  pauseComposition: () => void; // Adicione a assinatura de pauseComposition à interface
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

  watch: {
    // Observa alterações na composição selecionada
    currentComposition(
      this: PlayerMusic,
      newComposition: string,
      oldComposition: string
    ): void {
      if (oldComposition && oldComposition !== newComposition) {
        // Pausa a reprodução da composição antiga
        this.pauseComposition();
        this.playComposition(this.$store.getters["musicPlayer/getSelectedComposition"]);
      }
    },
  },

  methods: {
    handlePlayPause(this: PlayMusic): void {
      console.log("isPlaying:", this.isPlaying);

      const selectedComposition = this.$store.getters[
        "musicPlayer/getSelectedComposition"
      ];

      if (selectedComposition) {
        // Verifica se a música atualmente tocando é a mesma que foi clicada
        const isSameComposition =
          this.currentComposition && this.currentComposition === selectedComposition;

        if (this.isPlaying && isSameComposition) {
          // Se a música atual está tocando e é a mesma que foi clicada, pause a reprodução
          this.pauseComposition();
        } else {
          // Se a música não está tocando ou é uma nova música, inicie a reprodução
          if (isSameComposition && this.music.element.currentTime > 0) {
            // Se for a mesma música e a reprodução não começou do início, retome a reprodução
            this.music.element.play();
            this.$store.commit("setIsPlaying", true);
          } else {
            // Se for uma nova música ou a reprodução começou do início, inicie a reprodução
            this.playComposition(selectedComposition);
          }
        }
      } else {
        console.error("Composição não encontrada.");
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
        this.$store.commit("setIsPlaying", true);
        this.music.element.play();
        this["musicPlayer/selectComposition"](composition);
      } else {
        console.error('Composição inválida ou sem propriedade "audio".');
      }
    },

    pauseComposition(this: PlayMusic): void {
      this.music.element.pause();
      this.$store.commit("setIsPlaying", false);
    },

    handleSeek(this: PlayMusic): void {
      this.music.element.currentTime = this.seekbar.value;
    },

    handleVolumeChange(this: PlayMusic): void {
      this.music.element.volume = this.volume.range / 100;
    },

    formatTime(time: number): string {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  mounted(this: PlayMusic): void {
    this.music.element.addEventListener("error", (event) => {
      console.error("Erro no elemento de áudio:", event);
      this.pauseComposition(); // Pausa a reprodução em caso de erro
    });

    this.music.element.addEventListener("canplaythrough", () => {
      this.music.element.play();
      this.$store.commit("setIsPlaying", true);
    });

    this.music.element.addEventListener("timeupdate", () => {
      this.currentTime = this.formatTime(this.music.element.currentTime);
      this.seekbar.value = this.music.element.currentTime;
    });

    this.music.element.addEventListener("loadedmetadata", () => {
      this.duration = this.formatTime(this.music.element.duration);
      this.seekbar.max = this.music.element.duration;
    });
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

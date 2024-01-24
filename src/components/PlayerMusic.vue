<template>
  <div class="master_play is-flex is-align-items-center is-justify-content-center ml-6">
    <img src="../assets/turmadopagode2.jpg" alt="" class="mr-3" />

    <div class="mix-title">
      <p class="title is-5">Subtitle 5</p>
      <p class="subtitle is-6">Subtitle 5</p>
    </div>

    <div class="icons is-flex is-align-items-center ml-4 p-2">
      <svg-icon type="mdi" :path="Left" @click="handlePrevious"></svg-icon>
      <svg-icon type="mdi" :path="Play" @click="handlePlayPause"></svg-icon>
      <svg-icon type="mdi" :path="Right" @click="handleNext"></svg-icon>
    </div>

    <span id="current-Start">{{ currentTime }}</span>
    <div class="bar">
      <input type="range" id="seek" min="0" @input="handleSeek" />
      <div class="bar-second" id="bar-second"></div>
      <div class="dot"></div>
    </div>
    <span id="current-end">{{ duration }}</span>

    <div class="icons is-flex is-align-items-center p-2">
      <svg-icon type="mdi" :path="Pausa" @click="handlePlayPause"></svg-icon>
    </div>

    <div class="vol">
      <svg-icon class="iconVol" type="mdi" :path="voluAlto"></svg-icon>
      <input
        type="range"
        id="vol-seek"
        min="0"
        v-model="volume.range"
        :max="100"
        @input="handleVolumeChange"
      />
      <div class="Vol-second"></div>
      <div class="dot" id="vol-dot"></div>
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
      music: {
        paused: true,
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
    };
  },
  methods: {
    handlePlayPause(this: PlayMusic): void {
      if (this.isPlaying) {
        this.pauseComposition();
      } else {
        this.playComposition(this.currentComposition);
      }
    },
    playComposition(this: PlayMusic, composition: any): void {
      if (
        composition &&
        typeof composition.audio === "string" &&
        composition.audio.trim() !== ""
      ) {
        this.music.element.src = composition.audio;

        if (this.isPlaying) {
          this.pauseComposition();
        }

        this.music.element.play();
        this["musicPlayer/selectComposition"](composition);
      } else {
        console.error('Composição inválida ou sem propriedade "audio".');
      }
    },
    handleSeek(this: PlayMusic): void {
      this.music.element.currentTime = this.seekbar.value;
    },

    handleVolumeChange(this: PlayMusic): void {
      this.music.element.volume = this.volume.range / 100;
    },
    handlePrevious(this: PlayMusic): void {
      // Adicione a lógica para reproduzir a faixa anterior
    },
    handleNext(this: PlayMusic): void {
      // Adicione a lógica para reproduzir a próxima faixa
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

<style setup>
.master_play img {
  height: 35px;
}
.master_play .icons {
  cursor: pointer;
  outline: none;
}
.icons path {
  fill: #fff; /* Substitua pelo código de cor desejado */
}
.master_play .icons .bi:nth-child(2) {
  border: 1px solid white;
  transition: 0.3s linear;
}
.master_play span {
  font-size: 11px;
  width: 32px;
  font-weight: 400px;
  color: #fff;
}
.master_play #current-Start {
  margin: 0px 0px 0px 20px;
}

.master_play .bar {
  position: relative;
  width: 43%;
  height: 2px;
  margin: 0px 15px 0px 10px;
}

button,
input,
select,
textarea {
  margin: 0;
  width: 100%;
}

.master_play .vol {
  position: relative;
  width: 100px;
  height: 2px;
  margin-left: 50px;
  background: #4f9ac4;
  cursor: pointer;
}
.master_play .vol .iconVol {
  position: absolute;
  top: -11px;
  left: -30px;
}

.vol path {
  fill: #fff;
}

.mix-title p {
  color: #fff;
}
</style>

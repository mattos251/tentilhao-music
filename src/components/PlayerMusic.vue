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

export default {
  nome: "PlayMusic",
  components: { SvgIcon },
  data() {
    return {
      Play: mdiPlay,
      Left: mdiArrowLeft,
      Right: mdiArrowRight,
      voluAlto: mdiVolumeHigh,
      Pausa: mdiPauseBoxOutline,
      music: {
        paused: true,
        element: new Audio("https://hosseinghanbari.ir/other/music-player/autumn.mp3"),
      },
      seekbar: {
        max: 100,
        value: 0,
      },
      volume: {
        range: 50,
      },
      duration: "0:00",
      currentTime: "0:00",
    };
  },
  methods: {
    // handlePlayPause() {
    //   this.music.paused = !this.music.element.paused;
    //   if (this.music.paused) {
    //     this.music.element.pause();
    //   } else {
    //     this.music.element.play();
    //   }
    // },
    // handleSeek() {
    //   this.music!.element.currentTime = this.seekbar.value;
    // },
    // handleVolumeChange() {
    //   this.music!.element.volume = this.volume.range / 100;
    // },
    // handlePrevious() {
    //   // Adicione a lógica para reproduzir a faixa anterior
    // },
    // handleNext() {
    //   // Adicione a lógica para reproduzir a próxima faixa
    // },
  },
};
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
.master_play .bar .bar-second {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
}
.master_play .bar .dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  left: 0%;
  top: -1px;
  transition: 1ms linear;
}
.master_play .bar .dot::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #fff;
  left: -5px;
  top: -6px;
  box-shadow: inset 0px 0px 3px #fff;
}
.master_play .bar input {
  position: absolute;
  width: 100%;
  top: -6px;
  left: 0;
  z-index: 99999999;
  cursor: pointer;
  transition: 3s linear;
  opacity: 0;
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

.master_play .vol input {
  position: absolute;
  width: 100%;
  top: -10px;
  left: 0;
  z-index: 99999999;
  cursor: pointer;
  transition: 3s linear;
  opacity: 0;
}

.master_play .vol .Vol-second {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
}
.master_play .vol .dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  left: 0%;
  top: -1px;
  transition: 1ms linear;
}
.master_play .vol .dot::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #fff;
  left: -5px;
  top: -6px;
  box-shadow: inset 0px 0px 3px #fff;
}

.mix-title p {
  color: #fff;
}
</style>

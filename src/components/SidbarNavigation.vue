<template>
  <div class="columns menu-sidbar">
      <div class="column is-12">
        <div class="area-navegacao">
          <div class="perfil-usuario"> 
            <figure class="image is-128x150">
              <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="title-perfil">
              <h2 class="subtitle">Spiliquide</h2>  
            </div>
          </div>

          <ul class="menu-nav is-justify-content-center">
            <router-link to="/perfil">
              <li><a>Editar perfil</a></li>
            </router-link>
            
            <li>
              <router-link to="/cadastro">
                <a href="">Nova musica</a>
              </router-link>
            </li>

            <li><a>Mensagem</a></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidbarNavigation",
});
</script>

<style scoped>
.menu-sidbar {
  border-top: 4px solid #036faa;
  border-bottom: 4px solid #036faa;
  background: #e4f2ff;
  opacity: 85%;
  height: 100vh; 
  margin: 0;
}


.menu-nav li {
  background: #036faa;
  opacity: 70%;
  margin-top: 50px;
  border-radius: 10px;
  font-size: large;
}

.menu-nav li a {
  color: white;
  justify-content: center;
  display: flex;
}

.perfil-usuario{
  margin-top:50px;
}

.title-perfil{
  display:flex;
  justify-content:center;
  margin-top: 20px;
}
</style>

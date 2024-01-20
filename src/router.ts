// import { router } from '@/router';
import { createRouter, createWebHistory } from 'vue-router';
import CadastroComposicao from './views/CadastroComposicao.vue';
import HomePage from './views/HomePage.vue';
import PaginaPerfil from './views/PaginaPerfil.vue';
import PaginaPrincipal from './views/PaginaPrincipal.vue';
import PaginaFeed from './views/PaginaFeed.vue';
import PageCadastroUsuario from './views/PageCadastroUsuario.vue';
import RegisterUsuario from './components/RegisterUsuario.vue';
import LoginUsuario from './components/LoginUsuario.vue'


const routes = [
    
    {
        path: '/',
        name: 'PageCadastroUsuario',
        component: PageCadastroUsuario,
        children:[
            {
                path: '/',
                name: 'LoginUsuario',
                component: LoginUsuario,
            },
            {
                path: '/registro',
                name: 'RegisterUsuario',
                component: RegisterUsuario,
            },
        ]
        
    },


    { 
        path: '/homepage',
        name: 'PaginaPrincipal',
        component: PaginaPrincipal,
        children:[
            {
                path: '/homepage',
                name: 'HomePage',
                component: HomePage,
            },

            
            {
                path: '/cadastro',
                name: 'CadastroComposicao',
                component: CadastroComposicao,
            },
            {
                path: '/feeds/:genero',
                name: 'PaginaFeed',
                component: PaginaFeed,
                props: true,
            },
        ]
    },
    
    
    {
        path: '/perfil',
        name: 'PaginaPerfil',
        component: PaginaPerfil,
        children:[
            {
                path: '/:compositorId',
                name: 'PaginaPerfil',
                component: PaginaPerfil,
            },
        ]

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const router = to.path
  
  if( ['/', '/registro'].includes(router)){
    if(token){
        next('/homepage');
    } 
    next();
  }else{
    if(!token){
        next('/');
    }else{
        next();
    }
  }

});


export default router;
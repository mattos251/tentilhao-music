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
import auth  from './auth';

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
        meta: { requiresAuth: true },
        children:[
            {
                path: '/homepage',
                name: 'HomePage',
                component: HomePage,
                meta: { requiresAuth: true },
            },

            
            {
                path: '/cadastro',
                name: 'CadastroComposicao',
                component: CadastroComposicao,
                meta: { requiresAuth: true },
            },
            {
                path: '/feeds',
                name: 'PaginaFeed',
                component: PaginaFeed,
                meta: { requiresAuth: true },
            },
        ]
    },
    
    
    {
        path: '/perfil',
        name: 'PaginaPerfil',
        component: PaginaPerfil,
        meta: { requiresAuth: true },
        children:[
            {
                path: '/:compositorId',
                name: 'PaginaPerfil',
                component: PaginaPerfil,
                meta: { requiresAuth: true },
            },
        ]

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
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



//   if (requiresAuth && !auth.checkAuth()) {
//     next('/');
//   } else {
//     next();
//   }
});


export default router;
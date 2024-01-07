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
                name: 'RegisterUsuario',
                component: RegisterUsuario,
            },
            {
                path: '/Login',
                name: 'LoginUsuario',
                component: LoginUsuario,
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
            },

            
            {
                path: '/cadastro',
                name: 'CadastroComposicao',
                component: CadastroComposicao
            },
        ]
    },
    {
        path: '/feeds',
        name: 'PaginaFeed',
        component: PaginaFeed,
        meta: { requiresAuth: true },
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
            },
        ]

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);

  if (requiresAuth && !auth.checkAuth()) {
    next('/login');
  } else {
    next();
  }
});




export default router;
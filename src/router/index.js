import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    beforeEnter: (to, from, next) => {

      const { getters } = store;

      // console.log(getters.dispatch);
      // const { getters } = store;
      if(getters.dispatch.isAuthenticated){
        next({ path : '/Chat' });
      }else{
        next();
      }
    },
    name: 'Home',
    component: Home,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/Login',
        component: () => import('../components/Auth/Login.vue')
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: '/Signup',
        component: () => import('../components/Auth/Signup.vue')
      }
    ]
  },
  {
    path: '/Main',
    redirect: '/Chat',
    beforeEnter: (to, from, next) => {
      const { getters } = store;
      if(getters.dispatch.isAuthenticated){
        next();
      }else{
        next({ path: '/Login'});
      }
    },
    name: 'Main',
    component: Main,
    children : [
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('../components/Main/Chat.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

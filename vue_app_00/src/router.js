import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/tabbar/Home.vue';
import BookList from './components/books/BookList.vue';
import BookInfo from './components/books/BookInfo.vue';
import Login from './components/login/login.vue';
import Search from './components/search/Search.vue';
import Goodlist from './components/good/Goodlist.vue';
import Goodinfo from './components/good/Goodinfo.vue';
import Cart from './components/tabbar/Cart.vue';
import Mine from './components/tabbar/Mine.vue';
import Register from './components/login/Register.vue';
Vue.use(Router)

export default new Router({
  routes: [    
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/booklist',component:BookList},
    {path:'/bookinfo',component:BookInfo},
    {path:'/login',component:Login},
    {path:'/search',component:Search},
    {path:'/goodlist',component:Goodlist},
    {path:'/goodinfo',component:Goodinfo},
    {path:'/cart',component:Cart},
    {path:'/mine',component:Mine},
    {path:'/register',component:Register}
  ]
})

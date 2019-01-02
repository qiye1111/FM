import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

//引入miny-ui组件并进行注册
import {Header,Swipe,SwipeItem,Button} from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button)
//3引入axios库
import axios from 'axios'; //引入
axios.defaults.withCredentials=true; //跨域保存session
Vue.prototype.axios=axios; //注册
//2.通过脚手架使用vue-resource库并进行注册
import VueResource from 'vue-resource';
Vue.use(VueResource);
//2.1设置请求的服务器根目录
Vue.http.options.root='http://127.0.0.1:3000';
//2.2全局设置post的时候表单application/x-www-form-urlencoded
Vue.http.options.emulateJSON=true;
//3.创建日期类型的过滤器
//val 是原来的日期对象
Vue.filter('datatimeFilter',function(val){
  //1.创建日期对象
  var data=new Date(val);
  //2.获取年月日时分秒
  var y=data.getFullYear();
  var m=data.getMonth()+1;
  var d= data.getDate();
  var h=data.getHours();
  var mi= data.getMinutes();
  var s=data.getSeconds();
  //3月日格式判断
  m<10&&(m='0'+m);
  d<10&&(d='0'+d);
  //4拼接字符串返回
    return `${y}-${m}-${d}-${h}-${mi}-${s}`
})
//跨域访问session的值
Vue.http.options.withCredentials=true;
Vue.config.productionTip = false;
//4.导入vueX
//4.1引入vueX
import Vuex from 'vuex';
//4.2注册
Vue.use(Vuex)
//4.3创建Vuex实例对象
var store=new Vuex.Store({
  state:{
    cartCount:0
  },
  mutations:{
    increment(state,count){
      state.cartCount+=count
    },
    subStract(state){state.cartCount--},
    clear(state){state.cartCount=0}
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount
    }
  }
})

// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//引入自定义app.css样式文件
import './lib/mui/css/app.css'

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

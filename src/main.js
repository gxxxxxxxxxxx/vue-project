// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//import Vue from 'vue'
import App from './App'
import router from './router'
//import { Button, Select,Dialog,Table,MessageBox,Message,Alert,Form,Upload,FormItem,Input,Loading } from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
//import SuiVue from 'semantic-ui-vue';
//import 'semantic-ui-css/semantic.min.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Axios from 'axios'
//import RouteTransition from 'vue-route-transition'
//import animated from 'animate.css'
import md5 from 'js-md5';
//import VueParticles from 'vue-particles'
import NProgress from "nprogress"
import "nprogress/nprogress.css"

//Vue.use(VueParticles)
Axios.defaults.baseURL = 'https://ganxx.cn/api';


//Vue.use(animated)
//Vue.use(RouteTransition)
Vue.prototype.$http = Axios
Vue.prototype.$md5 = md5;
Vue.use(mavonEditor)
/* ... */

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.config.productionTip = false


//Vue.use(SuiVue);

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import("@/components/layout");
const page = ()=> import("@/components/page");
const types = ()=> import("@/components/types");
const home = ()=> import("@/components/home");
const about = ()=> import("@/components/about");
const archive = ()=> import("@/components/archive");
const bloglist = ()=> import("@/components/manager/bloglist");
const editblog = ()=> import("@/components/manager/editblog");
import  managerlayout  from "@/components/manager/managerlayout";
const edittypes = ()=> import("@/components/manager/edittypes");


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: layout,
      redirect: 'home',
      children: [{
          path: 'home',
          component: home,
          meta: {
            index: 0
          }
        },
        {
          path: 'page/:phid',
          component: page,
          meta: {
            index: 1
          }

        },
        {
          path: 'types',
          component: types,
          meta: {
            index: 2
          }

        },
       

        ,
        {
          path: 'about',
          component: about,
          meta: {
            index: 3
          }

        },
        {
          path:'archive',
          component:archive
        }
        
      ]
    },
    {
      path: '/manager',
      component: managerlayout,
      redirect:'/manager/bloglist',
      children:[
        {
          path:'bloglist',
          component:bloglist
        },
        {
          path:'editblog/:phid',
          component:editblog
        },
        {
          path:'edittypes',
          component:edittypes
        }
      ]

    }

  ]
})

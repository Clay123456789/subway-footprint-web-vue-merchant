import {createRouter,createWebHashHistory} from "vue-router"

const routes=[
    {   //登陆界面
        path: '/',
        name: 'login',
        component: () => import(/*webpackChunckName:'Login*/ '@/page/login.vue')
    },
    {
        path:'/register',
        name:'register',
        component:()=>import( '@/page/register.vue')
    },
    {
        path:'/findPW',
        name:'findPW',
        component:()=>import( '@/page/findPW.vue')
    },


    {   //主界面
        path:'/index',
        name:'index',
        component:()=>import(/*webpackChunckName:'Index*/ '@/page/index.vue'),
        redirect:'/toDo', //默认进入页面
        //二级路由
        children:[
            {   //代办事项
                path:'/toDo',
                name:'toDo',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/toDo.vue'),
            },
            {   //奖池管理
                path:'/poolManage',
                name:'poolManage',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/poolManage.vue'),
            }, 
            {   //商户认证
                path:'/verifyMerc',
                name:'verifyMerc',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/verifyMerc.vue'),
            },
            {   //商户认证
                path:'/goVerify',
                name:'goVerify',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/goVerify.vue'),
            },
            {   //藏宝藏
                path:'/inter',
                name:'inter',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/inter.vue'),
            },
        ]

    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes, 
  })

export default router
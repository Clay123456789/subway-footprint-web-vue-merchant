import Vue from 'vue'
import VueRouter from 'vue-router'
import atmp from "../components/admin_treasure_manage_panel";
import  ma from "../components/my_authentication";
import inter from "../components/inter"
import Register from "../views/user/Register";
import Login from "@/views/user/Login";
import Home from "@/views/user/Home";
import UserView from "@/views/user/UserView"
import Info from "@/views/user/Info";
import Post from "@/views/user/Post";
import MyArticle from "@/views/user/MyArticle";
import Article from "@/views/user/Article";
import Upload from "@/views/user/Upload";
import Resource from "@/views/user/Resource";
import MyFavor from "@/views/user/MyFavor";
import Search from "@/views/user/Search";
import Bought from "@/views/user/Bought";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/user/login'
    },
    {
        path: '/user',
        name: 'user',
        component: UserView,
        children: [
            //只有根路由需要加'/'
            {
                path: 'register',
                name: 'register',
                component: Register
            },
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'home',
                name: 'home',
                component: Home
            }, {
                path: 'info',
                name: 'info',
                component: Info
            },
            {
                path: 'post',
                name: 'post',
                component: Post
            }, {
                path: 'articles',
                name: 'myArticles',
                component: MyArticle
            },{
            path:'article',
                name:'article',
                component: Article
            },
            {
                path:'upload',
                name:'upload',
                component: Upload
            },
            {
                path:'resource',
                name:'resource',
                component: Resource
            },
            {
                path:'favor',
                name:'favor',
                component: MyFavor
            },
            {
                path:'search',
                name:'search',
                component: Search
            },
            {
                path:'bought',
                name:'bought',
                component: Bought
            },
            {
                path: 'atmp',
                name: 'atmp',
                component: atmp
            },
            {
                path:'ma',
                name:'ma',
                component: ma
            },
            {
                path:'inter',
                name:'inter',
                component: inter
            },
        ],
        redirect: '/user/home'
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

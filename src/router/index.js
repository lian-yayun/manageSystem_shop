import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/HomePage/Home.vue'
import Layout from "../views/Layout.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: '',
    component: Layout,
    children: [{
      path: '',
			component: Home,
			meta: {isLogin: true},
      },
      {
        path: "product",
        name: "Product",
        component: () => import("../views/main/Product/index.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '商品列表', url: '/product' },
        ]
      },
      {
        path: "productkind",
        name: "ProductKind",
        component: () => import("../views/main/Product/ProductKind.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '商品列表', url: '/product' },
        ]
      },
      {
        path: "list",
        name: "List",
        component: () => import("../views/main/List/List.vue"),
        meta: [
          {isLogin: true},
         
          { name: '订单列表' },
        ]
      },
      {
        path: "sellback",
        name: "sellBack",
        component: () => import("../views/main/List/sellBack.vue"),
        meta: [
          {isLogin: true},
         
          { name: '退货管理' },
        ]
      },
      {
        path: "sellbacklist",
        name: "sellBackList",
        component: () => import("../views/main/List/sellBackList.vue"),
        meta: [
          {isLogin: true},
          { name: '退货列表' },
        ]
      },
      {
        path: "explain",
        name: "explain",
        component: () => import("../views/main/explain.vue"),
        meta: [
          {isLogin: true},
          {name:'说明'},
          { name: '说明', url: '/explain' },
        ]
      },
      {
        path: "productAdd",
        name: "ProductAdd",
        component: () => import("../views/main/Product/ProductAdd.vue"),
        meta: [
          {isLogin: true},
          {name:'添加数据'},
          { name: '添加商品', url: '/productAdd' },
        ]
      },
      {
        path: "shopList",
        name: "ShopList",
        component: () => import("../views/main/Shop/ShopList.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '商铺列表', url: '/shopList' },
        ]
      },
      {
        path: "customerList",
        name: "CustomerList",
        component: () => import("../views/main/Customer/Customer.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '', url: '/customerList' },
        ]
      },
      {
        path: "userList",
        name: "UserList",
        component: () => import("../views/main//User/UserList.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '管理员列表', url: '/userList' },
        ]
      },
      {
        path: "userList-change",
        name: "UserListPro",
        component: () => import("../views/main/User/UserListPro.vue"),
        meta: [
          {isLogin: true},
          {name:'数据管理'},
          { name: '管理员列表', url: '/userList' },
     
        ]
      },
      {
path:"myselfInfo",
name:"MyselfInfo",
component:()=>import("../views/main//MyselfInfo.vue"),
meta: [
  {isLogin: true},
  {name:'设置'},
  { name: '个人信息', url: '/myselfInfo' },
]
      },
   
      {
        path: "addShop",
        name: "AddShop",
        component: () => import("../views/main//Shop/AddShop.vue"),
        meta: [
          {isLogin: true},
          {name:'添加数据'},
          { name: '添加商铺', url: '/addShop' },
        ]
      },
      {
        path: "round",
        name: "Round",
        component: () => import("../views//main/Echart/Round.vue"),
        meta: [
          {isLogin: true},
          {name:'图表'},
          { name: '用户分布图', url: '/addShop' },
        ]
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
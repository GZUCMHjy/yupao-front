import { createApp } from 'vue'
// import './style.css'
import App from './App.vue' 
// import { Button, Icon, NavBar, Tabbar, TabbarItem } from 'vant';// 1. 引入你需要的组件（按需引入 优化代码 不过每用一个就引入一个 太麻烦了）
import Vant from 'vant'
import 'vant/lib/index.css';// 2. 全局引入组件样式
import * as VueRouter from 'vue-router' // 引进路由
import routes from './config/router' // 单独将路由写到配置类文件 （因为路由是掌管整个项目的全局路由  可以单独提出来 便于管理和维护）
import '../global.css'
// 创建app对象
const app = createApp(App);
// 3. 注册你需要的组件 
// 挂在到对应id=app的vue文件 
// 然后该文件就可以进行组件的添加
app.use(Vant)

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // history: VueRouter.createWebHashHistory(),
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})


app.use(router)
app.mount('#app')








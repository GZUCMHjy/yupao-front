
import Index from '../page/Index.vue' // 引进路由对应的页面 
import Team from '../page/Team.vue'
import TeamAdd from '../page/TeamAdd.vue'
import TeamUpdate from '../page/TeamUpdate.vue'
import User from '../page/User.vue'
import UserLogin from '../page/UserLogin.vue'
import UserUpdate from '../page/UserUpdate.vue'
import UserTeamJoin from '../page/UserTeamJoin.vue'
import UserTeamCreate from '../page/UserTeamCreate.vue'
import Search from '../page/Search.vue'
import UserEdit from '../page/UserEdit.vue'
import SearchResult from '../page/SearchResult.vue'


const routes = [
    { path: '/', component: Index },
    { path: '/team',title: '找队伍',component: Team },
    { path: '/team/add', title: '加入队伍',component: TeamAdd },
    { path: '/team/update', title: '更新队伍',component: TeamUpdate },
    { path: '/user', title: '个人信息',component: User },
    { path: '/search', title: '找伙伴',component: Search },
    { path: '/user/edit',title: '用户列表', component: UserEdit },
    { path: '/user/list', title: '编辑信息',component: SearchResult },
    { path: '/user/login',title: '登录', component: UserLogin },
    { path: '/user/update',title: '更新信息', component: UserUpdate },
    { path: '/user/team/join', title: '我加入的队伍',component: UserTeamJoin },
    { path: '/user/team/create', title: '我创建的队伍',component: UserTeamCreate },

]
export default routes; // 便于在其他文件引入该文件
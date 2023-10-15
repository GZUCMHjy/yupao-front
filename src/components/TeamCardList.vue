<template>
    <div
        id = "teamCardList"
    >
    <van-card 
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="`https://images-na.ssl-images-amazon.com/images/I/81ePq-H8nEL._CR270,81,1242,2208_.jpg`"
        >
        <template #tags>
            <!-- 自定义展示标签 -->
            <van-tag plain type="primary"  style="margin-right: 8px;margin-top: 8px;">
                <!-- 自定义插槽语法必不可少 -->
                {{ teamStatusEnums[team.status] }}
            </van-tag>
        </template>
        <!-- 插槽 用于强化自定义样式效果（在原有的组件样式添加） -->
        <!-- 插槽slot 标志符# -->
        <template #bottom>
            <div>
                {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}`}}
            </div>
            <div v-if="team.expireTime">
                {{ '过期时间:' + team.expireTime}}
            </div>
            <div v-if="team.createTime">
                {{ '发布时间:' + team.createTime}}
            </div>
        </template>
        <!-- 插槽slot 标志符# -->
        <template #footer>
            <!-- 用于跳转到队伍详情页 -->
            <van-button size="small" type="primary" v-if="team.userId !==currentUser?.id && !team.hasJoin"
                plain @click="preJoinTeam(team)">加入队伍
            </van-button>
            <van-button v-if="team.userId===currentUser?.id" size="small" 
                    plain @click="doUpdateTeam(team.id)" >更新队伍
            </van-button>
            <!-- todo 加入队伍可见 -->
            <van-button  size="small" v-if="team.userId !==currentUser?.id && team.hasJoin"
                    plain @click="doQuitTeam(team.id)" >退出队伍
            </van-button>
            <van-button v-if="team.userId === currentUser?.id"  size="small" type="danger" 
                    plain @click="doDeleteTeam(team.id)" >解散队伍
            </van-button>

            <!-- @click="doUpdateTeam(team.id)" -->
        </template>
    </van-card>
    </div>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

</template>
<script setup lang = "ts">
    import {TeamType} from "../models/team"
    import {teamStatusEnums} from "../constants/team"
    import { showFailToast,showSuccessToast } from 'vant';
    import myAxios from "../plugins/myAxios";
    import { onMounted ,ref} from "vue";
    import { getCurrentUser } from "../services/user";
    import { useRouter } from "vue-router";
    // import Dialog from "vant";


    
    // 自定义组件标签
    interface TeamCardListProps {
        teamList: TeamType[];
    }
    const props = withDefaults(defineProps<TeamCardListProps>(),{
        // @ts-ignore
        teamList: [] as TeamType[],
    });
    const showPasswordDialog = ref(false)
    const password = ref('')
    const joinTeamId = ref(0)
    // 响应式变量
    const currentUser = ref()
    // const VanDialog = Dialog.Component;
    // 创建页面跳转的路由router
    const router = useRouter()
    // 页面加载获取当前用户信息 
    onMounted(async () =>{ 
        currentUser.value = await getCurrentUser();
    })
    const preJoinTeam =(team:TeamType)=>{
        joinTeamId.value = team.id;
        if(team.status === 0){
            doJoinTeam();
        }else{
            showPasswordDialog.value = true;
        }
    }
    /**
     * 取消
     */
    const doJoinCancel = () => {
        joinTeamId.value = 0;
        password.value = '';
    }
    /**
     * 加入队伍
     */
    const doJoinTeam = async () =>{

        if(!joinTeamId.value){
            return ;
        }
        const res = await myAxios.post('/team/join',{
            teamId : joinTeamId.value,
            password: password.value 
        });
        if(res?.code === 0){
            showSuccessToast('加入成功');
            doJoinCancel();
        }else{
            showFailToast('加入失败' +  (res.description ? `.${res.description}` : ''))
            doJoinCancel();
        }
    }
    // 参数传递
    /**
     * 跳转到更新页面
     * @param id 
     */
    const doUpdateTeam = (id: number) =>{
        router.push({
            path: '/team/update',
            query: {
                id,
            }
        })
    }
    const doQuitTeam = async (id: number) =>{
        const res =  await myAxios.post('/team/quit',{
        teamId: id
    });
    if( res?.code === 0 ){
        showSuccessToast('操作成功')
        
    }else{
        // console.error('加入失败' + (res.description ? `.${res.description}` : ''))
        showFailToast('操作失败' + (res.description ? `.${res.description}` : ''))
        }
    };
    const doDeleteTeam = async (id: number) =>{
        const res =  await myAxios.post('/team/delete',{
            id,
        });
        if( res?.code === 0 ){
            showSuccessToast('操作成功')
            
        }else{
            // console.error('加入失败' + (res.description ? `.${res.description}` : ''))
            showFailToast('操作失败' + (res.description ? `.${res.description}` : ''))
        }
    }
</script>

<!-- vue样式style标签 属性scoped （一定要加） -->
<!-- 防止全局同名CSS污染  说白了 就是私有化模块样式-->
<style scoped>
 /* #teamCardList :deep(.van-image__img){
    height: 128px;
    object-fit: un;
 } */
 #teamCardList :deep(.van-image__img, .van-image__error, .van-image__loading) {
    display: block;
    width: 100%;
    height: 140%;
}

</style>
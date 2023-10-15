<template>
    <div id="teamAdd">
        <!-- 绑定数值 v-model -->
        <van-search v-model="searchText" placeholder="搜索队伍" @search ="onSearch"/>
        <van-tabs v-model:active="active" @click="onTabChange">
            <van-tab title="公开" name="public"/>
            <van-tab title="私密" name="private"/>
        </van-tabs>
        <div style="margin-bottom: 16px;"/>
        <van-button class = "add-bottom" icon="plus" type="primary" @click="toCreateTeam" />
        <!-- 添加冒号 进行双向绑定 -->
        <team-card-list :teamList="teamList" />
        <van-empty v-if="teamList?.length<1" description="数据为空"></van-empty>
    </div>
</template>
<style scoped>
</style>

<script setup lang="ts">

import { useRouter } from 'vue-router';
// 前端网络请求的myAxios的配置文件（官方文档可copy）
import myAxios from '../plugins/myAxios';
import teamCardList from "../components/TeamCardList.vue"
import {ref,onMounted} from 'vue'
import { showFailToast } from 'vant';
import 'vant/es/dialog/style'

const router  = useRouter();
const active = ref('public')
// 默认搜索弹框值为空字符串
const searchText = ref('');

const onTabChange = (name)=>{
    // 查公开
    if(name === 'public'){
        listTeam(searchText.value,0);
    }else{
        listTeam(searchText.value,2);
    }
}

    // 跳转到加入队伍页
    const toCreateTeam = () =>{
        router.push({
            path: "/team/add"
        })
    }
    // 默认队伍列表为空数组
    const teamList = ref([]);
    // const myJoinTeamList = ref([]);
    // 页面加载是只加一次
    // VUE 生命周期的钩子函数

    /**
     * 搜索队伍 
     * @param {*} val 
     */
    const listTeam = async(val = '',status = 0)=>{
        // 异步（async）的get请求 携带参数的写法
        const res = await  myAxios.get("/team/list",{
            params: {
                searchText: val,
                pageNum: 1,
                status,
            }
        });

        if(res?.code === 0 ){
            teamList.value = res.data;
        }else{
            // console.log("查询失败");
            showFailToast('查询失败' + (res.description ? `.${res.description}` : ''))
        }
    }
    /**
     * 搜索我加入的队伍 
     * @param {*} val 
     */
    //  const listMyJoinTeam = async(val = '')=>{
    //     // 异步（async）的get请求 携带参数的写法
    //     const res = await myAxios.get("/team/list/my/join",{
    //         params: {
    //             searchText: val,
    //             pageNum: 1,
    //         }
    //     });

    //     if(res?.code === 0 ){
    //         myJoinTeamList.value = res.data;
    //     }else{
    //         // console.log("查询失败");
    //         showFailToast('查询失败' + (res.description ? `.${res.description}` : ''))
    //     }
    // }
    onMounted( async ()=>{
        listTeam();
    })
    const onSearch = (val) => {
        listTeam(val);
    }
</script>
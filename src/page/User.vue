<template>
    <template v-if="user">
        <van-cell title = "当前用户" :value="user?.userName"></van-cell>
        <van-cell title = "修改信息" is-link to="/user/update">
        </van-cell>
        <van-cell title = "我创建的队伍" is-link to="/user/team/create"></van-cell>
        <van-cell title = "我加入的队伍" is-link to="/user/team/join"></van-cell>
    </template>
</template>

<script setup lang="ts">
 import {useRouter} from "vue-router";
 import {onMounted,ref} from "vue"
 import {getCurrentUser} from "../services/user"

const user = ref()
 onMounted( async ()=>{
    user.value = await getCurrentUser();
 })
 const router = useRouter();
 const toEdit = (editKey: string, editName: string, currentValue: string)=>{
    router.push({
        path: '/user/edit',
        // params: {
        //     a: 1
        // },
        query: {
            editKey,
            editName,
            currentValue,
        }
    })
 }
 
</script>

<style>
</style>
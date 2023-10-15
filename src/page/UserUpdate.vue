<template>
    <template v-if="user">  
        <van-cell style = "padding: 0px" title="用户名"  is-link to="/user/edit" :value = "user.userName" @click="toEdit('userName','用户名',user.userName)"/>
            <van-cell title="性别"    is-link  :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
            <van-cell title="头像"    is-link to="/user/edit"  @click="toEdit('avatarUrl','头像',user.avatarUrl)">
                <img style = "height: 48px"   :src = "user.avatarUrl"/>
            </van-cell>
            <van-cell title="电话"    is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
            <van-cell title="邮箱"    is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
            <van-cell title="账号"       :value="user.userAccount" />
            <van-cell title="星球编码"   :value="user.planetCode" />
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
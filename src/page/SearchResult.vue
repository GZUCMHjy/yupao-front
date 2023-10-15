<template>
<user-card-list :user-list = "userList"/>
    <van-empty v-if="!userList||userList.length<1" description="暂无数据"></van-empty>
</template>

<script  setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from "../plugins/myAxios.ts"
import UserCardList from '../components/UserCardList.vue';
import qs from 'qs';
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';
// import { Toast } from 'vant';
    const route = useRoute()
    const {tags} = route.query;//获取请求地址的params（因为这个地址的请求参数就是tags标签）
    const userList = ref([]);
    onMounted(async ()=>{
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags
        },
        // 
        paramsSerializer: params =>{
            return qs.stringify(params,{indices: false})
        }
    })
    .then(function (response) {
        console.log('/user/search/tags',response);
        showSuccessToast('查询成功')
        // return response.data?.data;
        return response?.data;
    })
    .catch(function (error) {
        showFailToast( '查询失败'+ (res.description ? `.${res.description}` : ''))
        // Toast.fail("请求失败")
        
    })
    if(userListData){
        userListData.forEach(user=>{
            if(user.tags){
                user.tags = JSON.parse(user.tags)
            }
        })
        userList.value = userListData;
        console.log('数据',userListData)
    }
    })

</script>

<style>
</style>
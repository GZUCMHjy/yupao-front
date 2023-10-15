<template>
    <div>
<van-form @submit="onSubmit">
    <van-field
      v-model="editUser.currentValue"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
    />

  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

    </div>
</template>

<script setup lang = "ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue"
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../services/user"
import { showFailToast, showSuccessToast } from "vant";
const router  = useRouter()
const route = useRoute()
const editUser = ref({
    editKey: route.query.editKey,
    editName: route.query.editName,
    currentValue: route.query.currentValue
})
console.log(route.query)
// 要异步请求 要不然拿到的对象是promise

const onSubmit = async () =>{
  const currentUser =  await getCurrentUser();
  if(!currentUser){
    // console.log("用户未登录");
    showFailToast('用户未登录')
    return ;
  }
   const res = await  myAxios.post('/user/update',{
      'id': currentUser.id,
      [editUser.value.editKey as string]: editUser.value.currentValue,

    })
    // 将数据提交给后台
    console.log("更新数据",res)
    if(res.code === 0 && res.data>0){
      showSuccessToast('修改成功')
      router.back()
    }
};
</script>

<style scoped> 
</style>
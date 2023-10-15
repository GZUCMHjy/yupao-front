<template>
   <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="userAccount"
      name="userAccount"
      label="用户名"
      placeholder="请输入账号"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="userPassword"
      type="password"
      name="userPassword"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

</template>

<script setup lang="ts">
 import {useRouter,useRoute} from "vue-router";
 import {ref} from "vue"
import myAxios from "../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import 'vant/es/dialog/style'
// import { Toast } from "vant";
    const router = useRouter();
    const route = useRoute()
    const userAccount = ref('');
    const userPassword = ref('');
    const onSubmit = async () => {
       const res =  await myAxios.post('user/login',{
            userAccount: userAccount.value,
            userPassword: userPassword.value
        })
        console.log(res,"用户登录")
        console.log(res.data.code,"用户登录状态码")
        // TODO 有问题
        if(res.code === 0 && res.data){
            // Toast.success("登录成功")
            // console.log("登录成功")
            showSuccessToast("登录成功")
            console.log('返回信息'+res.data)
            const redirectUrl = route.query?.redirect as string ?? '/'
            // 挑转到主页
            // router.replace(redirectUrl)
            window.location.href = redirectUrl;   
        }else{
            // Toast.fail("登录失败")
            // console.log("登录失败")
            showFailToast("登录失败")
        }
    };
   

</script>

<style>
</style>
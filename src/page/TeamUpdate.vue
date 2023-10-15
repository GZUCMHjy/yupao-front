<template>
    <div>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="addTeamData.name"
                name="name"
                label="队伍名"
                placeholder="请输入队伍名"
                :rules="[{ required: true, message: '请填写队伍名' }]"
            />
            <van-field
                v-model="addTeamData.description"
                rows="4"
                autosize
                label="队伍描述"
                type="textarea"
                placeholder="请输入队伍描述"
            />
            <van-field
                v-model="result"
                is-link
                readonly
                name="datePicker"
                label="时间选择"
                placeholder="点击选择时间"
                @click="showPicker = true"
                />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" :min-date="minDate"/>
            </van-popup>

            <van-field name="radio" label="队伍状态">
                <template #input>
                <van-radio-group v-model="addTeamData.status" direction="horizontal">
                    <van-radio name="0">公开</van-radio>
                    <van-radio name="1">私有</van-radio>
                    <van-radio name="2">加密</van-radio>
                </van-radio-group>
                </template>
            </van-field>
            <van-field
                v-if="Number(addTeamData.status) == 2"
                v-model="addTeamData.password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入队伍密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form> 
    </div>
</template>


<script setup>
import {useRouter,useRoute} from "vue-router";
import {ref,onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import { showFailToast, showSuccessToast } from "vant";

    // 扩展附... 不会修改默认初始值
    // 要引入ref 包 还要引入路由包 router 和 route
    // router 用于不同页面之间的跳转
    const router = useRouter()
    // route 用于或当前页面的信息
    const route = useRoute()
    // 展示日期选择器
    const showPicker = ref(false);
    const minDate = new Date();
    const addTeamData = ref({});
    const id = route.query.id;
    onMounted(async () => {
        if(id < 0){
            showFailToast('加载队伍失败')
            return 
        }
        const res = await myAxios.get('/team/get',{
            params: {
                id
            }
        })
        if(res?.code === 0 ){
            addTeamData.value = res.data
        }
        else{
            showFailToast('加载队伍失败');
        }
    })


    //提交
    const onSubmit = async () => {
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        //todo 前端数据校验
        const res = await myAxios.post("/team/update",postData);
        if (res?.code === 0 && res.data){
            showSuccessToast("更新成功")
            router.push({
                path:'/team',
                replace:true,
            });
        }else {
        showFailToast('更新失败' + (res.description ? `.${res.description}` : ''))
        }
    }
    const result = ref('');
    const onConfirm = ({ selectedValues }) => {
      result.value = selectedValues.join('/');
      showPicker.value = false;
    };

</script>
<style scoped>

</style>

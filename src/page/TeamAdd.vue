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
                    name="dateTimePicker"
                    label="选择过期时间"
                    placeholder="选择过期时间"
                    @click="showPicker = true"
                    />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" :min-date="minDate"/>
                     <!-- <van-datetime-picker
                        type="datetime"
                        value="{{ currentDate }}"
                        min-date="{{ minDate }}"
                        max-date="{{ maxDate }}"
                        bind:input="onInput"
                        /> -->
                </van-popup>


                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
                    </template>
                </van-field>
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
 import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import { showFailToast, showSuccessToast } from "vant";
import 'vant/es/dialog/style'

    const initFormData = {
        "description": "",
        "expireTime": null,
        "maxNum": 3,
        "name": "",
        "password": "",
        "status": 0,
        "userId": 0
    }
    // // 扩展附... 不会修改默认初始值
    // 要引入ref 包
    const addTeamData = ref({...initFormData});

    // 展示日期选择器
    const showPicker = ref(false);
    const minDate = new Date();
    //提交
    const onSubmit = async () => {
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        //todo 前端数据校验
        const res = await myAxios.post("/team/add",postData);
        if (res?.code === 0 && res.data){
            
            router.push({
                path:'/team',
                replace:true,
            });
            console.log("添加成功");
            showSuccessToast("创建成功")
        }else {
        //   Toast.fail("添加失败")
        // console.log("添加失败")
        showFailToast('创建失败' +(res.description ? `.${res.description}` : ''))
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

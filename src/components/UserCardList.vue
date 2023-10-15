<template>
    <!-- 骨架屏组件 -->
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
        <van-card 
            :desc="user.profile"
            :title="`${user.userName}(${user.planetCode})`"
            :thumb="user.avatarUrl"
            >
            <template #tags>
                <!-- 自定义展示标签 -->
                <van-tag plain type="primary" v-for="tag in user.tags"  style="margin-right: 8px;margin-top: 8px;">
                    <!-- 自定义插槽语法必不可少 -->
                    {{ tag }}
                </van-tag>
            </template>
            <template #footer>
                <van-button size="mini">联系我</van-button>
            </template>
        </van-card>
    </van-skeleton>


</template>
<script setup lang = "ts">
    import {UserType} from "../models/user"
    // 自定义组件标签
    interface UserCardListProps {
        loading: boolean;
        userList: UserType[];
    }
    const props = withDefaults(defineProps<UserCardListProps>(),{
        loading: true,
        // @ts-ignore
        userList: [] as UserType[],
    });
</script>
<style>
</style>
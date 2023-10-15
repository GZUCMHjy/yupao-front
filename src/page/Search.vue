<template>
    <form action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入要搜索的标签"
            @search="onSearch"
            @cancel="onCancel"
            fix="true"
        />
    </form>
    <!-- 分隔符 -->
    <van-divider content-position="left">已选标签</van-divider>
        <!-- 标签列表 如果数组activeId数组为空时，则不不进行分割 -->
    <div v-if="activeIds.length===0"></div>
    <van-row gutter="20" style="padding: 0 16px" >
         <!-- 从activeIds遍历出每一个tag 进行对应的doClose函数 -->
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="small" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>

    <van-divider content-position="left" >选择标签</van-divider>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
    <div style = "padding: 12px">
      <van-button block type="primary" @click="doSearchResult">
        搜索
    </van-button>
    </div>
 
</template>

<script setup>
    import {useRouter} from "vue-router";
    import { ref } from 'vue'; 
import { listProps } from "vant";
    const searchText = ref('');
    const originTagList = [{
        text: '性别',
        children: [
          { text: '男', id: '男' },
          { text: '女', id: '女' },
        ],
      },
      {
        text: '年级',
        children: [
          { text: '大一', id: '大一' },
          { text: '大二', id: '大二' },
          { text: '大三', id: '大三' },
          { text: '大四', id: '大四' },
        ],
      }
    //   { text: '福建', disabled: true },
    ];
    // 标签列表
    let tagList  = ref(originTagList);
    const onSearch = (val) => {

        tagList.value = originTagList.map(parentTag =>{
          const tempChildren = [...parentTag.children];
          const tempParentTag ={...parentTag};
          tempParentTag.children=tempChildren.filter(item=>item.text.includes(searchText.value));
          return tempParentTag;
        });
        // console.log(tagList.flagMap(parentTag => parentTag.children));
    }
    const onCancel = () => {
      searchText.value = '';
      tagList.value = originTagList;
    };
    // 已选中的标签
    const activeIds = ref([]);
    const activeIndex = ref(0);

    const doClose = (tag) =>{
      activeIds.value =  activeIds.value.filter(item =>{ 
          return tag!==item;
      })
    };
    const router = useRouter();
    /**
     * 用户搜索
     */
    const doSearchResult = ()=>{
        router.push({
            path: '/user/list',
            query: {
              tags: activeIds.value
            }
        })
    }
</script>

<style>
</style>
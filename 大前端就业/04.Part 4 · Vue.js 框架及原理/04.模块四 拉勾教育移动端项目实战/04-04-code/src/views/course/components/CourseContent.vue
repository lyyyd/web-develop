<template>
  <div class="course-content">
    <!-- 顶部广告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="item in activeAdList"
        :key="item.id"
      >
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list
      :fetchData="fetchData"
    ></course-content-list>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import CourseContentList from '@/components/CourseContentList'
import { getAllAds, getQueryCourses } from '@/services/course'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem
  },
  data () {
    return {
      // 轮播图图片列表
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  },
  methods: {
    // 传入请求
    fetchData (options) {
      return getQueryCourses(options)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999',
        status: 1
      })
      // 保存广告信息
      this.adList = data.content[0].adDTOList
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
}

.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.my-swipe img {
  height: 170px;
  margin: 0 auto;
}

// 底部课程列表的位置样式，不应该设置在组件内容
.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>

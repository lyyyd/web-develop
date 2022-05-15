<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
      <!-- 课程列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })"
        >
          <div>
            <!-- 所有商品与已购商品接口响应的图片地址属性名不同，需要检测 -->
            <img :src="item.courseImgUrl || item.image" alt="">
          </div>
          <div class="course-info">
            <!-- 课程名称检测 -->
            <h3 v-text="item.courseName || item.name"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <!-- 检测是否有价格，如果没有，说明为已购商品，不展示价格区域 -->
            <p
              v-if="item.price"
              class="price-container"
            >
              <span class="course-discounts">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { PullRefresh, List, Cell, Toast } from 'vant'
// import { getQueryCourses } from '@/services/course'

export default {
  name: 'CourseContentList',
  components: {
    VanPullRefresh: PullRefresh,
    VanList: List,
    VanCell: Cell
  },
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 数据列表
      list: [],
      // 是否要进行加载
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      // 还原数据页数为 1
      this.currentPage = 1
      // 重新请求数据
      /* const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10
      })
      // 清空并课程数据
      this.list = data.data.records */
      // 请求数据
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 如果存在数据，清空并课程数据，否则结束
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 1) {
        this.list = data.content
      } else {
        this.finished = true
      }
      // 提示
      Toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    },
    async onLoad () {
      /* const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10
      })
      // 保存课程数据
      this.list.push(...data.data.records) */
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 检测，如果没有数据了，结束，如果有，保存
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      } else {
        this.finished = true
      }
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.list.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
// 课程条目设置flex，内部元素左右显示
.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}

// 左侧图设置固定尺寸
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}

// 右侧内容区域 flex: 1 撑满父元素
.course-info {
  flex: 1;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}

.course-info h3 {
  margin: 0;
  line-height: 24px;
}

.course-info .course-preview {
  flex-grow: 1;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
}

.course-info .price-container {
  margin: 0;
}

.course-info .course-discounts {
  color: #ff7452;
  font-size: 14px;
  margin: 0;
  margin-right: 5px;
}
</style>

<template>
  <div class="course-info">
    <!-- 如果已购，去除底部支付区域并设置主体内容区域占满屏幕 -->
    <van-cell-group :style="styleOptions">
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-desctription">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }} </span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <!-- 详情在后台是通过富文本编辑器设置的，内容为 HTML 文本 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section-and-lesson
              v-for="item in sections"
              :key="item.id"
              :section-data="item">
            </course-section-and-lesson>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button
        type="primary"
        @click="handlePay"
      >立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Tab, Tabs, Tabbar } from 'vant'
import CourseSectionAndLesson from './components/CourseSectionAndLesson'
import { getCourseById, getSectionAndLesson } from '@/services/course'

export default {
  name: 'CourseInfo',
  components: {
    CourseSectionAndLesson,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanButton: Button,
    VanTab: Tab,
    VanTabs: Tabs,
    VanTabbar: Tabbar
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 章节与课时信息
      sections: {},
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSection()
  },
  methods: {
    handlePay () {
      // 检测是否登录
      if (this.$store.state.user) {
        // 如果已登录，跳转支付页
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        // 如果未登录，跳转登录页，并记录本页面信息，登录成功跳回到当前页
        // console.log(this.$route.fullPath)
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadSection () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    },
    async loadCourse () {
      // 请求课程数据
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}
.course-img {
  height: 280px;
}

.course-desctription {
  padding: 10px 20px;
  height: 150px;
}

.course-desctription h2 {
  padding: 0;
}

.course-saleInfo {
  display: flex;
}

.course-price {
  flex: 1;
  margin: 0;
}
// 修改 discounts 作用范围，让顶部与底部均可使用
.discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}

.course-saleInfo .tag{
  line-height: 15px;
  background: #f8f9fa;
  border-radius: 2px;
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
}

// 添加底部导航后设置
.van-cell-group {
  width: 100%;
  position: fixed;
  // 预留底部支付区域高度
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

// 调整内部文字位置
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  font-size: 14px;
}

.van-button {
  width: 50%;
  height: 80%;
}
</style>

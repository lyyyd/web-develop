<template>
  <div class="learn">
    <van-nav-bar title="已购课程" />
    <course-content-list
      :fetchData="fetchData"
    ></course-content-list>
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import CourseContentList from '@/components/CourseContentList'
import LayoutFooter from '@/components/LayoutFooter'
import { getPurchaseCourse } from '@/services/course'

export default {
  name: 'Learn',
  components: {
    LayoutFooter,
    CourseContentList,
    VanNavBar: NavBar
  },
  data () {
    return {
      // 课程信息
      courseList: []
    }
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>

<template>
  <div class="section-and-lesson">
    <!-- 章节标题 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时标题 -->
    <p
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      class="lesson"
      @click="handleClick(item)"
    >
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle" size="20" />
      <van-icon v-else name="lock" size="20" />
    </p>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: 'CourseSectionAndLesson',
  components: {
    VanIcon: Icon
  },
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
}
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>

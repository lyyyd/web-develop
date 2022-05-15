<template>
  <div class="layout-footer">
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="orders-o">选课</van-tabbar-item>
      <van-tabbar-item replace to="/learn" icon="desktop-o">学习</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'LayoutFooter',
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem
  }
}
</script>

<style lang="scss" scoped></style>

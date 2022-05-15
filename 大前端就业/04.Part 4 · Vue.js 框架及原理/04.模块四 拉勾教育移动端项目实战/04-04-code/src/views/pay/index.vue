<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="">
        <div class="price-info">
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使用此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：{{ username }}</div>
      </van-cell>
      <!-- 支付方式 -->
      <van-cell class="pay-channel">
        <div>
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell @click="radio = payInfo[1].channelCode">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio :name="1" />
                </template>
              </van-cell>
              <van-cell clickable @click="radio = payInfo[0].channelCode">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio :name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button @click="handlePay">￥{{ course.discounts }} 立即支付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Cell, Radio, RadioGroup, Button, Toast } from 'vant'
import { getCourseById } from '@/services/course'
import { createOrder, getPayInfo, initPayment, getPayResult } from '@/services/pay'
export default {
  name: 'Pay',
  components: {
    VanCellGroup: CellGroup,
    VanCell: Cell,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup,
    VanButton: Button
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
      // 支付方式
      radio: 1,
      // 订单号
      orderNo: null,
      // 支付方式信息
      payInfo: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadOrder()
  },
  methods: {
    async handlePay () {
      // 发起支付请求，获取支付地址与支付订单号
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === 1 ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagou.com/'
      })
      // 接收响应地址，并进行跳转
      window.location.href = data.content.payUrl

      const timer = setInterval(async () => {
        // 发起查询支付结果请求(此处使用)
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        // 如果支付结果成功，清除定时器，并提示购买成功，跳回到学习页
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          Toast.success('购买成功！')
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    },
    async loadOrder () {
    // 创建订单，获取商品订单号
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      this.orderNo = data.content.orderNo
      // 获取支付方式
      const { data: payInfo } = await getPayInfo({
        shopOrderNo: this.orderNo
      })
      this.payInfo = payInfo.content.supportChannels
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    }
  },
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
// 让容器盛满屏幕，用于 #app 没有宽度，设置定位脱标，让元素参考窗口尺寸
.pay {
  position: absolute;
  width: 100%;
  height: 100%;
}
// 容器
.van-cell-group {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
// 课程信息
.course-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;
  box-sizing: border-box;
}
// 让图片与右侧信息同行显示
.course-info .van-cell__value{
  display: flex;
}
// 课程图片
.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}
.price-info {
  height: 107px;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-info .course-name {
  font-size: 16px;
}
.price-info .discounts {
  font-size: 22px;
  font-weight: 700;
  color: #ff7452;
}

// 账户信息
.account-info {
  height: 120px;
  margin-bottom: 10px;
}

.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}

.account-info .username {
  margin: 20px 0 10px;
  font-size: 16px;
  font-family: PingFangSC-Regular,PingFang SC;
}
// 支付区域（占满剩余空间）
.pay-channel {
  flex: 1;
}
// 让 radio 与 按钮在上下两端
.pay-channel .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pay-channel .van-cell {
  padding: 20px 10px;
}
// 左侧标题插槽
.pay-channel .van-cell__title {
  display: flex;
  align-items: center;
}
.pay-channel .van-cell img {
  width: 28px;
  height: 28px;
}
.pay-channel .van-cell span {
  font-size: 16px;
  margin-left: 10px;
}

// 右侧 radio 选中颜色
::v-deep .van-radio__icon--checked .van-icon{
  background-color: #fbc546;
  border-color: #fbc546;
}

// 底部按钮样式
.pay-channel .van-button {
  background: linear-gradient(270deg,#faa83e,#fbc546);
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 18px;
}
</style>

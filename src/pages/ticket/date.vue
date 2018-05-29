<template>
  <div class="page ticket-page-date">
    <t-header title='出发日期'></t-header>
    <!-- 星期列表 -->
    <div class="weekdays flex flex-pack-justify flex-align-center">
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    <main class="page-content">
      <!-- 多月份日历, 模拟5 6 7三个月 -->
      <MonthDays @choose='choose' :month='item' v-for='(item, index) in months' :key='index'/>
    </main>
  </div>
</template>

<script>
import MonthDays from '@/components/MonthDays.vue'
export default {
  components: {
    MonthDays
  },
  methods: {
    choose (date) {
      const {callback} = this.$route.query
      if (!callback) return this.$router.go(-1)
      this.$router.push({
        path: callback,
        query: {
          date: date
        }
      })
    }
  },
  data () {
    return {
      months: ['2018/5', '2018/6', '2018/7']
    }
  }
}
</script>

<style lang='less'>
.ticket-page-date{
  .weekdays{
    background: #fff;
    height: 30px;
    font-size: 13px;
    color: #333;
    padding: 0 10px;
  }
}
</style>

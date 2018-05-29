<template>
  <div class="month-days">
    <div class="title">{{month.replace(/\//g, '-')}}</div>
    <div class="days">
      <span
        v-for='(item, index) in days'
        @click='choose(item.date)'
        :key='index'
        :class='{"today": today === item.date, "has-date": item.date!==""}'
      >{{item.number}}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['month'],
  created () {
    const [year, month] = this.month.split('/')
    const days = new Date(year, month, 0).getDate()
    const daysArray = []
    for (let i = 0; i < days; i++) {
      const day = i + 1
      daysArray.push({
        number: day,
        date: `${year}/${month}/${day}`
      })
    }

    this.days = this.panLeft(daysArray[0].date).concat(daysArray)
  },
  methods: {
    panLeft (date) {
      const days = new Date(date).getDay()
      const daysArray = []
      for (let i = 0; i < days; i++) {
        daysArray.push({
          number: '',
          date: ''
        })
      }
      return daysArray
    },
    getToday () {
      const date = new Date()
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/')
    },
    choose (date) {
      this.$emit('choose', date)
    }
  },
  data () {
    return {
      days: [],
      today: this.getToday()
    }
  }
}
</script>

<style lang='less'>
.month-days{
  .title{
    padding: 7px 0;
    font-size: 13px;
    color: #333;
    text-align: center;
  }
  .days{
    background: #fff;
    &>span{
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 14.28%;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: 500;
      color: #333;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
      &:active{background: #eee;}
      &.today{
        background-color: #0081ea;
        color: #fff;
        line-height: 70px;
        &::after{
          content: '今天';
          left: 0;
          top: 7px;
          line-height: 15px;
          position: absolute;
          font-size: 12px;
          text-align: center;
          width: 100%;
          font-weight: 100;
        }
      }
    }
  }
}
</style>

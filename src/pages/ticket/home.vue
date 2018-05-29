<template>
  <div class="page ticket-page">
    <t-header title='铁定行' :hideArrow='true'></t-header>
    <main class='page-content'>
      <!-- 选择出发目的地和日期 -->
      <div class="card search-ticket">
        <div class="search-ticket__header">
          <div class="cities flex flex-pack-justify">
            <div class="city" @click='selectCity(fromCity, "from")'>
              <p>出发地</p>
              <strong>{{fromCity}}</strong>
            </div>
            <div class="icon" @click='transfer'></div>
            <div class="city" @click='selectCity(toCity, "to")'>
              <p>目的地</p>
              <strong>{{toCity}}</strong>
            </div>
          </div>
          <div class="date" @click='selectDate()'>
            <strong>5月16日</strong>
            <span>今天</span>
            <span>星期三</span>
          </div>
        </div>
        <div class="search-ticket__body flex flex-pack-justify">
          <div class="tags">
            <span @click='checkType("all")' :class='{"active": type === "all"}'>全部</span>
            <span @click='checkType("1")' :class='{"active": type === "1"}'>高铁/动车</span>
            <span @click='checkType("2")' :class='{"active": type === "2"}'>普通车</span>
          </div>
          <div class="check flex flex-align-center">
            <label>
              <input type="checkbox">
              <i></i><span>学生票</span>
            </label>
          </div>
        </div>
        <div class="search-ticket__footer">
          <button class="btn query" @click='$router.push("/ticket/rail/list")'>查询</button>
        </div>
      </div>

      <!-- 正点查询，团购，包车，抢票 -->
      <div class="card others flex flex-pack-justify">
        <router-link class="item" to='/ticket/query'>
          <div class="img">
          </div>
          <p>正晚点查询</p>
        </router-link>
        <router-link class="item" to='/ticket/group'>
          <div class="img">
          </div>
          <p>团体购票</p>
        </router-link>
        <router-link class="item" to='/ticket/pack'>
          <div class="img">
          </div>
          <p>专列</p>
        </router-link>
        <router-link class="item" to='/ticket/rush'>
          <div class="img">
          </div>
          <p>抢票</p>
        </router-link>
      </div>

      <div class="sologan">
        <div class="img">
        </div>
        <p>官方出品 放心出行</p>
      </div>
    </main>
    <t-footer :active='0'></t-footer>
  </div>
</template>

<script>
export default {
  mounted () {
    const {cityType, city} = this.$route.query
    if (cityType) {
      if (cityType === 'from') {
        this.fromCity = city
      }
      if (cityType === 'to') {
        this.toCity = city
      }
    }
  },
  methods: {
    selectDate () {
      this.$router.push({
        path: '/ticket/date',
        query: {
          callback: '/ticket',
          current: this.currentDate
        }
      })
    },
    selectCity (cityName, type) {
      this.$router.push({
        path: '/ticket/cities',
        query: {
          callback: '/ticket',
          current: cityName,
          cityType: type
        }
      })
    },
    transfer () {
      const toCity = this.toCity
      const fromCity = this.fromCity
      this.fromCity = toCity
      this.toCity = fromCity
    },
    formatDateTime (time) {
      if (!time) return ''
      let date = new Date(Number(time))
      let Y = date.getFullYear() + '/'
      let M = date.getMonth() + 1 + '/'
      let D = date.getDate()
      return Y + M + D
    },
    checkType (type) {
      this.type = type
    }
  },
  data () {
    return {
      fromCity: '南昌',
      toCity: '成都',
      type: 'all',
      currentDate: this.formatDateTime(new Date())
    }
  }
}
</script>

<style lang='less'>
.ticket-page{
  .search-ticket{
    &__body{
      padding: 15px 0;
    }
    &__footer{
      padding: 10px 0;
    }
    .cities{
      border-bottom: 1px solid #eee;
      padding: 5px 0 7px 0;
      .icon{
        width: 50px;
        height: 50px;
      }
      .city{
        &~.city{text-align: right;}
        p{
          padding-bottom: 4px;
          font-size: 12px;
          color: #999;
        }
        strong{
          font-size: 25px;
          color: #333;
          font-weight: 500;
        }
      }
    }
    .date{
      border-bottom: 1px solid #eee;
      padding: 5px 0 7px 0;
      strong{
        padding-right: 10px;
        font-size: 25px;
        color: #333;
        font-weight: 500;
      }
      span{
        font-size: 15px;
        color: #333;
      }
    }
    .tags{
      span{
        padding: 4px 11px;
        display: inline-block;
        border-radius: 4px/2;
        border: solid 1px #008bfd;
        color: #0081ea;
        font-size: 15px;
        &+span{margin-left: 8px}
        &.active{
          background-color: rgba(0, 129, 234, 0.2);
        }
      }
    }
    .check{
      input{display: none;}
      input:checked+i{}
      i{
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 2px;
        border: solid 1px #0081ea;
        vertical-align: middle;
      }
      span{
        padding-left: 4px;
        font-size: 15px;
        color: #0081ea;
      }
    }
  }

  .others{
    text-align: center;
    font-size: 12px;
    a{
      width: 25%;
      color: #666;
    }
    .img{
      height: 30px;
      margin-bottom: 4px;
    }
  }

  .sologan{
    padding: 60px 0 40px 0;
    text-align: center;
    font-size: 10px;
    color: #999;
    font-weight: 100;
    .img{margin-bottom: 5px}
  }
}
</style>

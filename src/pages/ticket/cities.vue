<template>
  <div class="page ticket-page-cities">
    <t-header back='1' @back='goback' class='cities-header'>
      <Search slot='title'/>
    </t-header>
    <main class="page-content">

      <!-- 右侧导航 -->
      <div class="navs flex flex-v flex-pack-justify">
        <span v-for='(item, index) in navs' :key='item' @click='gotoNav(index)'>{{item}}</span>
      </div>

      <!-- 当前 -->
      <div class="tags">
        <div class="tag-title">当前/历史</div>
        <div class="tag-items">
          <span class='item'>
            <span @click='choose("西昌")'>
              西昌
            </span>
          </span>
          <span class='item' v-for='(item, index) in tag.history' :key='index'>
            <span @click='choose(item)'>{{item}}</span>
          </span>
        </div>
      </div>
      <!-- 常用 -->
      <div class="tags">
        <div class="tag-title">当前/历史</div>
        <div class="tag-items">
          <span class='item' v-for='(item, index) in tag.pop' :key='index'>
            <span @click='choose(item)'>{{item}}</span>
          </span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="tags" v-for='(item, index) in tag.list' :key='index'>
        <div class="tag-title">{{item.label}}</div>
        <ul class="tag-cells">
          <li @click='choose(item)' v-for='(item, index) in item.cities' :key='index'>{{item}}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  components: {
    Search
  },
  mounted () {
    this.$nextTick(() => {
      this.offset = this.initOffsetTop()
      this.body = document.querySelector('.page-content')
    })
  },
  methods: {
    goback () {
      const {callback, cityType} = this.$route.query
      this.$router.push({
        path: callback,
        query: {
          city: this.current,
          cityType: cityType
        }
      })
    },
    choose (city) {
      this.current = city
      this.goback()
    },
    gotoNav (index) {
      const offset = this.offset[index] - 60
      this.body.scrollTop = offset
    },
    initOffsetTop () {
      const cells = [...document.querySelectorAll('.tags')]
      const offset = []
      cells.forEach(item => {
        offset.push(item.offsetTop || 0)
      })
      return offset
    },
    clean () {
      this.inputValue = ''
    },
    submit () {

    },
    makeWords () {
      return 'abcdefghijklmnopqrstuvwxyz'.split('').map(i => i.toUpperCase())
    }
  },
  data () {
    return {
      current: this.$route.query.current,
      inputValue: '',
      offset: [],
      body: null,
      tag: {
        history: ['成都'],
        pop: ['北京', '上海', '广州', '南京', '成都', '西安', '重庆', '武汉', '深圳'],
        list: this.makeWords().map(item => {
          return {label: item, cities: ['阿克苏', '安庆', '安顺', '安阳', '安康', '阿勒泰', '鞍山']}
        })
      },
      navs: [
        '历史',
        '常用'
        ...this.makeWords()
      ]
    }
  }
}
</script>

<style lang='less'>
.ticket-page-cities{
  .tags{
    .tag-title{
      margin: 15px 10px 10px 10px;
      color: #999;
      font-size: 12px;
    }
    .tag-items{
      margin: 15px 40px 10px 10px;
      font-size: 0;
      .item{
        display: inline-block;
        width: 33.33%;
        &:nth-child(3n),
        &:nth-child(3n-1){
          span{margin-left: 5px}
        }
        span{
          margin-bottom: 5px;
          display: block;
          background: #fff;
          border-radius: 2px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          color: #333;
          font-size: 13px;
          cursor: pointer;
          img{
            vertical-align: -2px
          }
        }
      }
    }
  }
  .tag-cells{
    background: #fff;
    li{
      margin-left: 10px;
      padding: 11px 0;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      color: #333;
      cursor: pointer;
      &:last-child{border: 0;}
    }
  }

  .navs{
    position: fixed;
    right: 10px;
    top: 50px;
    bottom: 30px;
    text-align: center;
    color: #5d9ed3;
    font-size: 10px;
    span{
      cursor: pointer;
    }
  }

  .cities-header{
    .page-header--middle{
      width: 100%;
      margin-right: 10px;
    }
    .page-header--right{
      display: none;
    }
  }

}
</style>

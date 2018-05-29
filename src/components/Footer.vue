<template>
  <footer class="page-footer flex">
    <div
      class="page-footer--cell flex flex-v flex-align-center flex-pack-center"
      :class='{"active": index === active}'
      v-for="(item, index) in tabbars"
      :key='index'
      @click='navTo(item.path)'
    >
      <div class="icon" :icon='item.path'></div>
      <div class="label">{{item.label}}</div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    navTo (path) {
      this.$router.push(path)
    }
  },
  data () {
    return {
      tabbars: [
        {
          icon: '',
          label: '火车票',
          path: '/ticket'
        },
        {
          icon: '',
          label: '网约车',
          path: '/reservation'
        },
        {
          icon: '',
          label: '候车厅',
          path: '/waitingHall'
        },
        {
          icon: '',
          label: '更多',
          path: '/more'
        },
        {
          icon: '',
          label: '我的',
          path: '/user'
        }
      ]
    }
  }
}
</script>

<style lang='less'>
.page-footer{
  height: 50px;
  background: #fff;
  border-top: 1px solid #eee;
  &--cell{
    width: 25%;
    color: #666;
    font-size: 10px;
    text-align: center;
    &.active{
      color: #0081ea;
    }
    .icon{
      width: 24px;
      height: 24px;
      background-position: center center;
      background-size: 24px 24px;
      background-repeat: no-repeat;
    }
  }
}
</style>

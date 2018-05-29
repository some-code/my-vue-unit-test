<template>
  <div class="modal" v-if='dialogVisiable'>
    <div class="modal-mask"></div>
    <div class="modal-dialog">
      <div class="dialog-body">
        <div class="icon"></div>
        <slot>{{content}}</slot>
      </div>
      <div class="dialog-close" @click='close'></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.dialogVisiable = false
    }
  },
  data () {
    return {
      dialogVisiable: true
    }
  }
}
</script>

<style lang='less'>
  .modal{
    .modal-mask{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left:0 ;
      z-index: 999;
      background: rgba(0,0,0,0.5);
    }
    .modal-dialog{
      position: absolute;
      width: 150px;
      top: 40%;
      left: 50%;
      margin-left: -75px;
      z-index: 1000;
    }
    .dialog-body{
      padding: 20px;
      border-radius: 10px;
      background: #fff;
      font-size: 15px;
      color: #333;
      text-align: center;
    }
    .dialog-close{
      margin: 10px auto;
      width: 22px;
      height: 22px;
      color: #fff;
    }
  }
</style>

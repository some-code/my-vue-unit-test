<template>
  <div class="page-search">
    <form ref='form' class="search-input flex" @submit.prevent='submit'>
      <label class='flex'>
        <span class='search-icon search-prev'></span>
        <input required name='search' type="search"
          class='flex-1'
          :placeholder="placeholder"
          v-model='inputValue'
        />
        <span class='search-icon search-next' @click='clean' :hidden='!inputValue.length'></span>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.inputValue)
    },
    clean () {
      this.inputValue = ''
    }
  },
  data () {
    return {
      inputValue: ''
    }
  }
}
</script>

<style lang='less'>
.page-search{
  position: relative;
  height: 30px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 3px 20px 5px
    rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  overflow: hidden;
  .search-input{
    position: relative;
    background-clip: border-box;
    overflow: hidden;
    label{
      width: 100%;
    }
    .search-icon{
      height: 100%;
      width: 30px;
      color: #fff;
      font-size: 0;
      text-align: center;
      background-position: center center;
      background-size: 15px 15px;
      background-repeat: no-repeat;
    }
    input{
      height: 30px;
      padding: 10px 0 10px 0;
      font-size: 13px;
      color: #333;
      border: 0;
    }
  }
}
</style>

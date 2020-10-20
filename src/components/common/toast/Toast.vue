<template>
  <div id='toast' v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(msg, dur=1000) {
      this.message = msg
      this.isShow = true

      setTimeout((dur) => {
        this.message = ''
        this.isShow = false
      }, dur)
    } 
  }
}
</script>

<style scoped>
  #toast {
    background-color: rgba(240, 13, 13, 1);
    padding: 8px 12px;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  #toast span {
    color: #ffffff;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
</style>
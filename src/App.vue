<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  
  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style lang="stylus">
  html
    height 100%
    overflow hidden
    
  ::-webkit-scrollbar
    display none
  
  body
    height 100%
  
  #app
    min-height 100%
    background-image url("./assets/index.jpg")
    background-size cover
    background-position top
    font-family Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
  
  #navbar
    position fixed
    z-index 2
    margin-top 0
    width 100%
</style>

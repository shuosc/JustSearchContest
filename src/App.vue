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
#app
  min-height 100vh
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image url('./assets/index.jpg')
  background-size cover
  background-repeat no-repeat
  background-position center
  overflow hidden

html
  height 100%

body
  height 100%

::-webkit-scrollbar
  display none
</style>

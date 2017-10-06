<template>
 <div>
   <mu-flexbox>
    <mu-flexbox-item class="flex-demo">
      1
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      2
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      3
    </mu-flexbox-item>
   </mu-flexbox>
   <mu-flexbox>
    <mu-flexbox-item class="flex-demo">
      1
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      2
    </mu-flexbox-item>
    <mu-flexbox-item class="flex-demo">
      3
    </mu-flexbox-item>
   </mu-flexbox>
 </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

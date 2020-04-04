<template>
<div id="app">
    <router-view/>
</div>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Athiti:300,400,500&display=swap&subset=thai');
body{
  background-color: #f9fbfd;
  color: #53535f;
}
#app {
  font-family: 'Athiti', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  data: () => ({
    //
  }),
}
</script>

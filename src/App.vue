<template>
  <div id="app">
    <profile-nav v-if="getToken"/>
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App',

  data(){
    return {
      token:""
    }
  },

  computed:{
    getToken(){
      return  this.token = localStorage.getItem("access_token")
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>

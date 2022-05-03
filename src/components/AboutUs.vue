<template>

  <div class="container-fluid">
    <div class="row m-4">
      <div class="col-sm-8">

        <h1 class="d-flex align-items-start" style="font-family: 'DejaVu Serif'; font-size: 150px">{{name}}</h1>
        <h4 style="font-family: Navilu" class="m-3">{{ about }}</h4>
      </div>
      <div class="col-sm-4">
        <span class="glyphicon glyphicon-signal logo">
          <img :src="'http://127.0.0.1:8000/logo/' + logo" alt="img" style="width: 300px; height: 300px;" class="border">


        </span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      name:"",
      logo:"",
      about:""
    }
  },
  mounted() {
     this.showInfo()

  },

 methods:{
   async showInfo(){
     await this.axios.get(`getInfo`).then(response=>{
       this.name = response.data.info.name
       this.about = response.data.info.about
       this.logo = response.data.info.file

       console.log(response.data.info.file.name)
     }).catch(error=>{
       console.log(error)
     })
   },
 }

}
</script>

<style>

</style>


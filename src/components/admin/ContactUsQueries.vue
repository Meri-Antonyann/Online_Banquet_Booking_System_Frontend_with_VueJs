<template>
  <div>
    <h1>Queries</h1>

    <div class="border mt-5 d-flex justify-content-center" v-for="querie in queries" :key="querie.id">
      <b-icon icon="x-circle" font-scale="2" class="myicon text-danger" @click="destroy(querie.id)" ></b-icon>
      <div class="justify-content-center">
       <p class="fw-bolder">{{querie.email}}</p>
       <p>{{querie.message}}</p>
     </div>
    </div>
    <div  style="border: none; background-color: white" v-if="queries.length == 0">
      <p class="h3 mt-1 text-secondary ">There are no queries!</p>
    </div>
  </div>
</template>

<script>
export default {

  data(){
    return{
      queries:[]
    }
  },
  mounted() {
    this.getQueries()
  },

  methods:{
    getQueries() {
     this.axios.get('getGuestMessage').then(response=>{
       this.queries= response.data.messages
       console.log(response.data.messages)
     })
    },
    destroy(id){
      this.axios.delete(`deleteQuery/${id}`).then(response=>{
        if(response){
          this.getQueries()
        }
      })
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
   <section v-if="role">
     <h1>Events</h1>
     <validation-observer ref="observer">
       <b-form @submit.prevent="addevent" class="d-flex"  style="margin-top: 20px">
         <validation
           name="name"
           rules="required"
         >
           <b-form-group
             label-class="form-label"
             label="Event type"
             label-for="name"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="name"
               v-model="name"
               :state="errors[0] ? false : null"
               trim
             />
           </b-form-group>
         </validation>


         <div  class="mx-2" style="margin-top: 40px">
           <b-button
             variant="success"
             block
             type="submit"
             @click="refreshing"
           >
            Add
           </b-button>
         </div>
       </b-form>
     </validation-observer>
   </section>

   <table class="table table-bordered " style="width: 400px; height: auto; margin-top: 60px">
     <thead>
     <tr>
       <th>Name</th>
       <th v-if="role">Actions</th>

     </tr>
     </thead>
     <tbody v-if="events.length > 0  " >
     <tr v-for="(event,key) in events" :key="key">
       <td>{{ event.name }}</td>

       <td v-if="role">
         <router-link :to='{name:"EditEvent",params:{id:event.id}}' class="btn btn-success">Edit</router-link>
         <button type="button" @click="destroy(event.id)" class="btn btn-danger">Delete</button>
       </td>
     </tr>
     </tbody>
     <tbody v-else>
     <tr>
       <td colspan="4" align="center">No Events Found.</td>
     </tr>
     </tbody>
   </table>


 </div>
</template>

<script>
export default {
   data(){
     return {
       name: "",
       events:[]
     }
   },
  computed:{
    role(){
      const data = localStorage.getItem("role")
      if (data ==="admin"){
        return true
      }
    }
  },
  mounted() {
  this.getEvents()
     },

  methods:{

    async addevent(){

       let valid = await this.$refs.observer.validate();
       if (!valid) return false;

       let formData = new FormData;

       formData.append('name', this.name);

       this.axios.post('addevent', formData).then(function (response) {
         console.log(response)

       })
         .catch(err => {
           if (err) console.log(err);
         });

    },

  refreshing(){
    this.$router.go()
  },

       async getEvents(){
         await this.axios.get('getevents').then(response=>{
           this.events = response.data.events
           console.log(this.events)
         }).catch(error=>{
           console.log(error)
           this.events = []
         })
       },

    destroy(id){
      if(confirm("Are you sure to delete this post ?")){
        this.axios.get(`delete-event/${id}`).then(response=>{
          this.getEvents()
        }).catch(error=>{
          console.log(error)
        })
      }
    }

   }

}
</script>

<style scoped>

</style>

<template>

   <div  style=" margin: 0 auto;  " class="d-flex flex-column justify-content-center align-items-center">
     <h1 class="mb-5">Booking queries</h1>
     <div  >
       <div  v-for="(booking,key) in bookings" :key="key" class="p-3 mt-3" style="width: 400px; height: auto; background-color: mediumpurple; border: 1px solid black">
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">{{booking.name}}</p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">{{booking.email}}</p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">Phone: </span>
           {{booking.number}}
         </p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">Number of guests:</span>
           {{booking.guests}}
         </p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">Booking to:</span>
           {{booking.dateTo}}
         </p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">Event:</span>
           {{booking.event}}
         </p>
         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">Service:</span>
           {{booking.service}}
         </p>

         <p class="bg-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
           <span class="fw-bolder">  Message:</span>
           {{booking.message}}
         </p>

         <div class="d-flex justify-content-between mt-5 w-50" style="margin: 0 auto">
           <button class="btn btn-dark" @click="approve(booking.id)">
             Approve
           </button>
           <button class="btn btn-dark" @click="reject(booking.id)">
             Reject
           </button>
         </div>

       </div>

     </div>

     <div  style="border: none; background-color: white" v-if="bookings.length == 0">
       <p class="h3 mt-1 text-secondary ">There are no queries!</p>
     </div>

   </div>

</template>

<script>
export default {
data(){
  return{
    bookings:[]
  }
},
  mounted() {
  this.getQueries()
  },
  methods:{
    async getQueries(){
      await this.axios.get('getQueries').then(response=>{
        this.bookings = response.data.booking
        console.log(this.bookings, "bookings")
        console.log(this.bookings.length, "length")
      }).catch(error=>{
        console.log(error)
        this.events = []
      })
    },

    approve(id){
      this.axios.get(`approve/${id}`).then(response=>{
        this.getQueries()
      }).catch(error=>{
        console.log(error)
      })

    },

    reject(id){
      this.axios.get(`reject/${id}`).then(response=>{
        this.getQueries()
      }).catch(error=>{
        console.log(error)
      })

    }


  },

}
</script>

<style>

</style>

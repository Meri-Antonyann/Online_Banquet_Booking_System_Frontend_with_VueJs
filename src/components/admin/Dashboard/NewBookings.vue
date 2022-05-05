<template>
  <div   style="width: 400px; height: auto;  margin: 0 auto; ">
    <h1>New Bookings</h1>
    <div v-for="(booking,key) in bookings" :key="key" class="p-3  " style="border: 1px solid black;background-color: mediumpurple;">
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
        <span class="fw-bolder">Booking from:</span>
        {{booking.created_at.split('T')[0]}}
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

      <div class="bg-dark mt-5 w-50" style="margin: 0 auto">
        <p class="text-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
          <span class="fw-bolder text-light">  Status:</span>
          {{booking.status}}
        </p>

      </div>

    </div>
    <div  style="border: none; background-color: white" v-if="bookings.length == 0">
      <p class="h3 mt-1 text-secondary ">There are no bookings!</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      bookings:[],

    }
  },
  mounted() {
    this.getNewBookings()

  },
  methods:{
    async getNewBookings(){
      await this.axios.get('getNewBookings').then(response=>{
        this.bookings = response.data.new
        console.log(response.data)
      }).catch(error=>{
        console.log(error)
        this.events = []
      })
    },

  },

}
</script>

<style>

</style>

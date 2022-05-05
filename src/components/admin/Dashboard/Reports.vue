<template>
  <div class="container d-flex flex-column align-items-center justify-content-center ">
    <h1 class="mb-4">Get bookings in a particular period</h1>
    <validation-observer ref="observer">
      <b-form @submit.prevent="getData" class="d-flex" >
        <validation
          name="fromDate"
          rules="required"
          class="mx-2"
        >
          <b-form-group
            label-class="form-label"
            label="From"
            label-for="fromDate"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="fromDate"
              v-model="data.fromDate"
              type="date"
              :state="errors[0] ? false : null"
              trim
            />
          </b-form-group>
        </validation>

        <validation
          name="toDate"
          rules="required"
        >
          <b-form-group
            label-class="form-label"
            label="To "
            label-for="toDate"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="fromDate"
              v-model="data.toDate"
              type="date"
              :state="errors[0] ? false : null"
              trim
            />
          </b-form-group>
        </validation>

        <div class="mt-4 mx-2">
          <b-button
            variant="primary"
            block
            type="submit"
          >
            Get Bookings
          </b-button>
        </div>

      </b-form>
    </validation-observer>



   <div>
     <div v-if="bookings.length>0">
       <div v-for="(booking,key) in bookings" :key="key" class="p-3 mt-3" style="width: 400px; height: auto; background-color: mediumpurple; margin: 0 auto; border: 1px solid black">
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

         <div class="bg-dark mt-5 w-50" style="margin: 0 auto">
           <p class="text-light w-50 mb-3" style="margin: 0 auto; opacity: 0.5; color: black">
             <span class="fw-bolder text-light">  Status:</span>
             {{booking.status}}
           </p>

         </div>


       </div>
     </div>
     <div class="mt-5 text-danger fw-bolder"  v-else>
       <p v-if="query">
         There are no bookings for this period !
       </p>
     </div>
   </div>

  </div>
</template>

<script>
export default {
data(){
  return{
     data:{
       fromDate:"",
       toDate:"",
     },
      bookings:[],
    query:false
  }
},

  methods:{
    getData(){

      let valid =   this.$refs.observer.validate();
      if (!valid) return false;

      this.axios.post('bookingsForSomePeriod', this.data).then(response=>{
        this.query =true
        this.bookings = response.data.bookings
        console.log(this.bookings)

      })
    },

  }

}
</script>

<style>

</style>

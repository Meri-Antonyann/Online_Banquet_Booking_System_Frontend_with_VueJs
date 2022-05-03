<template>
  <div   style="width: 400px; height: auto; background-color: mediumpurple; margin: 0 auto; border: 1px solid black">
    <div v-for="(booking,key) in bookings" :key="key" class="p-3 mt-3">
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
        <span class="fw-bolder">  Service Price:</span>
        ${{booking.price}}
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
        <p>{{count}}</p>
      </div>

      <div class="border">
        <h5>Remarks by admin</h5>
        <p v-for="(remark,key) in booking.remarks" :key="key"  class="text-danger">{{remark.message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      bookings:[],
      count:"",
      remarks:[]
    }
  },
  mounted() {
    this.getMyQueries(),
      this.getCount(),
      this.getRemark()
  },
  methods:{
    async getMyQueries(){
      await this.axios.get('getMyQueries').then(response=>{
        this.bookings = response.data
        console.log(response.data)
      }).catch(error=>{
        console.log(error)
        this.events = []
      })
    },

    async getCount(){
      await this.axios.get('counts').then(response=>{
        this.count = response.data.count
        console.log(response.data.count)
      }).catch(error=>{
        console.log(error)

      })
    },

    // async getRemark(){
    //   await this.axios.get('remarks').then(response=>{
    //     this.remarks = response.data.remarks
    //     console.log(response.data.remarks, "remarks")
    //   }).catch(error=>{
    //     console.log(error)
    //
    //   })
    // },
  },

}
</script>

<style>

</style>

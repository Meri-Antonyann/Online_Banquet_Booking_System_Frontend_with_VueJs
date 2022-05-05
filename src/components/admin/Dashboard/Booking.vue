<template xmlns="http://www.w3.org/1999/html">
  <div   style="width: 400px; height: auto;  margin: 0 auto; ">
    <h1>BOOKINGS</h1>
    <div v-for="(booking,key) in bookings" :key="key" class="p-3 mt-3" style="background-color: mediumpurple; border: 1px solid black">
      <p class="bg-light w-50 mb-3 " style="margin: 0 auto; opacity: 0.5; color: black">{{booking.name}}</p>
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

      <form style="border-radius: 5px  " >
        <div class="form-group mx-sm-3 mb-2 ">
          <input type="text" class="form-control bg-dark text-light mt-2"
                 v-model="score.inputtext[booking.id]"
                 placeholder="Give a remark ... "
          >
        </div>

        <button type="submit" class="btn-primary mb-2 bg-dark"  @click.prevent="sendRemark(booking.user_id)">Send</button>
      </form>
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
      message:"",
      error:"",
      elementVisible:false,
      isShow:false,
      score:{
        inputtext: []
      }


    }
  },


  mounted() {
    this.getBookings()
  },

  watch: {
    "score.inputtext"(val){
      console.log(val, "inputtetx")
    }
  },


  methods:{
    async getBookings(){
      await this.axios.get('getBookings').then(response=>{
        this.bookings = response.data.bookings
        console.log(response.data)
      }).catch(error=>{
        console.log(error)
        this.events = []
      })
    },

    async sendRemark(id){
      console.log(this.score.inputtext)
      await this.axios.post(`sendRemark/${id}`,this.score).then(response=>{
        if (response){
          this.isShow= true

        }
        this.$router.go()
        alert("Remark sent")
      }).catch(error=>{
        if (error){
          alert("You have an error!")
        }
      })
    },



  },

}
</script>

<style>

</style>

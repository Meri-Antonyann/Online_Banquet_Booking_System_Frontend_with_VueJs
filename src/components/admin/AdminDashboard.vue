<template>
  <div class="d-flex flex-column justify-content-center align-items-center" style="margin-left: 200px">
    <div class="row mt-5 d-flex justify-content-between">
      <div class="col-3 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
           <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
                   <span>{{unreadBookings}}</span>
           </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <b-icon icon="book"  font-scale="3"></b-icon>
          <router-link to="/unread" class="text-dark mt-2" >Total Unread Queries</router-link>
        </div>
      </div>

      <div class="col-3 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
        <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
          <span>{{readBookings}}</span>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <b-iconstack font-scale="3">
            <b-icon stacked icon="square"></b-icon>
            <b-icon stacked icon="check"></b-icon>
          </b-iconstack>
          <router-link to="/read" class="text-dark mt-2" >Total Read Queries</router-link>
        </div>
      </div>

      <div class="col-3 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
        <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
          <span>{{newBooking}}</span>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <b-icon icon="pen" font-scale="3"></b-icon>
          <router-link to="/new" class="text-dark mt-2" >Total New Booking</router-link>
        </div>
      </div>

      <div class="col-3 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
        <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
          <span>{{ approvedBookings }}</span>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <b-icon icon="hand-thumbs-up"  font-scale="3"></b-icon>
          <router-link to="/approved" class="text-dark mt-2" >Total Approved Booking</router-link>
        </div>
      </div>

    </div>

    <div class="row mt-5 d-flex justify-content-between">

        <div class="col-4 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
          <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
            <span>{{cancelledBookings}}</span>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <b-icon icon="hand-thumbs-down"  font-scale="3"></b-icon>
            <router-link to="/cancelled" class="text-dark mt-2" >Total Cancelled Booking</router-link>
          </div>
        </div>

        <div class="col-4 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
          <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
            <span>{{services}}</span>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <b-icon icon="arrow-down-circle-fill"  font-scale="3"></b-icon>
            <router-link to="/services" class="text-dark mt-2" >Total Services</router-link>
          </div>
        </div>

        <div class="col-4 m-2" style="width: 200px; height: 130px; border: 1px solid blueviolet; background-color: mediumpurple">
          <div style="width: 25px; height: 20px; background-color: white; opacity: 0.5; right: 0" class="mt-1">
            <span>{{events}}</span>
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <b-icon icon="bookmarks"  font-scale="3"></b-icon>
            <router-link to="/add-event" class="text-dark mt-2" >Total Event Type</router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      approvedBookings:"",
      cancelledBookings:"",
      unreadBookings:"",
      readBookings:"",
      services:"",
      events:"",
      newBooking:""
    }
  },
  mounted() {
    this.getApproved(),
      this.getCancelled(),
      this.getServices(),
      this.getEvents(),
      this.getnewBooking()
      this.getUnread()
      this.getRead()
  },
  methods:{
    async getApproved(){
      await this.axios.get('getApproved').then(response=>{
        this.approvedBookings = response.data.approved
        console.log(this.approvedBookings)
      }).catch(error=>{
        console.log(error)
        this.bookings = []
      })
    },
    async getUnread(){
      await this.axios.get('unread').then(response=>{
        this.unreadBookings = response.data.unread
        console.log(this.this.unreadBookings )
      }).catch(error=>{
        console.log(error)
        this.bookings = []
      })
    },  async getRead(){
      await this.axios.get('ReadBookings').then(response=>{
        this.readBookings = response.data.read
        console.log(this.this.this.readBookings  )
      }).catch(error=>{
        console.log(error)
        this.bookings = []
      })
    },

    async getCancelled(){
      await this.axios.get('getCancelled').then(response=>{
        this.cancelledBookings = response.data.cancelled
        console.log(this.cancelledBookings)
      }).catch(error=>{
        console.log(error)
        this.bookings = []
      })
    },

    async getServices(){
      await this.axios.get('getServices').then(response=>{
        this.services = response.data.totalServices
        console.log(this.services)
      }).catch(error=>{
        console.log(error)

      })
    },
    async getEvents(){
      await this.axios.get('getEvents').then(response=>{
        this.events = response.data.totalEvents
        console.log(this.services)
      }).catch(error=>{
        console.log(error)

      })
    },

    async getnewBooking(){
      await this.axios.get('newBooking').then(response=>{
        this.newBooking = response.data.new
        console.log(this.newBooking)
      }).catch(error=>{
        console.log(error)

      })
    },

  },

}
</script>

<style>

</style>

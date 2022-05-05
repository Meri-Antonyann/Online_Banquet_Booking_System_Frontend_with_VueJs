<template>
  <div   style="width: 400px; height: auto; background-color: mediumpurple; margin: 0 auto; border: 1px solid black">
    <div class="p-3 mt-3">
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
    return {
      booking:{}
    }
  },
  mounted() {
    this.searchdata()
    },
  methods:{
    async searchdata(){
      await this.axios.get(`searchdata/${this.$route.params.id}`).then(response=> {
        this.booking = response.data.booking
        console.log(this.booking)
      })
    },
  }
}
</script>

<style>

</style>

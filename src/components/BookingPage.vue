
<template>
  <div class="bg-dark d-flex align-items-center justify-content-center p-5">
    <validation-observer ref="observer">
        <b-form @submit.prevent="sendData" >
          <validation
            name="name"
            rules="required|alpha_spaces"
          >
            <b-form-group
              label-class="form-label"
              label="Name"
              label-for="name"
              class="text-light mt-3"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="name"
                v-model="name"
                style="opacity: 0.5"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <validation
            name="email"
            rules="required|email"
          >
            <b-form-group
              label-class="form-label"
              label="Email"
              label-for="email"
              class="text-light mt-3"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="email"
                v-model="email"
                style="opacity: 0.5"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <validation
            name="number"
            rules="required"
          >
            <b-form-group
              label-class="form-label"
              label="Number"
              label-for="number"
              class="text-light mt-3"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="number"
                v-model="number"
                style="opacity: 0.5"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <validation
            name="numberofguest"
            rules="required"
          >
            <b-form-group
              label-class="form-label"
              label="Number of guests"
              label-for="number"
              class="text-light mt-3"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="number"
                v-model="guests"
                style="opacity: 0.5"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <validation
            name="dateTo"
            rules="required"

          >
            <b-form-group
              label-class="form-label"
              label="Booking to"
              label-for="dateTo"
              class="text-light  mt-3"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="dateTo"
                type="date"
                v-model="dateTo"
                style="opacity: 0.5"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <label for="service" class="text-light mt-3"> Service Name</label>
          <select v-model="selectedservice" @change="myFunc($event)" name="serviceid" class="w-100 mt-3 " id="service" style="opacity: 0.5; height: 35px; border-radius: 5%">
            <option v-for="item in services" :value="item.name" >
              {{item.name}}
            </option>
          </select>

          <label for="event" class="text-light mt-3"> Type of event</label>
          <select v-model="selectedevent" @change="onchange($event)"  class="w-100 mt-3 " style="opacity: 0.5; height: 35px; border-radius: 5%">
            <option v-for="event in events" :value="event.name" >
              {{event.name}}
            </option>
          </select>


          <validation
            name="message"
            rules="required"
          >
              <b-form-group
                label-class="form-label"
                label="Message"
                label-for="message"
                class="text-light  mt-3"
                slot-scope="{ errors }"
                :invalid-feedback="errors[0]"
              >
                <b-form-textarea
                  id="message"
                  type="text"
                  v-model="message"
                  style="opacity: 0.5"
                  :state="errors[0] ? false : null"
                  trim

                />
              </b-form-group>
          </validation>

          <div class="mt-3">
            <b-button
              variant="success"
              block
              type="submit"
              class="w-75"
            >
              Send
            </b-button>
          </div>

        </b-form>
    </validation-observer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        services:[],
        selectedservice:"",
        selectedevent:"",
        events:[],
        name:"",
        email:"",
        dateTo:"",
        number:"",
        message:"",
        guests:"",
         myFunc(e){
          return this.selectedservice = e.target.value
          console.log(this.selectedservice)
        },

        onchange(e){
         return  this.selectedevent = e.target.value
          console.log(this.selectedevent)
        }
      }

      },

    mounted() {
      this.getServices(),
      this.getEvents()
    },

    methods:{
      async getServices(){
        await this.axios.get('getservices').then(response=>{
          this.services = response.data.services
          console.log(this.services)
        }).catch(error=>{
          console.log(error)
          this.services = []
        })
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


      async sendData() {
        let valid = await this.$refs.observer.validate();
        if (!valid) return false;

        let formData = new FormData();

        formData.append('name', this.name);
        formData.append('email', this.email);
        formData.append('number', this.number);
        formData.append('dateTo', this.dateTo);
        formData.append('guests', this.guests);
        formData.append('event', this.selectedevent);
        formData.append('service', this.selectedservice);
        formData.append('message', this.message);



          this.axios.post('/storeBooking', formData)
            .then(function (response) {
              console.log(response)
              if(response.status == 200) alert("Booking question sent!")
            })
            .catch(err => {
              if (err) console.log(err);
            });

         } ,
    }

  }
</script>

<style>

</style>

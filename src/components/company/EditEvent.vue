<template>
  <b-container class="px-0 mt-5">
    <b-row>
      <b-col
        cols="8"
        class="mx-auto"
      >
        <div class="card">
          <div class="card-header  " >
            <h4>Update Event</h4>
          </div>
          <div class="card-body">
            <b-form @submit.prevent="editevent"  >
              <b-form-group
                label-class="form-label"
                label="Name"
                label-for="name"

              >
                <b-form-input
                  id="name"
                  v-model="event.name "
                  trim
                />
              </b-form-group>

              <b-row>
                <b-col cols="12">

                  <button type="submit" class="btn btn-primary" >Save</button>

                </b-col>


              </b-row>
            </b-form>

          </div>
        </div>

      </b-col>
    </b-row>
  </b-container>



</template>

<script>
export default {
  name:"update-post",
  data(){
    return {
      event:{
        name:"",
      }
    }
  },
  mounted(){
    this.showEvent()
  },
  methods:{

    async showEvent(){
      await this.axios.get(`showevent/${this.$route.params.id}`).then(response=>{
        this.event.name = response.data.event[0].name
        console.log(this.event.name)
      }).catch(error=>{
        console.log(error)
      })
    },
    async editevent(){

      await this.axios.post(`updateevent/${this.$route.params.id}`,this.event).then(response=>{
        this.$router.push({name:"AddEvent"})
      }).catch(error=>{
        console.log(error)
      })
    }

  }
}
</script>

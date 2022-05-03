<template>
  <b-container class="px-0 mt-5">
    <b-row>
      <b-col
        cols="8"
        class="mx-auto"
      >
        <div class="card">
          <div class="card-header  " >
            <h4>Update Service</h4>
          </div>
          <div class="card-body">
            <b-form @submit.prevent="editservice"  >
              <b-form-group
                label-class="form-label"
                label="Name"
                label-for="name"

              >
                <b-form-input
                  id="name"
                  v-model="service.name "
                  trim
                />
              </b-form-group>

              <b-form-group
                label-class="form-label"
                label="Price"
                label-for="price"

              >
                <b-form-input
                  id="price"
                  v-model="service.price "
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
      service:{
        name:"",
        price:""
      }
    }
  },
  mounted(){
    this.showService()
  },
  methods:{

    async showService(){
      await this.axios.get(`showservice/${this.$route.params.id}`).then(response=>{
        this.service.name = response.data.service[0].name
        this.service.price = response.data.service[0].price
        console.log(this.service.name)
      }).catch(error=>{
        console.log(error)
      })
    },
    async editservice(){

      await this.axios.post(`updateservice/${this.$route.params.id}`,this.service).then(response=>{
        this.$router.push({name:"AddService"})
      }).catch(error=>{
        console.log(error)
      })
    }

  }
}
</script>

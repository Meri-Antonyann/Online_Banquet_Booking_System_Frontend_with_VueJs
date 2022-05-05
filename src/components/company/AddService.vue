<template>
  <div class="_homeimage d-flex align-items-center justify-content-center">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <section v-if="role" >
          <h1>Services</h1>

          <validation-observer ref="observer">
            <b-form @submit.prevent="addservice" class="d-flex"  style="margin-top: 20px">
              <validation
                name="name"
                rules="required"
              >
                <b-form-group
                  label-class="form-label"
                  label="Service name"
                  label-for="name"
                  class="m-2"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    :state="errors[0] ? false : null"
                    trim
                  />
                </b-form-group>
              </validation>


              <validation
                name="price"
                rules="required"
              >
                <b-form-group
                  label-class="form-label"
                  label="Price"
                  label-for="price"
                  class="m-2"
                  slot-scope="{ errors }"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    id="price"
                    v-model="price"
                    type="number"
                    value="$"
                    class="m-2"
                    :state="errors[0] ? false : null"
                    trim
                  />
                </b-form-group>
              </validation>


              <div class="mx-2" style="margin-top: 40px">
                <b-button
                  variant="success"
                  block
                  type="submit"

                >
                  Add
                </b-button>
              </div>
            </b-form>
          </validation-observer>
        </section>

        <table class="table table-bordered " style="width: 500px; height: auto; margin-top: 60px; font-weight: bolder">
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th v-if="role">Actions</th>

          </tr>
          </thead>
          <tbody v-if="services.length > 0  " >
          <tr v-for="(service,key) in services" :key="key">
            <td >{{ service.name }}</td>
            <td>{{ service.price }}</td>

            <td v-if="role">
              <router-link :to='{name:"EditService",params:{id:service.id}}' class="btn btn-success" >Edit</router-link>
              <button type="button" @click="destroy(service.id)" class="btn btn-danger"  >Delete</button>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td colspan="4" align="center">No Services Found.</td>
          </tr>
          </tbody>
        </table>


  </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      price: "",
      services:[]
    }
  },
computed:{
  role(){
     const data = localStorage.getItem("role")
    if (data ==="admin"){
      return true
    }
  }
},
  mounted() {
    this.getServices()
  },

  methods:{

    async addservice(){

      let valid = await this.$refs.observer.validate();
      if (!valid) return false;

      let formData = new FormData;

      formData.append('name', this.name);
      formData.append('price', this.price);

      this.axios.post('addservice', formData).then(function (response) {
        console.log(response)

      })
        .catch(err => {
          if (err) console.log(err);
        });

    },

    refreshing(){
      this.$router.go()
    },

    async getServices(){
      await this.axios.get('getservices').then(response=>{
        this.services = response.data.services
        console.log(this.services)
      }).catch(error=>{
        console.log(error)
        this.services = []
      })
    },

    destroy(id){
      if(confirm("Are you sure to delete this post ?")){
        this.axios.get(`delete-service/${id}`).then(response=>{
          this.getServices()
        }).catch(error=>{
          console.log(error)
        })
      }
    }

  }

}
</script>

<style scoped>
._homeimage{
  width: 100%;
  height: 41em;
  background-image: url("./images/928ac32d5266a27fcc6752892a97b1e1.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;

}
</style>

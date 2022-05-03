<template>
  <div class="bg-dark flex-column d-flex align-items-center justify-content-center" style="height: 655px">
     <h1>Change password</h1>
      <section class="mt-3">
    <validation-observer ref="observer">
      <b-form @submit.prevent="changePsw"  >
        <validation
          name="currPsw"
          rules="required|min:8"
        >
          <b-form-group
            label-class="form-label"
            label="Current password"
            label-for="password"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="currPsw"
              type="password"
              v-model="formData.currPsw"
              placeholder="*******"
              :state="errors[0] ? false : null"
              trim
            />
          </b-form-group>
        </validation>

        <validation
          name="password"
          rules="required|min:8"
        >
          <b-form-group
            label-class="form-label"
            label="New Password"
            label-for="password"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="password"
              v-model="formData.password"
              type="password"
              :state="errors[0] ? false : null"
              trim
            />
          </b-form-group>
        </validation>

        <validation
          name="re-password"
          rules="required|min:8"
        >
          <b-form-group
            label-class="form-label"
            label="Confirm Password"
            label-for="re-password"
            slot-scope="{ errors }"
            :invalid-feedback="errors[0]"
          >
            <b-form-input
              id="re-password"
              v-model="formData.repassword"
              type="password"
              :state="errors[0] ? false : null"
              trim
            />
          </b-form-group>
        </validation>

        <div class="mt-3">
          <b-button
            variant="primary"
            block
            type="submit"
          >
           Change
          </b-button>
        </div>
      </b-form>
    </validation-observer>
  </section>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formData: {
        currPsw:"",
        password:"",
        repassword: ""

      }
    }
  },

  methods:{

    async changePsw(){
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;
      if(this.formData.password === this.formData.repassword){
        await this.axios.post(`changePsw/${this.$route.params.id}`, this.formData).then(response=>{
           console.log(this.$route.params.id, "id")
           if (response){
             alert("Password changed!")
           }
           this.$router.push({name: "Update"})
         })
        }else{
          alert("You have an error!")
       }
      }
  }
}
</script>

<style>

</style>

<template>
 <div class="d-flex justify-content-center bg-dark text-light">
   <section style="width: 500px; height: 655px" >
     <h1 class="mt-5">Change your password</h1>
     <validation-observer ref="observer">
       <b-form @submit.prevent="resetpassword"   >

         <b-form-group
           label-class="form-label"
           label="Email"
           label-for="email"
         >
           <b-form-input
             id="email"
             v-model="email"
             type="email"
             style="opacity: 0.2"
              disabled
           />
         </b-form-group>




         <validation
           name="password"
           rules="required|min:8"
         >
           <b-form-group
             label-class="form-label"
             label="Password"
             label-for="password"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="password"
               v-model="password"
               type="password"
               style="opacity: 0.2"
               :state="errors[0] ? false : null"
               trim
             />
           </b-form-group>
         </validation>
         <validation
           name="repassword"
           rules="required|min:8"
         >
           <b-form-group
             label-class="form-label"
             label="Confirm password"
             label-for="repassword"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="repassword"
               v-model="repassword"
               type="password"
               style="opacity: 0.2"
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
             Save
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
        password:"",
        repassword:"",
        email:""
      }
    },
    mounted() {
    this.checkRoute()
      },
  methods:{
    checkRoute(){
      if(Object.keys(this.$route.query).length) {
        this.email = this.$route.query.email;
        this.token = this.$route.query.token;
      }
    },

    async resetpassword() {
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('token', this.token);
      formData.append('password', this.password);

       this.axios.post('reset', formData).then(response=>{
              if(response){
                alert("Password recovered successfully!")
              }
       })

    }
  }

}
</script>

<style>
input{
  display: block;
}
</style>

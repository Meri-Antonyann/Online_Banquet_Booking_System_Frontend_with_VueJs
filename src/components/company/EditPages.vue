<template>
 <div class="d-flex justify-content-center align-items-center bg-dark " style="width: 100%; height: 700px; margin: 0 auto">
   <section class="m-5  ">
     <h1 class="text-light">Edit Contacts</h1>
     <validation-observer ref="observer">
       <b-form @submit.prevent="contacts"  class="text-light">
         <validation
           name="address"
           rules="required"
         >
           <b-form-group
             label-class="form-label"
             label="Address"
             label-for="address"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="address"
               v-model="dataone.address"

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
             label="Email Address"
             label-for="email"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="email"
               v-model="dataone.email"

               :state="errors[0] ? false : null"
               trim
             />
           </b-form-group>
         </validation>

         <validation
           name="phone"
           rules="required"
         >
           <b-form-group
             label-class="form-label"
             label="Phone"
             label-for="phone"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="phone"
               v-model="dataone.phone"
               type="number"

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
             class="w-100"
           >
             Save
           </b-button>
         </div>

       </b-form>
     </validation-observer>
   </section>

   <section class="m-5">
     <h1 class="text-light">Edit About us</h1>
     <validation-observer ref="observer">
       <b-form @submit.prevent="aboutUs"  class="text-light">
         <validation
           name="name"
           rules="required"
         >
           <b-form-group
             label-class="form-label"
             label="Name"
             label-for="name"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-input
               id="name"
               v-model="datatwo.name"

               :state="errors[0] ? false : null"
               trim

             />
           </b-form-group>
         </validation>


         <validation
           name="about"
           rules="required"
         >
           <b-form-group
             label-class="form-label"
             label="About"
             label-for="about"
             slot-scope="{ errors }"
             :invalid-feedback="errors[0]"
           >
             <b-form-textarea
               id="about"
               v-model="datatwo.about"
               placeholder="About ..."
               :state="errors[0] ? false : null"
               trim
             />
           </b-form-group>
         </validation>

<!--           <b-form-group-->
<!--             label-class="form-label"-->
<!--             label="Logo"-->
<!--             label-for="file"-->
<!--           >-->
<!--             <b-form-file-->
<!--               id="file"-->
<!--               type="file"-->
<!--               v-model="datatwo.file"-->
<!--               v-on:change="imageSelected"-->
<!--             ></b-form-file>-->
<!--           </b-form-group>-->


         <div class="mt-3">
           <b-button
             variant="primary"
             block
             type="submit"
             class="w-100"
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
    dataone:{
      address:"",
      email:"",
      phone:""
    },
    datatwo:{
      name:"",
      about:"",
      file: ""
    }
  }
},
  mounted() {
  this.showContact(),
    this.showInfo()
  },
  methods:{
    async showContact(){
      await this.axios.get(`getContact`).then(response=>{
        this.dataone.address = response.data.contact.address
        this.dataone.email = response.data.contact.email
        this.dataone.phone = response.data.contact.phone
        console.log(this.dataone.address)
      }).catch(error=>{
        console.log(error)
      })
    },

    async contacts(){
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;

      await this.axios.post(`updatecontacts`,this.dataone).then(response=>{
       alert("Successfully updated!")
      }).catch(error=>{
        console.log(error)
      })
    },

    async aboutUs() {
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
      let formData = new FormData();

      formData.append('name', this.datatwo.name);
      formData.append('about', this.datatwo.about);
      formData.append('file', this.datatwo.file);


        this.axios.post('aboutUs', formData, config)
          .then(response=>{
            alert("Successfully updated!")
          })
          .catch(err => {
            if (err) console.log(err);
          });

      } ,


    imageSelected(e){
      this.file = e.target.files[0];
    },

    async showInfo(){
      await this.axios.get(`getInfo`).then(response=>{
        this.datatwo.name = response.data.info.name
        this.datatwo.about = response.data.info.about
        this.datatwo.file = response.data.info.file

        console.log(response.data.info.file.name)
      }).catch(error=>{
        console.log(error)
      })
    },

  }

}
</script>

<style>

</style>

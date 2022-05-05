<template>
  <div class="_homeimage d-flex align-items-center justify-content-center">

    <section>
      <validation-observer ref="observer">
        <b-form @submit.prevent="update"  >
          <validation
            name="name"
            rules="required|alpha_spaces"
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
                class="text"
                v-model="name"
                style="opacity: 0.2"
                :state="errors[0] ? false : null"
                trim

              />
            </b-form-group>
          </validation>

          <validation
            name="surname"
            rules="required|alpha_spaces"
          >
            <b-form-group
              label-class="form-label"
              label="Surname"
              label-for="surname"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="surname"
                v-model="surname"
                style="opacity: 0.5;"
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
                class="text-dark"
                v-model="email"
                style="opacity: 0.5;"
                :state="errors[0] ? false : null"
                trim
              />
            </b-form-group>
          </validation>

<!--          <validation-->
<!--            name="file"-->
<!--          >-->
<!--            <b-form-group-->
<!--              label-class="form-label"-->
<!--              label="Image"-->
<!--              label-for="file"-->
<!--              slot-scope="{ errors }"-->
<!--              :invalid-feedback="errors[0]"-->
<!--            >-->
<!--              <b-form-file-->
<!--                id="file"-->
<!--                type="file"-->
<!--                v-model="file"-->
<!--                v-on:change="imageSelected"-->
<!--                :state="errors[0] ? false : null"-->
<!--                trim-->
<!--                placeholder="Choose a file or drop it here..."-->
<!--                drop-placeholder="Drop file here..."-->
<!--              ></b-form-file>-->
<!--            </b-form-group>-->
<!--          </validation>-->

<!--          <div v-if="imagepreview" class="mt-3">-->
<!--            <img :src="imagepreview" class="figure-img img-fluid rounded" style="height: 200px; width: 200px;" >-->

<!--          </div>-->

          <div class="mt-3">
            <b-button
              variant="primary"
              block
              type="submit"
            >
              Update
            </b-button>
          </div>

        </b-form>
      </validation-observer>
      <router-link :to='{name:"ChangePsw", params:{id: id}}' class="text-dark mt-3">Change password</router-link>

    </section>
  </div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name:"update-user",
  data(){
    return {
      id:"",
      name: "",
      email: "",
      password: "",
      repassword:"",
      surname: "",
      file: null,
      imagepreview: null,


    }
  },

  mounted(){
    this.UserData()
  },
  methods:{

    ...mapActions(["GET_USER_DATA"]),
    ...mapGetters(['getUser']),
    async UserData() {
      await this.GET_USER_DATA()
        .then(res => {
          if(res ) {
            console.log(res )
            this.data = this.getUser()
            const {id, name, email, surname, file, password  } = this.data
            console.log(this.data)
            this.name = name
            this.surname = surname
            this.email = email
            this.file = file
            this.password = password
            this.id = id


          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async update(){
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('name', this.name);
      formData.append('surname', this.surname);
      formData.append('email', this.email);
      formData.append('password', this.password);


      await this.axios.post('update', formData, config).then(response=>{
        this.$router.push({name: "AdminPage"})
      }).catch(error=>{
        console.log(error)
      })
    },
    imageSelected(e){
      this.file = e.target.files[0];
      let reader= new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e=> {
        this.imagepreview = e.target.result;
      }

    }
  },

}
</script>

<style>
._homeimage{
  width: 100%;
  height: 41em;
  background-image: url("../assets/928ac32d5266a27fcc6752892a97b1e1.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

</style>

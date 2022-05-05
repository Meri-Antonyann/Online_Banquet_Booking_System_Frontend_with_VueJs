<template>
  <div class="_homeimage d-flex align-items-center justify-content-center">

    <section  >
      <validation-observer ref="observer">
        <b-form @submit.prevent="register"  >
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
                v-model="name"
                style="opacity: 0.5;"
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
                v-model="email"
                style="opacity: 0.5;"
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
              label="Password"
              label-for="password"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                style="opacity: 0.5;"
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
                style="opacity: 0.5;"
                :state="errors[0] ? false : null"
                trim
              />
            </b-form-group>
          </validation>



          <validation
            name="file"
          >
            <b-form-group
              label-class="form-label"
              label="Image"
              label-for="file"
              slot-scope="{ errors }"
              :invalid-feedback="errors[0]"
            >
              <b-form-file
                id="file"
                type="file"
                v-model="file"
                v-on:change="imageSelected"
                :state="errors[0] ? false : null"
                trim
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
          </validation>

          <div v-if="imagepreview" class="mt-3">
            <img :src="imagepreview" class="figure-img img-fluid rounded" style="height: 200px; width: 200px;" >

          </div>

          <div class="mt-3">
            <b-button
              variant="primary"
              block
              type="submit"
            >
              Register
            </b-button>
          </div>

          <div class="text-dark mt-3">Do you have an account? <router-link to="/login" class="text-dark">Click here</router-link></div>
        </b-form>
      </validation-observer>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repassword:"",
      surname: "",
      file: null,
      imagepreview: null,


    }
  },

  methods: {


    async register() {
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
      }
      let formData = new FormData();

      formData.append('name', this.name);
      formData.append('surname', this.surname);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('repassword', this.repassword);
      formData.append('file', this.file);


     if (this.repassword === this.password){
      this.axios.post('/register', formData, config)
        .then(response=> {
          console.log(response)
          if (response){
            localStorage.setItem('access_token', response.data.token)
            this.$router.push({name: "AddService"})
            this.$router.go()
          }
          })
        .catch(err => {
          if (err) console.log(err);
        });

    }} ,
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

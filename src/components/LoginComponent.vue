<template>
  <div class="_homeimage d-flex align-items-center justify-content-center">

    <section  >
      <validation-observer ref="observer">
        <b-form @submit.prevent="login"  >
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
                v-model="formData.email"
                style="opacity: 0.2"
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
                v-model="formData.password"
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
              Sign in
            </b-button>
          </div>

          <div class="text-dark mt-3">Don't you have an account? <router-link to="/register" class="text-dark">Click here</router-link></div>
          <div class="text-dark mt-3">Forgot your password? <router-link to="/forgot" class="text-dark">Click here</router-link></div>

        </b-form>
      </validation-observer>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      formData: {
        email: "",
        password: "",

      },
    }
  },

  methods:{
    ...mapActions(["LOGIN_USER"]),

    async login() {
      let valid = await this.$refs.observer.validate();
      if (!valid) return false;

      await this.LOGIN_USER(this.formData).then((res) => {
        console.log(res)
        if(res) this.$router.push({name: "Booking"})
        this.$router.go();
      }).catch(err => {
        if(err) alert('Ooops! There is an error');

      }).finally(() => {
        this.loading = false
      })
    },




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

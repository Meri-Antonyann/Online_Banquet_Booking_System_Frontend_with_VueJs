<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="card card-default">
          <div class="forgot mt-5 d-flex flex-column align-items-start">
            <h2>Forgot your password?</h2>
            <p class="mt-2">Change your password in three easy steps. This will help you to secure your password!</p>
            <ol class="list-unstyled d-flex flex-column align-items-start">
              <li><span class="text-primary text-medium">1. </span>Enter your email address below.</li>
              <li><span class="text-primary text-medium">2. </span>Our system will send you a temporary link</li>
              <li><span class="text-primary text-medium">3. </span>Use the link to reset your password</li>
            </ol>
          </div>

          <div class="card-body">

            <form autocomplete="off" @submit.prevent="requestResetPassword" method="post">
              <div class="form-group">
                <label for="email">E-mail</label>

                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                <small class="form-text text-muted">Enter the email address you used during the registration on Jellow.com. Then we'll email a link to this address.</small>
              </div>
              <button type="submit" class="btn btn-primary mt-2">Send Password Reset Link</button>
            </form>
           <p class="text-success mt-2" > {{response}} </p>
           <p class="text-danger mt-2"  > {{error}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      has_error: false,
      response:"",
      error:""
    }
  },
  methods: {
    requestResetPassword() {
      let currentObj = this;
      this.axios.post("Forgotpassword", {email: this.email}).then(result => {

          this.response = result.data.data;
          console.log(result.data);

        }).catch( error => {
          console.error(error);
          this.error = error
        });
    }
  }
}
</script>

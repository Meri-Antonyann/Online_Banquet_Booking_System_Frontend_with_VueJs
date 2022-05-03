<template>
  <nav class="sideNav d-flex flex-column align-items-center ">
     <div class="container  mb-2 p-3 d-flex justify-content-center">
      <div class="card bg-dark text-light p-5">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <button class="btn btn-secondary">
            <img :src="'http://127.0.0.1:8000/avatar/' + data.file" alt="img" style="width: 50px; height: 50px;" class="border">
          </button>
          <span class="name mt-3">{{this.fullname}}</span>
          <span class="idd">{{data.email}}</span>
        </div>
        <router-link to="/update" class="text-light">Edit profile</router-link>
        <button class="btn btn-success mt-2" v-if="token" @click="logout">Log out</button>
      </div>
    </div>


   <div class="d-flex flex-column align-items-start" v-if="data.role=== 'admin'">
     <router-link class="sideNav__button" to="/dashboard"> DASHBOARD</router-link>
     <router-link class="sideNav__button" to="/services"> SERVICES</router-link>
     <router-link class="sideNav__button" to="/add-event"> TYPE OF EVENTS</router-link>
     <router-link class="sideNav__button" to="/edit-pages"> PAGES</router-link>
     <router-link class="sideNav__button" to="/users"> USERS</router-link>
     <router-link class="sideNav__button" to="/bookings"> BOOKING</router-link>
     <router-link class="sideNav__button" to="/queries"> BOOKING QUERIES</router-link>
     <router-link class="sideNav__button" to="/contact-us-queries"> CONTACT US QUERIES</router-link>
     <router-link class="sideNav__button" to="/reports"> REPORTS</router-link>
     <router-link class="sideNav__button" to="/search"> SEARCH</router-link>
   </div>



    <div class="d-flex flex-column align-items-start" v-if="data.role === 'user'">
      <router-link class="sideNav__button" to="/booking"> BOOKING</router-link>
      <router-link class="sideNav__button" to="/view-bookings">MY BOOKINGS</router-link>
      <router-link class="sideNav__button" to="/services"> SERVICES</router-link>
    </div>
  </nav>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {

  data(){
    return {
      data: {}
    }
  },

  mounted() {
    this.UserData()


  },
  computed:{
    fullname(){
     return this.data.name + " " + this.data.surname
    },

    token(){
     return localStorage.getItem("access_token")
    },

  },


  methods: {
    ...mapActions(["GET_USER_DATA"]),
    ...mapGetters(['getUser']),

    async UserData() {
      await this.GET_USER_DATA()
        .then(res => {
          if(res ) {
            console.log(res )
            this.data = this.getUser()
            console.log(this.data)
          }

          console.log(this.data.role)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    logout(){
      if(confirm("Are you sure you want to log out ?")){
        this.axios.post(`logout`).then(response=>{
          localStorage.removeItem("access_token");
          localStorage.removeItem("role");
          this.$router.push({name: "Login"})
          this.$router.go()
        }).catch(error=>{
          console.log(error)
        })
      }
    }


  }
}
</script>

<style scoped>
.sideNav {
  height: 100%;
  width: 250px;
  background-color: black;
  position: fixed;
  z-index: 1 !important;
  left: 0;
  padding-top: 10px;
  padding-left: 25px;
  float: left;

}

.sideNav__button {
  padding-bottom: 10px;
  font-size: 15px;
  text-decoration: none;
  color: white;
}
.sideNav__button:hover{
  font-size: 18px;
}
.card{
  border-radius: 25%;
}
.image img {
  transition: all 0.5s
}
.card:hover .image img {
  transform: scale(1.5)
}
</style>

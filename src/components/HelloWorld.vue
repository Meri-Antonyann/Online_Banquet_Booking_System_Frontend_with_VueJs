<template>

      <div class="_homeimage d-flex align-items-center justify-content-center">
        <nav class="navbar navbar-expand-lg bg-dark navbar-light bg-opacity-25 text-center  fixed-top mt-3">
          <div class="container-fluid  navdiv">
            <a class="navbar-brand fs-1" href="/about">JELLOW</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <router-link class="nav-link text-dark" aria-current="page" to="/">Home</router-link>
                <router-link class="nav-link text-dark" to="/about">About</router-link>
                <router-link class="nav-link text-dark" to="/services">Services</router-link>
              </div>
            </div>
            <div class="navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ">

                <router-link class="nav-link text-dark" to="/login" >Login</router-link>
                <router-link class="nav-link text-dark" to="/register"  >Register</router-link>
                <button @click="elementVisible = true" class="showbtn">Message to admin</button>
              </div>
            </div>
          </div>
        </nav>

        <section  >
          <div class="text border" >
            <span class="fs-1" >WEDDING</span><br>
            <span class="fs-1" >VENUE</span>
            <p class="fs-3 " >We create your special day! </p>
          </div>
        </section>

        <section   v-show="elementVisible"  >
          <b-icon icon="x-circle" font-scale="2" class="myicon text-success" @click="elementVisible = false"></b-icon>
          <div class="chatforguest d-flex flex-column justify-content-between align-items-center">
            <div class="chatheader text-center position-fixed " style="background-color: darkgrey;">
             <p class="text-dark fs-4 border-bottom" >Send message to admin</p>
            </div>


              <div class="mt-5" >
                <p v-if="!data.message">
                  Do you have a question? We will be happy to answer.
                </p>
              </div>

            <form @submit.prevent="messageSent" class="form-inline  " style=" background-color: darkgrey; border-radius: 5px  ">
              <p v-if="isShow">Thank you! Message sent! We will answer you soon!</p>
              <div class="form-group  mb-5" v-if="data.message && !isShow" >
                 <label for="email">Please fill in your email and we will answer you soon.</label>
                <input type="email" id="email" class="bg-dark text-light" placeholder="Email... " v-model="data.email">
               </div>
               <div class="form-group">
                 <input type="text" class="form-control bg-dark text-light" placeholder="Message ... " v-model="data.message" @keyup.enter="messageSent">
               </div>
              <button  class="btn btn-primary  mb-2 bg-dark"  >Send</button>
            </form>

            </div>
        </section>

        <footer class="card-footer fixed-bottom bg-dark bg-opacity-25  mb-3 " >
         <ul class="w3-ul d-flex justify-content-between" style="width: 800px; margin: 0 auto;">
           <li class="d-flex">
             <b-icon icon="map-fill" class="mx-1 footericon"></b-icon>
             <address class="text-dark">
               {{ address }}
             </address>
           </li>
           <li>
             <b-icon icon="envelope" class="mx-1 footericon"></b-icon>
             <a href='#' class="text-dark  ">{{ email }}</a>

           </li>
           <li  >
             <b-icon icon="telephone-fill" class="mx-1 footericon"></b-icon>
             <a href="#" class="text-dark  ">{{phone}}</a>

           </li>
         </ul>
        </footer>
      </div>

</template>

<script>
export default {
  name: 'HelloWorld',

  data(){
    return{
      address:"",
      email:"",
      phone:"",
      data:{
        message:"",
        email:""
      },

      isShow: false,
      elementVisible: false
    }
  },
  mounted() {

    this.showContact()
    },

  created() {
    setTimeout(() => this.elementVisible = true, 4000)
  },

  methods:{
    async showContact(){
      await this.axios.get(`getContact`).then(response=>{
        this.address = response.data.contact.address
        this.email = response.data.contact.email
        this.phone = response.data.contact.phone
        console.log(this.address)
      }).catch(error=>{
        console.log(error)
      })
    },
    async messageSent(){
      await this.axios.post(`messageToAdmin`, this.data).then(response=>{
        console.log(response)
        if(response){
         this.isShow = true
        }
      }).catch(error=>{
        console.log(error)
      })
    },
  }
}



</script>

 <style scoped>

._homeimage{
  width: 100%;
  height: 41em;
  background-image: url("../assets/928ac32d5266a27fcc6752892a97b1e1.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.navdiv{
  margin-left: 15em;
}

.nav-link:hover{
  font-size: 1.2em;
}
.w3-ul{
  list-style: none;
}
.footericon{
  color: black;
  font-size: 18px;
}
.text{
  background-color: black;
  color: white;
  opacity: 0.2;
  font-family: "DejaVu Serif";


}
.chatforguest{
  width: 300px;
  height: 400px;
  border: 1px solid gray;
  background-color: darkgrey;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1000000;
  overflow-y: scroll;
}

.chatheader{
  height: 40px;
  border-radius: 15%;
  margin: 0 auto;
}
.showbtn{
  background-color: darkgrey;
}

.myicon{
  position: fixed;
  right: 0;
  bottom: 400px;
  z-index: 2000000;
}

</style>

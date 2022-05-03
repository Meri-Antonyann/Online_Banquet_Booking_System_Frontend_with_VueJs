<template>
 <section class="d-flex flex-column justify-content-center align-items-center ">
   <h1 class="mt-5">Pages of Users</h1>
   <table class="table table-bordered " style="width: 500px; margin-top: 60px ">
     <thead>
     <tr>
       <th>Name</th>
       <th>Surname</th>
       <th>Email</th>
       <th>Avatar</th>

     </tr>
     </thead>
     <tbody v-if="users.length > 0  " >
     <tr v-for="(user,key) in users" :key="key">
       <td>{{ user.name }}</td>
       <td>{{ user.surname }}</td>
       <td>{{ user.email }}</td>
       <td>
         <img :src="'http://127.0.0.1:8000/avatar/' + user.file" alt="img" style="width: 50px; height: 50px;" class="border">

       </td>

     </tr>
     </tbody>
     <tbody v-else>
     <tr>
       <td colspan="4" align="center">No Pages Found.</td>
     </tr>
     </tbody>
   </table>
 </section>
</template>

<script>
export default {
data(){
  return {
    users:[]
  }
  },
  mounted() {
  this.getUsers()
  },

  methods:{
      async getUsers(){
        await this.axios.get('getusers').then(response=>{
          this.users = response.data.users
          console.log(this.users)
        }).catch(error=>{
          console.log(error)
          this.services = []
        })
   },
}
}
</script>

<style>

</style>

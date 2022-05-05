<template>
 <div class="container d-flex flex-column justify-content-center align-items-center">
   <h1>Search</h1>
   <b-input-group size="sm" class="mb-2 mt-5  _searchinput">
     <b-input-group-prepend is-text>
       <b-icon icon="search"></b-icon>
     </b-input-group-prepend>
     <b-form-input type="search" v-model="search"></b-form-input>

   </b-input-group>
   <ul v-if="bookings.length > 0">
     <router-link  v-for="booking in bookings" :key="booking.id" :to='{name:"Result",params:{id:booking.id}}'>
       <li class="text-secondary  ">
         <span class="h5">{{booking.name}}</span>
         {{booking.email}}
       </li>
     </router-link>
   </ul>
 </div>
</template>

<script>
export default {
  data () {
    return {

      search: null,
      bookings:[]
    }
  },

  watch: {
    search(after, before) {
      this.getResults();
    }
  },

  methods: {
    getResults() {
      this.axios.get('/livesearch', { params: { search: this.search } })
        .then(res => this.bookings = res.data)
        .catch(error => {});
    }
  }
}
</script>

<style>
._searchinput{
  max-width: 300px;
  border-radius: 8px;
}
</style>

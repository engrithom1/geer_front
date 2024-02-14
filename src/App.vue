<template>
  <div v-if="loged">
    <div v-if="user.auth_statuses_id < 5">
      <JoinForm :user="user"/>
    </div>
    <div v-if="user.auth_statuses_id == 5">
      <router-view></router-view>
    </div>
  </div>

  <div v-if="!loged">
      <Authentication />
  </div>

</template>

<script>
import axios from "axios";
import Authentication from "./views/auth/Authentication.vue";
import JoinForm from "./views/JoinForm.vue"

export default {
  components: {
    Authentication,
    JoinForm
  },
  data() {
    return {
      loged: false,
      user: {
        fullname:"Sambokile Andy",
        auth_statuses_id:0
      },
    };
  },
  methods: {
    isLoged() {
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
      if (user && token) {
        this.loged = true;
        this.user = JSON.parse(user);
      } else {
        this.loged = false;
      }
    },
    logout() {
      this.$store.dispatch("logOut", { id: this.user.id });
    },

    async reload() {
      if(localStorage.getItem("user")){
        var user = localStorage.getItem("user");
        if(user){
          var us = JSON.parse(user)
          var user_id = us.id 
        var response = await axios.post(this.$store.state.api_url+'/reload',user_id)
      .catch(errors =>{
        console.log(errors)
     })
     if(response){
      if (response.data.success) {
        this.user = response.data.dataz.user
        localStorage.setItem('user',JSON.stringify(response.data.dataz.user))
     }
     }
        }
      }
      
    },
  },
  created() {
    this.isLoged();
    //alert(localStorage.getItem("user"));
    //this.reload();
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("user_token");
  },
};
</script>

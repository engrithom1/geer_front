<template>
  <div v-if="loged">
    <!--verify-->
    <div v-if="user.auth_statuses_id == 0">
      <Verify :user="user"/>
    </div>
    <!--student-->
    <div v-if="user.auth_statuses_id < 5 && user.auth_statuses_id != 0">
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
import Verify from "./views/auth/Verify.vue";
import JoinForm from "./views/JoinForm.vue"

export default {
  components: {
    Authentication,
    JoinForm,
    Verify
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
        var response = await axios.post(this.$store.state.api_url+'/reload')
      .catch(errors =>{
        console.log(errors)
     })
     if(response){
      if (response.data.success) {
        this.user = response.data.dataz.user
        localStorage.setItem('user',JSON.stringify(response.data.dataz.user))
        console.log('loaded successfully')
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

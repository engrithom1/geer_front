
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

  <div class="text-center pa-4">
        <v-dialog
        v-model="this.$store.state.menu_dialog"
        max-width="300"
        persistent
        >
        <v-card>
            <v-card-title class="">Quick Menu.</v-card-title>
              
              <div class="d-flex justify-content-between m-3">
              <div>
                <a href="/">
                    <div class="media">
                        <i class="fa fa-home mr-1"></i>
                        <div class="media-body">
                            <div>
                                <h5 class="mt-0">Dashbord</h5>
                            </div>
                        </div>
                    </div>
                </a>
              </div>
              <div>
                <a href="/account">
                    <div class="media">
                        <i class="fa fa-user mr-1"></i>
                        <div class="media-body">
                            <div>
                                <h5 class="mt-0">Profile</h5>
                            </div>
                        </div>
                    </div>
                </a>
              </div>
           
              <div>
                <a href="#" class="text-danger" v-on:click="logout()">
                    <div class="media">
                        <i class="fa fa-arrow-up mr-1"></i>
                        <div class="media-body">
                            <div>
                                <h5 class="mt-0">log out</h5>
                            </div>
                        </div>
                    </div>
                </a>
              </div>
              </div>
            
            <template v-slot:actions>
            <v-spacer></v-spacer>

            <button class="btn btn-danger" @click="MenuDialog()">
                Close
            </button>

            </template>
        </v-card>
        </v-dialog>
    </div>

</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';
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
      //var user = localStorage.getItem("user");
      var user_cry = localStorage.getItem("user") || "";
      var token_cry = localStorage.getItem("user_token") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null

      if (user && token) {
        this.loged = true;
        this.user = JSON.parse(user);
      } else {
        localStorage.removeItem("user_token")
        localStorage.removeItem("user")
        this.loged = false;
      }
    },
    logout() {
      this.$store.dispatch("logOut", { id: this.user.id });
    },
    MenuDialog() {
      this.$store.dispatch("menuDialog");
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
    var token_cry = localStorage.getItem("user_token") || "";
    var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
    //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + token;
  },
};
</script>

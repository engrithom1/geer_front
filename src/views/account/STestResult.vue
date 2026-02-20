
<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>My Modules</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
        <div class="card mb-1">
                 <div class="card-header bg-white py-3">
                     <h2>Modules Choosen</h2>
                 </div>
             </div>
        <!-- friend list -->
        <div v-if="this.groups_loading" class="row">
             
             <div class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
            </div>
                 
        </div>
        <div v-if="!this.groups_loading" class="row">
             
             <div v-if="groups.length == 0">
                <h4>No Module Found</h4>
            </div>
            <div class="col-md-6 col-lg-4" v-for="group in groups">
                <router-link :to="{path:'/module-courses/',query:{module:group.name,secret:this.secrete+''+group.id+''+this.secrete2}}">
                <div class="event-box section-t-space ratio2_3 p-0">
                    <div class="image-section bg-size blur-up lazyloaded" :style="'background-image: url('+this.$store.state.img_url+group.thumb+'); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;'">
                    </div>
                    <div class="event-content">
                        <h3 class="text-capitalize">{{ group.name }}</h3>
                    </div>
                </div>
                </router-link>
            </div>
                 
        </div>
    </div>

</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
    components: {
    },
    data() {
        return {
            groups:[],
            user: {},
            secrete:"",
            secrete2:"",
            groups_loading:true,
        };
    },
    methods: {
        isAuth() {

            var user_cry = localStorage.getItem("user") || "";
            var token_cry = localStorage.getItem("user_token") || "";
            var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
            var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
            if (user && token) {
                this.user = JSON.parse(user);
            } 
        },
        async myModules() {
            var response = await axios.post(this.$store.state.api_url + "/my-groups")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.groups = response.data.dataz
              console.log(response.data.dataz)
            } else {
                var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.groups_loading = false
        
        }
    },
    created() {
        this.isAuth()
        this.myModules()
        this.secrete = Math.floor(1000 + Math.random()*9000)
        this.secrete2 = Math.floor(10 + Math.random()*90)

        //console.log('sec4 -'+this.secrete+" -- sec2 -"+this.secrete2)
    }
};
</script>
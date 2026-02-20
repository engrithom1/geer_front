<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Participants</h3>
        </div>
        <div class="px-3">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Participants</button>
                    <button class="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Booked</button>
                   
                   
                </div>
            </nav>
            <div class="tab-content mt-3 pb-5" id="nav-tabContent">
                <div class="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="bstudents.length == 0">
                                <h4>No Participants Found</h4>
                            </div>

                            <ul class="row">
                                <li class="col-md-4 col-sm-6" v-for="mentor in bstudents">
                                    <div class="profile-box friend-box mb-3">
                                        <div class="profile-content">
                                            <div class="image-section">
                                                <div class="profile-img">
                                                    <div>
                                                        <img :src="this.$store.state.img_url+mentor.avatar"
                                                            class="img-fluid blur-up lazyloaded" style="border-radius: 50%;"
                                                            alt="profile">
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div class="profile-detail">
                                                <h2>{{ mentor.name }}</h2>
                                                
                                                
                                                <a href="#" v-on:click="accceptStudent(mentor.id)" class="btn btn-outline">
                                                Accept Participant</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <div v-if="this.expnewz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.expnewz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="mystudents.length == 0">
                                <h4>No Participants Found</h4>
                            </div>

                            <ul class="row">
                                <li class="col-md-4 col-sm-6" v-for="mentor in mystudents">
                                    <div class="profile-box friend-box mb-3">
                                        <div class="profile-content">
                                            <div class="image-section">
                                                <div class="profile-img">
                                                    <div>
                                                        <img :src="this.$store.state.img_url+mentor.avatar"
                                                            class="img-fluid blur-up lazyloaded" style="border-radius: 50%;"
                                                            alt="profile">
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div class="profile-detail">
                                                <h2>{{ mentor.name }}</h2>
                                                
                                                
                                                <!--div class="d-flex justify-content-between">
                                                    <button class="btn btn-success">View</button>
                                                    <span class="mx-1"></span>
                                                    <button class="btn btn-primary">Chats</button>
                                                </div-->
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

               
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
          
            bstudents:[],
            mystudents:[],
            mentor:{},
            newz_loading:true,
            expnewz_loading:true,
            user: {},
           
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
        async getAllMentors() {
            var response = await axios.get(this.$store.state.api_url + "/get-all-m-student")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.bstudents = response.data.bstudents
              this.mystudents = response.data.mystudents
              //console.log(response.data.dataz)
            } else {
                var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
           
            this.newz_loading = false
            this.expnewz_loading = false
        
        },
        async accceptStudent(id){
            var response = await axios
        .post(this.$store.state.api_url + "/accept-student",{id})
        .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                    this.bstudents = this.bstudents.filter((i) => i.id != id);
              
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        setEditData(mentor){
          this.mentor = mentor
        },

    },
    created() {
        //this.isAuth()
        this.getAllMentors()
    }
};
</script>
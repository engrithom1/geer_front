<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Materials</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
        <!-- friend list -->
        <div class="friend-list-box birthday-list section-b-space">
            <div class="card-title">
                <h3>Materials</h3>
            </div>
            <div v-if="this.newz_loading" class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
            </div>

            <div v-if="!this.newz_loading" class="container-fluid">
                <div  class="friend-list friend-page-list">

                    <div v-if="materials.length == 0">
                        <h4>No Materials Found</h4>
                    </div>

                    <ul>
                        <li v-for="newz in materials">
                            <div class="friend-box w-100">
                                <div class="media">
                                    <a href="#" v-on:click="showNewz(newz)" data-bs-toggle="modal" data-bs-target="#feedmodal" class="user-img bg-size blur-up lazyloaded" style="background-image: url(&quot;assets/images/pdf.png&quot;); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;">
                                        <img src="/assets/images/pdf.png" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: none;">
                                        <span class="available-stats"></span>
                                    </a>
                                    <div class="media-body">
                                        <a href="#" v-on:click="showNewz(newz)" data-bs-toggle="modal" data-bs-target="#feedmodal">
                                            <p class="video-p text-primary">{{ newz.title }}</p>
                                        </a>
                                        <p class="">{{newz.description}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="feedmodal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="video-p">Materials Details</p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>    
                <div class="modal-body">
                    <div class="edit-profile-sec">
                        <div class="profile-wrap">
                            <div class="edit-content">
                                    <h3 class="video-p mb-3"> {{ this.newz.title }}.</h3>
                                    <div class="mt-2">
                                        <div v-html="this.newz.body"></div>
                                    </div>
                            </div>
                        </div>
                        <div class="profile-wrap">
                            <div class="edit-title">
                                <div class="icon">
                                    <img :src="this.$store.state.img_url+newz.avatar" class="img-fluid blur-up lazyload bg-img"
                                            alt="user" style="width: 36px;height: 36px;border-radius: 100%;position: relative;">
                                </div>
                                <h5>{{ this.newz.created_by }}</h5>
                               
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>
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
            materials:[],
            newz:{},
            newz_loading:true,
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
        showNewz(newz){
            this.newz = newz;
        },
      
        async getMaterials() {
            var response = await axios.get(this.$store.state.api_url + "/get-materials")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.materials = response.data.materials
              //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },
  
     
     
    },
    created() {
        this.isAuth()
        this.getMaterials()
    }
};
</script>
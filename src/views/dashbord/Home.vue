<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Dashbord</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
        <!-- friend list -->
        <div class="friend-list-box birthday-list section-b-space">
            <div class="card-title">
                <h3>Notes Board</h3>
            </div>
            <div v-if="this.newz_loading" class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
            </div>

            <div v-if="!this.newz_loading" class="container-fluid">
                <div  class="friend-list friend-page-list">

                    <div v-if="news.length == 0">
                        <h4>No Notes Found</h4>
                    </div>

                    <ul>
                        <li v-for="newz in news">
                            <div class="friend-box">
                                <div class="media">
                                    <a href="#" v-on:click="showNewz(newz)" data-bs-toggle="modal" data-bs-target="#feedmodal" class="user-img bg-size blur-up lazyloaded" style="background-image: url(&quot;assets/images/icons/feeds.gif&quot;); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;">
                                        <img src="/assets/images/icons/feeds.gif" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: none;">
                                        <span class="available-stats"></span>
                                    </a>
                                    <div class="media-body">
                                        <a href="#" v-on:click="showNewz(newz)" data-bs-toggle="modal" data-bs-target="#feedmodal">
                                            <p class="video-p">{{ newz.title }}</p>
                                        </a>
                                        <h6 class="text-sm">visible until {{newz.expired_date}}</h6>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

         <!---->
        <div>
            <div class="card mb-1">
                 <div class="card-header bg-white py-3">
                     <h2>Available Modules</h2>
                 </div>
             </div>
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
                <a href="#" v-on:click="showModule(group)" data-bs-toggle="modal" data-bs-target="#modulemodal">
                <div class="event-box section-t-space ratio2_3 p-0">
                    <div class="image-section bg-size blur-up lazyloaded" :style="'background-image: url('+this.$store.state.img_url+group.thumb+'); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;'">
                    </div>
                    <div class="event-content">
                        <h3 class="text-capitalize" style="text-transform: capitalize !important;">{{ group.name }}</h3>
                    </div>
                </div>
                </a>
            </div>
                 
        </div>
        </div>
    </div>

    

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="feedmodal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="video-p">Notes Board Details</p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>    
                <div class="modal-body">
                    <div class="edit-profile-sec">
                        <div class="profile-wrap">
                            <div class="edit-content">
                                    <h3 class="video-p mb-3"> {{ this.newz.title }}.</h3>
                                    {{ this.newz.description }}
                            </div>
                        </div>
                        <div class="profile-wrap">
                            <div class="edit-title">
                                <div class="icon">
                                    <img :src="this.$store.state.img_url+newz.avatar" class="img-fluid blur-up lazyload bg-img"
                                            alt="user" style="width: 36px;height: 36px;border-radius: 100%;position: relative;">
                                </div>
                                <h5>{{ this.newz.created_by }}</h5>
                                <a href="#" class="ms-auto">expired {{this.newz.expired_date}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="modulemodal">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="video-p">Preview Modules Details</p>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>    
                <div class="modal-body">
                    <div class="edit-profile-sec">
                        <div class="row profile-wrap">
                            <div class="col-md-4">
                                <img :src="this.$store.state.img_url+group.thumb" class=""
                                            alt="user" style="width: 100%;height: auto;"> 
                            </div>
                            <div class="col-md-7 edit-content">
                                    <h2 class="video-p mb-3"> {{ this.group.name }}.</h2>
                                    {{ this.group.description }}
                            </div>
                        </div>
                        
                    </div>
                    <div class="card mb-1">
                <div class="card-header bg-white py-3">
                    <h3>Video Course</h3>
                </div>
          </div>
          <div v-if="!this.loading" class="row">
               <div class="col-md-6 col-lg-6" v-for="video in videos">
                <div class="event-box section-t-space ratio2_3 p-0">
                    <div class="image-section bg-size blur-up lazyloaded" :style="'background-image: url('+this.$store.state.img_url+video.thumb+'); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;'">
                        <a class="play-btn" href="#">
                            <img src="/assets/images/play.png" class="event-btn img-fluid blur-up lazyloaded" alt="play">
                        </a>
                    </div>
                    <div class="event-content">
                        <h3 class="text-capitalize">{{ video.title }}</h3>
                    </div>
                </div>
               </div>
                <div v-if="videos.length == 0">
                    <h4>No videos Found</h4>
                </div>
                
            </div>
            <div v-if="this.loading" class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
                
            </div>
            <!-- end of videos -->
            <div class="mt-5"></div>
            <!--start audios-->
            <div class="card mb-3">
                <div class="card-header bg-white py-3">
                    <h3>Audio Courses</h3>
                </div>
            </div>
           
            <section v-if="!this.loading" class="feature-section overflow-hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-12 mobile-w100 mb-5" v-for="audio in audios">
                            <div class="feature-box  bg-white">
                                <div class="icon-box">
                                    <a href="#" ><img src="/assets/images/audio.png" width="70px" class="img-fluid blur-up lazyloaded" alt=""></a>
                                </div>
                                <div class="feature-content">
                                    <h3></h3>
                                    <a href="#" class="video-p">{{ audio.title }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="audios.length == 0">
                    <h4>No Audios Found</h4>
                </div>
            </section>
            <div v-if="this.loading" class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
                
            </div>
            <!-- end of audios -->
            <div class="mt-4"></div>
            <!--start audios-->
            <div class="card mb-3">
                <div class="card-header bg-white py-3">
                    <h3>Documents Courses(pdf)</h3>
                </div>
            </div>
             <!--start videos-->
             <section v-if="!this.loading" class="feature-section overflow-hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-12 mobile-w100 mb-5" v-for="note in notes" >
                            <div class="feature-box bg-white">
                                <div class="icon-box">
                                    <a href="#"><img src="/assets/images/pdf.png" width="70px" class="img-fluid blur-up lazyloaded" alt=""></a>
                                </div>
                                <div class="feature-content">
                                    <h3>pages</h3>
                                    <a href="#" class="video-p">{{note.title}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="notes.length == 0">
                    <h4>No Notes Found</h4>
                </div>
            </section>
            <div v-if="this.loading" class="loading-img container-fluid">
                <div  class="friend-list friend-page-list">
                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                </div>
                
            </div>

            <div class="mt-3 d-flex justify-content-center">
                <button v-on:click="takeModule()" class="btn btn-primary">Take This Module</button>
            </div>
            <!-- end of videos -->
                </div>
            </div>
        </div>
        
    </div>

</template>
<script>

import axios from "axios";

export default {
    components: {
    },
    data() {
        return {
            groups:[],
            news:[],
            newz:{},
            group:{},
            newz_loading:true,
            groups_loading:true,
            user: {},
            audios:[],
            videos:[],
            notes:[],
            mymods:[],
            loading:true
        };
    },
    methods: {
        isAuth() {
            var user = localStorage.getItem("user");
            var token = localStorage.getItem("user_token");
            if (user && token) {
                this.user = JSON.parse(user);
            } 
        },
        takeModule(){
            alert('Are you sure, you want to take this Modules');
        },
        async getModules() {
            var response = await axios.get(this.$store.state.api_url + "/get-groups")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.groups = response.data.dataz
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
            this.groups_loading = false;
        
        },
        async getNews() {
            var response = await axios.get(this.$store.state.api_url + "/get-news")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.news = response.data.dataz
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },
        showNewz(newz){
            this.newz = newz;
        },
        showModule(group){
            this.group = group;
            var group_id = group.id;

            if(this.user.roles_id > 1){
                this.mymods = []
            }else{
                var user_id = this.user.id
                this.myMods(user_id,group_id)
            }

            this.groupContents(group_id)

        },
        async myMods(user_id,group_id) {

        var response = await axios.post(this.$store.state.api_url + "/my-mods",{'user_id':user_id})
        .catch((errors) => {
        var message = "Network or Server Errors";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            console.log(response)
        if (response.data.success) { 
            console.log(response.data.mymods)
           this.mymods = response.data.mymods
        
        } else {
            console.log(response.data.errors)
        }

        },

        async groupContents(group_id) {

        var response = await axios.post(this.$store.state.api_url + "/group-contents",{'group_id':group_id})
        .catch((errors) => {
        var message = "Network or Server Errors";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

        if (response.data.success) { 
        this.videos = response.data.dataz.videos
        this.notes = response.data.dataz.notes
        this.audios = response.data.dataz.audios
        //console.log(response.data.dataz)
        } else {
            console.log(response.data.errors)
        }

        this.loading = false

        }
    },
    created() {
        this.isAuth()
        this.getModules()
        this.getNews()
    }
};
</script>
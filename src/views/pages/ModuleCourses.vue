<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>{{ this.$route.query.module }}</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
          <!--start videos-->
          <div class="card mb-1">
                <div class="card-header bg-white py-3">
                    <h2>Video Course</h2>
                </div>
          </div>
          <div v-if="!this.loading" class="row">
               <div class="col-md-6 col-lg-4" v-for="video in videos">
                <div class="event-box section-t-space ratio2_3 p-0">
                    <div class="image-section bg-size blur-up lazyloaded" :style="'background-image: url('+this.$store.state.img_url+video.thumb+'); background-size: cover; background-position: center center; background-repeat: no-repeat; display: block;'">
                        <router-link class="play-btn" :to="{path:'/video-course/',query:{title:video.title,id:video.id,thumb:video.thumb,description:video.description,video_lists:JSON.stringify(video.video_lists)}}">
                            <img src="/assets/images/play.png" class="event-btn img-fluid blur-up lazyloaded" alt="play">
                        </router-link>
                    </div>
                    <div class="event-content">
                        <h3 class="text-capitalize">{{ video.title }}</h3>
                        <div class="bottom-part">
                            <router-link class="event-btn" :to="{path:'/video-course/',query:{title:video.title,id:video.id,thumb:video.thumb,description:video.description,video_lists:JSON.stringify(video.video_lists)}}">
                                Play Now
                            </router-link>
                        </div>
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
                    <h2>Audio Courses</h2>
                </div>
            </div>
           
            <section v-if="!this.loading" class="feature-section overflow-hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-6 mobile-w100 mb-5" v-for="audio in audios">
                            <div class="feature-box  bg-white">
                                <div class="icon-box">
                                    <router-link :to="{path:'/audio-course/',query:{title:audio.title,id:audio.id,description:audio.description,audio_lists:JSON.stringify(audio.audio_lists)}}" ><img src="/assets/images/audio.png" width="70px" class="img-fluid blur-up lazyloaded" alt=""></router-link>
                                </div>
                                <div class="feature-content">
                                    <h3></h3>
                                    <router-link :to="{path:'/audio-course/',query:{title:audio.title,id:audio.id,description:audio.description,audio_lists:JSON.stringify(audio.audio_lists)}}" class="video-p">{{ audio.title }}</router-link>
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
                    <h2>Documents Courses(pdf)</h2>
                </div>
            </div>
             <!--start videos-->
             <section v-if="!this.loading" class="feature-section overflow-hidden">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-6 mobile-w100 mb-5" v-for="note in notes" >
                            <div class="feature-box bg-white">
                                <div class="icon-box">
                                    <router-link :to="{path:'/note-course/',query:{title:note.title,id:note.id,url:note.note_url}}"><img src="/assets/images/pdf.png" width="70px" class="img-fluid blur-up lazyloaded" alt=""></router-link>
                                </div>
                                <div class="feature-content">
                                    <h3>pages</h3>
                                    <router-link :to="{path:'/note-course/',query:{title:note.title,id:note.id,url:note.note_url}}" class="video-p">{{note.title}}</router-link>
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
            <!-- end of videos -->
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
            videos:[],
            audios:[],
            notes:[],
            loading:true,
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
        async groupContents() {

            var group_id = this.$route.query.secret;
            group_id = group_id.substring(4)
            group_id = group_id.slice(0,-2)
            
            var response = await axios.post(this.$store.state.api_url + "/group-contents",{'group_id':group_id})
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.videos = response.data.dataz.videos
              this.notes = response.data.dataz.notes
              this.audios = response.data.dataz.audios
              //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }

            this.loading = false
        
        }
    },
    created() {
        this.isAuth()
        this.groupContents()
        

    }
};
</script>
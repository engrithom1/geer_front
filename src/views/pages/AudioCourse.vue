<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Audio Course</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
         <!--video player-->
         <div class="content-center pb-5 mt-4">
                <!-- playlist section -->
                <div class="playlist-sec">
                    <div class="card-title">
                        <h3>{{ this.title }}</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-12 container-fluid">
                            <div class="popular-song-sec">
                                <p class="video-d">{{ this.description }}</p> 
                            </div>
                        </div>
                        <div class="col-md-12 container-fluid">
                            <div class="popular-song-sec">
                            <ul>
                                <li v-for="audio in audiolists">
                                    <div class="media">
                                        <div class="icon-play">
                                            <img src="/assets/images/play.png" class="event-btn img-fluid blur-up lazyloaded" alt="play">
                                        </div>
                                        <div class="media-body">
                                            <h5><a href="#" v-on:click="playVideo({title:audio.sub_title,url:audio.audio_url,label:audio.label,order:audio.order})" class="text-capitalize" data-bs-toggle="modal" data-bs-target="#videoPlayer">{{audio.sub_title}}</a></h5>
                                            <h6>{{audio.label+" "+audio.order}}</h6>
                                        </div>
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--start videos-->
    </div>

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="videoPlayer">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="video-p">{{ this.audio.label+" "+this.audio.order+" "+this.audio.title }}</p>
                    <button type="button" v-on:click="stopVideo()" class="btn-close" data-bs-dismiss="modal" aria-label="Close">  
                    </button>
                </div>    
                <div class="modal-body video-model">
                    <video id="myvp" class="w-100" :src="this.$store.state.audio_url+this.audio.url" controls></video>
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
            title:"",
            description:"",
            audiolists:[],
            loading:true,
            user: {},
            audio:{}
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
        getDataQuery(){
            this.title = this.$route.query.title;
            this.description = this.$route.query.description;
            var audiolists = JSON.parse(this.$route.query.audio_lists);

            audiolists = audiolists.sort((a,b)=> a.order > b.order ? 1 : -1)
            this.audiolists = audiolists
            console.log(this.audiolists)
        },
        stopVideo(){
            var video = document.getElementById("myvp");
            video.pause();
            video.currentTime = 0;
        },
        playVideo(audio){
           this.audio = audio
        },
    },
    created() {
        this.isAuth()
        this.getDataQuery()
    }
};
</script>
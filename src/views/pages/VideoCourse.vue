<style>
.cvp-video{
    visibility: visible !important;
    width: 100% !important;
    height: 100% !important;
}
.cvp-canvas[data-v-352dd94f] {
    -o-object-fit: contain;
    object-fit: contain !important;
    width: 0px !important;
    height: 0px !important;
    vertical-align: top;
}
</style>


<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Video Course</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="content-center">
                <!-- playlist section -->
                <div class="playlist-sec ">
                    <div class="card-title">
                        <h3>{{ this.title }}</h3>
                    </div>
                    <div class="row mb-5">
                        <div class="col-md-12">
                            <div class="popular-song-sec">
                                <p class="video-d">{{ this.description }}</p> 
                            </div>
                        </div>
                        <div id="player" v-if="this.video_link" class="col-md-7">
                            <Vue3CanvasVideoPlayer :src="this.video_link" :autoplay="this.set_true" :loop="this.set_true"/>
                        </div>
                        
                        <div class="col-md-5 mb-3">
                        <div class="popular-song-sec">
                            <ul>
                                <li v-for="videoz in videolists">
                                    <div class="media">
                                        <div class="icon-play">
                                            <img src="/assets/images/play.png" class="event-btn img-fluid blur-up lazyloaded" alt="play">
                                        </div>
                                        <div class="media-body">
                                            <h5><a href="#player" v-on:click="playVideo({title:videoz.sub_title,id:videoz.id,url:videoz.video_url,label:videoz.label,order:videoz.order})" class="text-capitalize" data-bs-toggle="modal---" data-bs-target="#videoPlayer----">{{videoz.sub_title}}</a></h5>
                                            <h6>{{videoz.label+" "+videoz.order}}</h6>
                                        </div>
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                       </div>
                    </div>
                    
                </div>
                 
    </div>

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="videoPlayer">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="video-p">{{ this.video.label+" "+this.video.order+" "+this.video.title }}</p>
                    <button type="button" v-on:click="stopVideo()" class="btn-close" data-bs-dismiss="modal" aria-label="Close">  
                    </button>
                </div>    
                <div class="modal-body video-model">
                    <video id="myvp" class="w-100" :src="this.video.url" controls></video>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';
import Vue3CanvasVideoPlayer from 'vue3-canvas-video-player';
import 'vue3-canvas-video-player/dist/style.css';

export default {
    components: {
        Vue3CanvasVideoPlayer,
    },
    data() {
        return {
            title:"",
            post_id:'',
            set_true:true,
            description:"",
            thumb:"",
            videolists:[],
            loading:true,
            user: {},
            video:{},
            video_link:"",
            item_id:"",
            
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
        getDataQuery(){
            this.title = this.$route.query.title;
            this.post_id = this.$route.query.id;
            this.description = this.$route.query.description;
            this.thumb = this.$route.query.thumb;
            var videolists = JSON.parse(this.$route.query.video_lists);

            videolists = videolists.sort((a,b)=> a.order > b.order ? 1 : -1)
            this.videolists = videolists
            //this.video_link = videolists[0].video_url;
            //console.log(this.videolists)
        },
        stopVideo(){
            var video = document.getElementById("myvp");
            video.pause();
            video.currentTime = 0;
        },
        async playVideo(video){
           this.video_link = video.url
           this.item_id = video.id

           var data = {
            post_id:this.post_id,
            item_id:video.id,
            type:"video"
           }

           //console.log(data)
           var response = await axios.post(this.$store.state.api_url + "/send-lean-tracker",data)
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });

            console.log(response)
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
        this.getDataQuery()
    }
};
</script>
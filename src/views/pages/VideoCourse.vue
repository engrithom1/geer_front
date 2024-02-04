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
                        <div class="col-md-5">
                            <div class="popular-song-sec">
                                <img :src="this.$store.state.img_url+this.thumb" class="lazyload w-100" alt="something else">
                            </div>    
                        </div>
                        <div class="col-md-7">
                        <div class="popular-song-sec">
                            <ul>
                                <li v-for="videoz in videolists">
                                    <div class="media">
                                        <div class="icon-play">
                                            <img src="/assets/images/play.png" class="event-btn img-fluid blur-up lazyloaded" alt="play">
                                        </div>
                                        <div class="media-body">
                                            <h5><a href="#" v-on:click="playVideo({title:videoz.sub_title,url:videoz.video_url,label:videoz.label,order:videoz.order})" class="text-capitalize" data-bs-toggle="modal" data-bs-target="#videoPlayer">{{videoz.sub_title}}</a></h5>
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

export default {
    components: {
    },
    data() {
        return {
            title:"",
            description:"",
            thumb:"",
            videolists:[],
            loading:true,
            user: {},
            video:{}
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
            this.thumb = this.$route.query.thumb;
            var videolists = JSON.parse(this.$route.query.video_lists);

            videolists = videolists.sort((a,b)=> a.order > b.order ? 1 : -1)
            this.videolists = videolists
            console.log(this.videolists)
        },
        stopVideo(){
            var video = document.getElementById("myvp");
            video.pause();
            video.currentTime = 0;
        },
        playVideo(video){
           this.video = video
        },
        async groupContents() {

            var group_id = this.$route.query.secret;
            group_id = group_id.substring(4)
            group_id = group_id.slice(0,-2)
            
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
        this.getDataQuery()
    }
};
</script>
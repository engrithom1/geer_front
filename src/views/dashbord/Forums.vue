<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Discussion</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="container-fluid section-t-space px-0 layout-default">
        <div class="page-content">
            <div class="content-center w-100">
                <div class="card mb-3">
                 <div class="card-header bg-white py-3">
                     <h2>Hot Topics</h2>
                 </div>
                </div>
                
                <div class="post-panel section-t-space">
                    <div class="post-wrapper col-grid-box">
                        <div v-if="this.loading" class="row">
                            <div class="loading-img container-fluid">
                                <div  class="friend-list friend-page-list">
                                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                            </div>  
                        </div>
                        <div v-if="!this.loading">
                            <div v-for="post in top_posts" class="post-details">
                            <div class="detail-box pt-3">
                                <router-link :to="{path:'/forum-post/',query:post}"><h3>{{ post.title }}</h3></router-link>
                                <p>{{ post.description.substring(1,150)+" ..." }}</p>
                            </div>
                            <div class="like-panel">
                                <div class="left-emoji">
                                    <h6 class="text-capitalize">By {{post.created_by}}</h6>
                                </div>
                                <div class="right-stats">
                                    <ul>
                                        <li>
                                            <h5>
                                                <span class="fa fa-comment">{{ " "+post.comments_count }}</span>
                                            </h5>
                                        </li>
                                        <li>
                                            <h5>
                                                <span class="fa fa-eye"> {{ " "+post.views }}</span>
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-center w-100 mt-4">
                <div class="card mb-3">
                 <div class="card-header bg-white py-3">
                     <h2>More Topics</h2>
                 </div>
                </div>
                
                <div class="post-panel  section-t-space">
                    <div class="post-wrapper col-grid-box">
                        <div v-if="this.loading" class="row">
                            <div class="loading-img container-fluid">
                                <div  class="friend-list friend-page-list">
                                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                            </div>  
                        </div>
                        <div v-if="!this.loading">
                            <div v-for="post in other_posts" class="post-details">
                            <div class="detail-box pt-3">
                                <router-link :to="{path:'/forum-post/',query:post}"><h3>{{ post.title }}</h3></router-link>
                                <p>{{ post.description.substring(0,150)+" ..." }}</p>
                            </div>
                            <div class="like-panel">
                                <div class="left-emoji">
                                    <h6 class="text-capitalize">By {{post.created_by}}</h6>
                                </div>
                                <div class="right-stats">
                                    <ul>
                                        <li>
                                            <h5>
                                                <span class="fa fa-comment">{{ " "+post.comments_count }}</span>
                                            </h5>
                                        </li>
                                        <li>
                                            <h5>
                                                <span class="fa fa-eye"> {{ " "+post.views }}</span>
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
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
            top_posts:[],
            other_posts:[],
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
        async getForums() {
            
            var response = await axios.get(this.$store.state.api_url + "/get-forum-post")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.top_posts = response.data.dataz.top_post
              this.other_posts = response.data.dataz.other_post
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
        this.getForums()
        

    }
};
</script>
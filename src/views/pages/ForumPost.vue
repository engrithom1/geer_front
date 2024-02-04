<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Discussion Details</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="container-fluid px-0 layout-default ">
        <div class="page-content">
            <div class="content-center w-100">
                <div class="post-panel">
                    <div class="post-wrapper col-grid-box">
                        <div class="post-title">
                            <div class="profile">
                                <div class="media">
                                    <a class="user-img">
                                        <img :src="this.$store.state.img_url+this.forum.avatar"
                                            class="img-fluid blur-up lazyload bg-img" alt="user">
                                    </a>
                                    <div class="media-body">
                                        <h5>{{ this.forum.created_by }}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-details">
                            <div class="detail-box">
                                <h3 class="mb-2"> {{ this.forum.title }}</h3>
                                
                                {{ this.forum.description }}
                                
                            </div>
                            <div class="like-panel">
                                <div class="left-emoji">
                                    <h6 v-if="this.forum.created_at" class="text-capitalize">Posted at {{this.forum.created_at.substring(0,10)}}</h6>
                                </div>
                                <div class="right-stats">
                                    <ul>
                                        <li>
                                            <h5>
                                                <span class="fa fa-comment">{{ " "+this.forum.comments_count }}</span>
                                            </h5>
                                        </li>
                                        <li>
                                            <h5>
                                                <span class="fa fa-eye"> {{ " "+this.forum.views }}</span>
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="comment-section">
                                <div class="reply mb-3">
                                    <div class="search-input input-style input-lg icon-right">
                                        <input type="text" required v-model="this.comment" class="form-control emojiPicker"
                                            placeholder="write a comment..">
                                        <a v-on:click="this.createComment()" class="icon btn-comment">
                                            <i class="fa fa-paper-plane fa-2x"></i>
                                        </a>
                                        
                                    </div>
                                </div>
                                <div v-if="this.loading" class="comments d-block">
                                    <div class="loading-img container-fluid">
                                        <div  class="friend-list friend-page-list">
                                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="this.my_comments" class="comments d-block">
                                   
                                    <div v-for="comment in my_comments" class="main-comment">
                                        <div class="media">
                                            <a href="#" class="user-img">
                                                <img :src="this.$store.state.img_url+this.forum.avatar"
                                                    class="img-fluid blur-up lazyload bg-img" alt="user">
                                            </a>
                                            <div class="media-body">
                                                <a href="#">
                                                    <h5>{{ comment.created_by }}</h5>
                                                </a>
                                                <p>{{ comment.comment }}</p>
                                                <ul class="comment-option">
                                                    <li><a v-on:click="likeComment(comment.id,comment.likes)"><i class="fa fa-thumbs-up"></i> {{ comment.likes }} likes </a></li>
                                                </ul>
                                            </div>
                                            <div class="comment-time">
                                                <h6 v-if="comment.created_at">{{ comment.created_at.substring(0,10) }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="!this.loading" class="comments d-block">
                                    <div v-if="comments.length == 0">
                                        <h4>No Comment Found</h4>
                                    </div>
                                    <div v-for="comment in comments" class="main-comment">
                                        <div class="media">
                                            <a href="#" class="user-img">
                                                <img :src="this.$store.state.img_url+this.forum.avatar"
                                                    class="img-fluid blur-up lazyload bg-img" alt="user">
                                            </a>
                                            <div class="media-body">
                                                <a href="#">
                                                    <h5>{{ comment.created_by }}</h5>
                                                </a>
                                                <p>{{ comment.comment }}</p>
                                                <ul class="comment-option">
                                                    <li><a v-on:click="likeComment(comment.id,comment.likes)"><i class="fa fa-thumbs-up"></i> {{ comment.likes }} likes </a></li>
                                                </ul>
                                            </div>
                                            <div class="comment-time">
                                                <h6 v-if="comment.created_at">{{ comment.created_at.substring(0,10) }}</h6>
                                            </div>
                                        </div>
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

export default {
    components: {
    },
    data() {
        return {
            forum:{},
            comments:[],
            comment:"",
            my_comments:[],
            loading:true,
            user: {},
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
        async createComment(){
            var comment = this.comment;
            var forum_id = this.$route.query.id;

            if(!comment){
                 alert('Enter comment')
            }else{
                var response = await axios.post(this.$store.state.api_url + "/create-comment",{'comment':comment,'forum_id':forum_id})
                .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                });

                if (response.data.success) { 
                var comment = response.data.comment
                var my_comments = this.my_comments
                my_comments.push(comment)
                my_comments.sort((a,b)=> a.id < b.id ? 1 : -1)

                this.my_comments = my_comments

                this.comment = ""

                } else {
                    console.log(response.data.errors)
                }

            }
        },
        async likeComment(comment_id, likes){

            var response = await axios.post(this.$store.state.api_url + "/like-comment",{'comment_id':comment_id})
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              var likes = parseInt(likes) + response.data.like
              var comments = this.comments

              var objIndex = comments.findIndex((obj => obj.id == comment_id));
              if(objIndex != -1){
                comments[objIndex].likes = likes
                this.comments = comments
              }else{
                var my_comments = this.my_comments
                var objIndex = my_comments.findIndex((obj => obj.id == comment_id));
                my_comments[objIndex].likes = likes
                this.my_comments = my_comments
              }
              //console.log(response.data.like)
            } else {
                console.log(response.data.errors)
            }
        },
        async getComments() {

            var forum_id = this.$route.query.id;
            this.forum = this.$route.query;
            
            var response = await axios.post(this.$store.state.api_url + "/get-comments",{'forum_id':forum_id})
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.comments = response.data.comments
             
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }

            this.loading = false
        
        }
    },
    created() {
        this.isAuth()
        this.getComments()
    }
};
</script>
<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>Mentors</h1>
            </div>
        </div>
    </div>
    <!--  event cover end -->
    <!--news feeds-->
    <div class="container-fluid section-t-space px-0 layout-default">
        <div class="page-content">
            <div class="px-3 w-100">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Mentors</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Mentors</button>
                   
                </div>
            </nav>
            <div class="tab-content mt-3 pb-5" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="amentors.length == 0">
                                <h4>No Mentor Found</h4>
                            </div>

                            <ul class="row">
                                <li class="col-md-4 col-sm-6" v-for="mentor in amentors">
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
                                                <h5>{{ mentor.interest }}</h5>
                                                <div class="counter-stats">
                                                    <ul>
                                                        <li>
                                                            <h3 >{{ mentor.mentees }}</h3>
                                                            <h5>Capacity</h5>
                                                        </li>
                                                        <li>
                                                            <h3 >{{ mentor.mentor_students_count }}</h3>
                                                            <h5>Accepted</h5>
                                                        </li>
                                                        <li>
                                                            <h3 >{{ mentor.mentees - mentor.mentor_students_count }}</h3>
                                                            <h5>Chancees</h5>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href="" v-on:click="setEditData(mentor)" data-bs-toggle="modal" data-bs-target="#quick-approve" class="btn btn-outline">view
                                                    profile</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <div v-if="this.expnewz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.expnewz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="inmentors.length == 0">
                                <h4>No Mentor Found</h4>
                            </div>

                            <ul class="row">
                                <li class="col-md-4 col-sm-6" v-for="mentor in inmentors">
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
                                                <h5>{{ mentor.interest }}</h5>
                                                
                                                <div class="d-flex justify-content-between">
                                                    <button class="btn btn-success">View</button>
                                                    <span class="mx-1"></span>
                                                    <button class="btn btn-primary">Chats</button>
                                                </div>
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
    </div>        

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="quick-approve">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Quick Approve</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2 d-flex justify-content-center">
                <div class="image-section">
                    <div class="profile-img">
                        <div>
                            <img :src="this.$store.state.img_url+mentor.avatar"
                                class="img-fluid blur-up lazyloaded" style="border-radius: 50%;"
                                alt="profile">
                        </div>
                        
                    </div>
                </div>
               <div class="row">
                <div class="col-md-12 mb-2">
                    <p class="v-p">Name : <strong>{{ this.mentor.name }}</strong></p>
                </div>
                <!--div class="col-md-12 mb-2">
                    <p class="v-p">Age : <strong>{{ thi }}</strong></p>
                </div-->
                <div class="col-md-12 mb-2">
                    <p class="v-p">Gender : <strong>{{ this.mentor.sex }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Education Level : <strong>{{ this.mentor.education_level }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">About Me : <strong>{{ this.mentor.about_me }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">Skills : <strong>{{ this.mentor.expertise }}</strong></p>
                </div>
                
                <div class="col-12"></div>
                
                <div class="btn-section mt-3">
                    <button v-on:click="bookMentor(this.mentor.id)" class="btn btn-solid btn-sm">Book for Mentor</button>
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
          
            amentors:[],
            inmentors:[],
            mentor:{},
            newz_loading:true,
            expnewz_loading:true,
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
        async getAllMentors() {
            var response = await axios.get(this.$store.state.api_url + "/get-all-mentors-student")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.amentors = response.data.amentors
              this.inmentors = response.data.inmentors
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
           
            this.newz_loading = false
            this.expnewz_loading = false
        
        },
        async bookMentor(id){
            var response = await axios
        .post(this.$store.state.api_url + "/book-mentor",{id})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                    this.amentors = this.amentors.filter((i) => i.id != id);
              
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


<template>
    <!--  event cover start -->
    <div class="event-cover light-cover mb-5">
        <div class="event-img bg-size blur-up lazyloaded event-dashbord">
            <div class="event-content">
                <h1>All Mentors</h1>
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
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Active</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">InActive</button>
                    <!--button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Create</button-->
                </div>
            </nav>
            <div class="tab-content mt-3 pb-5" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div v-if="this.mento_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.mento_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="amentors.length == 0">
                                <h4>No Notes Found</h4>
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
                                                
                                                <p class="text-sm">{{ mentor.interest }}</p>
                                                <p class="text-sm"></p>
                                                
                                                <button data-bs-toggle="modal" v-on:click="this.setEditData(mentor,'active')" data-bs-target="#edit-news" class="btn btn-outline">Preview</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <div v-if="this.mento_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.mento_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="inmentors.length == 0">
                                <h4>No Notes Found</h4>
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
                                                
                                                <p class="text-sm">{{ mentor.interest }}</p>
                                                <p class="text-sm"></p>
                                                
                                                <button data-bs-toggle="modal" v-on:click="this.setEditData(mentor,'inactive')" data-bs-target="#edit-news" class="btn btn-success btn-sm">Preview</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <!--div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                   <div class="row">
                       <div class="col-md-8">
                            
                       </div>
                   </div>
                </div-->
               
            </div>
        </div>  
        </div>
    </div>        

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="edit-news">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Detailed Approve</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <h2 class="mb-3">Personal Information</h2>
               <div class="row">
                <div class="col-md-12 mb-2">
                    <p class="v-p">1. Full Name : <strong>{{ this.mentor.name }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">2. Age : <strong>{{ this.mentor.age }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">3. Sex : <strong>{{ this.mentor.sex }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">4. Your current address  : <strong>{{ this.mentor.contact }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">5. Highest level of education attended  : <strong>{{ this.mentor.education_level }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">6. Have you attended any professional training in coaching and mentorship skills  : <strong>{{ this.mentor.skills }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">7. Major  areas of interest in coaching and mentorship   : <strong>{{ this.mentor.interest }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">8. Specific areas  of expertise (Tick all that apply) : <strong>{{ this.mentor.expertise }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">9. Do you have any experience in business or career coaching?  : <strong>{{ this.mentor.experience }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">10. 	How many mentees can you handle efficiently in a given time?   : <strong>{{ this.mentor.mentees }}</strong></p>
                </div>
                <div class="col-md-12 mb-2">
                    <p class="v-p">11.	What is your most preferred timing for providing mentorship support to the beneficiaries? ( pick option you mostly prefer ): <strong>{{ this.mentor.time }}</strong></p>
                </div>

                <div class="col-md-6 mb2">
                    <label for="">Assign Modules to Mentor</label>
                    <div v-for="group in groups">
                    <label class="label-2" :for="'group'+group.id">
                        <input type="checkbox" v-model="this.s_group" :id="'group'+group.id" :value="group.id"> {{ group.name }}
                    </label>
                    </div>
                </div>

                <div v-if="this.status == 'inactive'" class="btn-section mt-3">
                    <button v-on:click="mentorApprove()" class="btn btn-success btn-sm">Approve</button>
                </div>
                <div v-if="this.status == 'active'" class="btn-section mt-3">
                    <button v-on:click="mentorApprove()" class="btn btn-danger btn-sm">Block</button>
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
            groups:[],
            mentor:{},
            status:"",
            mento_loading:true,
            user: {},
            s_group:[]
        
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

        setEditData(mentor,status){
          this.mentor = mentor
          this.status = status
          this.s_group = mentor.groups.split(',')
        },

        async mentorApprove(){

        var id = this.mentor.id
        var status = this.status
        var groups = this.s_group.toString()

        var response = await axios
        .post(this.$store.state.api_url + "/approve-mentor",{id, status, groups})
        .catch((errors) => {

            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },
      
        async getAllMentors() {
            var response = await axios.get(this.$store.state.api_url + "/get-all-mentors")
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
            this.mento_loading = false;
        
        },
        async getAllGroups() {

        var response = await axios.get(this.$store.state.api_url + "/get-all-groups")
        .catch((errors) => {
        var message = "Network or Server Errors";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
        });

        if (response.data.success) { 
        this.groups = response.data.groups
        //console.log(response.data.dataz)
        } else {
            console.log(response.data.errors)
        }
        this.newz_loading = false;

        },
       
    },
    created() {
        //this.isAuth()
        this.getAllGroups()
        this.getAllMentors()
        
    }
};
</script>
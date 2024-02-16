<style>
.label-2{
    font-weight: 400 !important;
}
</style>

<template>

    <!-- header start -->
    <header>
        <div class="mobile-fix-menu"></div>
        <div class="container-fluid custom-padding">
            <div class="header-section">
                <div class="header-left">
                    <div class="brand-logo">
                        <a href="index.html">
                            <!--img src="assets/images/logo.png" alt="logo" class="img-fluid blur-up lazyload"-->
                            <h2 class="text-white">IMED GEER</h2>
                        </a>
                    </div>

                   
                </div>
                <div class="header-right">
                    <div v-show="false" class="post-stats">
                        <ul id="counter">
                            <li>
                                <h3 class="counter-value" data-count="546">0</h3>
                                <span>this intake</span>
                            </li>
                            <li>
                                <h3 class="counter-value" data-count="2456">0</h3>
                                <span>total students </span>
                            </li>
                        </ul>
                    </div>
                    <ul class="option-list">
                       
                        <li class="header-btn custom-dropdown profile-btn btn-group">
                            <a class="main-link" href="javascript:void(0)" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i class="d-sm-none d-block">
                                    <img src="/assets/images/icons/user_sm.png" width="20px" alt="">
                                </i>
                                <div class="media d-none d-sm-flex ">
                                    <div class="user-img">
                                        <img :src="this.$store.state.img_url+user.avatar"
                                            class="img-fluid blur-up lazyload bg-img" alt="user">
                                        <span class="available-stats online"></span>
                                    </div>
                                    <div class="media-body d-none d-md-block">
                                        <h4>{{user.name}}</h4>
                                        <span>active now</span>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div class="dropdown-header">
                                    <span>profile</span>
                                    <div class="mobile-close">
                                        <h5>close</h5>
                                    </div>
                                </div>
                                <div class="dropdown-content">
                                    <ul class="friend-list">
                                       
                                        <li>
                                            <a href="#" v-on:click="logout()">
                                                <div class="media">
                                                    <i data-feather="log-out"></i>
                                                    <div class="media-body">
                                                        <div>
                                                            <h5 class="mt-0">log out</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <!-- header end -->

    
    <!-- page body start -->
    <div class="page-body container-fluid newsfeed-style2">

        <div class="page-center w-100">

             <!--  event cover start -->
            <div class="row mb-5">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="event-cover light-cover mb-5">
                        <div class="event-img bg-size blur-up lazyloaded event-student-1">
                            <div class="event-content">
                                <h1>Your almost Done!</h1>
                            </div>
                        </div>
                    </div>
                    <!--  event cover end -->
                    <div v-if="this.state == 'form' && user.auth_statuses_id == 1" class="container-fluid section-t-space px-0 layout-default  mt-5">
                        <div class="page-content">
                            <!--real content segments-->
                            <div class="login-form w-100 px-2 d-flex justify-content-center">
                                <div v-if="user.auth_statuses_id == 1">
                                   <h1>You want to Join As!</h1>
                                   <br/>
                                   <div class="btn-section">
                                        <button type="submit" v-on:click="toggleForm('student')" class="btn btn-solid btn-lg">Student</button>
                                        <span class="m-1"></span>
                                        <button type="button" v-on:click="toggleForm('mentor')" class="btn btn-solid btn-lg ms-auto">Mentor</button>
                                    </div>
                                </div>
                               
                            </div>
                            <!--end real content segment-->
                        </div>
                    </div>

                    <div v-if="this.state == 'mentor' && user.auth_statuses_id == 1" class="container-fluid section-t-space px-0 layout-default  mt-5">
                        <div class="page-content">
                            <!--real content segments-->
                            <div class="login-form w-100 px-2">
                                <div v-if="user.auth_statuses_id == 1">
                                    <button class="btn btn-solid btn-lg" v-on:click="toggleForm('form')">Back</button>
                                    <Mentor :user="this.user" />
                                </div>
                               
                            </div>
                            <!--end real content segment-->
                        </div>
                    </div>
        
                    <div v-if="this.state == 'student' || user.auth_statuses_id > 1" class="container-fluid section-t-space px-0 layout-default  mt-5">
                        <div class="page-content">
                            <!--real content segments-->
                            <div class="login-form w-100 px-2">
                                <div v-if="user.auth_statuses_id == 1">
                                    <button class="btn btn-solid btn-lg" v-on:click="toggleForm('form')">Back</button>
                                    <StudentProfile />
                                </div>
                                <div v-if="user.auth_statuses_id == 2">
                                    <StudentEmployment />
                                </div>
                                <div v-if="user.auth_statuses_id == 3">
                                    <StudentNeed />
                                </div>
                                <div v-if="user.auth_statuses_id == 4">
                                    <div class="login-discription text-center ">
                                        <h1>Waiting For Admin Approve</h1>
                                    </div>
                                    
                                </div>
                            </div>
                            <!--end real content segment-->
                        </div>
                    </div>
        
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    </div>
    <!-- page body end -->
</template>

<script>
import axios from "axios";
import StudentProfile from "./join_forms/StudentProfile.vue";
import StudentEmployment from "./join_forms/StudentEmployment.vue";
import StudentNeed from "./join_forms/StudentNeed.vue";
import Mentor from "./join_forms/Mentor.vue";

export default {
  components: {
    StudentProfile,
    StudentEmployment,
    StudentNeed,
    Mentor
  },
  props:{user:Object},
  data() {
    return {
        state : 'form' //mentor, student
    };
  },
  methods: {
    logout(){
        this.$store.dispatch("logOut");
    },
    toggleForm(state){
        this.state = state
    }
  },
  created() {
   
  }
};
</script>
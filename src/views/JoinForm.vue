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
                                <i class="icon-light stroke-width-3 d-sm-none d-block iw-16 ih-16"
                                    data-feather="user"></i>
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
        
                    <div class="container-fluid section-t-space px-0 layout-default  mt-5">
                        <div class="page-content">
                            <!--real content segments-->
                            <div class="login-form w-100 px-2">
                                <div v-if="user.auth_statuses_id == 0">
                                    <StudentProfile />
                                </div>
                                <div v-if="user.auth_statuses_id == 1">
                                    <StudentEmployment />
                                </div>
                                <div v-if="user.auth_statuses_id == 2">
                                    <StudentNeed />
                                </div>
                                <div v-if="user.auth_statuses_id == 3">
                                    <div class="login-discription text-center ">
                                        <h1>Waiting For Enrollment</h1>
                                    </div>
                                    
                                </div>
                                <div v-if="user.auth_statuses_id == 4">
                                    <div class="login-discription text-center ">
                                        <h1>failed</h1>
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

export default {
  components: {
    StudentProfile,
    StudentEmployment,
    StudentNeed,
  },
  props:{user:Object},
  data() {
    return {
    
    };
  },
  methods: {
    logout(){
        this.$store.dispatch("logOut");
    }
  },
  created() {
   
  }
};
</script>
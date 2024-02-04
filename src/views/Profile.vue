<template>
    <Bigheader :user="user"/>

    <!-- setting section start -->
    <section class="setting-section section-pb-space section-pt-space mt-4">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-4">
                    <div class="setting-sidebar">
                        <div class="back-btn d-lg-none d-block">
                            <i data-feather="x" class="icon-theme"></i>
                        </div>
                        <div class="user-details">
                            <div class="user-img">
                                <img :src="this.$store.state.img_url+user.avatar" style="width:100px !important; height:100px !important;" class="img-fluid blur-up lazyload bg-img" alt="">
                            </div>
                            <h5>{{ user.name }}</h5>
                            <h6></h6>
                        </div>
                        <div class="tab-section">
                            <div class="nav flex-column nav-pills">
                                <a class="nav-link" href="/"><i class="fa fa-home me-2"></i>Dashbord</a>
                                <router-link to="/" class="nav-link active"><i class="fa fa-info me-2"></i>personal info</router-link>
                                <router-link to="#" class="nav-link"><i class="fa fa-user me-2"></i>Courses</router-link>
                                <router-link to="#" class="nav-link"><i class="fa fa-lock me-2"></i>Students</router-link>
                                <router-link to="#" class="nav-link"><i class="fa fa-bell me-2"></i>Exam Results</router-link>
                                <router-link to="#" class="nav-link"><i class="fa fa-video me-2"></i>Certificate</router-link>
                                <router-link to="#" class="nav-link"><i class="fa fa-question-circle me-2"></i>help</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-8">

                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel">
                            <div class="setting-home">
                                <router-view></router-view>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </section>
    <!-- setting section end -->


    <!-- subscribe section start -->
    <section class="mb-0">
        <div class="container-fluid p-0">
            <div class="app-section">
                <img src="assets/images/breadcrumb.jpg" class="img-fluid blur-up lazyload bg-img" alt="">
                <div class="app-content">
                    <h2>Download IMED GEER app now</h2>
                    <div class="app-buttons">
                        <!--a href="#" class="">
                            <img src="../assets/images/app-btns/app-store.jpg" class="img-fluid blur-up lazyload"
                                alt="">
                        </a-->
                        <a href="#" class="">
                            <img src="/assets/images/play-store.jpg" class="img-fluid blur-up lazyload" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import Bigheader from "../views/components/Bigheader.vue";

export default {
    components: {
        Bigheader,
    },
    data() {
        return {
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
    },
    created() {
        this.isAuth()
    }
};
</script>


<template>
    <Bigheader :user="user"/>

    <!-- setting section start -->
    <section class="setting-section section-pb-space section-pt-space mt-4">
        <div class="container">
            <div class="profile-menu section-t-space">
                <ul>
                    <li>
                        <router-link to="/account">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>Profile</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3" class="active">
                        <router-link to="/account/news">
                            <span class="fa fa-file-text iw-14 ih-14"></span>
                            <h6>News</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/modules">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>Modules</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/videos">
                            <span class="fa fa-video-camera iw-14 ih-14"></span>
                            <h6>videos</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/audios">
                            <span class="fa fa-headphones iw-14 ih-14"></span>
                            <h6>audios</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/books">
                            <span class="fa fa-file-pdf-o iw-14 ih-14"></span>
                            <h6>books</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/discussions">
                            <span class="fa fa-align-center iw-14 ih-14"></span>
                            <h6>discussion</h6>
                        </router-link>
                    </li>
                    <li v-if="this.user.roles_id == 3">
                        <router-link to="/account/materials">
                            <span class="fa fa-align-center iw-14 ih-14"></span>
                            <h6>Materials</h6>
                        </router-link>
                    </li>
                    
                    <li v-if="this.user.roles_id == 2">
                        <router-link to="/account/mentor-students">
                            <span class="fa fa-users iw-14 ih-14"></span>
                            <h6> Participants</h6>
                        </router-link>
                    </li>
                    <!--li v-if="this.user.roles_id == 3">
                        <router-link to="/account/all-student">
                            <span class="fa fa-users iw-14 ih-14"></span>
                            <h6> Participants</h6>
                        </router-link>
                    </li-->
                    <li v-if="this.user.roles_id == 3">
                        <a href="/account/test-panel">
                            <span class="fa fa-edit iw-14 ih-14"></span>
                            <h6>Test Panel</h6>
                        </a>
                    </li>
                    <!--li v-if="this.user.roles_id == 1">
                        <a href="#">
                            <span class="fa fa-edit iw-14 ih-14"></span>
                            <h6>Test Results</h6>
                        </a>
                    </li-->
                    <li v-if="this.user.roles_id == 1">
                        <a href="#">
                            <span class="fa fa-file iw-14 ih-14"></span>
                            <h6>Certification</h6>
                        </a>
                    </li>
                     <!--for participant to evalueate program and mentor-->
                    <li v-if="this.user.roles_id == 1">
                        <router-link to="/account/student-feedback">
                            <span class="fa fa-users iw-14 ih-14"></span>
                            <h6> FeedBack</h6>
                        </router-link>
                    </li>
                    <!--for mentor to evalueate program and participnt-->
                    <li v-if="this.user.roles_id == 2">
                        <router-link to="/account/mentor-feedback">
                            <span class="fa fa-users iw-14 ih-14"></span>
                            <h6> FeedBack</h6>
                        </router-link>
                    </li>
                    <li>
                        <a href="/">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>Dashbord</h6>
                        </a>
                    </li>
                </ul>
                
            </div>
            <div class="mt-3">
                <router-view></router-view>
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
import * as CryptoJS from 'crypto-js';
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
            var user_cry = localStorage.getItem("user") || "";
            var token_cry = localStorage.getItem("user_token") || "";
            var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
            var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
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


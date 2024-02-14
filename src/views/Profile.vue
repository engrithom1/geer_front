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
                    <li class="active">
                        <router-link to="/account/news">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>News</h6>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/modules">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>Modules</h6>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/videos">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>videos</h6>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/audios">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>audios</h6>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/books">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>books</h6>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/discussions">
                            <span class="fa fa-user iw-14 ih-14"></span>
                            <h6>discussion</h6>
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


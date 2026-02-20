<template>
    <div>
    <Bigheader :user="user"/>
    <div class="page-body container-fluid newsfeed-style2 mb-5">

        <!-- sidebar panel start -->
        <div class="sidebar-panel panel-lg">
            <div class="main-icon">
                <a href="#">
                    <img src="/assets/svg/menu.svg" class="bar-icon-img" alt="menu">
                    <h4>all apps</h4>
                </a>
            </div>
            <ul class="sidebar-icon">
                <li id="dahsbord" class="">
                    <router-link to="/">
                        <img src="/assets/images/icons/dashboard.png" class="bar-icon-img" alt="news">
                        <h4>Dashboard</h4>
                    </router-link>
                </li>
                <li id="modules" v-if="user.roles_id == 1">
                    <router-link to="/my-modules">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="favourite">
                        <h4>My Modules</h4>
                    </router-link>
                </li>
                <li id="modules" v-if="user.roles_id == 2">
                    <router-link to="/my-modules">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="favourite">
                        <h4>All Modules</h4>
                    </router-link>
                </li>
                <!--li>
                    <a href="documents.html">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="favourite">
                        <h4>Notes Courses</h4>
                    </a>
                </li>
                <li>
                    <a href="videos.html">
                        <img src="/assets/images/icons/video-tutorial.png" class="bar-icon-img" alt="group">
                        <h4>Video Courses</h4>
                    </a>
                </li>
                <li>
                    <a href="audios.html">
                        <img src="/assets/images/icons/book.png" class="bar-icon-img" alt="music">
                        <h4>Audio Courses</h4>
                    </a>
                </li-->
                <li id="forums">
                    <router-link to="/forums">
                        <img src="/assets/images/icons/chat.png" class="bar-icon-img" alt="games">
                        <h4>Forums</h4>
                    </router-link>
                </li>
                <li id="forums">
                    <router-link to="/materials">
                        <img src="/assets/images/pdf.png" class="bar-icon-img" alt="games">
                        <h4>Materials</h4>
                    </router-link>
                </li>
                <li v-if="user.roles_id == 1" id="forums">
                    <router-link to="/student-mentors">
                        <img src="/assets/images/icons/mentors.png" class="bar-icon-img" alt="games">
                        <h4>Mentors</h4>
                    </router-link>
                </li>
                <li v-if="user.roles_id == 3" id="forums">
                    <router-link to="/all-mentors">
                        <img src="/assets/images/icons/mentors.png" class="bar-icon-img" alt="games">
                        <h4>Mentors</h4>
                    </router-link>
                </li>
                <li v-if="user.roles_id == 1" id="test">
                    <router-link to="/module-test">
                        <img src="/assets/images/icons/answer.png" class="bar-icon-img" alt="weather">
                        <h4>Module Test</h4>
                    </router-link>
                </li>
                <li v-if="user.roles_id == 3" id="test">
                    <router-link to="/test-result">
                        <img src="/assets/images/icons/answer.png" class="bar-icon-img" alt="weather">
                        <h4>Test Results</h4>
                    </router-link>
                </li>
                <!--li id="chats">
                    <router-link to="/chats">
                        <img src="/assets/images/icons/chat.png" class="bar-icon-img" alt="games">
                        <h4>Chats</h4>
                    </router-link>
                </li-->
                <li id="chats">
                    <a href="https://chats.imedconnect.or.tz/chats">
                        <img src="/assets/images/icons/chat.png" class="bar-icon-img" alt="games">
                        <h4>Chats</h4>
                    </a>
                </li>
                <li id="live">
                    <a href="https://chats.imedconnect.or.tz/livestream">
                        <img src="/assets/images/icons/instagram-live.png" class="bar-icon-img" alt="live">
                        <h4>Live streams</h4>
                    </a>
                </li>
                <li id="recruitment" v-if="user.roles_id == 3">
                    <router-link to="/recruitments">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="event">
                        <h4>Recruitments</h4>
                    </router-link>
                </li>
                <li v-if="user.roles_id == 2" id="profile">
                    <a href="/account">
                        <img src="/assets/images/icons/user.png" class="bar-icon-img" alt="event">
                        <h4>Metors Panel</h4>
                    </a>
                </li>
                <li v-if="user.roles_id == 1" id="profile">
                    <a href="/account">
                        <img src="/assets/images/icons/user.png" class="bar-icon-img" alt="event">
                        <h4>My Account</h4>
                    </a>
                </li>
                <li v-if="user.roles_id == 3" id="profile">
                    <a href="/account">
                        <img src="/assets/images/icons/admin.png" class="bar-icon-img" alt="event">
                        <h4>Admin Panel</h4>
                    </a>
                </li>
                 <!--li id="forums">
                    <router-link to="/chats">
                        <img src="/assets/images/icons/chat.png" class="bar-icon-img" alt="games">
                        <h4>Demo Chats</h4>
                    </router-link>
                </li-->

            </ul>
            <div class="main-icon">
                <a href="#" v-on:click="logout()">
                    <img src="/assets/images/icons/switch.png" class="bar-icon-img" alt="logout">
                    <h4>logout</h4>
                </a>
            </div>
        </div>
        <!-- sidebar panel end -->

        <div class="page-center">
        <router-view></router-view>
        </div>

    </div>
    </div>
</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';
import Bigheader from "../views/components/Bigheader.vue";
//https://stackoverflow.com/questions/53415502/custom-postion-for-v-dialog-vuetify

export default {
  components: {
    Bigheader,
  },
  data() {
    return {
      loged: true,
      user: {},
    };
  },
  methods: {
    isLoged() {
        var user_cry = localStorage.getItem("user") || "";
            var token_cry = localStorage.getItem("user_token") || "";
            var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
            var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
      if (user && token) {
        this.loged = true;
        this.user = JSON.parse(user);
      } else {
        this.loged = false;
      }
    },
    logout(){
        this.$store.dispatch("logOut");
    }
  },
  created() {
    this.isLoged()
  }
};
</script>

<!--style scoped>
  >>> .my-custom-dialog {
    align-self: flex-end;
  }
</style-->

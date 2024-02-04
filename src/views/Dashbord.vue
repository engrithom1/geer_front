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
                        <h4>Dashbord</h4>
                    </router-link>
                </li>
                <li id="modules" v-if="user.roles_id == 1">
                    <router-link to="/my-modules">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="favourite">
                        <h4>My Modules</h4>
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
                <li id="test">
                    <router-link to="/">
                        <img src="/assets/images/icons/answer.png" class="bar-icon-img" alt="weather">
                        <h4>Test & Quiz</h4>
                    </router-link>
                </li>
                <li id="chats">
                    <router-link to="/">
                        <img src="/assets/images/icons/chat.png" class="bar-icon-img" alt="games">
                        <h4>Chats</h4>
                    </router-link>
                </li>
                <li id="live">
                    <router-link to="/">
                        <img src="/assets/images/icons/instagram-live.png" class="bar-icon-img" alt="live">
                        <h4>Live streams</h4>
                    </router-link>
                </li>
                <li id="recruitment" v-if="user.roles_id == 3">
                    <router-link to="/recruitments">
                        <img src="/assets/images/icons/notes.png" class="bar-icon-img" alt="event">
                        <h4>Recruitments</h4>
                    </router-link>
                </li>
                <li id="profile">
                    <a href="/profile">
                        <img src="/assets/images/icons/user.png" class="bar-icon-img" alt="event">
                        <h4>Account</h4>
                    </a>
                </li>

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
import Bigheader from "../views/components/Bigheader.vue";

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
      var user = localStorage.getItem("user");
      var token = localStorage.getItem("user_token");
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
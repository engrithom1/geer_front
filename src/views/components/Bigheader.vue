<template>
    <header>
        <div class="mobile-fix-menu"></div>
        <div class="container-fluid custom-padding">
            <div class="header-section">
                <div class="header-left">
                    <div class="brand-logo">
                        <a href="/">
                            <!--img src="/assets/images/logo.png" alt="logo" class="img-fluid blur-up lazyload"-->
                            <h2 class="text-white">IMED GEER</h2>
                        </a>
                    </div>

                    <ul class="btn-group">
                        <li class="header-btn home-btn d-md-none">
                            <router-link to="/" class="main-link">
                                <img src="/assets/images/icons/home.png" width="18px"/>
                            </router-link>
                        </li>
                        <li class="header-btn custom-dropdown dropdown-lg add-friend d-md-none">
                            <router-link class="main-link" to="/my-modules">
                                <img src="/assets/images/icons/docs.png" width="18px"/>
                            </router-link>
                        </li>
                       
                    </ul>
                </div>
                <div class="header-right">
                    <div class="post-stats">
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
                        <!--li class="header-btn custom-dropdown dropdown-lg app-btn">
                            <a class="main-link" href="#">
                                <img src="/assets/images/icons/chat_sm.png" width="18px"/><span
                                    class="count success">2</span>
                            </a>

                        </li-->

                        <li class="header-btn custom-dropdown dropdown-lg">
                            <a class="main-link" href="#">
                                <img src="/assets/images/icons/bell.png" width="18px"/><span
                                    class="count warning">2</span>
                            </a>
                        </li>
                        <li class="header-btn custom-dropdown dropdown-lg btn-group message-btn d-md-none">
                            <router-link to="/forums" class="main-link">
                                <img src="/assets/images/icons/forum.png" width="18px"/>
                            </router-link>

                        </li>

                        <li class="header-btn custom-dropdown dropdown-lg btn-group notification-btn d-md-none">
                            <a class="main-link" href="#">
                                <img src="/assets/images/icons/chat_sm.png" width="18px"/>
                            </a>
                        </li>
                        <li class="header-btn custom-dropdown d-md-none d-block app-btn">
                            <a class="main-link" href="javascript:void(0)">
                                <img src="/assets/images/icons/grid.png" width="18px"/>
                            </a>
                            <div class="overlay-bg app-overlay"></div>
                            <div class="app-box">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/dashboard.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Dashbord</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div  v-if="user.roles_id == 1" class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/my-modules">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/notes.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>My Modules</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/forums">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/book.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Forums</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/answer.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Test Quiz</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/chat.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Chats</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/instagram-live.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Live Stream</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div v-if="user.roles_id == 3" class="col-6">
                                        <div class="app-icon">
                                            <router-link to="/recruitments">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/notes.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Recruitments</h5>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <a href="/profile">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/user.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Profile</h5>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="app-icon">
                                            <a href="#" v-on:click="logout()">
                                                <div class="icon">
                                                    <img src="/assets/images/icons/switch.png" width="24px" class="bar-icon" alt="dashbord">
                                                </div>
                                                <h5>Logout</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="header-btn custom-dropdown profile-btn btn-group">
                            <a class="main-link" href="/profile">
                                <img src="/assets/images/icons/user_sm.png" class="d-md-none" width="18px"/>
                                <div class="media d-none d-sm-flex ">
                                    <div class="user-img">
                                        <img :src="this.$store.state.img_url+user.avatar" class="img-fluid blur-up lazyload bg-img"
                                            alt="user">
                                        <span class="available-stats online"></span>
                                    </div>
                                    <div class="media-body d-none d-md-block">
                                        <h4>{{ user.name }}</h4>
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
                                            <a href="profile.html">
                                                <div class="media">
                                                    <i data-feather="user"></i>
                                                    <div class="media-body">
                                                        <div>
                                                            <h5 class="mt-0">Profile</h5>
                                                            <h6>Profile preview & settings</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="login.html">
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
</template>

<script>

export default {
  components: {
   
  },
  props:{
    user:Object
  },
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

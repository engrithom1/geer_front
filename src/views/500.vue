<template> 
  <!-- setting section start -->
  <section class="setting-section section-pb-space section-pt-space mt-1">
    <div class="container">
        <div class="profile-menu section-t-space">
            <ul>
                <li>
                    <router-link to="/account">
                        <span class="fa fa-user iw-14 ih-14"></span>
                        <h6>Profile</h6>
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
           <h2>Permission denied</h2>
        </div>
    </div>    
</section>
<!-- setting section end -->
</template>
<script>

import * as CryptoJS from 'crypto-js';


export default {
    components: {
       
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
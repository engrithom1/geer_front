<template>
    <!-- login section start -->
    <header v-show="false">
        <div class="mobile-fix-menu"></div>
        <div class="container-fluid custom-padding">
            <div class="header-section">
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
    </div>
    </div>
    </div>
    </header>

    <section class="login-section">
        <div class="container">
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-2 col-12 m-auto"></div>
                <div class="col-xl-6 col-lg-6 col-md-8 col-12 m-auto">
                    <div class="login-form">
                        <div>
                            <div class="login-title d-flex justify-content-between">
                                <h2>Verify</h2>
                                <a href="#" v-on:click="logOut()" class="btn btn-sm" style="font-size:16px;"><i class="fa fa-sign-out"></i>Logout</a>
                            </div>
                            <div class="login-discription">
                                <h3>Hello, {{user.name}}</h3>
                                <h4>Code has been sent on {{ user.phone }}.
                                </h4>
                            </div>
                            <div v-if="this.btn_click" class="loading-img container-fluid">
                                <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                            </div>
                            <div class="form-sec">
                                <div>
                                    <form class="theme-form">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Enter Code</label>
                                            <input type="number" v-model="this.my_code" class="form-control" id="exampleInputEmail1"
                                                placeholder="xxxxx">
                                            <i class="input-icon iw-20 ih-20" data-feather="edit"></i>
                                        </div>
                                        
                                        <div class="bottom-sec">
                                            <!--div class="form-check checkbox_animated">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                <label class="form-check-label" for="exampleCheck1">remember me</label>
                                            </div-->
                                            <p class="text-sm text-warning">If you don't receive code within 10min re-send SMS.</p>
                                        </div>
                                        <div class="btn-section d-flex justify-content-between">
                                            <button :disabled="this.btn_click" v-on:click="this.Verify()" class="btn btn-solid btn-lg">Verify</button>
                                            <button :disabled="this.btn_click" v-on:click="this.resendVerification()" class="btn btn-solid btn-lg">resend</button>
                                        </div>
                                    </form>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3 col-md-2 col-12 m-auto"></div>
            </div>
        </div>
    </section>
    <!-- login section end -->
</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
  props:{user:Object},  
  data() {
    return {
      errors: "",
      my_code:"",
      btn_click:false,
    };
  },
  methods: {
    async Verify() {
        this.btn_click = true;
        var response = await axios
          .post(this.$store.state.api_url + "/verify", {my_code : this.my_code})
          .catch((errors) => {
            this.btn_click = false;
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
                this.btn_click = false;
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
              localStorage.removeItem("user")
              //localStorage.setItem('user',JSON.stringify(response.data.user))
              localStorage.setItem('user',CryptoJS.AES.encrypt(JSON.stringify(response.data.user), 'user').toString())
              //window.location.replace('/');
                setTimeout(function(){
                    //alert('after waiting')
                    window.location.replace('/');
                },2000);
             
            } else {
                this.btn_click = false;
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
    },
    async resendVerification() {

        this.btn_click = true;
        var response = await axios
          .post(this.$store.state.api_url + "/resend-code", {})
          .catch((errors) => {
            this.btn_click = false;
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
                this.btn_click = false;
                if(response.data.status == 3){
                    //alert('Your Account Closed, Register again with another Phone number')
                    var message = response.data.message;
                    alert(message)
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                    localStorage.removeItem("user")
                    localStorage.removeItem("user_token")
                        setTimeout(function(){
                            window.location.replace('/');
                    },2000);
                    
                }else if(response.data.status == 1){
                    var message = response.data.message;
                    alert(message)
                    this.$toast.success('Wait and try Again',{duration: 7000,dismissible: true,})
                }else{
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                }
             
            } else {
                this.btn_click = false;
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
           
    },
    logOut() {
      this.$store.dispatch("logOut");
      //alert('you will soon get loged in')
    },
  },
  created() {},
};
</script>
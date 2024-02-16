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
                            <div class="login-title">
                                <h2>Verify</h2>
                            </div>
                            <div class="login-discription">
                                <h3>Hello, Richard Thomas</h3>
                                <h4>Code has been sent on 0768448525.
                                </h4>
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
                                            <p class="text-sm forget-password">If you don't receive code re-send SMS.</p>
                                        </div>
                                        <div class="btn-section">
                                            <a href="#" v-on:click="this.Verify()" class="btn btn-solid btn-lg">Verify</a>
                                            <a href="#" class="btn btn-solid btn-lg">re-send</a>
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

export default {
  props:{user:Object},  
  data() {
    return {
      errors: "",
      my_code:""
    };
  },
  methods: {
    async Verify() {
        var response = await axios
          .post(this.$store.state.api_url + "/verify", {my_code : this.my_code})
          .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
          });
            if (response.data.success) {
              var message = response.data.message;
              this.$toast.success(message,{duration: 7000,dismissible: true,})
              localStorage.removeItem("user")
              localStorage.setItem('user',JSON.stringify(response.data.user))
              //window.location.replace('/');
                setTimeout(function(){
                    //alert('after waiting')
                    window.location.replace('/');
                },2000);
             
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
    },
  },
  created() {},
};
</script>
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
                    <div v-if="auth" class="login-form">
                        <div>
                            <div class="login-title">
                                <h2>Login</h2>
                            </div>
                            <div class="login-discription">
                                <h3>Hello, Welcome Back</h3>
                                <h4>Welcome to IMEDConnect, please login..
                                </h4>
                            </div>
                            <div class="form-sec">
                                <div>
                                    <form class="theme-form" @submit.prevent="login">
                                        <p class="text-danger">
                                            {{ this.$store.state.errorsSMS }}
                                        </p>
                                        <p v-for="error in this.$store.state.errors" :key="error" class="text-danger">
                                            {{ error[0] }}
                                        </p>
                                            
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Phone Number</label>
                                            <input type="text" maxlength="10" v-model="form.phone" minlength="10" required class="form-control" id="exampleInputEmail1"
                                                placeholder="0xxxxxxxxx">
                                            
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" v-model="form.password" required class="form-control" id="exampleInputPassword1"
                                                placeholder="Password">
                                           
                                           
                                        </div>
                                        <div class="bottom-sec">
                                            <!--div class="form-check checkbox_animated">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                <label class="form-check-label" for="exampleCheck1">remember me</label>
                                            </div-->
                                            <a href="#" class="ms-auto forget-password">forget
                                                password?</a>
                                        </div>
                                        <div class="btn-section">
                                            <button type="submit" class="btn btn-solid btn-lg">login</button>
                                            <button type="button" v-on:click="toggleLogin" class="btn btn-solid btn-lg ms-auto">register</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!auth" class="login-form">
                        <div>
                            <div class="login-title">
                                <h2>Register</h2>
                            </div>
                            <div class="login-discription">
                                <h3>Welcome to IMEDConnect</h3>
                                <h4> Fill required information to get registered.</h4>
                            </div>
                            <div class="form-sec">
                                <div>
                                    <form class="theme-form" @submit.prevent="register">
                                        <p class="text-danger">
                                            {{ this.$store.state.errorsSMS }}
                                        </p>
                                            <p v-for="error in this.$store.state.errors" :key="error" class="text-danger">
                                                {{ error[0] }}
                                            </p>
                                           
                                        
                                        <div class="form-group">
                                            <label for="name">Full Name</label>
                                            <input type="text" v-model="form2.name" required class="form-control" id="name" placeholder="Your Name">
                                            
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Phone Number</label>
                                            <input type="text" v-model="form2.phone" required class="form-control" id="exampleInputEmail1"
                                                placeholder="0xxxxxxxxx">
                                                <span class="text-warning text-sm"> <i class="fa fa-warning"></i> Make sure your Phonenumber is available for calls and SMS.</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" v-model="form2.password" minlength="8" required class="form-control" id="exampleInputPassword1"
                                                placeholder="Password">
                                           
                                        </div>
                                        <div class="bottom-sec">
                                            <!--div class="form-check checkbox_animated">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                <label class="form-check-label" for="exampleCheck1">remember me</label>
                                            </div-->
                                            <a href="#" class="ms-auto">forget password?</a>
                                        </div>
                                        <div class="btn-section">
                                            <button type="submit" class="btn btn-solid btn-lg">register</button>
                                            <button type="button" v-on:click="toggleLogin" class="btn btn-solid btn-lg ms-auto">login</button>
                                            
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
  data() {
    return {
      errors: "",
      auth:true,
      sure:false,
      form: {
        phone: "",
        password: "",
      },
      form2: {
        phone: "",
        password: "",
        name:""
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", this.form);
      //alert('you will soon get loged in')
    },
    register() {
        this.$store.dispatch("registerUser", this.form2);
    },
    toggleLogin(){
        this.auth = !this.auth
    }
  },
  created() {},
};
</script>
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

    <section class="login-section" id="top">
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
                                        <div v-if="this.$store.state.btn_clicks" class="loading-img container-fluid">
                                            <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
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
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#quick-approve" class="ms-auto text-danger forget-password">forget
                                                password ?</a>
                                        </div>
                                        <div class="btn-section">
                                            <button :disabled="this.$store.state.btn_clicks" type="submit" class="btn btn-solid btn-lg">login</button>
                                            <button :disabled="this.$store.state.btn_clicks" type="button" v-on:click="toggleLogin" class="btn btn-default btn-lg ms-auto">register ></button>
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
                                    <form class="theme-form" @submit.prevent="">
                                        <div v-if="this.$store.state.btn_clicks" class="loading-img container-fluid">
                                                <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
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
                                            <label for="exampleInputEmail11">Phone Number</label>
                                            <input type="text" minlength="10" maxlength="10" v-model="form2.phone" required class="form-control" id="exampleInputEmail11"
                                                placeholder="0xxxxxxxxx">
                                                <span class="text-warning text-sm"> <i class="fa fa-warning"></i>Make sure Phone is available for calls and SMS.</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword11">Password (8 character of more)</label>
                                            <input type="password" v-model="form2.password" minlength="8" required class="form-control" id="exampleInputPassword11"
                                                placeholder="Password">
                                           
                                        </div>
                                        <div class="bottom-sec">
                                            <!--div class="form-check checkbox_animated">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                <label class="form-check-label" for="exampleCheck1">remember me</label>
                                            </div>
                                            <a href="#" class="ms-auto">forget password?</a-->
                                        </div>
                                        <div class="btn-section">
                                            <button :disabled="this.$store.state.btn_clicks" type="submit" v-on:click="showDialog()" class="btn btn-solid btn-lg">register</button>
                                            <button :disabled="this.$store.state.btn_clicks" type="button" v-on:click="toggleLogin" class="btn btn-default btn-lg ms-auto">login ></button>
                                            
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

    <div class="text-center pa-4">
    <v-dialog
      v-model="this.dialogVisibility"
      max-width="400"
      persistent
    >
      <v-card loading>
        <v-card-title class="">CONFIRM PHONE NO.</v-card-title>
        <v-card-text>{{ 'Are you sure '+form2.phone+" is your phone number! and it will be Available during Programm?" }}</v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <button class="btn btn-danger" @click="dialogVisibility = false">
            Cancel
          </button>
          <span class="mr-3"> </span>
          <a href="#top" class="btn btn-primary" @click="register()">
            Yes Register
          </a>
        </template>
      </v-card>
    </v-dialog>
    </div>

    <!--forget password-->

    <div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="quick-approve">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Forget Password</h2>
                <button  type="button" class="btn-close" :disabled="this.alert_load" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <div v-if="auth" class="login-form">
                        <div>
                            
                            <div class="login-discription">
                                
                                <h3 class="text-primary">Please enter the same phonenumber you provided during registration. </h3>
                            </div>
                            <div v-if="this.alert_danger" class="alert alert-danger mt-3" role="alert">
                                No account found with phonenumber {{ this.phone }}
                            </div>
                            <div v-if="this.alert_success" class="alert alert-success mt-3" role="alert">
                                You will receive SMS (within 10min) contains re-set password link. Please Don't share that link
                            </div>
                            <div class="form-sec">
                                <div>
                                    <form class="theme-form" @submit.prevent="forgetPassword">
                                        <div v-if="this.alert_load" class="loading-img container-fluid">
                                            <img class="img-gif" width="300" src="/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
                                           
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Phone Number</label>
                                            <input type="text" maxlength="10" v-model="phone" minlength="10" required class="form-control" id="exampleInputEmail1"
                                                placeholder="0xxxxxxxxx">
                                            
                                        </div>
                                        
                                        <div class="btn-section mt-5">
                                            <button :disabled="this.alert_load" type="submit" class="btn btn-solid btn-lg">Submit</button>
                                            <button :disabled="this.alert_load" type="button" class="btn btn-default btn-lg ms-auto text-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </div>
    <!---ends here -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogVisibility:false,
      errors: "",
      auth:true,
      alert_danger:false,
      alert_success:false,
      alert_load:false,
      phone:"",
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
    async forgetPassword(){
        var phone = this.phone
        if(phone.length == "10"){
           var first = this.phone.slice(0,1)
           var last = this.phone.slice(-9)

           if(first == '0' || first == 0){
               //alert(first+" - "+last);
               if(this.isNumeric(last)){
                
                this.alert_load = true
                this.alert_danger = false
                this.alert_success = false

                var response = await axios.post(this.$store.state.api_url + "/forget-password-request",{phone})
                .catch((errors) => {
                this.alert_load = false
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
            
                if (response.data.success) {
                    this.alert_load = false
                    if(response.data.status == 1){
                       this.alert_success = true
                       this.alert_danger = false
                    }
                    if(response.data.status == 2){
                       this.alert_danger = true
                       this.alert_success = false
                    }
                    if(response.data.status == 3){
                       alert("If you don't receive SMS, Wait for 10min then try again")
                    }   
            
                } else {
                    this.alert_load = false
                    console.log(response.data.errors)
                }
                
               }else{
                   alert('Phonenumber must be Integer value')
               }
           }else{
               alert('Phonenumber must begin with 0')
           }
            
        }else{
            alert('Fill Required Information')
        }
    },
    login() {
      this.$store.dispatch("loginUser", this.form);
      //alert('you will soon get loged in')
    },
    register() {
        this.dialogVisibility = false
        this.$store.dispatch("registerUser", this.form2);
    },
    isNumeric(num){
        return /^-?\d+$/.test(num)
    },
    showDialog(){
        
        if(this.form2.phone.length == "10" && this.form2.password != "" && this.form2.name != ""){
           var first = this.form2.phone.slice(0,1)
           var last = this.form2.phone.slice(-9)

           if(first == '0' || first == 0){
               //alert(first+" - "+last);
               if(this.isNumeric(last)){
                   this.dialogVisibility = true
               }else{
                   alert('Phonenumber must be Integer value')
               }
           }else{
               alert('Phonenumber must begin with 0')
           }
            
        }else{
            alert('Fill Required Information')
        }
    },
    toggleLogin(){
        this.auth = !this.auth
    }
  },
  created() {},
};
</script>
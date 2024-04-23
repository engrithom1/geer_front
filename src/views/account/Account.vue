<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Profile</h3>
        </div>
        <div class="container pb-5">
            <div class="row">
                <div class="col-xl-3 col-lg-3">
                    <div class="mt-5">
                        <form  @submit.prevent="changeAvatar" enctype="multipart/form-data">
                        <div class="user-details">
                            <div>
                                <img :src="this.imgPreview"
                                    class="img-fluid blur-up lazyloaded" style="border-radius: 50%; width:150px; height:150px"
                                    alt="profile"/>
                            </div>                
                            <h5>{{ user.name }}</h5>
                            <h6 v-if="user.roles_id == 1">Participant</h6>
                            <h6 v-if="user.roles_id == 2">Mentor</h6>
                            <h6 v-if="user.roles_id == 3">Admin</h6>
                        </div>

                        <div class="mt-2">
                            <input type="hidden" name="over standing"/>
                            <input type="file" v-on:change="onChange" accept="image/png, image/jpeg, image/jpg" required/>
                            <button class="btn btn-primary mt-2">Upload</button>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6">
                    <div class="mt-5">
                        <h3>Tel About Yourself</h3>
                        <form  @submit.prevent="updateAboutMe" class="form">
                        <div class="form-group">
                            <label for="about">About Me (450 Character)</label>
                            <textarea minlength="5" maxlength="450" required rows="7" v-model="about_me" id="about" class="form-control"></textarea>
                        </div>
                        
                        <button class="btn btn-primary mt-2">Update</button>
                       </form>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-3">
                    <div class="mt-5">
                        <h3>Change Your Password</h3>
                        <form  @submit.prevent="changePassword" class="form">
                        <div class="form-group">
                            <label for="c_pw">Current Password</label>
                            <input required v-model="c_pw" type="text" id="c_pw" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="n_pw">New Password</label>
                            <input required v-model="n_pw" type="text" id="n_pw" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="cn_pw">Confirm Password</label>
                            <input required v-model="cn_pw" type="text" id="cn_pw" class="form-control"/>
                        </div>
                        <button class="btn btn-primary mt-2">Change</button>
                       </form>
                    </div>
                </div>     
                    
                    
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    components: {
    },
    data() {
        return {
            loading:true,
            about_me:"about me",
            imgPreview:null,
            img:"",
            c_pw:"",
            n_pw:"",
            cn_pw:"",
            user: {},
        };
    },
    methods: {
        isAuth() {
            var user = localStorage.getItem("user");
            var token = localStorage.getItem("user_token");
            if (user && token) {
                this.user = JSON.parse(user);

                if('about_me' in JSON.parse(user)){
                    this.about_me = JSON.parse(user).about_me
                }else{
                    this.about_me = "about me"
                }
                this.imgPreview = this.$store.state.img_url+JSON.parse(user).avatar
            } 
        },
        onChange(e){
            this.img = e.target.files[0]

            if(this.img){
                if(/\.(jpe?g|png)$/i.test(this.img.name)){
                    let reader = new FileReader();
                    reader.addEventListener('load',function(){
                        this.imgPreview = reader.result;
                    }.bind(this), false);
                    reader.readAsDataURL(this.img)
                    console.log(this.img)
                   
                }else{
                    alert('should be image file')
                    this.img = ""
                    this.imgPreview =this.$store.state.img_url+this.user.avatar
                }
            }
            console.log(this.img)
            console.log(this.img.name)
        },
        async changePassword(){ 

            var current_password = this.c_pw 
            var new_password = this.n_pw
            var cofirm_password = this.cn_pw

            if(new_password == cofirm_password){
                var response = await axios
                .post(this.$store.state.api_url + "/change-password",{current_password,new_password})
                .catch((errors) => {
                    var message = "Network or Server Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
                    if (response.data.success) {

                    this.c_pw = ""
                    this.n_pw = ""
                    this.cn_pw = ""

                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                    
                    } else {
                        var message = response.data.message;
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                        //this.errors = response.data.errors;
                        console.log(response.data.errors);
                    }
            }else{
                var message = "New and Confirm Password donot Match";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            }
        },
        async updateAboutMe(){ 

            var about_me = this.about_me

                var response = await axios
                .post(this.$store.state.api_url + "/update-about-me",{about_me})
                .catch((errors) => {
                    var message = "Network or Server Errors";
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                });
                    if (response.data.success) {
                        var message = response.data.message;
                        this.$toast.success(message,{duration: 7000,dismissible: true,})

                        localStorage.removeItem("user")
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                    
                    } else {
                        var message = response.data.message;
                        this.$toast.error(message,{duration: 7000,dismissible: true,})
                        //this.errors = response.data.errors;
                        console.log(response.data.errors);
                    }
           
        },   
            
        async changeAvatar(){ 
            console.log(this.img)

            const formData = new FormData()
            formData.append('thumb', this.img)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

            if(this.img != ""){
            var response = await axios
            .post(this.$store.state.api_url + "/change-avatar",{formData,config})
            .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})

                    localStorage.removeItem("user")
                    localStorage.setItem('user',JSON.stringify(response.data.user))
                
                } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    //this.errors = response.data.errors;
                    console.log(response.data.errors);
                }
            }else{
                alert('choose Avatar image correctly')
            }      

        }      
    },
    created() {
        this.isAuth()
       
    }
}
</script>
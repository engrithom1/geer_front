<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Modules</h3>
        </div>
        <div class="px-3">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Active</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">InActive</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Create</button>
                </div>
            </nav>
            <div class="tab-content mt-3 pb-5" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="agroups.length == 0">
                                <h4>No Modules Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="post in agroups">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img :src="this.$store.state.img_url+post.thumb" width="80" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id, post.description, post.name,post.thumb)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.moduleStatus(post.id,'active')" class="btn btn-danger btn-sm"><span class="fa fa-times"></span></button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="ingroups.length == 0">
                                <h4>No Modules Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="post in ingroups">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img :src="this.$store.state.img_url+post.thumb" width="80" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id, post.description, post.name,post.thumb)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.moduleStatus(post.id,'inactive')" class="btn btn-primary btn-sm"><span class="fa fa-eye"></span></button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                   <div class="row">
                       <div class="col-md-8">
                            <form  @submit.prevent="createModule" enctype="multipart/form-data" class="row">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" class="form-control" v-model="name" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Image</label>
                                    <input type="file" v-on:change="onChange" accept="image/png, image/jpeg, image/jpg" class="form-control" required>
                                </div>
                                <div v-if="img" class="form-group col-md-6">
                                    <img v-bind:src="imgPreview" width="150" height="100" alt="">
                                </div>
                                <div class="form-group">
                                    <label for="">Body</label>
                                    <textarea v-model="description" rows="5" required class="form-control"></textarea>
                                </div>
                                <div class="form-group mt-2">
                                    <button type="submit" class="btn btn-success">Submit</button>
                                </div>
                            </form>
                       </div>
                   </div>
                </div>
               
            </div>
        </div> 
    </div>

<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="edit-news">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Edit Modules</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateModule" class="row">
                    <div class="form-group">
                        <label for="">Name</label>
                        <input type="text" class="form-control" v-model="e_name" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="">Image</label>
                        <input type="file" v-on:change="onEditChange" accept="image/png, image/jpeg, image/jpg" class="form-control">
                    </div>
                    <div class="form-group col-md-6">
                        <img v-bind:src="imgEditPreview" width="150" height="100" alt="">
                    </div>
                    <div class="form-group">
                        <label for="">Body</label>
                        <textarea v-model="e_description" rows="5" required class="form-control"></textarea>
                    </div>
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>



<script>

import axios from "axios";
import * as CryptoJS from 'crypto-js';

export default {
    components: {
    },
    data() {
        return {
            agroups:[],
            ingroups:[],
            newz_loading:true,
            user: {},
            ////create
            name:"",
            description:"",
            img:"",
            imgPreview:null,
            imgEditPreview:null,
            //edit
            e_name:"",
            e_description:"",
            e_id:"",
            e_img:"",
            og_thumb:""
        };
    },
    methods: {
        isAuth() {
            
            if (user && token) {
                this.user = JSON.parse(user);
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
                    this.imgPreview = null
                }
            }
        },

        onEditChange(e){
            this.e_img = e.target.files[0]

            if(this.e_img){
                if(/\.(jpe?g|png)$/i.test(this.e_img.name)){
                    let reader = new FileReader();
                    reader.addEventListener('load',function(){
                        this.imgEditPreview = reader.result;
                    }.bind(this), false);
                    reader.readAsDataURL(this.e_img)
                    console.log(this.e_img)
                   
                }else{
                    alert('should be image file')
                    this.e_img = ""
                    this.imgEditPreview = null
                }
            }
        },

        setEditData(id,description,name,thumb){

          this.e_description = description
          this.e_id = id
          this.e_name = name
          this.imgEditPreview = this.$store.state.img_url+thumb
          this.og_thumb = thumb

        },

        async updateModule(){

            const formData = new FormData()
            formData.append('name', this.e_name)
            formData.append('id', this.e_id)
            formData.append('description', this.e_description)
            formData.append('thumb', this.e_img)
            formData.append('og_thumb', this.og_thumb)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

        var response = await axios
        .post(this.$store.state.api_url + "/update-module",formData,config)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.e_description = ""
            this.e_name = ""
            this.e_thumb = ""
            this.e_img = ""
            this.e_id = ""
            this.imgEditPreview = null

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },

        async moduleStatus(id,sourse){

        var status = ""

        if(sourse == 'active'){
            status = 0   
        }else{
            status = 1
        }

        var response = await axios
        .post(this.$store.state.api_url + "/module-status",{id, status})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                if(sourse == 'active'){
                    this.agroups = this.agroups.filter((i) => i.id != id);
                }else{
                    this.ingroups = this.ingroups.filter((i) => i.id != id);
                }
                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        async createModule(){
        
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('thumb', this.img)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

            if(this.img != ""){
            var response = await axios
            .post(this.$store.state.api_url + "/create-module",formData,config)
            .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {

                this.description = ""
                this.name = ""
                this.img = ""
                this.imgPreview = null

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    this.errors = response.data.errors;
                    console.log(response.data.errors);
                }
            }else{
                alert('choose thumbnail image correctly')
            }    
        },
      
        async getAdminGroups() {

            var response = await axios.get(this.$store.state.api_url + "/get-admin-groups")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.agroups = response.data.agroups
              this.ingroups = response.data.ingroups
              //console.log(response.data.dataz)
            } else {
                var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },
       
    },
    created() {
        //this.isAuth()
        this.getAdminGroups()
    }
};
</script>
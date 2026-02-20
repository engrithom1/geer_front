
<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Material</h3>
        </div>
        <div class="px-3">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Material list</button>
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

                            <div v-if="materials.length == 0">
                                <h4>No Notes Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="material in materials">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ material.title }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger"></p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(material.id, material.description, material.title, material.body)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteMaterials(material.id)" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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
                            <form  @submit.prevent="createMaterials" class="row">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" maxlength="80" class="form-control" v-model="create.title" required>
                                </div>
                                <div class="form-group">
                                    <label for="">description</label>
                                    <input type="text" maxlength="150" class="form-control" v-model="create.description" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Body</label>
                                    <textarea id="body" v-model="create.body" rows="5" required class="form-control"></textarea>
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
                <p class="video-p">Edit Material</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateMaterials" class="row">
                    <div class="form-group">
                        <label for="">Title</label>
                        <input type="text" maxlength="80" class="form-control" v-model="e_title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="">Description</label>
                        <input type="text" maxlength="150" class="form-control" v-model="e_description" required>
                    </div>
                    <div class="form-group">
                        <label for="">Body</label>
                        <textarea id="body" v-model="e_body" rows="15" required class="form-control"></textarea>
                    </div>
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Update</button>
                        <span class="m-2"></span>
                        <button type="button" data-bs-dismiss="modal" class="btn btn-danger">Close</button>
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
            materials:[],
            expnews:[],
            newz:{},
            group:{},
            newz_loading:true,
            expnewz_loading:true,
            user: {},
            ////create
            create:{
                title:"",
                body:"",
                description:""
            },
            //edit
            e_title:"",
            e_description:"",
            e_body:"",
            e_id:""
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
        
        setEditData(id,description,title,body){

          this.e_description = description
          this.e_body = body
          this.e_id = id
          this.e_title = title

        },

        async updateMaterials(){

        var title = this.e_title 
        var description = this.e_description
        var body = this.e_body
        var id = this.e_id

        var response = await axios
        .post(this.$store.state.api_url + "/update-material",{title,description,body,id})
        .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.e_description = ""
            this.e_body = ""
            this.e_title = ""

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },

        async deleteMaterials(id){

        var response = await axios
        .post(this.$store.state.api_url + "/delete-material",{id:id})
        .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
                
                this.materials = this.materials.filter((i) => i.id != id);
               
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        async createMaterials(){

        var response = await axios
        .post(this.$store.state.api_url + "/create-material", this.create)
        .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.create.description = ""
            this.create.body = ""
            this.create.title = ""

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                //this.errors = response.data.errors;
                //console.log(response.data.errors);
            }
        },
      
        async getMaterials() {
            var response = await axios.get(this.$store.state.api_url + "/get-materials")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.materials = response.data.materials
              //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },
        async getExpNews() {
            var response = await axios.get(this.$store.state.api_url + "/get-exp-news")
            .catch((errors) => {
            var message = "Network or Request Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.expnews = response.data.dataz
              //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.expnewz_loading = false;
        
        },
    },
    created() {
        //this.isAuth()
        this.getMaterials()
        this.getExpNews()
    }
};


</script>
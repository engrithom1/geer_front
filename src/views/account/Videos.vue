<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Videos</h3>
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

                            <div v-if="avideos.length == 0">
                                <h4>No Videos Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-12" v-for="post in avideos">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img :src="this.$store.state.img_url+post.thumb" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="">{{ post.title }}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setAddData(post.id)" title="add video on list" data-bs-target="#add-news" class="btn btn-info btn-sm"><span class="fa fa-plus"></span></button>
                                                        <span class="px-1"></span>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id,post.title, post.description,post.group_id,post.thumb)" title="edit post" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.videoPostStatus(post.id,0)" title="make invisible" class="btn btn-secondary btn-sm"><span class="fa fa-eye-slash"></span></button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div v-for="post_list in post.video_lists">
                                                    <div class="media">
                                                        <img src="/assets/images/video.png" width="35" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                        <span class="available-status"></span>
                                                        <div class="media-body m-2">
                                                            <p class="">{{ post_list.sub_title }}</p>
                                                            <div class="d-flex justify-content-between">
                                                                <p class="video-p">{{ post_list.label+" "+post_list.order }}</p>
                                                                <div>
                                                                    <button data-bs-toggle="modal" title="edit video" v-on:click="this.setEditVideoList(post_list)" data-bs-target="#edit-video-list" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                                    <span class="px-1"></span>
                                                                    <button v-on:click="this.deleteDialog(post_list.id)" title="delete video" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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

                            <div v-if="invideos.length == 0">
                                <h4>No Videos Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-12" v-for="post in invideos">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img :src="this.$store.state.img_url+post.thumb" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="">{{ post.title }}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setAddData(post.id)" title="add video on list" data-bs-target="#add-news" class="btn btn-info btn-sm"><span class="fa fa-plus"></span></button>
                                                        <span class="px-1"></span>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id,post.title, post.description,post.group_id,post.thumb)" data-bs-target="#edit-news" title="edit post" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.videoPostStatus(post.id,1)" title="make visible" class="btn btn-primary btn-sm"><span class="fa fa-eye"></span></button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div v-for="post_list in post.video_lists">
                                                    <div class="media">
                                                        <img src="/assets/images/video.png" width="35" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                        <span class="available-status"></span>
                                                        <div class="media-body m-2">
                                                            <p class="">{{ post_list.sub_title }}</p>
                                                            <div class="d-flex justify-content-between">
                                                                <p class="video-p">{{ post_list.label+" "+post_list.order }}</p>
                                                                <div>
                                                                    <button data-bs-toggle="modal" v-on:click="this.setEditVideoList(post_list)" data-bs-target="#edit-video-list" title="edit post" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                                    <span class="px-1"></span>
                                                                    <button v-on:click="this.deleteDialog(post_list.id)" title="delete post" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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
                        </div>
                    </div>
                </div>
                <!--create tab-->
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                   <div class="row">
                       <div class="col-md-8">
                            <form  @submit.prevent="createVideoPost" enctype="multipart/form-data" class="row">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" class="form-control" v-model="title" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Level">Choose Modules</label>
                                    <select v-model="this.group_id"  class="form-control">
                                        <option value="" disabled selected>Select</option>
                                        <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                    </select> 
                                </div>
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <textarea v-model="description" rows="5" required class="form-control"></textarea>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Thumbnail</label>
                                    <input type="file" v-on:change="onChange" accept="image/png, image/jpeg, image/jpg" class="form-control" required>
                                </div>
                                <div v-if="img" class="form-group col-md-6">
                                    <img v-bind:src="imgPreview" width="150" height="100" alt="">
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
<!--edit video post---->
<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="edit-news">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Edit Video Post</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateVideoPost" class="row">
                    <div class="form-group">
                        <label for="">Title</label>
                        <input type="text" class="form-control" v-model="e_title" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Level">Choose Modules</label>
                        <select v-model="this.e_group_id"  class="form-control">
                            <option value="" disabled selected>Select</option>
                            <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                        </select> 
                    </div>
                    <div class="form-group">
                        <label for="">Description</label>
                        <textarea v-model="e_description" rows="5" required class="form-control"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="">Thumbnail</label>
                        <input type="file" v-on:change="onEditChange" accept="image/png, image/jpeg, image/jpg" class="form-control">
                    </div>
                    <div class="form-group col-md-6">
                        <img v-bind:src="imgEditPreview" width="150" height="100" alt="">
                    </div>
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--edit video post---->

<!--edit add video on list-->
<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="add-news">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Add video on List</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="createVideoList" class="row">
                    <div class="form-group">
                        <label for="">Video Title</label>
                        <input type="text" class="form-control" v-model="this.sub_title" required>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="">video url( from vimeo)</label>
                        <input type="text" v-model="this.video_url" class="form-control">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Level">Label</label>
                        <select v-model="this.label"  class="form-control">
                            <option value="" disabled selected>Select Label</option>
                            <option value="Episode">Episode</option>
                            <option value="Lesson">Lesson</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="video">video</option>
                        </select> 
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Level">Order on List</label>
                        <select v-model="this.order"  class="form-control">
                            <option value="" disabled selected>Select Order</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select> 
                    </div>
                    
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--end add video on list-->

<!--edit edit video on list-->
<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="edit-video-list">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Edit video on List</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="editVideoList" class="row">
                    <div class="form-group">
                        <label for="">video Title</label>
                        <input type="text" class="form-control" v-model="this.edit_sub_title" required>
                    </div>
                    <div class="form-group col-md-12">
                        <label for="">video url( from vimeo)</label>
                        <input type="text" v-model="this.edit_video_url" class="form-control">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Level">Label</label>
                        <select v-model="this.edit_label"  class="form-control">
                            <option value="" disabled selected>Select Label</option>
                            <option value="Episode">Episode</option>
                            <option value="Lesson">Lesson</option>
                            <option value="Tutorial">Tutorial</option>
                            <option value="video">video</option>
                        </select> 
                    </div>
                    <div class="form-group col-md-6">
                        <label for="Level">Order on List</label>
                        <select v-model="this.edit_order"  class="form-control">
                            <option value="" disabled selected>Select Order</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select> 
                    </div>
                    
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--end edit video on list-->

  <div class="text-center pa-4">
    <v-dialog
      v-model="this.dialogVisibility"
      max-width="400"
      persistent
    >
      <v-card loading>
        <v-card-title class="">CONFIRM DELETE.</v-card-title>
        <v-card-text>Are you sure you want to Delete this video Permanently?.</v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <button class="btn btn-default" @click="dialogVisibility = false">
            Cancel
          </button>
          <span class="mr-3"> </span>
          <button class="btn btn-danger" @click="deleteVideoList()">
            Delete
          </button>
        </template>
      </v-card>
    </v-dialog>
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
            dialogVisibility:false,
            delete_video_id:"",
            avideos:[],
            invideos:[],
            groups:[],
            newz_loading:true,
            user: {},
            ////create
            title:"",
            description:"",
            group_id:"",
            img:"",
            imgPreview:null,
            imgEditPreview:null,
            //edit
            e_title:"",
            e_description:"",
            e_group_id:"",
            e_id:"",
            e_img:"",
            og_thumb:"",
            ///video list
            sub_title:"",
            order:"",
            label:"",
            video_url:"",
            post_id:"",
            ///video list
            edit_sub_title:"",
            edit_order:"",
            edit_label:"",
            list_id:"",
            edit_video_url:""
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

        deleteDialog(delete_video_id){
             this.delete_video_id = delete_video_id
             this.dialogVisibility = true
        },

        setEditData(id,title,description,group_id,thumb){
          this.e_description = description
          this.e_id = id
          this.e_title = title
          this.e_group_id = group_id
          this.og_thumb = thumb
          this.imgEditPreview = this.$store.state.img_url+thumb

        },
        setEditVideoList(post_list){

            this.edit_video_url = post_list.video_url
            this.edit_sub_title = post_list.sub_title
            this.edit_order = post_list.order
            this.edit_label = post_list.label
            this.list_id = post_list.id
            
        },

        setAddData(post_id){
            this.post_id = post_id
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


        async updateVideoPost(){

            const formData = new FormData()
            formData.append('title', this.e_title)
            formData.append('group_id', this.e_group_id)
            formData.append('post_id', this.e_id)
            formData.append('description', this.e_description)
            formData.append('thumb', this.e_img)
            formData.append('og_thumb', this.og_thumb)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

           

        var response = await axios
        .post(this.$store.state.api_url + "/update-video-post",formData,config)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.e_description = ""
            this.e_title = ""
            this.e_group_id = ""
            this.post_id = ""
           

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})

            location.reload();
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },

        async videoPostStatus(id,status){

        var response = await axios
        .post(this.$store.state.api_url + "/video-post-status",{id, status})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                if(status == 0){
                    this.avideos = this.avideos.filter((i) => i.id != id);
                }else{
                    this.invideos = this.invideos.filter((i) => i.id != id);
                }
                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        async createVideoPost(){
        
            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('group_id', this.group_id)
            formData.append('description', this.description)
            formData.append('thumb', this.img)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

            if(this.img != ""){
            var response = await axios
            .post(this.$store.state.api_url + "/create-video-post",formData,config)
            .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {

                this.description = ""
                this.title = ""
                this.group_id = ""
                
                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})

                location.reload();
                
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
      
        async getAdminVideo() {

            var response = await axios.get(this.$store.state.api_url + "/get-admin-videos")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.avideos = response.data.avideos
              this.invideos = response.data.invideos
              //console.log(response.data.dataz)
            } else {
                var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },

        async getAllGroups() {

            var response = await axios.get(this.$store.state.api_url + "/get-all-groups")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });

            if (response.data.success) { 
            this.groups = response.data.groups
            //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.newz_loading = false;

        },

        async createVideoList(){
        
        const formData = new FormData()
        formData.append('sub_title', this.sub_title)
        formData.append('label', this.label)
        formData.append('order', this.order)
        formData.append('post_id', this.post_id)
        formData.append('video_url', this.video_url)

        this.upload_loading = true

        var response = await axios
        .post(this.$store.state.api_url + "/create-video-list",formData)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            location.reload();
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
            this.upload_loading = false;
           
        },
        async editVideoList(){
        
        const formData = new FormData()
        formData.append('sub_title', this.edit_sub_title)
        formData.append('label', this.edit_label)
        formData.append('order', this.edit_order)
        formData.append('list_id', this.list_id)
        formData.append('video_url', this.edit_video_url)

        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }

        this.upload_loading = true

        var response = await axios
        .post(this.$store.state.api_url + "/edit-video-list",formData,config)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            location.reload();
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
            this.upload_loading = false;
          
    },
    async deleteVideoList(){

        var list_id = this.delete_video_id;

        this.dialogVisibility = false

        var response = await axios
        .post(this.$store.state.api_url + "/delete-video-list",{list_id})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            location.reload();
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        }
       
    },
    created() {
        //this.isAuth()
        this.getAllGroups()
        this.getAdminVideo()
    }
};
</script>
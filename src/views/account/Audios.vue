<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Audios</h3>
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

                            <div v-if="aaudios.length == 0">
                                <h4>No Audios Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-12" v-for="post in aaudios">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img src="/assets/images/audio.png" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="">{{ post.title }}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setAddData(post.id)" title="add audio on list" data-bs-target="#add-news" class="btn btn-info btn-sm"><span class="fa fa-plus"></span></button>
                                                        <span class="px-1"></span>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id,post.title, post.description,post.group_id)" title="edit post" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.audioPostStatus(post.id,'active')" title="make invisible" class="btn btn-secondary btn-sm"><span class="fa fa-eye-slash"></span></button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div v-for="post_list in post.audio_lists">
                                                    <div class="media">
                                                        <img src="/assets/images/audio.png" width="35" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                        <span class="available-status"></span>
                                                        <div class="media-body m-2">
                                                            <p class="">{{ post_list.sub_title }}</p>
                                                            <div class="d-flex justify-content-between">
                                                                <p class="video-p">{{ post_list.label+" "+post_list.order }}</p>
                                                                <div>
                                                                    <button data-bs-toggle="modal" title="edit audio" v-on:click="this.setEditAudioList()" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                                    <span class="px-1"></span>
                                                                    <button v-on:click="this.audioPostStatus(post.id,'active')" title="delete audio" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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

                            <div v-if="inaudios.length == 0">
                                <h4>No Audios Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-12" v-for="post in inaudios">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img src="/assets/images/audio.png" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p class="">{{ post.title }}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setAddData(post.id)" title="add audio on list" data-bs-target="#add-news" class="btn btn-info btn-sm"><span class="fa fa-plus"></span></button>
                                                        <span class="px-1"></span>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id,post.title, post.description,post.group_id)" data-bs-target="#edit-news" title="edit post" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.audioPostStatus(post.id,'inactive')" title="make visible" class="btn btn-primary btn-sm"><span class="fa fa-eye"></span></button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div v-for="post_list in post.audio_lists">
                                                    <div class="media">
                                                        <img src="/assets/images/audio.png" width="35" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                        <span class="available-status"></span>
                                                        <div class="media-body m-2">
                                                            <p class="">{{ post_list.sub_title }}</p>
                                                            <div class="d-flex justify-content-between">
                                                                <p class="video-p">{{ post_list.label+" "+post_list.order }}</p>
                                                                <div>
                                                                    <button data-bs-toggle="modal" v-on:click="this.setEditAudioList()" data-bs-target="#edit-news" title="edit post" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                                    <span class="px-1"></span>
                                                                    <button v-on:click="this.audioPostStatus(post.id,'active')" title="delete post" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                   <div class="row">
                       <div class="col-md-8">
                            <form  @submit.prevent="createModule" enctype="multipart/form-data" class="row">
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
                <p class="video-p">Edit Audio Post</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateAudioPost" class="row">
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
                    <div class="form-group mt-2">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade mobile-full-width" data-bs-backdrop="static" data-bs-keyboard="false" id="add-news">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="video-p">Add Audio on List</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateAudioPost" class="row">
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

export default {
    components: {
    },
    data() {
        return {
            aaudios:[],
            inaudios:[],
            groups:[],
            newz_loading:true,
            user: {},
            ////create
            title:"",
            group_id:"",
            description:"",
            //edit
            e_title:"",
            e_description:"",
            e_group_id:"",
            ///
            post_id:""
        };
    },
    methods: {
        isAuth() {
            var user = localStorage.getItem("user");
            var token = localStorage.getItem("user_token");
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

        setEditData(id,title,description,group_id){
          this.e_description = description
          this.post_id = id
          this.e_title = title
          this.e_group_id = group_id

        },
        setEditAudioList(){},

        setAddData(post_id){
            this.post_id = post_id
        },


        async updateAudioPost(){

            const formData = {
                title:this.e_title,
                description:this.e_description,
                group_id:this.e_group_id,
                id:this.post_id
            }

           

        var response = await axios
        .post(this.$store.state.api_url + "/update-audio-post",formData)
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
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },

        async audioPostStatus(id,sourse){

        var status = ""

        if(sourse == 'active'){
            status = 0   
        }else{
            status = 1
        }

        var response = await axios
        .post(this.$store.state.api_url + "/audio-post-status",{id, status})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                if(sourse == 'active'){
                    this.aaudios = this.aaudios.filter((i) => i.id != id);
                }else{
                    this.inaudios = this.inaudios.filter((i) => i.id != id);
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
        
            const formData = {
                title:this.title,
                description:this.description,
                group_id:this.group_id  
            }

            var response = await axios
            .post(this.$store.state.api_url + "/create-audio-post",formData)
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
                
                } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    this.errors = response.data.errors;
                    console.log(response.data.errors);
                }
            
        },
      
        async getAdminAudio() {

            var response = await axios.get(this.$store.state.api_url + "/get-admin-audios")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.aaudios = response.data.aaudios
              this.inaudios = response.data.inaudios
              //console.log(response.data.dataz)
            } else {
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
                console.log(response.data.errors)
            }
            this.newz_loading = false;

        },
       
    },
    created() {
        //this.isAuth()
        this.getAllGroups()
        this.getAdminAudio()
    }
};
</script>
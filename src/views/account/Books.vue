<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Books</h3>
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

                            <div v-if="abooks.length == 0">
                                <h4>No Book Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-7" v-for="post in abooks">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img src="/assets/images/pdf.png" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p>{{ post.title }}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id, post.title, post.note_url, post.group_id)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
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

                            <div v-if="inbooks.length == 0">
                                <h4>No Book Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="post in inbooks">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media">
                                                <img src="/assets/images/pdf.png" width="70" class="img-fluid blur-up bg-img lazyloaded" alt="user" style="display: block;">
                                                <span class="available-stats"></span>
                                            <div class="media-body m-2">
                                                <p>{{post.title}}</p>
                                                <p class="video-p">{{ post.name }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">{{post.created_by}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(post.id, post.title, post.note_url, post.group_id)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
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
                            <form  @submit.prevent="createBook" enctype="multipart/form-data" class="row">
                                <div class="form-book">
                                    <label for="">Title</label>
                                    <input type="text" class="form-control" v-model="title" required>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="Level">Choose Modules</label>
                                        <select v-model="this.group_id"  class="form-control">
                                            <option value="" disabled selected>Select</option>
                                            <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                        </select>
                                       
                                    </div>
                                </div>
                                <div class="form-book col-md-6">
                                    <label for="">Book</label>
                                    <input type="file" v-on:change="onChange" accept="application/pdf" class="form-control" required>
                                </div>
                                
                                <div v-if="!this.upload_loading" class="form-book mt-2">
                                    <button type="submit" class="btn btn-success">Submit</button>
                                </div>
                                <div v-if="this.upload_loading" class="loading-img container-fluid m-5">
                                        <div  class="friend-list friend-page-list">
                                            <p>uploading........</p>
                                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                        </div>
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
                <p class="video-p">Edit Books</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateBook" class="row">
                    <div class="form-book">
                        <label for="">Title</label>
                        <input type="text" class="form-control" v-model="e_title" required>
                    </div>
                    <label for="Level">Choose Modules</label>
                    <select v-model="this.e_group_id"  class="form-control">
                        <option value="" disabled selected>Select</option>
                        <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                    </select>
                    <div class="form-book col-md-6">
                        <label for="">Book</label>
                        <input type="file" v-on:change="onEditChange" accept="application/pdf" class="form-control">
                    </div>
                   
                    <div class="form-book mt-2">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>
                    <div v-if="this.upload_loading2" class="loading-img container-fluid m-5">
                        <div  class="friend-list friend-page-list">
                            <p>uploading........</p>
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
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
            abooks:[],
            inbooks:[],
            groups:[],
            newz_loading:true,
            upload_loading:false,
            upload_loading2:false,
            user: {},
            ////create
            title:"",
            group_id:"",
            book:"",
            //edit
            e_title:"",
            e_group_id:"",
            e_id:"",
            e_book:"",
            og_book:""
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
            var bok = e.target.files[0]

            if(bok){
                if(/\.(pdf)$/i.test(bok.name)){
                    let reader = new FileReader();
                    reader.addEventListener('load',function(){
                    }.bind(this), false);
                    reader.readAsDataURL(bok)
                    if(bok.size < 20000000){
                        this.book = bok
                    }else{
                        alert('file is too big should be 19MB or less')
                        this.book = ""
                    }
                    //console.log(this.book)
                    
                   
                }else{
                    alert('should be pdf document file')
                    this.book = ""
                }
            }
        },

        onEditChange(e){
            var bok = e.target.files[0]

            if(bok){
                if(/\.(pdf)$/i.test(bok.name)){
                    let reader = new FileReader();
                    reader.addEventListener('load',function(){
                    }.bind(this), false);
                    reader.readAsDataURL(bok)
                    if(bok.size < 20000000){
                        this.e_book = bok
                    }else{
                        alert('file is too big should be 19MB or less')
                        this.e_book = ""
                    }
                    //console.log(this.book)
                    
                
                }else{
                    alert('should be pdf document file')
                    this.e_book = ""
                }
            }
        },

        setEditData(id,title,note_url,group_id){

          this.e_group_id = group_id
          this.e_id = id
          this.e_title = title
          this.og_book = note_url

        },

        async updateBook(){

            const formData = new FormData()
            formData.append('title', this.e_title)
            formData.append('id', this.e_id)
            formData.append('group_id', this.e_group_id)
            formData.append('book', this.e_book)
            formData.append('og_book', this.og_book)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

            this.upload_loading2 = true

        var response = await axios
        .post(this.$store.state.api_url + "/update-book",formData,config)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.e_group_id = ""
            this.e_title = ""
            this.e_book = ""
            this.e_id = ""

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
            this.upload_loading2 = false
        },

        async moduleStatus(id,sourse){

        var status = ""

        if(sourse == 'active'){
            status = 0   
        }else{
            status = 1
        }

        var response = await axios
        .post(this.$store.state.api_url + "/book-status",{id, status})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                if(sourse == 'active'){
                    this.abooks = this.abooks.filter((i) => i.id != id);
                }else{
                    this.inbooks = this.inbooks.filter((i) => i.id != id);
                }
                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        async createBook(){
        
            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('group_id', this.group_id)
            formData.append('book', this.book)

            const config = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }


            if(this.book != ""){

            this.upload_loading = true

            var response = await axios
            .post(this.$store.state.api_url + "/create-book",formData,config)
            .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {

                this.group_id = ""
                this.title = ""
                this.book = ""
              

                var message = response.data.message;
                this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    this.errors = response.data.errors;
                    console.log(response.data.errors);
                }
                this.upload_loading = false;
            }else{
                alert('choose pdf file correctly')
            }    
        },
      
        async getAdminbooks() {

            var response = await axios.get(this.$store.state.api_url + "/get-admin-books")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.abooks = response.data.abooks
              this.inbooks = response.data.inbooks
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
        this.getAdminbooks()
    }
};
</script>
<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>News</h3>
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

                            <div v-if="news.length == 0">
                                <h4>No Notes Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="newz in news">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ newz.title }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">Expire {{newz.expired_date}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(newz.id, newz.description, newz.title, newz.expired_date)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteNews(newz.id,'active')" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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
                    <div v-if="this.expnewz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.expnewz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="expnews.length == 0">
                                <h4>No Notes Found</h4>
                            </div>

                            <div class="row">
                                <div class="col-md-8" v-for="newz in expnews">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ newz.title }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-danger">Expire {{newz.expired_date}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(newz.id, newz.description, newz.title, newz.expired_date)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteNews(newz.id,'inactive')" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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
                            <form  @submit.prevent="createNews" class="row">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" class="form-control" v-model="create.title" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">Visible Until</label>
                                    <input type="date" class="form-control" v-model="create.expdate" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Body</label>
                                    <textarea v-model="create.description" rows="5" required class="form-control"></textarea>
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
                <p class="video-p">Edit News</p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>    
            <div class="modal-body m-2">
                <form  @submit.prevent="updateNews" class="row">
                    <div class="form-group">
                        <label for="">Title</label>
                        <input type="text" class="form-control" v-model="e_title" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="">Visible Until</label>
                        <input type="date" class="form-control" v-model="e_expdate" required>
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
            news:[],
            expnews:[],
            newz:{},
            group:{},
            newz_loading:true,
            expnewz_loading:true,
            user: {},
            ////create
            create:{
                title:"",
                expdate:"",
                description:""
            },
            //edit
            e_title:"",
            e_description:"",
            e_expdate:"",
            e_id:""
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

        setEditData(id,description,title,expdate){

          this.e_description = description
          this.e_expdate = expdate
          this.e_id = id
          this.e_title = title

        },

        async updateNews(){

        var title = this.e_title 
        var description = this.e_description
        var expdate = this.e_expdate
        var id = this.e_id

        var response = await axios
        .post(this.$store.state.api_url + "/update-news",{title,description,expdate,id})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.e_description = ""
            this.e_expdate = ""
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

        async deleteNews(id,sourse){

        var response = await axios
        .post(this.$store.state.api_url + "/delete-news",{id:id})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {
            
                if(sourse == 'active'){
                    this.news = this.news.filter((i) => i.id != id);
                }else{
                    this.expnews = this.expnews.filter((i) => i.id != id);
                }
            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
            }
        },

        async createNews(){

        var response = await axios
        .post(this.$store.state.api_url + "/create-news", this.create)
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            this.create.description = ""
            this.create.expdate = ""
            this.create.title = ""

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
                this.errors = response.data.errors;
                console.log(response.data.errors);
            }
        },
      
        async getNews() {
            var response = await axios.get(this.$store.state.api_url + "/get-news")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.news = response.data.dataz
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
            this.newz_loading = false;
        
        },
        async getExpNews() {
            var response = await axios.get(this.$store.state.api_url + "/get-exp-news")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
              this.expnews = response.data.dataz
              //console.log(response.data.dataz)
            } else {
                console.log(response.data.errors)
            }
            this.expnewz_loading = false;
        
        },
    },
    created() {
        //this.isAuth()
        this.getNews()
        this.getExpNews()
    }
};
</script>
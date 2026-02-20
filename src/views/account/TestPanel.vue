<template>
    
    <div class="about-profile section-b-space">
        <div class="card-title">
            <h3>Test Panel Controller</h3>
        </div>
        <div class="px-3">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Multiple Choise</button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">True & False</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Test Settings</button>
                    <button class="nav-link" id="nav-appeal-tab" data-bs-toggle="tab" data-bs-target="#nav-appeal" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Appeal Request</button>
                </div>
            </nav>
            <div class="tab-content mt-3 pb-5" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <!--add question form-->
                    <div class="container-fluid mb-5">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="mb-2">Add Question</h3>
                                        <form class="row">
                                            <div class="form-group">
                                                <label for="Level">Choose Modules</label>
                                                <select required v-model="this.mc_group_id"  class="form-control">
                                                    <option value="" disabled selected>Select</option>
                                                    <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Question</label>
                                                <input type="text" class="form-control" v-model="question" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Answers(full labeld)</label>
                                                <div class="d-flex justify-content-between">
                                                    <input type="text" v-model="answer" placeholder="Example A) lack of capital" class="form-control" required>
                                                    <button type="button" v-on:click="addAnswer()" class="btn btn-primary"> +Add</button>
                                                </div>
                                                <label for="">Select a Correct Answer</label>
                                                <div class="">
                                                    <div v-for="ans in answers" class="d-flex justify-content-between">
                                                        <div>
                                                            <input v-model="selectedAns" v-on:change="onSelectedAns()" :value="ans.answer" name="selected" type="radio" :id="ans.answer"/>
                                                            <label style="font-weight: 600;" class="ml-3" :for="ans.answer">{{ ans.answer }}</label>
                                                        </div>
                                                        <button type="button" v-on:click="delAnswer(ans.answer)" class="btn btn-danger btn-sm mt-1">X</button>
                                                    </div>
                                                </div>
                                            </div>
            
                                            <div class="form-group mt-5">
                                                <button v-on:click="addQuestion()" type="button" class="btn btn-success">Create</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="active_mc.length == 0">
                                <h4>No Questions Found</h4>
                            </div>

                            <div class="row">
                                <div v-if="active_mc.length > 0" class="col-md-8">
                                    <h3 class="mb-2">Active Questions</h3>
                                    <div class="card" v-for="amc in active_mc">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ amc.question }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-primary">{{amc.name}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(amc)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteQuestion(amc.id,0)" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="inactive_mc.length > 0" class="col-md-8">
                                    <h3 class="mb-2 mt-5">InActive Questions</h3>
                                    <div class="card" v-for="inmc in inactive_mc">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ inmc.title }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-primary">{{inmc.name}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(inmc)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteQuestion(inmc.id,1)" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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

                <!--end multiple choise ends here-->
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <!--add question form-->
                    <div class="container-fluid mb-5">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="mb-2">Add Question</h3>
                                        <form class="row">
                                            <div class="form-group">
                                                <label for="Level">Choose Modules</label>
                                                <select required v-model="this.tf_group_id"  class="form-control">
                                                    <option value="" disabled selected>Select</option>
                                                    <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="">Question</label>
                                                <input type="text" class="form-control" v-model="bool_question" required>
                                            </div>
                                            <div class="form-group">
                                               
                                                <label for="">Select a Correct Answer</label>
                                                <div class="">
                                                    <div class="">
                                                        <div>
                                                            <input v-model="selectedBool" v-on:change="onSelectedBool()" value="true" name="bool" type="radio" id="true"/>
                                                            <label style="font-weight: 600;" class="ml-3" for="true">True</label>
                                                        </div>
                                                        <div>    
                                                            <input v-model="selectedBool" v-on:change="onSelectedBool()" value="false" name="bool" type="radio" id="false"/>
                                                            <label style="font-weight: 600;" class="ml-3" for="false">False</label>
                                                        </div>    
                                                    </div>
                                                </div>
                                            </div>
            
                                            <div class="form-group mt-5">
                                                <button v-on:click="addBoolQuestion()" type="button" class="btn btn-success">Create</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="this.newz_loading" class="loading-img container-fluid">
                        <div  class="friend-list friend-page-list">
                            <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                        </div>
                    </div>
                    <div v-if="!this.newz_loading" class="container-fluid">
                        <div  class="friend-list friend-page-list">

                            <div v-if="active_tf.length == 0">
                                <h4>No Questions Found</h4>
                            </div>

                            <div class="row">
                                <div v-if="active_tf.length > 0" class="col-md-8">
                                    <h3 class="mb-2">Active Questions</h3>
                                    <div class="card" v-for="atf in active_tf">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ atf.question }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-primary">{{atf.name}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(atf)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteQuestion(atf.id,0)" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="inactive_tf.length > 0" class="col-md-8">
                                    <h3 class="mb-2 mt-5">InActive Questions</h3>
                                    <div class="card" v-for="inmc in inactive_tf">
                                        <div class="card-body">
                                            <div class="media-body">
                                                <p class="video-p">{{ inmc.title }}</p>
                                                <div class="d-flex justify-content-between">
                                                    <p class="text-sm text-primary">{{inmc.name}}</p>
                                                    <div>
                                                        <button data-bs-toggle="modal" v-on:click="this.setEditData(inmc)" data-bs-target="#edit-news" class="btn btn-success btn-sm"><span class="fa fa-edit"></span></button>
                                                        <span class="px-1"></span>
                                                        <button v-on:click="this.deleteQuestion(inmc.id,1)" class="btn btn-danger btn-sm"><span class="fa fa-trash"></span></button>
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

                <!--end true and false ends here-->
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
                   <div class="row">
                       <div class="col-md-8">
                            <div v-if="this.setting_loading" class="loading-img container-fluid">
                                <div  class="friend-list friend-page-list">
                                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                            </div>
                            <div v-if="!this.setting_loading">
                                <div class="card">
                                    <div class="card-body">
                                        <div v-for="setting in settings">
                                            <h3 class="">{{ setting.name }}</h3>
                                            <div class="row mb-3">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Multiple Choise</label>
                                                        <input type="text" :value="setting.mc"  class="form-control"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>True & False</label>
                                                        <input type="text" :value="setting.tf"  class="form-control"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Time (min)</label>
                                                        <input type="text" :value="setting.time"  class="form-control"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3 pt-10">
                                                    <button v-on:click="updateSetting()" class="btn btn-primary" style="">Update</button>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                    </div>
                                </div>        
                            </div> 
                       </div>
                   </div>
                </div>

                <div class="tab-pane fade" id="nav-appeal" role="tabpanel" aria-labelledby="nav-appeal-tab" tabindex="0">
                    <div class="row">
                       <div class="col-md-8">
                            <div v-if="this.appeal_loading" class="loading-img container-fluid">
                                <div  class="friend-list friend-page-list">
                                    <img class="img-gif" width="400" src="/assets/images/loading/cupertino.gif" alt="#" />
                                </div>
                            </div>
                            <table class="table table-tripped">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Student</th>
                                    <th>Module</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(appeal,index) in appeals">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ appeal.student }}</td>
                                        <td>{{ appeal.module }}</td>
                                        <td>
                                            <button v-on:click="unLock(appeal.id,appeal.module_id,appeal.student_id)" class="btn btn-success">Unlock</button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div class="col-md-4"></div>  
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
            question:"",
            answer:"",
            answers:[],
            appeals:[],
            bool_question:"",
            bool_answer:"",
            bool_answers:[{answer:'true',status:0},{answer:'false',status:0}],
            question_id:"",
            selectedAns:"",
            selectedBool:"",
            active_mc: [],
            inactive_mc: [],
            active_tf: [],
            inactive_tf: [],
            mc_group_id:"",
            tf_group_id:"",
            groups:[],
            settings:[],
            ////il be deleted
            news:[],
            expnews:[],
            newz:{},
            group:{},
            newz_loading:true,
            expnewz_loading:true,
            setting_loading:true,
            appeal_loading:true,
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
            var user_cry = localStorage.getItem("user") || "";
            var token_cry = localStorage.getItem("user_token") || "";
            var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
            var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
            if (user && token) {
                this.user = JSON.parse(user);
            } 
        },
        addAnswer(){
            if(this.answer == null || this.answer == '' || this.answer == undefined ){
                alert('Enter a correct Answer')
            }else{
                var anz = {answer:this.answer,status:0};
                this.answers.push(anz)
                this.answer = ''
            }
        },
        delAnswer(ans){
            this.answers = this.answers.filter((i) => i.answer != ans);
        },
        async addQuestion(){
            var question = this.question
            var question_id = this.question_id      
            var ansz = this.answers
            var group_id = this.mc_group_id
            var q_type = "mc"

            if(question == null || question == '' || question == undefined || group_id == ''){
                alert('Enter Question and Choose Module')
            }else{
                
                if(ansz.length < 2){
                    alert('Answers should be two or more')
                }else{
                   if(this.selectedAns == ""){
                    alert('Select Answer for you Question')
                   }else{
                    ansz.forEach(function(elem){
                        elem.test_question_id = question_id
                    })
                    this.createQuestion(ansz,question_id,question,q_type,group_id)
                     
                   }
                }
            }
        },
        async unLock(id,module_id,student_id){

            var response = await axios
            .post(this.$store.state.api_url + "/appeal-unlock",{id,module_id,student_id})
            .catch((errors) => {
                var message = "Network or Server Errors";
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
                if (response.data.success) {
                
                    this.appeals = this.appeals.filter((i) => i.id != id);
                
                    var message = response.data.message;
                    this.$toast.success(message,{duration: 7000,dismissible: true,})
                
                } else {
                    var message = response.data.message;
                    this.$toast.error(message,{duration: 7000,dismissible: true,})
                    this.errors = response.data.errors;
                }
           
        },
        async addBoolQuestion(){
            var question = this.bool_question
            var question_id = this.question_id      
            var ansz = this.bool_answers
            var group_id = this.tf_group_id
            var q_type = "tf"

            if(question == null || question == '' || question == undefined || group_id == ''){
                alert('Enter Question and Choose Module')
            }else{
                
                   if(this.selectedBool == ""){
                    alert('Select Answer for you Question')
                   }else{
                    ansz.forEach(function(elem){
                        elem.test_question_id = question_id
                    })
                    this.createQuestion(ansz,question_id,question,q_type,group_id)
                     
                   }
            }
        },
        async createQuestion(ansz,question_id,question,q_type,group_id){
        ////type mc =multiple choise, ft true anf false
        var response = await axios
        .post(this.$store.state.api_url + "/add-question",{ansz,question_id,question,q_type,group_id})
        .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
            if (response.data.success) {

            /*this.question = ""
            this.answer = ""
            this.answers = []
            this.question_id = this.question_id + 1
            this.selectedAns = ""*/

            var message = response.data.message;
            this.$toast.success(message,{duration: 7000,dismissible: true,})
            location.reload();
            
            } else {
                var message = response.data.message;
                this.$toast.error(message,{duration: 7000,dismissible: true,})
            }
        },
        onSelectedAns(){
            var ans_select = this.selectedAns

            this.answers.forEach(function(elem){
               if(elem.status == 1){
                elem.status = 0
               }
            })

            var objIndex = this.answers.findIndex(obj => obj.answer == ans_select)
            this.answers[objIndex].status = 1;
        },
        onSelectedBool(){
            var ans_select = this.selectedBool

            //alert(ans_select);
            this.bool_answers.forEach(function(elem){
               if(elem.status == 1){
                elem.status = 0
               }
            })

            var objIndex = this.bool_answers.findIndex(obj => obj.answer == ans_select)
            this.bool_answers[objIndex].status = 1;
        },
        updateSetting(){
            alert('try later')
        },

        async appealStudent() {

            var response = await axios.get(this.$store.state.api_url + "/get-appeal-student")
            .catch((errors) => {
                this.appeal_loading = false
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });

            

            if (response.data.success) { 
                this.appeal_loading = false
            this.appeals = response.data.appeals
            //console.log(response.data.dataz)
            } else {
                this.appeal_loading = false
                console.log(response.data.errors)
            }  

        },

////////////////////////////////////////some wil be deleted
        setEditData(mc){
            alert('try again')
         

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

        async deleteQuestion(id,sourse){
        alert('try again')
        /*var response = await axios
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
            }*/
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
      
        async getQuestions() {
            var response = await axios.get(this.$store.state.api_url + "/get-questions")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });
        
            if (response.data.success) { 
             
              this.active_mc = response.data.active_mc
              this.inactive_mc = response.data.inactive_mc
              this.active_tf = response.data.active_tf
              this.inactive_tf = response.data.inactive_tf
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
        async getSettings() {

            var response = await axios.get(this.$store.state.api_url + "/get-settings")
            .catch((errors) => {
            var message = "Network or Server Errors";
            this.$toast.error(message,{duration: 7000,dismissible: true,})
            });

            if (response.data.success) { 
            this.settings = response.data.settings
            //console.log(response.data.dataz)
            } else {
                 var sms = response.data.message;
                this.$toast.error(sms,{duration: 5000,dismissible: true,})
                console.log(response.data.errors)
            }
            this.setting_loading = false;

        },
    
    },
    created() {
        //this.isAuth()
        this.getQuestions()
        this.getAllGroups()
        this.getSettings()
        this.appealStudent()
        this.question_id = this.secrete = Math.floor(10000 + Math.random()*90000)
        
    }
};
</script>